import SkillsHeatMap from "@/components/SkillsHeatMap";
import SocialPreviewGenerator from "@/components/SocialPreviewGenerator";

export const metadata = {
  title: "Skills Heat Map",
  description: "Interactive visual representation of technical skills with proficiency levels, years of experience, and expertise areas. Color-coded heat map showing expertise in .NET, React, Cloud (Azure/AWS), and more.",
  keywords: [
    "Skills Heat Map",
    "Technical Skills",
    "Proficiency Levels",
    "Years of Experience",
    ".NET Expert",
    "React Developer",
    "Cloud Architecture",
    "Programming Languages",
    "Frameworks",
    "Skill Visualization"
  ],
};

export default function SkillsHeatMapPage() {
  return (
    <>
      <SocialPreviewGenerator
        title="Skills Heat Map - Biswajit Panday"
        description="Interactive visual representation of technical skills, proficiency levels, and years of experience across various technologies."
        url="https://biswajitpanday.github.io/skills-heatmap"
        type="website"
      />
      <SkillsHeatMap />
    </>
  );
}
