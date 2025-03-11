import React, { useContext, useState } from 'react';
import { RecommendationContext } from '../context/RecommendationContext';

const CertificationsPage = () => {
  const { bestRecommendation } = useContext(RecommendationContext);

  // Local state for bookmarked cert links
  const [bookmarkedCerts, setBookmarkedCerts] = useState([]);

  if (!bestRecommendation) {
    return <p>No recommendation available yet.</p>;
  }

  const certLinks = bestRecommendation["Certification Links"] || [];

  // Toggle bookmark for a specific certification link
  const toggleBookmark = (link) => {
    setBookmarkedCerts((prev) => {
      if (prev.includes(link)) {
        return prev.filter((item) => item !== link);
      } else {
        return [...prev, link];
      }
    });
  };

  // Check if a link is bookmarked
  const isBookmarked = (link) => bookmarkedCerts.includes(link);

  // Styles
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

  const cardLinkStyle = {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#2563eb',
    textDecoration: 'none',
    wordWrap: 'break-word'
  };

  const bookmarkStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'color 0.2s ease'
  };

  // Hover effect
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.02)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Certifications</h1>
      <p style={subHeadingStyle}>
        Enhance your resume and gain industry recognition with these recommended certification
        programs. Click to learn more.
      </p>

      {certLinks.length > 0 ? (
        <div style={gridStyle}>
          {certLinks.map((link, idx) => (
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
                  color: isBookmarked(link) ? '#f59e0b' : '#9CA3AF'
                }}
                onClick={() => toggleBookmark(link)}
              >
                ★
              </span>

              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={cardLinkStyle}
              >
                {link}
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>No certifications found.</p>
      )}
    </div>
  );
};

export default CertificationsPage;
