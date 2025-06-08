"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  certifications, 
  getMostRecentCertification, 
  getProfessionalCertifications, 
  getCourseCertifications,
  getTrainingCertifications,
  getUpcomingCertifications,
  getCertificationCounts
} from "@/data/certificationsData";
import CertificationCard from "@/components/CertificationCard";
import SectionHeader from "@/components/SectionHeader";
import BackgroundElements from "@/components/BackgroundElements";
import { FiAward, FiChevronRight, FiCalendar, FiClock, FiBriefcase, FiBook, FiSlack } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import StatsCards, { StatCard } from "@/components/StatsCards";

const Certifications = () => {
  const featuredCertification = getMostRecentCertification();
  const professionalCerts = getProfessionalCertifications();
  const courseCerts = getCourseCertifications();
  const trainingCerts = getTrainingCertifications();
  const upcomingCerts = getUpcomingCertifications();
  const certCounts = getCertificationCounts();
  
  // Stats data
  const statsData: StatCard[] = [
    {
      icon: FiAward,
      value: certCounts.total,
      label: "Total Credentials",
      gradient: "from-secondary-default/10 to-blue-500/10"
    },
    {
      icon: FiBriefcase,
      value: certCounts.professional,
      label: "Professional",
      gradient: "from-blue-500/10 to-secondary-default/10"
    },
    {
      icon: FiBook,
      value: certCounts.course,
      label: "Courses",
      gradient: "from-purple-500/10 to-secondary-default/10"
    },
    {
      icon: FiSlack,
      value: certCounts.training,
      label: "Training",
      gradient: "from-green-500/10 to-secondary-default/10"
    }
  ];
  

  
  return (
    <section className="min-h-[calc(100vh-136px)] flex flex-col relative overflow-hidden py-8">
      {/* Background Elements */}
      <BackgroundElements />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Stats */}
        <SectionHeader
          title="Professional"
          highlightText="Certifications"
          description="Industry credentials and course completions demonstrating expertise and commitment to continuous learning"
        >
          <StatsCards stats={statsData} />
        </SectionHeader>

        {/* Featured Certification Banner */}
        {featuredCertification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gradient-to-r from-secondary-default/20 to-blue-500/20 backdrop-blur-sm border border-secondary-default/30 rounded-xl p-6 mb-12 mt-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-2/5 flex justify-center">
                {featuredCertification.image ? (
                  <div className="relative w-full h-[220px] bg-white/5 rounded-lg overflow-hidden">
                    <Image
                      src={featuredCertification.image}
                      alt={featuredCertification.name}
                      fill
                      className="object-contain p-2"
                    />
                    
                    {/* Issuer Logo */}
                    {featuredCertification.issuerLogo && (
                      <div className="absolute bottom-3 right-3 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full overflow-hidden flex items-center justify-center">
                        <Image
                          src={featuredCertification.issuerLogo}
                          alt={featuredCertification.issuer}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-[280px] h-[220px] bg-white/5 rounded-lg flex items-center justify-center">
                    <FiAward className="text-6xl text-secondary-default" />
                  </div>
                )}
              </div>
              <div className="md:w-3/5">
                <Badge variant="secondary" className="mb-3">Featured Certification</Badge>
                <h2 className="text-2xl font-bold mb-2">{featuredCertification.name}</h2>
                <div className="flex items-center text-secondary-default mb-3">
                  <FiAward className="mr-2" />
                  <span>{featuredCertification.issuer}</span>
                  <span className="mx-2 text-white/30">•</span>
                  <div className="flex items-center text-white/70">
                    <FiCalendar className="mr-1.5" />
                    <span>{new Date(featuredCertification.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                  </div>
                </div>
                <p className="text-white/80 mb-4">{featuredCertification.description}</p>
                
                {featuredCertification.skills && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredCertification.skills.slice(0, 5).map((skill, i) => (
                      <Badge key={i} variant="outline" className="bg-white/10">
                        {skill}
                      </Badge>
                    ))}
                    {featuredCertification.skills.length > 5 && (
                      <Badge variant="outline" className="bg-white/5">
                        +{featuredCertification.skills.length - 5} more
                      </Badge>
                    )}
                  </div>
                )}
                
                {featuredCertification.link && (
                  <Link href={featuredCertification.link} target="_blank" rel="noopener noreferrer" 
                    className="inline-flex items-center bg-white/10 hover:bg-white/20 text-secondary-default hover:text-secondary-default/80 px-4 py-2 rounded-md font-medium transition-all">
                    View Credential <FiChevronRight className="ml-1" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Upcoming Certifications Section */}
        {upcomingCerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center mb-4">
              <FiClock className="text-secondary-default mr-2" />
              <h3 className="text-xl font-bold">Upcoming Certifications</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingCerts.map((certification, index) => (
                <CertificationCard
                  key={certification.id}
                  certification={certification}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Certifications Tabs */}
        <Tabs defaultValue="all" className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-white/5 p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-secondary-default data-[state=active]:text-primary">
                All ({certifications.length - upcomingCerts.length})
              </TabsTrigger>
              <TabsTrigger value="professional" className="data-[state=active]:bg-secondary-default data-[state=active]:text-primary">
                Professional ({professionalCerts.filter(cert => !cert.isUpcoming).length})
              </TabsTrigger>
              <TabsTrigger value="courses" className="data-[state=active]:bg-secondary-default data-[state=active]:text-primary">
                Courses ({courseCerts.length})
              </TabsTrigger>
              <TabsTrigger value="training" className="data-[state=active]:bg-secondary-default data-[state=active]:text-primary">
                Training ({trainingCerts.length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* All Certifications */}
          <TabsContent value="all" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {certifications
                .filter(cert => !cert.isUpcoming)
                .map((certification, index) => (
                  <CertificationCard
                    key={certification.id}
                    certification={certification}
                    index={index}
                  />
                ))}
            </motion.div>
          </TabsContent>

          {/* Professional Certifications */}
          <TabsContent value="professional" className="mt-0">
            {professionalCerts.filter(cert => !cert.isUpcoming).length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {professionalCerts
                  .filter(cert => !cert.isUpcoming)
                  .map((certification, index) => (
                    <CertificationCard
                      key={certification.id}
                      certification={certification}
                      index={index}
                    />
                  ))}
              </motion.div>
            ) : (
              <div className="text-center py-16 bg-white/5 rounded-lg">
                <FiAward className="text-4xl text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Professional Certifications</h3>
                <p className="text-white/60 max-w-md mx-auto">
                  Professional certifications will be added as they are completed.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Course Certifications */}
          <TabsContent value="courses" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {courseCerts.map((certification, index) => (
                <CertificationCard
                  key={certification.id}
                  certification={certification}
                  index={index}
                />
              ))}
            </motion.div>
          </TabsContent>

          {/* Training Certifications */}
          <TabsContent value="training" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {trainingCerts.map((certification, index) => (
                <CertificationCard
                  key={certification.id}
                  certification={certification}
                  index={index}
                />
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {certifications.length === 0 && (
          <div className="text-center py-20">
            <FiAward className="text-4xl text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No Certifications Found
            </h3>
            <p className="text-white/60">
              Certifications will be added soon. Check back later!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;