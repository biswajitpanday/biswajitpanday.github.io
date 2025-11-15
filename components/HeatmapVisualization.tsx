"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMousePointer, FiActivity, FiEye, FiDownload, FiTrash2 } from 'react-icons/fi';
import {
  getHeatmapInteractions,
  exportHeatmapData,
  clearHeatmapData,
  type HeatmapInteraction
} from '@/lib/heatmapAnalytics';

export default function HeatmapVisualization() {
  const [interactions, setInteractions] = useState<HeatmapInteraction[]>([]);
  const [scrollDepth, setScrollDepth] = useState<Record<string, number>>({});
  const [sectionEngagement, setSectionEngagement] = useState<Record<string, any>>({});
  const [showHeatmap, setShowHeatmap] = useState(false);

  useEffect(() => {
    loadHeatmapData();
  }, []);

  const loadHeatmapData = () => {
    const data = getHeatmapInteractions();
    setInteractions(data);

    try {
      const scroll = JSON.parse(localStorage.getItem('heatmap_scroll_depth') || '{}');
      setScrollDepth(scroll);

      const engagement = JSON.parse(localStorage.getItem('heatmap_section_engagement') || '{}');
      setSectionEngagement(engagement);
    } catch (error) {
      console.error('Failed to load heatmap data:', error);
    }
  };

  const handleClearData = () => {
    clearHeatmapData();
    loadHeatmapData();
  };

  const handleExportData = () => {
    exportHeatmapData();
  };

  // Calculate statistics
  const totalInteractions = interactions.length;
  const clicks = interactions.filter(i => i.type === 'click').length;
  const hovers = interactions.filter(i => i.type === 'hover').length;
  const scrolls = interactions.filter(i => i.type === 'scroll').length;

  // Top clicked elements
  const clickCounts: Record<string, number> = {};
  interactions
    .filter(i => i.type === 'click' && i.elementId !== 'unnamed')
    .forEach(i => {
      clickCounts[i.elementId] = (clickCounts[i.elementId] || 0) + 1;
    });

  const topClicks = Object.entries(clickCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Section engagement sorted by view time
  const topSections = Object.values(sectionEngagement)
    .sort((a: any, b: any) => b.viewTime - a.viewTime)
    .slice(0, 5);

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-secondary-default bg-clip-text text-transparent">
            Heatmap Analytics
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Visual representation of user interactions and engagement across the portfolio.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <FiActivity className="text-2xl text-secondary-default" />
              <h3 className="text-sm font-medium text-white/60">Total Interactions</h3>
            </div>
            <p className="text-3xl font-bold text-white">{totalInteractions}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <FiMousePointer className="text-2xl text-blue-400" />
              <h3 className="text-sm font-medium text-white/60">Clicks</h3>
            </div>
            <p className="text-3xl font-bold text-white">{clicks}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <FiEye className="text-2xl text-green-400" />
              <h3 className="text-sm font-medium text-white/60">Hovers</h3>
            </div>
            <p className="text-3xl font-bold text-white">{hovers}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <FiActivity className="text-2xl text-purple-400" />
              <h3 className="text-sm font-medium text-white/60">Scrolls</h3>
            </div>
            <p className="text-3xl font-bold text-white">{scrolls}</p>
          </motion.div>
        </div>

        {/* Top Clicked Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-6 mb-6"
        >
          <h3 className="text-xl font-semibold text-white/90 mb-4">Top Clicked Elements</h3>
          {topClicks.length > 0 ? (
            <div className="space-y-3">
              {topClicks.map(([elementId, count], index) => (
                <div key={elementId} className="flex items-center gap-3">
                  <span className="text-sm text-white/40 w-8">#{index + 1}</span>
                  <div className="flex-1 bg-white/5 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/80 font-mono">#{elementId}</span>
                      <span className="text-sm text-secondary-default font-bold">{count} clicks</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/40 text-sm">No click data available yet</p>
          )}
        </motion.div>

        {/* Section Engagement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-6 mb-6"
        >
          <h3 className="text-xl font-semibold text-white/90 mb-4">Section Engagement</h3>
          {topSections.length > 0 ? (
            <div className="space-y-3">
              {topSections.map((section: any, index) => (
                <div key={section.sectionId} className="flex items-center gap-3">
                  <span className="text-sm text-white/40 w-8">#{index + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white/80 capitalize">{section.sectionId}</span>
                      <span className="text-sm text-secondary-default font-bold">
                        {(section.viewTime / 1000).toFixed(1)}s
                      </span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-secondary-default to-blue-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min((section.viewTime / (topSections[0]?.viewTime || 1)) * 100, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/40 text-sm">No section engagement data available yet</p>
          )}
        </motion.div>

        {/* Scroll Depth by Page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-6 mb-6"
        >
          <h3 className="text-xl font-semibold text-white/90 mb-4">Scroll Depth by Page</h3>
          {Object.keys(scrollDepth).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(scrollDepth)
                .sort(([, a], [, b]) => b - a)
                .map(([page, depth]) => (
                  <div key={page} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white/80">{page || '/'}</span>
                        <span className="text-sm text-secondary-default font-bold">{depth}%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                          style={{ width: `${depth}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-white/40 text-sm">No scroll depth data available yet</p>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-default to-blue-500 text-primary rounded-lg hover:opacity-90 transition-opacity"
          >
            <FiDownload />
            Export Data
          </button>

          <button
            onClick={loadHeatmapData}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-secondary-default/20 text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <FiActivity />
            Refresh Data
          </button>

          <button
            onClick={handleClearData}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
          >
            <FiTrash2 />
            Clear Data
          </button>
        </motion.div>

        {/* Console Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-white/40">
            💡 Tip: Open browser console and run <code className="text-secondary-default">getHeatmapStats()</code> for detailed analytics
          </p>
        </motion.div>
      </div>
    </section>
  );
}
