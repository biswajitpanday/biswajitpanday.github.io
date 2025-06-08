import React from "react";
import { motion } from "framer-motion";
import { getFeaturedCertifications } from "@/data/certificationsData";
import SectionHeader from "./SectionHeader";
import CertificationCard from "./CertificationCard";
import { Button } from "./ui/button";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const FeaturedCertifications: React.FC = () => {
  const featuredCerts = getFeaturedCertifications().slice(0, 3); // Display up to 3 featured certifications
  
  if (featuredCerts.length === 0) return null;
  
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Professional"
          highlightText="Certifications"
          description="Industry credentials and validated expertise"
          className="mb-12 text-center"
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {featuredCerts.map((certification, index) => (
            <CertificationCard
              key={certification.id}
              certification={certification}
              index={index}
            />
          ))}
        </motion.div>
        
        <div className="flex justify-center">
          <Link href="/certifications">
            <Button variant="outline" className="group">
              View All Certifications 
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCertifications; 