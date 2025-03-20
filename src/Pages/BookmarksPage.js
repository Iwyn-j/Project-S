// // import React, { useState, useEffect } from 'react';
// // import { auth, db } from '../firebase-config';
// // import {
// //   collection,
// //   onSnapshot,
// //   doc,
// //   deleteDoc
// // } from 'firebase/firestore';

// // const BookmarksPage = () => {
// //   const [bookmarks, setBookmarks] = useState([]);
// //   const user = auth.currentUser;

// //   // Listen for all bookmarks in real-time
// //   useEffect(() => {
// //     if (!user) {
// //       console.log('No user found; please log in to view bookmarks.');
// //       return;
// //     }

// //     const unsub = onSnapshot(
// //       collection(db, 'users', user.uid, 'bookmarks'),
// //       (snapshot) => {
// //         const allBookmarks = [];
// //         snapshot.forEach((docSnap) => {
// //           allBookmarks.push({ id: docSnap.id, ...docSnap.data() });
// //         });
// //         setBookmarks(allBookmarks);
// //       },
// //       (error) => {
// //         console.error('Error fetching bookmarks:', error);
// //       }
// //     );

// //     return () => unsub();
// //   }, [user]);

// //   // Remove a bookmark from Firestore
// //   const removeBookmark = async (bookmarkId) => {
// //     if (!user) {
// //       alert('You must be logged in to remove bookmarks.');
// //       return;
// //     }

// //     try {
// //       await deleteDoc(doc(db, 'users', user.uid, 'bookmarks', bookmarkId));
// //       console.log(`Bookmark ${bookmarkId} removed.`);
// //     } catch (error) {
// //       console.error('Error removing bookmark:', error);
// //     }
// //   };

// //   // Inline styles
// //   const containerStyle = {
// //     background: 'linear-gradient(to bottom right, #F3F4F6, #E5E7EB)',
// //     minHeight: '100vh',
// //     padding: '3rem',
// //     fontFamily: 'sans-serif'
// //   };

// //   const headingStyle = {
// //     textAlign: 'center',
// //     color: '#1F2937',
// //     fontSize: '2.5rem',
// //     marginBottom: '1.5rem',
// //     fontWeight: 'bold'
// //   };

// //   const gridStyle = {
// //     display: 'grid',
// //     gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
// //     gap: '2rem',
// //     maxWidth: '1200px',
// //     margin: '0 auto'
// //   };

// //   const cardStyle = {
// //     position: 'relative',
// //     backgroundColor: '#FFFFFF',
// //     borderRadius: '10px',
// //     boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
// //     padding: '2rem',
// //     textAlign: 'center'
// //   };

// //   const removeButtonStyle = {
// //     background: '#f87171',
// //     color: '#fff',
// //     border: 'none',
// //     padding: '0.5rem 1rem',
// //     borderRadius: '5px',
// //     cursor: 'pointer',
// //     marginTop: '1rem'
// //   };

// //   return (
// //     <div style={containerStyle}>
// //       <h1 style={headingStyle}>My Bookmarks</h1>
// //       {bookmarks.length > 0 ? (
// //         <div style={gridStyle}>
// //           {bookmarks.map((bookmark) => (
// //             <div key={bookmark.id} style={cardStyle}>
// //               <p><strong>Type:</strong> {bookmark.type}</p>
// //               <p><strong>Value:</strong> {bookmark.value}</p>
// //               <button
// //                 style={removeButtonStyle}
// //                 onClick={() => removeBookmark(bookmark.id)}
// //               >
// //                 Remove Bookmark
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <p style={{ textAlign: 'center' }}>No bookmarks found.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default BookmarksPage;

// import React, { useState, useEffect } from 'react';
// import { auth, db } from '../firebase-config';
// import {
//   collection,
//   onSnapshot,
//   doc,
//   deleteDoc
// } from 'firebase/firestore';

// const BookmarksPage = () => {
//   const [bookmarks, setBookmarks] = useState([]);
//   const user = auth.currentUser;

//   // 1) Listen for all bookmarks in real-time
//   useEffect(() => {
//     if (!user) {
//       console.log('No user found; please log in to view bookmarks.');
//       return;
//     }

//     const unsub = onSnapshot(
//       collection(db, 'users', user.uid, 'bookmarks'),
//       (snapshot) => {
//         const allBookmarks = [];
//         snapshot.forEach((docSnap) => {
//           allBookmarks.push({ id: docSnap.id, ...docSnap.data() });
//         });
//         setBookmarks(allBookmarks);
//       },
//       (error) => {
//         console.error('Error fetching bookmarks:', error);
//       }
//     );

