import React from "react";
import { Button } from "@/components/ui/button";
import { FaDownload } from "react-icons/fa";
import Link from "next/link";

const AboutMe = () => {
  return (
    <section className="w-full md:w-[90%] lg:w-4/5 mx-auto pt-8 pb-16">
      <div className="w-full flex flex-col md:flex-row px-4 md:px-4 py-8 gap-6 md:gap-8">
        <div className="w-full md:w-2/3 lg:w-3/4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            A Bit <span className="text-primary">About Me</span>
          </h2>
          <div className="pb-3 text-base text-pretty font-normal tracking-wide text-gray-600">
            <p className="mb-3">
              I&apos;m Biswajit Panday, a dedicated Software Engineer with 7+ years
              of experience focused on Microsoft Ecosystem technologies and
              modern web development.
            </p>
            <p className="mb-3">
              Throughout my career, I&apos;ve had the privilege of working on a
              diverse range of projects, from complex enterprise applications to
              innovative startups. My expertise spans the entire software
              development lifecycle, with a particular focus on creating
              scalable, maintainable, and secure applications.
            </p>
            <p className="mb-3">
              I&apos;m passionate about solving real-world problems through elegant
              code and thoughtful design. I believe in continuous learning and
              staying ahead of industry trends to deliver the best possible
              solutions.
            </p>
            <p className="mb-3">
              When I&apos;m not coding, you&apos;ll find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with the
              developer community.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/about-me">
              <Button className="rounded-full bg-primary text-white px-8 py-6 hover:bg-primary/90">
                Read More
              </Button>
            </Link>
            <Link href="/resume.pdf" target="_blank">
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 border-primary text-primary hover:bg-primary hover:text-white"
              >
                <FaDownload className="mr-2" />
                Resume
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4 flex items-center justify-center">
          <picture className="rounded-full overflow-hidden shadow-lg">
            <source
              srcSet="/assets/profile/profile-large.webp"
              type="image/webp"
              media="(min-width: 1024px)"
            />
            <source
              srcSet="/assets/profile/profile-medium.webp"
              type="image/webp"
              media="(min-width: 768px)"
            />
            <source
              srcSet="/assets/profile/profile-small.webp"
              type="image/webp"
              media="(max-width: 767px)"
            />
            {/* Fallback for browsers that don't support WebP */}
            <source
              srcSet="/assets/profile/profile-large.png"
              media="(min-width: 1024px)"
            />
            <source
              srcSet="/assets/profile/profile-medium.png"
              media="(min-width: 768px)"
            />
            <source
              srcSet="/assets/profile/profile-small.png"
              media="(max-width: 767px)"
            />
            <img
              src="/assets/profile/profile-medium.png"
              alt="Biswajit Panday"
              className="rounded-full object-cover w-full h-auto"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default AboutMe; 