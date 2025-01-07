import React from "react";
import { useLocation } from "react-router-dom";
import "./Guideline.css";

const SkillsPage = () => {
  const location = useLocation();
  const recommendations = location.state?.recommendations || {};

  if (!recommendations || !recommendations.skills || recommendations.skills.length === 0) {
    return (
      <div className="guideline-container">
        <p>No suggested skills available for your profile.</p>
      </div>
    );
  }

  return (
    <div className="guideline-container">
      <header>
        <h1>Your Suggested Skills</h1>
      </header>

      <div className="skills">
        {recommendations.skills.map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
      </div>
    </div>
  );
};

export default SkillsPage;
