import React from "react";
import { useLocation } from "react-router-dom";
import "./Guideline.css";

const CertificationsPage = () => {
  const location = useLocation();
  const recommendations = location.state?.recommendations || {};

  if (!recommendations || !recommendations.certifications || recommendations.certifications.length === 0) {
    return (
      <div className="guideline-container">
        <p>No certification pathways available for your profile.</p>
      </div>
    );
  }

  return (
    <div className="guideline-container">
      <header>
        <h1>Your Certification Pathways</h1>
      </header>

      <div className="certifications">
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

export default CertificationsPage;
