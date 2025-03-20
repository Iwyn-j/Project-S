// import React, { useContext, useState } from 'react';
// import { RecommendationContext } from '../context/RecommendationContext';

// const TopicsPage = () => {
//   const { bestRecommendation } = useContext(RecommendationContext);

//   // Local state for bookmarked topics
//   const [bookmarkedTopics, setBookmarkedTopics] = useState([]);

//   if (!bestRecommendation) {
//     return <p>No recommendation available yet.</p>;
//   }

//   // Convert the "Topics To Learn" field into an array
//   let topicsArray = [];
//   if (Array.isArray(bestRecommendation["Topics To Learn"])) {
//     topicsArray = bestRecommendation["Topics To Learn"];
//   } else if (typeof bestRecommendation["Topics To Learn"] === 'string') {
//     topicsArray = bestRecommendation["Topics To Learn"]
//       .split(',')
//       .map((topic) => topic.trim());
//   }

//   // Toggle bookmark for a specific topic
//   const toggleBookmark = (topic) => {
//     setBookmarkedTopics((prev) => {
//       if (prev.includes(topic)) {
//         return prev.filter((item) => item !== topic);
//       } else {
//         return [...prev, topic];
//       }
//     });
//   };

//   // Check if a topic is bookmarked
//   const isBookmarked = (topic) => bookmarkedTopics.includes(topic);

//   // Styles
//   const containerStyle = {
//     background: 'linear-gradient(to bottom right, #F3F4F6, #E5E7EB)',
//     minHeight: '100vh',
//     padding: '3rem',
//     fontFamily: 'sans-serif'
//   };

//   const headingStyle = {
//     textAlign: 'center',
//     color: '#1F2937',
//     fontSize: '2.5rem',
//     marginBottom: '1.5rem',
//     fontWeight: 'bold'
//   };

//   const subHeadingStyle = {
//     textAlign: 'center',
//     color: '#6B7280',
//     fontSize: '1.1rem',
//     marginBottom: '2rem',
//     maxWidth: '600px',
//     margin: '0 auto'
//   };

//   const gridStyle = {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//     gap: '2rem',
//     maxWidth: '1200px',
//     margin: '0 auto'
//   };

//   const cardStyle = {
//     position: 'relative',
//     backgroundColor: '#FFFFFF',
//     borderRadius: '10px',
//     boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//     padding: '2rem',
//     transition: 'transform 0.3s ease',
//     textAlign: 'center'
//   };

//   const cardTitleStyle = {
//     fontSize: '1.2rem',
//     fontWeight: '600',
//     marginBottom: '0.5rem',
//     color: '#374151'
//   };

//   const bookmarkStyle = {
//     position: 'absolute',
//     top: '1rem',
//     right: '1rem',
//     fontSize: '1.5rem',
//     cursor: 'pointer',
//     transition: 'color 0.2s ease'
//   };

//   // Hover effect
//   const handleMouseEnter = (e) => {
//     e.currentTarget.style.transform = 'scale(1.02)';
//   };

//   const handleMouseLeave = (e) => {
//     e.currentTarget.style.transform = 'scale(1)';
//   };

//   return (
//     <div style={containerStyle}>
//       <h1 style={headingStyle}>Topics to Learn</h1>
//       <p style={subHeadingStyle}>
//         Explore these recommended topics to further develop your skills and achieve your career goals.
//       </p>

//       {topicsArray.length > 0 ? (
//         <div style={gridStyle}>
//           {topicsArray.map((topic, idx) => (
//             <div
//               key={idx}
//               style={cardStyle}
//               onMouseEnter={handleMouseEnter}
//               onMouseLeave={handleMouseLeave}
//             >
//               {/* Bookmark Icon (★) */}
//               <span
//                 style={{
//                   ...bookmarkStyle,
//                   color: isBookmarked(topic) ? '#f59e0b' : '#9CA3AF'
//                 }}
//                 onClick={() => toggleBookmark(topic)}
//               >
//                 ★
//               </span>

//               <div style={cardTitleStyle}>{topic}</div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p style={{ textAlign: 'center' }}>No topics found.</p>
//       )}
//     </div>
//   );
// };

// export default TopicsPage;


import React, { useContext, useState, useEffect } from 'react';
import { RecommendationContext } from '../context/RecommendationContext';

