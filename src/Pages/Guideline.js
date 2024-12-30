import React, { useState, useEffect } from "react";
import "./Guideline.css";

const decisionTree = [
  {
    condition: (input) =>
      input?.occupation?.toLowerCase() === "developer" &&
      input?.careerGoal?.toLowerCase() === "data science" &&
      input?.industry?.toLowerCase() === "it",
    recommendations: {
      topics: [
        {
          name: "Data Science Basics",
          description: "Learn foundational concepts of data manipulation and visualization.",
          estimatedTime: "15 hours",
          level: "Beginner",
          progress: 0,
        },
        {
          name: "Machine Learning Fundamentals",
          description: "Explore key ML algorithms.",
          estimatedTime: "30 hours",
          level: "Intermediate",
          progress: 0,
        },
      ],
      skills: ["Python", "Pandas", "Scikit-learn", "SQL"],
      certifications: [
        { name: "Google Data Analytics Certificate", provider: "Coursera", cost: "Free" },
        { name: "AWS Certified Machine Learning", provider: "AWS", cost: "RM800" },
      ],
    },
  },
  {
    condition: (input) =>
      input?.occupation?.toLowerCase() === "analyst" &&
      input?.careerGoal?.toLowerCase() === "finance" &&
      input?.industry?.toLowerCase() === "finance",
    recommendations: {
      topics: [
        {
          name: "Financial Modeling",
          description: "Master financial models for business decision-making.",
          estimatedTime: "20 hours",
          level: "Intermediate",
          progress: 0,
        },
        {
          name: "Corporate Finance Essentials",
          description: "Learn the basics of corporate finance.",
          estimatedTime: "25 hours",
          level: "Beginner",
          progress: 0,
        },
      ],
      skills: ["Excel", "Financial Analysis", "SQL"],
      certifications: [
        { name: "Chartered Financial Analyst (CFA)", provider: "CFA Institute", cost: "RM5000" },
        { name: "Financial Analyst Certification", provider: "edX", cost: "Free" },
      ],
    },
  },
];

const Guideline = ({ userInput }) => {
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    console.log("User Input Received:", userInput);

    // Ensure userInput is valid
    if (!userInput || Object.keys(userInput).length === 0) {
      console.error("User input is undefined or empty.");
      return;
    }

    // Debugging: Check the matching logic
    const matchedNode = decisionTree.find((node) => {
      const isMatch = node.condition(userInput);
      console.log(`Checking node condition:`, node.condition, "Result:", isMatch);
      return isMatch;
    });

    if (matchedNode) {
      console.log("Matched Recommendations:", matchedNode.recommendations);
      setRecommendations(matchedNode.recommendations);
    } else {
      console.warn("No matching condition found for user input:", userInput);
      setRecommendations(null);
    }
  }, [userInput]);

  if (!recommendations) {
    return (
      <div className="guideline-container">
        <p>No recommendations available for your profile.</p>
      </div>
    );
  }

  return (
    <div className="guideline-container">
      <header>
        <h1>Your Skill Development Recommendations</h1>
      </header>

      <div className="topics">
        <h2>Recommended Topics</h2>
        {recommendations.topics.map((topic, index) => (
          <div key={index} className="card">
            <h3>{topic.name}</h3>
            <p>{topic.description}</p>
            <p>Estimated Time: {topic.estimatedTime}</p>
            <p>Level: {topic.level}</p>
          </div>
        ))}
      </div>

      <div className="skills">
        <h2>Suggested Skills</h2>
        {recommendations.skills.map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
      </div>

      <div className="certifications">
        <h2>Certification Pathways</h2>
        {recommendations.certifications.map((cert, index) => (
          <div key={index} className="cert-card">
            <h3>{cert.name}</h3>
            <p>Provider: {cert.provider}</p>
            <p>Cost: {cert.cost}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guideline;
