// src/context/RecommendationContext.js
import React, { createContext, useState } from 'react';

export const RecommendationContext = createContext(null);

export const RecommendationProvider = ({ children }) => {
  const [bestRecommendation, setBestRecommendation] = useState(null);

  return (
    <RecommendationContext.Provider value={{ bestRecommendation, setBestRecommendation }}>
      {children}
    </RecommendationContext.Provider>
  );
};
