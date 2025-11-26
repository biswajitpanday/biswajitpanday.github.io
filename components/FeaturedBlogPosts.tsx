"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaPenNib } from "react-icons/fa";
import { getFeaturedPosts } from "@/data/blogData";
import BlogCard from "./BlogCard";

interface FeaturedBlogPostsProps {
  maxItems?: number;
  className?: string;
}

const FeaturedBlogPosts: React.FC<FeaturedBlogPostsProps> = ({
  maxItems = 3,
  className = ""
}) => {
  const featuredPosts = getFeaturedPosts(maxItems);

  if (featuredPosts.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`py-12 ${className}`}
    >
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center gap-2 mb-3">
          <div className="p-2 bg-secondary-default/20 rounded-lg">
            <FaPenNib className="text-secondary-default text-lg" />
          </div>
        </div>
        <h2 className="text-2xl xl:text-3xl font-bold mb-2 bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">
          Technical Insights
        </h2>
        <p className="text-sm text-white/60">
          Articles on AI, cloud architecture, and full-stack development
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} variant="default" />
        ))}
      </div>

      {/* Coming Soon Notice */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
          <span className="text-xs text-white/50">
            Full blog launching soon • Subscribe to get notified
          </span>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedBlogPosts;
