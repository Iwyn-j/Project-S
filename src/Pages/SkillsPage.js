import React, { useContext, useState, useEffect } from 'react';
import { RecommendationContext } from '../context/RecommendationContext';

// --- Firebase imports (adjust path to your config) ---
import { auth, db, rtdb } from '../firebase-config';

import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  collection,
  getDocs
} from 'firebase/firestore';

const SkillsPage = () => {
  const { bestRecommendation } = useContext(RecommendationContext);

  // Local state for the skills array from bestRecommendation
  const [skillsArray, setSkillsArray] = useState([]);
  // Local state for bookmarked skills (loaded from Firebase)
  const [bookmarkedSkills, setBookmarkedSkills] = useState([]);

  // Current user (assuming user is signed in). Adjust if you get user from context.
  const user = auth.currentUser;

  // On component mount, parse bestRecommendation.Skills into an array
  useEffect(() => {
    if (!bestRecommendation) return;

    if (Array.isArray(bestRecommendation.Skills)) {
      setSkillsArray(bestRecommendation.Skills);
    } else if (typeof bestRecommendation.Skills === 'string') {
      const splitSkills = bestRecommendation.Skills
        .split(',')
        .map((skill) => skill.trim());
      setSkillsArray(splitSkills);
    }
  }, [bestRecommendation]);

  // On component mount (or when user changes), load the user's bookmarked skills from Firestore
  useEffect(() => {
    const fetchBookmarkedSkills = async () => {
      if (!user) return;

      try {
        const skillsCollectionRef = collection(db, 'users', user.uid, 'bookmarks', 'skills');
        const querySnapshot = await getDocs(skillsCollectionRef);

        const skillList = [];
        querySnapshot.forEach((docSnap) => {
          // docSnap.data() might look like { name: 'Java' }
          const data = docSnap.data();
          if (data.name) {
            skillList.push(data.name);
          }
        });

        setBookmarkedSkills(skillList);
      } catch (error) {
        console.error('Error fetching bookmarked skills:', error);
      }
    };

    fetchBookmarkedSkills();
  }, [user]);

  // Toggle bookmark for a specific skill in Firestore
  const toggleBookmark = async (skill) => {
    if (!user) {
      alert('You must be logged in to bookmark.');
      return;
    }

    try {
      const skillDocRef = doc(db, 'users', user.uid, 'bookmarks', 'skills', skill);
      // Check if this skill is already bookmarked
      const docSnap = await getDoc(skillDocRef);

      if (docSnap.exists()) {
        // If exists, remove bookmark
        await deleteDoc(skillDocRef);
        setBookmarkedSkills((prev) => prev.filter((item) => item !== skill));
      } else {
        // If not exists, add bookmark
        await setDoc(skillDocRef, { name: skill });
        setBookmarkedSkills((prev) => [...prev, skill]);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  // Check if a skill is bookmarked
  const isBookmarked = (skill) => bookmarkedSkills.includes(skill);

  // --- Inline styles ---
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

  // Hover effect (inline style workaround)
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.02)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  // --- JSX ---
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Skills</h1>
      <p style={subHeadingStyle}>
        Build your professional toolkit with these recommended skills. Hone your expertise
        and stand out in your career.
      </p>

      {skillsArray.length > 0 ? (
        <div style={gridStyle}>
          {skillsArray.map((skill, idx) => (
            <div
              key={idx}
              style={cardStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Bookmark Icon (★) */}
              <span
                style={{
                  ...bookmarkStyle,
                  color: isBookmarked(skill) ? '#f59e0b' : '#9CA3AF' // gold or gray
                }}
                onClick={() => toggleBookmark(skill)}
              >
                ★
              </span>

              <div style={cardTitleStyle}>{skill}</div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>No skills found.</p>
      )}
    </div>
  );
};

export default SkillsPage;
