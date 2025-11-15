import GitHubActivityGraph from "@/components/GitHubActivityGraph";
import SocialPreviewGenerator from "@/components/SocialPreviewGenerator";

export const metadata = {
  title: "Activity Graph",
  description: "GitHub-style activity graph showing portfolio development, projects, certifications, and skill updates over the past year. Visual representation of continuous learning and contribution patterns.",
  keywords: [
    "Activity Graph",
    "Contribution Graph",
    "GitHub Activity",
    "Portfolio Activity",
    "Development Activity",
    "Project Timeline",
    "Contribution History",
    "Activity Visualization",
    "Developer Activity",
    "Coding Streak"
  ],
};

export default function ActivityPage() {
  return (
    <>
      <SocialPreviewGenerator
        title="Activity Graph - Biswajit Panday"
        description="Visual representation of portfolio development activity, projects, and learning journey over the past year."
        url="https://biswajitpanday.github.io/activity"
        type="website"
      />
      <GitHubActivityGraph />
    </>
  );
}