//     return () => unsub();
//   }, [user]);

//   // 2) Remove a bookmark from Firestore
//   const removeBookmark = async (bookmarkId) => {
//     if (!user) {
//       alert('You must be logged in to remove bookmarks.');
//       return;
//     }

//     try {
//       await deleteDoc(doc(db, 'users', user.uid, 'bookmarks', bookmarkId));
//       console.log(`Bookmark ${bookmarkId} removed.`);
//     } catch (error) {
//       console.error('Error removing bookmark:', error);
//     }
//   };

//   // 3) Group bookmarks by type
//   const certifications = bookmarks.filter((bm) => bm.type === 'certificate');
//   const skills = bookmarks.filter((bm) => bm.type === 'skill');
//   const topics = bookmarks.filter((bm) => bm.type === 'topic');

//   // --- Inline Styles for Simpler, Cleaner Look ---
//   const containerStyle = {
//     background: '#f9fafb', // Light neutral background
//     minHeight: '100vh',
//     padding: '3rem',
//     fontFamily: 'sans-serif'
//   };

//   const mainHeadingStyle = {
//     textAlign: 'center',
//     color: '#1F2937',
//     fontSize: '2.5rem',
//     marginBottom: '2rem',
//     fontWeight: 'bold'
//   };

//   const sectionHeadingStyle = {
//     textAlign: 'left',
//     color: '#1F2937',
//     fontSize: '1.8rem',
//     margin: '2rem 0 1rem',
//     fontWeight: 'bold'
//   };

//   const gridStyle = {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//     gap: '1rem',
//     maxWidth: '1000px',
//     margin: '0 auto'
//   };

//   const cardStyle = {
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//     padding: '1rem',
//     textAlign: 'center',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between'
//   };

//   const bookmarkValueStyle = {
//     marginBottom: '0.75rem',
//     fontSize: '1rem',
//     color: '#374151',
//     wordWrap: 'break-word'
//   };

//   const removeButtonStyle = {
//     backgroundColor: '#ef4444', // Tailwind red-500
//     color: '#ffffff',
//     border: 'none',
//     padding: '0.5rem 1rem',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     transition: 'background-color 0.2s ease'
//   };

//   const removeButtonHover = (e) => {
//     e.target.style.backgroundColor = '#dc2626'; // Tailwind red-600
//   };

//   const removeButtonLeave = (e) => {
//     e.target.style.backgroundColor = '#ef4444'; // revert to red-500
//   };

//   const noBookmarksStyle = {
//     textAlign: 'center',
//     fontSize: '1rem',
//     color: '#6B7280',
//     margin: '1rem 0'
//   };

//   // 4) Helper function to render each section
//   const renderSection = (title, items) => (
//     <>
//       <h2 style={sectionHeadingStyle}>{title}</h2>
//       {items.length > 0 ? (
//         <div style={gridStyle}>
//           {items.map((bookmark) => (
//             <div key={bookmark.id} style={cardStyle}>
//               <div style={bookmarkValueStyle}>{bookmark.value}</div>
//               <button
//                 style={removeButtonStyle}
//                 onMouseEnter={removeButtonHover}
//                 onMouseLeave={removeButtonLeave}
//                 onClick={() => removeBookmark(bookmark.id)}
//               >
//                 Remove Bookmark
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p style={noBookmarksStyle}>No {title.toLowerCase()} found.</p>
//       )}
//     </>
//   );

//   return (
//     <div style={containerStyle}>
//       <h1 style={mainHeadingStyle}>My Bookmarks</h1>
//       {certifications.length === 0 &&
//        skills.length === 0 &&
//        topics.length === 0 ? (
//         <p style={noBookmarksStyle}>No bookmarks found.</p>
//       ) : (
//         <>
//           {renderSection('Certifications', certifications)}
//           {renderSection('Skills', skills)}
//           {renderSection('Topics', topics)}
//         </>
//       )}
//     </div>
//   );
// };

// export default BookmarksPage;

