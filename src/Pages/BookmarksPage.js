// BookmarksPage.js
import React, { useEffect, useState } from 'react';
import { auth, db, rtdb } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

function BookmarksPage() {
  const [bookmarkedSkills, setBookmarkedSkills] = useState([]);
  const [bookmarkedTopics, setBookmarkedTopics] = useState([]);
  const [bookmarkedCertifications, setBookmarkedCertifications] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const fetchBookmarks = async () => {
      try {
        // Fetch bookmarked skills
        const skillsRef = collection(db, 'users', user.uid, 'bookmarks', 'skills');
        const skillsSnapshot = await getDocs(skillsRef);
        const skillsData = skillsSnapshot.docs.map((doc) => doc.data());
        setBookmarkedSkills(skillsData);

        // Fetch bookmarked topics
        const topicsRef = collection(db, 'users', user.uid, 'bookmarks', 'topics');
        const topicsSnapshot = await getDocs(topicsRef);
        const topicsData = topicsSnapshot.docs.map((doc) => doc.data());
        setBookmarkedTopics(topicsData);

        // Fetch bookmarked certifications
        const certRef = collection(db, 'users', user.uid, 'bookmarks', 'certifications');
        const certSnapshot = await getDocs(certRef);
        const certData = certSnapshot.docs.map((doc) => doc.data());
        setBookmarkedCertifications(certData);

      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    fetchBookmarks();
  }, [user]);

  return (
    <div>
      <h2>My Bookmarks</h2>

      <section>
        <h3>Bookmarked Skills</h3>
        {bookmarkedSkills.map((skill) => (
          <div key={skill.id}>
            <p>{skill.name}</p>
            {/* Add any other skill details you stored */}
          </div>
        ))}
      </section>

      <section>
        <h3>Bookmarked Topics</h3>
        {bookmarkedTopics.map((topic) => (
          <div key={topic.id}>
            <p>{topic.name}</p>
          </div>
        ))}
      </section>

      <section>
        <h3>Bookmarked Certifications</h3>
        {bookmarkedCertifications.map((cert) => (
          <div key={cert.id}>
            <p>{cert.name}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default BookmarksPage;
