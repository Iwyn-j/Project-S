import React, { useContext, useState } from 'react';
import { RecommendationContext } from '../context/RecommendationContext';

const SkillsPage = () => {
  const { bestRecommendation } = useContext(RecommendationContext);

  // Local state to keep track of bookmarked skills
  const [bookmarkedSkills, setBookmarkedSkills] = useState([]);

  if (!bestRecommendation) {
    return <p>No recommendation available yet.</p>;
  }

  // Convert bestRecommendation.Skills into an array
  let skillsArray = [];
  if (Array.isArray(bestRecommendation.Skills)) {
    skillsArray = bestRecommendation.Skills;
  } else if (typeof bestRecommendation.Skills === 'string') {
    skillsArray = bestRecommendation.Skills
      .split(',')
      .map((skill) => skill.trim());
  }

  // Toggle bookmark for a specific skill
  const toggleBookmark = (skill) => {
    setBookmarkedSkills((prev) => {
      if (prev.includes(skill)) {
        return prev.filter((item) => item !== skill);
      } else {
        return [...prev, skill];
      }
    });
  };

  // Check if a skill is bookmarked
  const isBookmarked = (skill) => bookmarkedSkills.includes(skill);

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
