"use client";

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// Activity data interface
interface Activity {
  date: string; // YYYY-MM-DD format
  count: number; // Number of activities
  type: 'project' | 'certification' | 'skill' | 'commit' | 'other';
  details?: string[];
}

// Sample activity data - in real app, this would come from actual data
const generateSampleActivities = (): Activity[] => {
  const activities: Activity[] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 365); // Last 365 days

  // Add some sample activities
  for (let i = 0; i < 365; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);

    // Random activity generation (you would replace this with real data)
    const random = Math.random();
    if (random > 0.7) {
      activities.push({
        date: currentDate.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 10) + 1,
        type: ['project', 'certification', 'skill', 'commit'][Math.floor(Math.random() * 4)] as any,
        details: [`Activity on ${currentDate.toDateString()}`]
      });
    }
  }

  return activities;
};

export default function GitHubActivityGraph() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null);

  const activities = useMemo(() => generateSampleActivities(), []);

  // Create activity map for quick lookup
  const activityMap = useMemo(() => {
    const map: Record<string, Activity> = {};
    activities.forEach(activity => {
      map[activity.date] = activity;
    });
    return map;
  }, [activities]);

  // Generate grid data (last 52 weeks, 7 days each)
  const generateGridData = () => {
    const weeks: Date[][] = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364); // Last 52 weeks

    // Adjust to start on Sunday
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    for (let week = 0; week < 53; week++) {
      const weekDays: Date[] = [];
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + (week * 7) + day);
        if (currentDate <= today) {
          weekDays.push(currentDate);
        }
      }
      if (weekDays.length > 0) {
        weeks.push(weekDays);
      }
    }

    return weeks;
  };

  const gridData = useMemo(() => generateGridData(), []);

  // Get color intensity based on activity count
  const getIntensityColor = (count: number): string => {
    if (count === 0) return 'bg-white/5 border-white/10';
    if (count <= 2) return 'bg-emerald-500/30 border-emerald-400/50';
    if (count <= 5) return 'bg-emerald-500/60 border-emerald-400/70';
    if (count <= 8) return 'bg-emerald-500/80 border-emerald-400/90';
    return 'bg-emerald-500 border-emerald-400';
  };

  // Month labels
  const getMonthLabel = (weekIndex: number): string | null => {
    if (gridData[weekIndex] && gridData[weekIndex][0]) {
      const date = gridData[weekIndex][0];
      const isFirstWeekOfMonth = date.getDate() <= 7;
      if (isFirstWeekOfMonth || weekIndex === 0) {
        return date.toLocaleDateString('en-US', { month: 'short' });
      }
    }
    return null;
  };

  // Stats
  const totalActivities = activities.reduce((sum, a) => sum + a.count, 0);
  const activeDays = activities.length;
  const currentStreak = useMemo(() => {
    let streak = 0;
    const today = new Date();

    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      if (activityMap[dateStr]) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }, [activityMap]);

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
            Activity Graph
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            A visual representation of portfolio development activity over the past year.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">{totalActivities}</div>
            <div className="text-sm text-white/60">Total Contributions</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{activeDays}</div>
            <div className="text-sm text-white/60">Active Days</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-secondary-default mb-2">{currentStreak}</div>
            <div className="text-sm text-white/60">Current Streak</div>
          </div>
        </motion.div>

        {/* Activity Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-6 overflow-x-auto"
        >
          <div className="min-w-[800px]">
            {/* Month labels */}
            <div className="flex gap-[3px] mb-2 ml-8">
              {gridData.map((week, weekIndex) => {
                const monthLabel = getMonthLabel(weekIndex);
                return (
                  <div key={weekIndex} className="w-3 text-xs text-white/50">
                    {monthLabel}
                  </div>
                );
              })}
            </div>

            {/* Day of week labels + Graph */}
            <div className="flex gap-1">
              {/* Day labels */}
              <div className="flex flex-col gap-[3px] text-xs text-white/50 mr-1">
                <div className="h-3">Sun</div>
                <div className="h-3">Mon</div>
                <div className="h-3">Tue</div>
                <div className="h-3">Wed</div>
                <div className="h-3">Thu</div>
                <div className="h-3">Fri</div>
                <div className="h-3">Sat</div>
              </div>

              {/* Grid */}
              <div className="flex gap-[3px]">
                {gridData.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px]">
                    {week.map((date, dayIndex) => {
                      const dateStr = date.toISOString().split('T')[0];
                      const activity = activityMap[dateStr];
                      const count = activity?.count || 0;
                      const colorClass = getIntensityColor(count);

                      return (
                        <motion.div
                          key={`${weekIndex}-${dayIndex}`}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.2, delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                          whileHover={{ scale: 1.2 }}
                          onMouseEnter={() => {
                            setHoveredCell({ x: weekIndex, y: dayIndex });
                            if (activity) setSelectedActivity(activity);
                          }}
                          onMouseLeave={() => {
                            setHoveredCell(null);
                            setSelectedActivity(null);
                          }}
                          className={`relative w-3 h-3 rounded-sm border cursor-pointer transition-all ${colorClass}`}
                          title={`${dateStr}: ${count} contributions`}
                        >
                          {/* Tooltip */}
                          {hoveredCell?.x === weekIndex && hoveredCell?.y === dayIndex && activity && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-primary border border-secondary-default/30 rounded-lg shadow-xl whitespace-nowrap text-xs"
                            >
                              <div className="font-semibold text-white">{count} contributions</div>
                              <div className="text-white/60">{date.toDateString()}</div>
                              <div className="text-secondary-default capitalize">{activity.type}</div>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-white/60">
              <span>Less</span>
              <div className="w-3 h-3 rounded-sm bg-white/5 border border-white/10" />
              <div className="w-3 h-3 rounded-sm bg-emerald-500/30 border border-emerald-400/50" />
              <div className="w-3 h-3 rounded-sm bg-emerald-500/60 border border-emerald-400/70" />
              <div className="w-3 h-3 rounded-sm bg-emerald-500/80 border border-emerald-400/90" />
              <div className="w-3 h-3 rounded-sm bg-emerald-500 border border-emerald-400" />
              <span>More</span>
            </div>
          </div>
        </motion.div>

        {/* Activity Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {activities.filter(a => a.type === 'project').length}
            </div>
            <div className="text-xs text-white/60">Projects</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {activities.filter(a => a.type === 'certification').length}
            </div>
            <div className="text-xs text-white/60">Certifications</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-amber-400 mb-1">
              {activities.filter(a => a.type === 'skill').length}
            </div>
            <div className="text-xs text-white/60">Skills Added</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400 mb-1">
              {activities.filter(a => a.type === 'commit').length}
            </div>
            <div className="text-xs text-white/60">Commits</div>
          </div>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-xs text-white/40">
            📊 Activity data represents portfolio development, projects, certifications, and skills updates over the past year
          </p>
        </motion.div>
      </div>
    </section>
  );
}