import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc
} from 'firebase/firestore';

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const user = auth.currentUser;

  // ─────────────────────────────────────────────────────────────
  // 1) Real-time listener for all bookmarks in Firestore
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) {
      console.log('No user found; please log in to view bookmarks.');
      return;
    }

    const unsub = onSnapshot(
      collection(db, 'users', user.uid, 'bookmarks'),
      (snapshot) => {
        const allBookmarks = [];
        snapshot.forEach((docSnap) => {
          allBookmarks.push({ id: docSnap.id, ...docSnap.data() });
        });
        setBookmarks(allBookmarks);
      },
      (error) => {
        console.error('Error fetching bookmarks:', error);
      }
    );

    return () => unsub();
  }, [user]);

  // ─────────────────────────────────────────────────────────────
  // 2) Remove a bookmark from Firestore
  // ─────────────────────────────────────────────────────────────
  const removeBookmark = async (bookmarkId) => {
    if (!user) {
      alert('You must be logged in to remove bookmarks.');
      return;
    }

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'bookmarks', bookmarkId));
      console.log(`Bookmark ${bookmarkId} removed.`);
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // 3) Group bookmarks by type
  // ─────────────────────────────────────────────────────────────
  const certifications = bookmarks.filter((bm) => bm.type === 'certificate');
  const skills = bookmarks.filter((bm) => bm.type === 'skill');
  const topics = bookmarks.filter((bm) => bm.type === 'topic');

  // ─────────────────────────────────────────────────────────────
  // 4) Basic Layout Components
  // ─────────────────────────────────────────────────────────────

  // Minimal Navbar
  const Navbar = () => {
    const navStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      borderBottom: '1px solid #e5e7eb'
    };

    const logoStyle = {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#111'
    };

    const navLinksStyle = {
      display: 'flex',
      gap: '1rem'
    };

    const linkStyle = {
      color: '#111',
      textDecoration: 'none',
      fontSize: '0.95rem'
    };

    return (
      <header style={navStyle}>
        <div style={logoStyle}>YOUR LOGO</div>
        <nav style={navLinksStyle}>
          {/* You can add more nav links here if needed */}
          <a href="/" style={linkStyle}>
            Home
          </a>
          <a href="/bookmarks" style={linkStyle}>
            Bookmarks
          </a>
        </nav>
      </header>
    );
  };

  // Minimal Footer
  const Footer = () => {
    const footerStyle = {
      borderTop: '1px solid #e5e7eb',
      padding: '1rem 2rem',
      textAlign: 'center',
      fontSize: '0.9rem',
      color: '#6b7280'
    };
    return (
      <footer style={footerStyle}>
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    );
  };

  // Section to display each category
  const renderSection = (title, items) => {
    return (
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={styles.sectionHeading}>{title}</h2>
        {items.length > 0 ? (
          <div style={styles.grid}>
            {items.map((bookmark) => (
              <div key={bookmark.id} style={styles.card}>
                <div style={styles.bookmarkValue}>{bookmark.value}</div>
                <button
                  style={styles.removeButton}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = '#333')
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = '#111')
                  }
                  onClick={() => removeBookmark(bookmark.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.noBookmarks}>No {title.toLowerCase()} found.</p>
        )}
      </section>
    );
  };

  // ─────────────────────────────────────────────────────────────
  // 5) Page Styles
  // ─────────────────────────────────────────────────────────────
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column'
    },
    main: {
      flex: '1',
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '2rem'
    },
    hero: {
      textAlign: 'left',
      marginBottom: '2rem'
    },
    heading: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#111'
    },
    subHeading: {
      fontSize: '1rem',
      color: '#6b7280',
      marginBottom: '1rem'
    },
    sectionHeading: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#111',
      marginBottom: '1rem',
      borderBottom: '1px solid #e5e7eb',
      paddingBottom: '0.25rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '1rem'
    },
    card: {
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    bookmarkValue: {
      marginBottom: '0.75rem',
      fontSize: '0.95rem',
      lineHeight: '1.4',
      color: '#111',
      wordBreak: 'break-word'
    },
    removeButton: {
      backgroundColor: '#111',
      color: '#fff',
      border: 'none',
      padding: '0.4rem 0.8rem',
      borderRadius: '3px',
      cursor: 'pointer',
      fontSize: '0.85rem',
      transition: 'background-color 0.2s ease'
    },
    noBookmarks: {
      fontSize: '0.95rem',
      color: '#6b7280'
    }
  };

  // ─────────────────────────────────────────────────────────────
  // 6) Render Page
  // ─────────────────────────────────────────────────────────────
  return (
    <div style={styles.container}>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.hero}>
          <h1 style={styles.heading}>My Bookmarks</h1>
          <p style={styles.subHeading}>
            Here you can view and remove your saved items, organized by category.
          </p>
        </div>

        {/* If no bookmarks at all, show a simple message */}
        {certifications.length === 0 &&
         skills.length === 0 &&
         topics.length === 0 ? (
          <p style={styles.noBookmarks}>No bookmarks found.</p>
        ) : (
          <>
            {renderSection('Certifications', certifications)}
            {renderSection('Skills', skills)}
            {renderSection('Topics', topics)}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BookmarksPage;
