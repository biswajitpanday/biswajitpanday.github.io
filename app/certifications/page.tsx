"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  certifications,
  getMostRecentCertification,
  getProfessionalCertifications,
  getCourseCertifications,
  getTrainingCertifications,
  getUpcomingCertifications,
  getCertificationCounts,
  Certification
} from "@/data/certificationsData";
import CertificationCard from "@/components/CertificationCard";
import BackgroundElements from "@/components/BackgroundElements";
import { FiAward, FiBriefcase, FiBook, FiSlack, FiCheckCircle, FiShield } from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnifiedToolbar from "@/components/UnifiedToolbar";
import FeaturedCertificationCard from "@/components/FeaturedCertificationCard";
import UpcomingCertificationsSection from "@/components/UpcomingCertificationsSection";
import CertificationTimeline from "@/components/CertificationTimeline";
import { PERFORMANCE_VARIANTS } from "@/constants";
import { useCountUp } from "@/hooks/useCountUp";

const Certifications = () => {
  const featuredCertification = getMostRecentCertification();
  const professionalCerts = getProfessionalCertifications();
  const courseCerts = getCourseCertifications();
  const trainingCerts = getTrainingCertifications();
  const upcomingCerts = getUpcomingCertifications();
  const certCounts = getCertificationCounts();

  // State for certifications display
  const [filteredByCategory, setFilteredByCategory] = useState<Certification[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "professional" | "courses" | "training">("all");
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Advanced filter states
  const [selectedIssuer, setSelectedIssuer] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Define initial display limit (show important certifications first)
  const INITIAL_DISPLAY_COUNT = 12;

  // Get unique issuers and years for filters
  const uniqueIssuers = Array.from(new Set(certifications.map(cert => cert.issuer))).sort();
  const uniqueYears = Array.from(
    new Set(certifications.map(cert => new Date(cert.date).getFullYear()))
  ).sort((a, b) => b - a);

  // Calculate stat values
  const totalCreds = certCounts.total - certCounts.upcoming;
  const professionalCount = certCounts.professional - (professionalCerts.filter(cert => cert.isUpcoming).length);
  const courseCount = certCounts.course;

  // Calculate Active and Verified counts
  const activeCerts = certifications.filter(cert => !cert.isUpcoming && cert.status === "Active");
  const verifiedCerts = certifications.filter(cert => !cert.isUpcoming && cert.onlineVerifiable);
  const activeCount = activeCerts.length;
  const verifiedCount = verifiedCerts.length;

  // Animated counters for stats
  const totalCredsCount = useCountUp({ end: totalCreds, duration: 2000 });
  const professionalCountUp = useCountUp({ end: professionalCount, duration: 1900 });
  const courseCountUp = useCountUp({ end: courseCount, duration: 1800 });
  const activeCountUp = useCountUp({ end: activeCount, duration: 1700 });
  const verifiedCountUp = useCountUp({ end: verifiedCount, duration: 1600 });
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as "all" | "professional" | "courses" | "training");
    
    // Update filtered results based on category
    let filtered: Certification[] = [];
    switch (value) {
      case "professional":
        filtered = professionalCerts.filter(cert => !cert.isUpcoming);
        break;
      case "courses":
        filtered = courseCerts;
        break;
      case "training":
        filtered = trainingCerts;
        break;
      default:
        filtered = certifications.filter(cert => !cert.isUpcoming);
        break;
    }
    
    setFilteredByCategory(filtered);
  };
  
  // Get important certifications for initial display
  const getImportantCertifications = (certs: Certification[]): Certification[] => {
    // Sort by priority: Featured + Professional > Professional > Other categories by date
    const sortedCerts = [...certs].sort((a, b) => {
      // Priority 1: Featured + Professional (highest priority)
      const aIsFeaturedProfessional = a.featured && a.category === "Professional";
      const bIsFeaturedProfessional = b.featured && b.category === "Professional";

      if (aIsFeaturedProfessional && !bIsFeaturedProfessional) return -1;
      if (!aIsFeaturedProfessional && bIsFeaturedProfessional) return 1;

      // Priority 2: Professional (second priority)
      const aIsProfessional = a.category === "Professional";
      const bIsProfessional = b.category === "Professional";

      if (aIsProfessional && !bIsProfessional) return -1;
      if (!aIsProfessional && bIsProfessional) return 1;

      // Priority 3: Sort by date (most recent first)
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    // Get featured + professional first, then fill with others
    const featuredProfessional = sortedCerts.filter(cert => cert.featured && cert.category === "Professional");
    const professional = sortedCerts.filter(cert => !cert.featured && cert.category === "Professional");
    const others = sortedCerts.filter(cert => cert.category !== "Professional");

    // Combine: featured+professional + professional + others to reach INITIAL_DISPLAY_COUNT
    const important = [...featuredProfessional, ...professional];
    const remainingSlots = INITIAL_DISPLAY_COUNT - important.length;

    if (remainingSlots > 0) {
      important.push(...others.slice(0, remainingSlots));
    }

    return important;
  };

  // Get the final displayed certifications based on active tab, search, and advanced filters
  const getDisplayedCertifications = () => {
    let baseCertifications: Certification[] = [];

    if (activeTab === "all") {
      baseCertifications = certifications.filter(cert => !cert.isUpcoming);
    } else {
      baseCertifications = filteredByCategory;
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      baseCertifications = baseCertifications.filter(cert =>
        cert.name.toLowerCase().includes(query) ||
        cert.issuer.toLowerCase().includes(query) ||
        cert.description?.toLowerCase().includes(query) ||
        cert.skills?.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Apply advanced filters
    if (selectedIssuer !== "all") {
      baseCertifications = baseCertifications.filter(cert => cert.issuer === selectedIssuer);
    }

    if (selectedYear !== "all") {
      baseCertifications = baseCertifications.filter(cert =>
        new Date(cert.date).getFullYear() === parseInt(selectedYear)
      );
    }

    if (selectedStatus !== "all") {
      baseCertifications = baseCertifications.filter(cert => {
        if (selectedStatus === "Active") return cert.status === "Active";
        if (selectedStatus === "Expired") return cert.status === "Expired";
        if (selectedStatus === "Verified") return cert.onlineVerifiable === true;
        return true;
      });
    }

    if (!showAllCertifications) {
      const importantCerts = getImportantCertifications(baseCertifications);
      return baseCertifications.filter(cert =>
        importantCerts.some(ic => ic.id === cert.id)
      );
    }

    return baseCertifications;
  };

  const displayedCertifications = getDisplayedCertifications();

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedIssuer("all");
    setSelectedYear("all");
    setSelectedStatus("all");
  };

  // Check if any filters are active
  const hasActiveFilters = searchQuery !== "" || selectedIssuer !== "all" || selectedYear !== "all" || selectedStatus !== "all";

  // Check if "Show More" button should be displayed
  const allCerts = certifications.filter(cert => !cert.isUpcoming);
  const shouldShowMoreButton = (
    (activeTab === "all" && allCerts.length > INITIAL_DISPLAY_COUNT) ||
    (activeTab === "professional" && professionalCerts.filter(cert => !cert.isUpcoming).length > INITIAL_DISPLAY_COUNT) ||
    (activeTab === "courses" && courseCerts.length > INITIAL_DISPLAY_COUNT) ||
    (activeTab === "training" && trainingCerts.length > INITIAL_DISPLAY_COUNT)
  );
  
  return (
    <section className="min-h-[calc(100vh-136px)] flex flex-col relative overflow-hidden py-8">
      {/* Enhanced Background Elements */}
      <BackgroundElements />
      
      {/* Floating gradient orbs - less intense for better performance */}
      <div className="absolute top-40 left-20 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-20 w-80 h-80 bg-secondary-default/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Certifications Header - Left Aligned like Project/Career Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex-1 mb-4">
            <h1 className="text-3xl xl:text-4xl font-bold mb-2 leading-tight bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">
              Professional Certifications
            </h1>
            <p className="text-sm font-medium leading-relaxed">
              <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Industry credentials showcasing{" "}
              </span>
              <span className="text-lg font-bold bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                {totalCreds}
              </span>
              <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                {" "}verified credentials and continuous learning
              </span>
            </p>
          </div>
        </motion.div>

        {/* Certifications Stats - Match Project Page Design */}
        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-secondary-default/20 rounded-lg p-4">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {/* Total Credentials */}
              <div ref={totalCredsCount.ref} className="flex items-center gap-3">
                <div className="p-2 bg-[#00BFFF]/20 rounded-lg">
                  <FiAward className="text-[#00BFFF] text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#0080FF] tabular-nums">
                    {totalCredsCount.count}
                  </div>
                  <div className="text-xs text-white/60">Total Credentials</div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-white/10"></div>

              {/* Professional Certifications */}
              <div ref={professionalCountUp.ref} className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <FiBriefcase className="text-emerald-400 text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 tabular-nums">
                    {professionalCountUp.count}
                  </div>
                  <div className="text-xs text-white/60">Professional</div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-white/10"></div>

              {/* Courses */}
              <div ref={courseCountUp.ref} className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <FiBook className="text-purple-400 text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tabular-nums">
                    {courseCountUp.count}
                  </div>
                  <div className="text-xs text-white/60">Courses</div>
                </div>
              </div>

              <div className="hidden lg:block w-px h-10 bg-white/10"></div>

              {/* Active Certifications */}
              <div ref={activeCountUp.ref} className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <FiCheckCircle className="text-green-400 text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 tabular-nums">
                    {activeCountUp.count}
                  </div>
                  <div className="text-xs text-white/60">Active</div>
                </div>
              </div>

              <div className="hidden lg:block w-px h-10 bg-white/10"></div>

              {/* Verified Certifications */}
              <div ref={verifiedCountUp.ref} className="flex items-center gap-3">
                <div className="p-2 bg-[#00BFFF]/20 rounded-lg">
                  <FiShield className="text-[#00BFFF] text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#0080FF] tabular-nums">
                    {verifiedCountUp.count}
                  </div>
                  <div className="text-xs text-white/60">Verified</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Certification Banner */}
        {featuredCertification && (
          <div className="mb-12 mt-8">
            <FeaturedCertificationCard 
              certification={featuredCertification}
              simplified={false}
            />
          </div>
        )}

        {/* Certification Journey Timeline */}
        <div className="mb-12">
          <CertificationTimeline 
            certifications={certifications}
          />
        </div>

        {/* Upcoming Certifications Section */}
        <UpcomingCertificationsSection certifications={upcomingCerts} show={false} />

        {/* Certifications Tabs - Wrapped in UnifiedToolbar */}
        <Tabs defaultValue="all" className="mt-8" onValueChange={handleTabChange}>
          {/* Search and Filters Row */}
          <UnifiedToolbar
            className="mb-0"
            showSearch={true}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search certifications, issuers, or skills..."
          >
            {/* Advanced Filters and Tabs in one row */}
            <div className="flex flex-wrap items-center gap-2 w-full">
              {/* Issuer Filter */}
              <select
                value={selectedIssuer}
                onChange={(e) => setSelectedIssuer(e.target.value)}
                className="h-9 bg-gradient-to-br from-[#27272c] to-[#2a2a30] border border-secondary-default/30 rounded-lg px-3 pr-8 text-xs text-white focus:outline-none focus:ring-2 focus:ring-secondary-default/50 focus:border-secondary-default/60 transition-all duration-300 cursor-pointer"
              >
                <option value="all" className="bg-[#1a1a1f]">All Issuers</option>
                {uniqueIssuers.map(issuer => (
                  <option key={issuer} value={issuer} className="bg-[#1a1a1f]">{issuer}</option>
                ))}
              </select>

              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="h-9 bg-gradient-to-br from-[#27272c] to-[#2a2a30] border border-secondary-default/30 rounded-lg px-3 pr-8 text-xs text-white focus:outline-none focus:ring-2 focus:ring-secondary-default/50 focus:border-secondary-default/60 transition-all duration-300 cursor-pointer"
              >
                <option value="all" className="bg-[#1a1a1f]">All Years</option>
                {uniqueYears.map(year => (
                  <option key={year} value={year.toString()} className="bg-[#1a1a1f]">{year}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-9 bg-gradient-to-br from-[#27272c] to-[#2a2a30] border border-secondary-default/30 rounded-lg px-3 pr-8 text-xs text-white focus:outline-none focus:ring-2 focus:ring-secondary-default/50 focus:border-secondary-default/60 transition-all duration-300 cursor-pointer"
              >
                <option value="all" className="bg-[#1a1a1f]">All Status</option>
                <option value="Active" className="bg-[#1a1a1f]">Active</option>
                <option value="Expired" className="bg-[#1a1a1f]">Expired</option>
                <option value="Verified" className="bg-[#1a1a1f]">Verified</option>
              </select>

              {/* Reset Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="h-9 px-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-xs font-medium transition-all duration-300 hover:border-red-500/50"
                >
                  Reset
                </button>
              )}

              {/* Separator */}
              <div className="hidden lg:block w-px h-8 bg-white/10 mx-2"></div>

              {/* Category Tabs */}
              <TabsList className="bg-transparent p-0 gap-2 flex-1">
              <TabsTrigger
                value="all"
                className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary-default data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:bg-white/5 data-[state=inactive]:text-white/60 data-[state=inactive]:hover:bg-white/10 data-[state=inactive]:hover:text-white data-[state=inactive]:border data-[state=inactive]:border-white/10"
              >
                All ({certifications.length - upcomingCerts.length})
              </TabsTrigger>
              <TabsTrigger
                value="professional"
                className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary-default data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:bg-white/5 data-[state=inactive]:text-white/60 data-[state=inactive]:hover:bg-white/10 data-[state=inactive]:hover:text-white data-[state=inactive]:border data-[state=inactive]:border-white/10"
              >
                Professional ({professionalCerts.filter(cert => !cert.isUpcoming).length})
              </TabsTrigger>
              <TabsTrigger
                value="courses"
                className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary-default data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:bg-white/5 data-[state=inactive]:text-white/60 data-[state=inactive]:hover:bg-white/10 data-[state=inactive]:hover:text-white data-[state=inactive]:border data-[state=inactive]:border-white/10"
              >
                Courses ({courseCerts.length})
              </TabsTrigger>
              {trainingCerts.length > 0 && (
                <TabsTrigger
                  value="training"
                  className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary-default data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:bg-white/5 data-[state=inactive]:text-white/60 data-[state=inactive]:hover:bg-white/10 data-[state=inactive]:hover:text-white data-[state=inactive]:border data-[state=inactive]:border-white/10"
                >
                  Training ({trainingCerts.length})
                </TabsTrigger>
              )}
              </TabsList>
            </div>
          </UnifiedToolbar>

          {/* All Certifications */}
          <TabsContent value="all" className="mt-0">
            {displayedCertifications.length > 0 ? (
              <>
                <motion.div
                  variants={PERFORMANCE_VARIANTS.containerSync}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {displayedCertifications.map((certification) => (
                    <CertificationCard
                      key={certification.id}
                      certification={certification}
                      featured={certification.featured || certification.category === "Professional"}
                    />
                  ))}
                </motion.div>

                {/* Show More/Less Button */}
                {shouldShowMoreButton && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setShowAllCertifications(!showAllCertifications)}
                      className="px-4 py-2.5 bg-secondary-default/10 hover:bg-secondary-default/20 border border-secondary-default/30 text-secondary-default rounded-lg transition-all duration-300 font-medium"
                    >
                      {showAllCertifications ? (
                        <>Show Less Certifications</>
                      ) : (
                        <>Show All {allCerts.length} Certifications</>
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white/5 rounded-lg">
                <FiAward className="text-4xl text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Certifications Found</h3>
                <p className="text-white/60 max-w-md mx-auto">
                  Try adjusting your search criteria or filters to see more results.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Professional Certifications */}
          <TabsContent value="professional" className="mt-0">
            {displayedCertifications.length > 0 ? (
              <>
                <motion.div
                  variants={PERFORMANCE_VARIANTS.containerSync}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {displayedCertifications.map((certification) => (
                    <CertificationCard
                      key={certification.id}
                      certification={certification}
                      featured={certification.featured || certification.category === "Professional"}
                    />
                  ))}
                </motion.div>

                {/* Show More/Less Button */}
                {shouldShowMoreButton && activeTab === "professional" && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setShowAllCertifications(!showAllCertifications)}
                      className="px-4 py-2.5 bg-secondary-default/10 hover:bg-secondary-default/20 border border-secondary-default/30 text-secondary-default rounded-lg transition-all duration-300 font-medium"
                    >
                      {showAllCertifications ? (
                        <>Show Less Certifications</>
                      ) : (
                        <>Show All {professionalCerts.filter(cert => !cert.isUpcoming).length} Certifications</>
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white/5 rounded-lg">
                <FiAward className="text-4xl text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Professional Certifications</h3>
                <p className="text-white/60 max-w-md mx-auto">
                  Try adjusting your search criteria or check back later as new certifications are added.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Course Certifications */}
          <TabsContent value="courses" className="mt-0">
            {displayedCertifications.length > 0 ? (
              <>
                <motion.div
                  variants={PERFORMANCE_VARIANTS.containerSync}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {displayedCertifications.map((certification) => (
                    <CertificationCard
                      key={certification.id}
                      certification={certification}
                      featured={certification.featured || certification.category === "Professional"}
                    />
                  ))}
                </motion.div>

                {/* Show More/Less Button */}
                {shouldShowMoreButton && activeTab === "courses" && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setShowAllCertifications(!showAllCertifications)}
                      className="px-4 py-2.5 bg-secondary-default/10 hover:bg-secondary-default/20 border border-secondary-default/30 text-secondary-default rounded-lg transition-all duration-300 font-medium"
                    >
                      {showAllCertifications ? (
                        <>Show Less Certifications</>
                      ) : (
                        <>Show All {courseCerts.length} Certifications</>
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white/5 rounded-lg">
                <FiBook className="text-4xl text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Course Certifications</h3>
                <p className="text-white/60 max-w-md mx-auto">
                  Try adjusting your search criteria or check back later as new courses are completed.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Training Certifications */}
          <TabsContent value="training" className="mt-0">
            {displayedCertifications.length > 0 ? (
              <>
                <motion.div
                  variants={PERFORMANCE_VARIANTS.containerSync}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {displayedCertifications.map((certification) => (
                    <CertificationCard
                      key={certification.id}
                      certification={certification}
                      featured={certification.featured || certification.category === "Professional"}
                    />
                  ))}
                </motion.div>

                {/* Show More/Less Button */}
                {shouldShowMoreButton && activeTab === "training" && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setShowAllCertifications(!showAllCertifications)}
                      className="px-4 py-2.5 bg-secondary-default/10 hover:bg-secondary-default/20 border border-secondary-default/30 text-secondary-default rounded-lg transition-all duration-300 font-medium"
                    >
                      {showAllCertifications ? (
                        <>Show Less Certifications</>
                      ) : (
                        <>Show All {trainingCerts.length} Certifications</>
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white/5 rounded-lg">
                <FiSlack className="text-4xl text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Training Certifications</h3>
                <p className="text-white/60 max-w-md mx-auto">
                  Try adjusting your search criteria or check back later as new training programs are completed.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Certifications;