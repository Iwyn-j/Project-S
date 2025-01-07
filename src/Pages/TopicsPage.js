import React from "react";
import { useLocation } from "react-router-dom";
import "./Guideline.css";

const TopicsPage = () => {
  const location = useLocation();
  const recommendations = location.state?.recommendations || {};

  if (!recommendations || !recommendations.topics || recommendations.topics.length === 0) {
    return (
      <div className="guideline-container">
        <p>No topics available for your profile.</p>
      </div>
    );
  }

  return (
    <div className="guideline-container">
      <header>
        <h1>Your Recommended Topics</h1>
      </header>

      <div className="topics">
        {recommendations.topics.map((topic, index) => (
          <div key={index} className="card">
            <h3>{topic.name}</h3>
            <p>{topic.description}</p>
            <p>Estimated Time: {topic.estimatedTime}</p>
            <p>Level: {topic.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsPage;
