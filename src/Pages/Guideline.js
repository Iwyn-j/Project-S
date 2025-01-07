import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Guideline.css";

const decisionTree = [
  // Data Science Developer in IT
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
        },
        {
          name: "Machine Learning Fundamentals",
          description: "Explore key ML algorithms.",
          estimatedTime: "30 hours",
          level: "Intermediate",
        },
      ],
      skills: ["Python", "Pandas", "Scikit-learn", "SQL"],
      certifications: [
        { name: "Google Data Analytics Certificate", provider: "Coursera", cost: "Free" },
        { name: "AWS Certified Machine Learning", provider: "AWS", cost: "RM800" },
      ],
    },
  },
  // Frontend Developer wanting UI/UX specialization in IT
  {
    condition: (input) =>
      input?.occupation?.toLowerCase() === "frontend developer" &&
      input?.careerGoal?.toLowerCase() === "ui/ux design" &&
      input?.industry?.toLowerCase() === "it",
    recommendations: {
      topics: [
        {
          name: "UI/UX Fundamentals",
          description: "Learn the principles of user interface and experience design.",
          estimatedTime: "12 hours",
          level: "Beginner",
        },
        {
          name: "Design Systems and Prototyping",
          description: "Learn to create design systems and interactive prototypes.",
          estimatedTime: "20 hours",
          level: "Intermediate",
        },
      ],
      skills: ["Figma", "Adobe XD", "Prototyping", "HTML/CSS"],
      certifications: [
        { name: "UX Design Certificate", provider: "Google", cost: "Free" },
        { name: "Interaction Design Specialization", provider: "Coursera", cost: "RM300" },
      ],
    },
  },
  // Business Analyst aiming for Financial Analytics in Finance
  {
    condition: (input) =>
      input?.occupation?.toLowerCase() === "business analyst" &&
      input?.careerGoal?.toLowerCase() === "financial analytics" &&
      input?.industry?.toLowerCase() === "finance",
    recommendations: {
      topics: [
        {
          name: "Financial Modeling",
          description: "Master financial models for business decision-making.",
          estimatedTime: "20 hours",
          level: "Intermediate",
        },
        {
          name: "Corporate Finance Essentials",
          description: "Learn the basics of corporate finance.",
          estimatedTime: "25 hours",
          level: "Beginner",
        },
      ],
      skills: ["Excel", "Financial Analysis", "SQL"],
      certifications: [
        { name: "Chartered Financial Analyst (CFA)", provider: "CFA Institute", cost: "RM5000" },
        { name: "Financial Analyst Certification", provider: "edX", cost: "Free" },
      ],
    },
  },
  // Data Engineer aspiring for Cloud Data Solutions in IT
  {
    condition: (input) =>
      input?.occupation?.toLowerCase() === "data engineer" &&
      input?.careerGoal?.toLowerCase() === "cloud data solutions" &&
      input?.industry?.toLowerCase() === "it",
    recommendations: {
      topics: [
        {
          name: "Data Engineering on the Cloud",
          description: "Learn how to build data pipelines and infrastructure on the cloud.",
          estimatedTime: "40 hours",
          level: "Advanced",
        },
        {
          name: "Big Data Technologies",
          description: "Explore Hadoop, Spark, and other big data technologies.",
          estimatedTime: "35 hours",
          level: "Advanced",
        },
      ],
      skills: ["AWS", "Google Cloud Platform", "BigQuery", "Apache Spark"],
      certifications: [
        { name: "Google Cloud Professional Data Engineer", provider: "Google", cost: "RM1200" },
        { name: "AWS Data Analytics Certification", provider: "AWS", cost: "RM800" },
      ],
    },
  },
  // Marketing Manager aiming for Digital Marketing Strategy in Retail
  {
    condition: (input) =>
      input?.occupation?.toLowerCase() === "marketing manager" &&
      input?.careerGoal?.toLowerCase() === "digital marketing strategy" &&
      input?.industry?.toLowerCase() === "retail",
    recommendations: {
      topics: [
        {
          name: "SEO and Content Marketing",
          description: "Understand the fundamentals of SEO and how to create engaging content.",
          estimatedTime: "10 hours",
          level: "Beginner",
        },
        {
          name: "Social Media Marketing",
          description: "Learn how to run effective social media campaigns.",
          estimatedTime: "18 hours",
          level: "Intermediate",
        },
      ],
      skills: ["Google Analytics", "SEO", "Content Creation", "Social Media Management"],
      certifications: [
        { name: "Digital Marketing Professional Certificate", provider: "Meta", cost: "RM200" },
        { name: "Google Ads Certification", provider: "Google", cost: "Free" },
      ],
    },
  },
  // Software Engineer aiming for AI specialization in Technology
  {
    condition: (input) =>
      input?.occupation?.toLowerCase() === "software engineer" &&
      input?.careerGoal?.toLowerCase() === "artificial intelligence" &&
      input?.industry?.toLowerCase() === "technology",
    recommendations: {
      topics: [
        {
          name: "Neural Networks and Deep Learning",
          description: "Understand the basics of neural networks and deep learning.",
          estimatedTime: "40 hours",
          level: "Advanced",
        },
        {
          name: "Computer Vision",
          description: "Explore how computer vision is used in AI applications.",
          estimatedTime: "30 hours",
          level: "Advanced",
        },
      ],
      skills: ["TensorFlow", "PyTorch", "OpenCV"],
      certifications: [
        { name: "Deep Learning Specialization", provider: "Coursera", cost: "RM350" },
        { name: "Computer Vision Nanodegree", provider: "Udacity", cost: "RM1000" },
      ],
    },
  },
  // Teacher aiming to transition into EdTech in Education
  {
    condition: (input) =>
      input?.occupation?.toLowerCase() === "teacher" &&
      input?.careerGoal?.toLowerCase() === "edtech" &&
      input?.industry?.toLowerCase() === "education",
    recommendations: {
      topics: [
        {
          name: "Educational Technology Integration",
          description: "Learn how to integrate technology into classroom teaching.",
          estimatedTime: "12 hours",
          level: "Beginner",
        },
        {
          name: "Instructional Design",
          description: "Understand the basics of creating instructional content.",
          estimatedTime: "15 hours",
          level: "Intermediate",
        },
      ],
      skills: ["Canvas", "Google Classroom", "Instructional Design"],
      certifications: [
        { name: "EdTech Essentials Certification", provider: "ISTE", cost: "RM400" },
        { name: "Instructional Design Certificate", provider: "edX", cost: "Free" },
      ],
    },
  },
  // Entrepreneur aiming to expand in E-commerce in Retail
  {
    condition: (input) =>
      input?.occupation?.toLowerCase() === "entrepreneur" &&
      input?.careerGoal?.toLowerCase() === "e-commerce" &&
      input?.industry?.toLowerCase() === "retail",
    recommendations: {
      topics: [
        {
          name: "E-commerce Platforms and Solutions",
          description: "Learn about popular e-commerce platforms and solutions.",
          estimatedTime: "10 hours",
          level: "Beginner",
        },
        {
          name: "Payment Gateway Integration",
          description: "Understand how to integrate payment gateways into your store.",
          estimatedTime: "15 hours",
          level: "Intermediate",
        },
      ],
      skills: ["Shopify", "WooCommerce", "Stripe", "Digital Payments"],
      certifications: [
        { name: "E-commerce Business Certificate", provider: "Udemy", cost: "RM200" },
        { name: "Digital Business Certificate", provider: "LinkedIn Learning", cost: "Free" },
      ],
    },
  },
];

const Guideline = () => {
  const location = useLocation();
  const userInput = location.state?.userInput || {};
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    console.log("User Input Received:", userInput);

    if (!userInput || Object.keys(userInput).length === 0) {
      console.error("User input is undefined or empty.");
      return;
    }

    const matchedNode = decisionTree.find((node) => node.condition(userInput));

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