// Firebase imports
import { auth, db } from '../firebase-config';
import {
  collection,
  doc,
  onSnapshot,
  getDoc,
  setDoc,
  deleteDoc
} from 'firebase/firestore';

const TopicsPage = () => {
  const { bestRecommendation } = useContext(RecommendationContext);
  const [topicsArray, setTopicsArray] = useState([]);
  const [bookmarkedTopics, setBookmarkedTopics] = useState([]);
  const user = auth.currentUser;

  // 1) Parse bestRecommendation["Topics To Learn"] into an array
  useEffect(() => {
    if (!bestRecommendation) return;

    let tempTopics = [];
    if (Array.isArray(bestRecommendation['Topics To Learn'])) {
      tempTopics = bestRecommendation['Topics To Learn'];
    } else if (typeof bestRecommendation['Topics To Learn'] === 'string') {
      tempTopics = bestRecommendation['Topics To Learn']
        .split(',')
        .map((topic) => topic.trim());
    }
    setTopicsArray(tempTopics);
  }, [bestRecommendation]);

  // 2) Listen for real-time updates to the user's "topic" bookmarks
  useEffect(() => {
    if (!user) {
      console.log('No user found; must be logged in to load topic bookmarks.');
      return;
    }

    console.log('Current user (TopicsPage):', user.uid);

    const unsub = onSnapshot(
      collection(db, 'users', user.uid, 'bookmarks'),
      (snapshot) => {
        console.log('onSnapshot (Topics) triggered. Docs count:', snapshot.size);

        const topicBookmarks = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          // Only include items where type === 'topic'
          if (data.type === 'topic') {
            topicBookmarks.push(data.value);
          }
        });

        console.log('Topics in Firestore =>', topicBookmarks);
        setBookmarkedTopics(topicBookmarks);
      },
      (error) => {
        console.error('Error in onSnapshot (Topics) =>', error);
      }
    );

    // Cleanup listener on unmount
    return () => unsub();
  }, [user]);

  // 3) Check if a topic is bookmarked
  const isBookmarked = (topic) => bookmarkedTopics.includes(topic);

  // 4) Toggle bookmark (add/remove in Firestore)
  const toggleBookmark = async (topic) => {
    if (!user) {
      alert('You must be logged in to bookmark.');
      return;
    }

    console.log('Toggling bookmark for topic:', topic);

    // Document path
    const docRef = doc(
      db,
      'users',
      user.uid,
      'bookmarks',
      `topic_${encodeURIComponent(topic)}`
    );

    try {
      const docSnap = await getDoc(docRef);
      console.log('Doc exists?', docSnap.exists());

      if (docSnap.exists()) {
        // Remove bookmark
        await deleteDoc(docRef);
        console.log('Bookmark removed from Firestore');
      } else {
        // Add bookmark
        await setDoc(docRef, {
          type: 'topic',
          value: topic
        });
        console.log('Bookmark added to Firestore');
      }
    } catch (error) {
      console.error('Error toggling bookmark (Topics):', error);
    }
  };

  // 5) Inline styles
  const containerStyle = {
    background: 'linear-gradient(to bottom right, #F3F4F6, #E5E7EB)',
    minHeight: '100vh',
    padding: '3rem',
    fontFamily: 'sans-serif'
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#1F2937',
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    fontWeight: 'bold'
  };

  const subHeadingStyle = {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: '1.1rem',
    marginBottom: '2rem',
    maxWidth: '600px',
    margin: '0 auto'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const cardStyle = {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '2rem',
    transition: 'transform 0.3s ease',
    textAlign: 'center'
  };

  const cardTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#374151'
  };

  const bookmarkStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'color 0.2s ease'
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.02)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  // 6) Render
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Topics to Learn</h1>
      <p style={subHeadingStyle}>
        Explore these recommended topics to further develop your skills and achieve
        your career goals.
      </p>

      {topicsArray.length > 0 ? (
        <div style={gridStyle}>
          {topicsArray.map((topic, idx) => (
            <div
              key={idx}
              style={cardStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span
                style={{
                  ...bookmarkStyle,
                  color: isBookmarked(topic) ? '#f59e0b' : '#9CA3AF'
                }}
                onClick={() => toggleBookmark(topic)}
              >
                ★
              </span>

              <div style={cardTitleStyle}>{topic}</div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>No topics found.</p>
      )}
    </div>
  );
};

export default TopicsPage;
