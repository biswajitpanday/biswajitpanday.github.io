"use client";

import React from 'react';


// Component for generating social media preview content
const SocialPreviewGenerator = () => {
  const socialPreviewData = {
    title: "Biswajit Panday - Full-Stack .NET Developer",
    subtitle: "Expert in Cloud Solutions & Modern Web Development",
    skills: [".NET", "React", "Azure", "AWS", "DevOps"],
    experience: "10+ Years",
    certification: "Microsoft Certified",
    location: "Dhaka, Bangladesh"
  };

  // This component helps visualize what your social media preview will look like
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-primary via-primary/95 to-secondary-default/20 rounded-lg border border-secondary-default/30">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-secondary-default/20 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-secondary-default">BP</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">{socialPreviewData.title}</h1>
          <p className="text-secondary-default text-sm">{socialPreviewData.subtitle}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/10 rounded-lg p-3">
          <span className="text-xs text-white/60">Experience</span>
          <p className="text-white font-semibold">{socialPreviewData.experience}</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <span className="text-xs text-white/60">Status</span>
          <p className="text-secondary-default font-semibold">{socialPreviewData.certification}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {socialPreviewData.skills.map((skill, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-secondary-default/20 text-secondary-default text-xs rounded-full border border-secondary-default/30"
          >
            {skill}
          </span>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-white/80 text-sm">{socialPreviewData.location}</p>
        <p className="text-xs text-white/60 mt-1">biswajitpanday.github.io</p>
      </div>
    </div>
  );
};

export default SocialPreviewGenerator; 