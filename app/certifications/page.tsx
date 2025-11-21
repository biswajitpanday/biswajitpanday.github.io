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
import SectionHeader from "@/components/SectionHeader";
import BackgroundElements from "@/components/BackgroundElements";
import { FiAward, FiBriefcase, FiBook, FiSlack } from "react-icons/fi";
import { FaMicrosoft, FaCloudversify, FaCertificate } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCards, { StatCard } from "@/components/StatsCards";
import UnifiedToolbar from "@/components/UnifiedToolbar";
import FeaturedCertificationCard from "@/components/FeaturedCertificationCard";
import UpcomingCertificationsSection from "@/components/UpcomingCertificationsSection";
import CertificationTimeline from "@/components/CertificationTimeline";
import { PERFORMANCE_VARIANTS } from "@/constants";
import Badge from "@/components/Badge";

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

  // Define initial display limit (show important certifications first)
  const INITIAL_DISPLAY_COUNT = 12;
  
  // Stats data
  const statsData: StatCard[] = [
    {
      icon: FiAward,
      value: certCounts.total - certCounts.upcoming,
      label: "Total Credentials",
      gradient: "from-secondary-default/10 to-blue-500/10"
    },
    {
      icon: FiBriefcase,
      value: certCounts.professional - (professionalCerts.filter(cert => cert.isUpcoming).length),
      label: "Professional",
      gradient: "from-blue-500/10 to-secondary-default/10"
    },
    {
      icon: FiBook,
      value: certCounts.course,
      label: "Courses",
      gradient: "from-purple-500/10 to-secondary-default/10"
    }
  ];
  
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
    // Sort by date (most recent first) and return the first N certifications
    const sortedByDate = [...certs].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    // Prioritize Professional certifications and recent courses
    const professional = sortedByDate.filter(cert => cert.category === "Professional");
    const courses = sortedByDate.filter(cert => cert.category === "Course");

    // Combine: all professional + top courses to reach INITIAL_DISPLAY_COUNT
    const important = [...professional];
    const remainingSlots = INITIAL_DISPLAY_COUNT - professional.length;

    if (remainingSlots > 0) {
      important.push(...courses.slice(0, remainingSlots));
    }

    return important;
  };

  // Get the final displayed certifications based on active tab
  const getDisplayedCertifications = () => {
    let baseCertifications: Certification[] = [];

    if (activeTab === "all") {
      baseCertifications = certifications.filter(cert => !cert.isUpcoming);
    } else {
      baseCertifications = filteredByCategory;
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
        {/* Section Header with Stats */}
        <SectionHeader
          title="Professional"
          highlightText="Certifications"
          description={
            <>
              <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Industry credentials showcasing{" "}
              </span>
              <span className="text-lg font-bold bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                {certCounts.total - certCounts.upcoming}
              </span>
              <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                {" "}verified credentials and continuous learning
              </span>
            </>
          }
        >
          <StatsCards stats={statsData} />
        </SectionHeader>

        {/* Certification Highlight Badges */}
        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 mb-12 -mt-2"
        >
          <Badge
            icon={<FaMicrosoft className="text-xs" />}
            text="Microsoft Certified"
            color="default"
          />
          <Badge
            icon={<FaCloudversify className="text-xs" />}
            text="Cloud Expertise"
            color="blue"
          />
          <Badge
            icon={<FaCertificate className="text-xs" />}
            text="Industry Recognized"
            color="purple"
          />
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
          <UnifiedToolbar className="mb-0">
            <TabsList className="bg-transparent p-0 gap-2">
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
                    />
                  ))}
                </motion.div>

                {/* Show More/Less Button */}
                {shouldShowMoreButton && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setShowAllCertifications(!showAllCertifications)}
                      className="px-6 py-3 bg-secondary-default/10 hover:bg-secondary-default/20 border border-secondary-default/30 text-secondary-default rounded-lg transition-all duration-300 hover:scale-105 font-medium"
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
                    />
                  ))}
                </motion.div>

                {/* Show More/Less Button */}
                {shouldShowMoreButton && activeTab === "professional" && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setShowAllCertifications(!showAllCertifications)}
                      className="px-6 py-3 bg-secondary-default/10 hover:bg-secondary-default/20 border border-secondary-default/30 text-secondary-default rounded-lg transition-all duration-300 hover:scale-105 font-medium"
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
                    />
                  ))}
                </motion.div>

                {/* Show More/Less Button */}
                {shouldShowMoreButton && activeTab === "courses" && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setShowAllCertifications(!showAllCertifications)}
                      className="px-6 py-3 bg-secondary-default/10 hover:bg-secondary-default/20 border border-secondary-default/30 text-secondary-default rounded-lg transition-all duration-300 hover:scale-105 font-medium"
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
                    />
                  ))}
                </motion.div>

                {/* Show More/Less Button */}
                {shouldShowMoreButton && activeTab === "training" && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setShowAllCertifications(!showAllCertifications)}
                      className="px-6 py-3 bg-secondary-default/10 hover:bg-secondary-default/20 border border-secondary-default/30 text-secondary-default rounded-lg transition-all duration-300 hover:scale-105 font-medium"
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