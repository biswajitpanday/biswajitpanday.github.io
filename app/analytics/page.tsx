"use client";

import { useState } from 'react';
import HeatmapVisualization from "@/components/HeatmapVisualization";
import SocialPreviewGenerator from "@/components/SocialPreviewGenerator";

// Admin-only page - requires password or development mode
// In production, this page is hidden and requires authentication
export default function AnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Check if in development mode (auto-authenticate)
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Simple password check for production (can be enhanced with proper auth later)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Use environment variable or fallback password
    const adminPassword = process.env.NEXT_PUBLIC_ANALYTICS_PASSWORD || 'admin123';

    if (password === adminPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  // Auto-authenticate in development
  if (isDevelopment || isAuthenticated) {
    return (
      <>
        <SocialPreviewGenerator
          title="Analytics Dashboard - Biswajit Panday"
          description="Interactive heatmap analytics showing real-time user engagement and interaction patterns across the portfolio."
          url="https://biswajitpanday.github.io/analytics"
          type="website"
        />
        <HeatmapVisualization />
      </>
    );
  }

  // Login form for production
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-primary">
      <div className="max-w-md w-full mx-4">
        <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-8">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Analytics Dashboard</h1>
          <p className="text-white/60 text-sm mb-6 text-center">This page is restricted. Please enter the password to access analytics.</p>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-secondary-default"
              placeholder="Enter password"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm mb-4">{error}</p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-secondary-default to-blue-500 text-primary rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            Access Analytics
          </button>

          <p className="text-white/40 text-xs mt-4 text-center">
            Contact the site owner for access credentials
          </p>
        </form>
      </div>
    </div>
  );
}
