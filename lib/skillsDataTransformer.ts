/**
 * Skills Data Transformer
 * Converts API response to main branch SkillNode format
 */

interface SkillNode {
  name: string;
  metadata?: {
    icon: string;
    level?: "Expert" | "Advanced" | "Intermediate" | "Familiar";
    yearsOfExperience?: number;
    lastUsed?: string;
  };
  children?: SkillNode[];
}

interface ApiSkill {
  _id: string;
  name: string;
  level: "Expert" | "Advanced" | "Intermediate" | "Familiar";
  yearsOfExperience: number;
  lastUsed: string;
  icon: string;
  order: number;
}

interface ApiSubcategory {
  _id: string;
  name: string;
  icon: string;
  order: number;
  skills: ApiSkill[];
}

interface ApiCategory {
  _id: string;
  name: string;
  icon: string;
  order: number;
  skills?: ApiSkill[];
  children?: ApiSubcategory[];
}

/**
 * Transform a single API skill to SkillNode format
 */
function transformSkill(skill: ApiSkill): SkillNode {
  return {
    name: skill.name,
    metadata: {
      icon: skill.icon,
      level: skill.level,
      yearsOfExperience: skill.yearsOfExperience,
      lastUsed: skill.lastUsed,
    },
  };
}

/**
 * Transform a single API category to SkillNode format
 */
function transformCategory(category: ApiCategory): SkillNode {
  const node: SkillNode = {
    name: category.name,
    metadata: {
      icon: category.icon,
    },
  };

  // Handle direct skills
  if (category.skills && category.skills.length > 0) {
    node.children = category.skills.map(transformSkill);
  }

  // Handle subcategories (Azure/AWS)
  if (category.children && category.children.length > 0) {
    node.children = category.children.map((subcategory) => {
      // Create subcategory node with metadata AND children
      const subcategoryNode: SkillNode = {
        name: subcategory.name,
        metadata: {
          icon: subcategory.icon,
          // Note: API doesn't have level for subcategory parents
          // If needed, we can add it here based on child skills
        },
        children: subcategory.skills.map(transformSkill),
      };

      // Calculate parent level from children (optional - for Azure/AWS to have level)
      // This would make the count match the main branch (45 Advanced)
      // Uncomment if you want Azure/AWS to have level metadata
      /*
      const childLevels = subcategory.skills.map(s => s.level);
      if (childLevels.every(l => l === "Advanced" || l === "Expert")) {
        subcategoryNode.metadata!.level = "Advanced";
        subcategoryNode.metadata!.yearsOfExperience = Math.max(...subcategory.skills.map(s => s.yearsOfExperience));
        subcategoryNode.metadata!.lastUsed = "Current";
      }
      */

      return subcategoryNode;
    });
  }

  return node;
}

/**
 * Transform API categories to skills1 and skills2 format
 * Splits categories roughly in half for 2-column layout
 */
export function transformApiToSkillsData(apiCategories: ApiCategory[]): {
  skills1: SkillNode;
  skills2: SkillNode;
} {
  // Sort categories by order
  const sortedCategories = [...apiCategories].sort((a, b) => a.order - b.order);

  // Split categories in half for 2-column layout
  const midpoint = Math.ceil(sortedCategories.length / 2);
  const firstHalf = sortedCategories.slice(0, midpoint);
  const secondHalf = sortedCategories.slice(midpoint);

  return {
    skills1: {
      name: "Skills",
      children: firstHalf.map(transformCategory),
    },
    skills2: {
      name: "Skills",
      children: secondHalf.map(transformCategory),
    },
  };
}

/**
 * Helper function to count all technologies from skills data
 * (Matching main branch implementation)
 */
export const countAllTechnologies = (skills1: SkillNode, skills2: SkillNode) => {
  const countSkillsRecursively = (skillNode: SkillNode): number => {
    let count = 0;

    if (skillNode.children && skillNode.children.length > 0) {
      // If it has children, count them recursively
      skillNode.children.forEach((child: SkillNode) => {
        count += countSkillsRecursively(child);
      });
    } else {
      // If it's a leaf node (no children), count it as 1 technology
      count = 1;
    }

    return count;
  };

  // Count technologies from both skill trees
  const skills1Count = skills1.children?.reduce((total, category) => {
    return total + countSkillsRecursively(category);
  }, 0) || 0;

  const skills2Count = skills2.children?.reduce((total, category) => {
    return total + countSkillsRecursively(category);
  }, 0) || 0;

  return skills1Count + skills2Count;
};
