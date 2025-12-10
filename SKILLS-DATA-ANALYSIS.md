# Skills Data Analysis

## Issue Summary
The skills page representation differs between the static site and the dynamic (API-driven) version.

## Skill Counts

| Source | Total Skills | Expert | Advanced | Intermediate | Familiar |
|--------|--------------|--------|----------|--------------|----------|
| **Static Site (Production)** | 77 shown | 16 | 45 | 15 | 3 |
| **Main Branch Code** | 79 with metadata | 16 | 47 | 15 | 3 |
| **API (portfolio-admin)** | 77 skills | 16 | 43 | 15 | 3 |

### ❌ MISMATCH FOUND

**The API is missing 2 Advanced-level skills:**
1. **Azure** (parent node) - Advanced, 6 years
2. **AWS** (parent node) - Advanced, 7 years

**Impact:**
- Static site shows **45 Advanced** (includes Azure + AWS parent nodes with their 43 children)
- API shows **43 Advanced** (only the children, not the parent nodes)
- Difference: **2 Advanced skills missing**

## Root Cause

**The main branch has Azure and AWS listed TWICE:**

1. **As parent categories with level metadata:**
   ```typescript
   {
     name: "Azure",
     metadata: { icon: "VscAzure", level: "Advanced", yearsOfExperience: 6, lastUsed: "Current" },
     children: [
       { name: "Azure Active Directory", ... },
       { name: "Azure DevOps", ... },
       // ... more Azure services
     ]
   }
   ```

2. **Their children are also counted separately** (Azure Active Directory, Azure DevOps, etc.)

This creates **79 total nodes with level metadata**, but the static site only displays **77 technologies**.

## Skills Missing From API

Comparing main branch vs API, these 2 parent nodes have level metadata in main but not in API:
1. **Azure** - Advanced level, 6 years experience
2. **AWS** - Advanced level, 7 years experience

## Current API Structure

The API treats Azure and AWS as **parent categories only** (no level metadata), with only their children counted as skills:
- Azure children: Azure Active Directory, Azure DevOps, App Services, Azure Functions, Virtual Machine
- AWS children: AWS Lambda, Amazon S3, IAM, EC2, SNS, SQS, SES

## Understanding the Counting Logic

The static site uses TWO different counts:

1. **Total Technologies Count (77):**
   - Only counts **leaf nodes** (skills without children)
   - Azure and AWS are parent nodes → NOT counted in "77 technologies"
   - Their children ARE counted (e.g., AWS Lambda, Azure DevOps)

2. **Proficiency Breakdown (79 skills):**
   - Counts **all nodes with level metadata** (including parents)
   - Azure (Advanced) → counted in proficiency
   - AWS (Advanced) → counted in proficiency
   - Total: 16 Expert + 45 Advanced + 15 Intermediate + 3 Familiar = **79 skills**

## Recommendation

**❌ Current API structure is INCORRECT**

The API needs to add level metadata to Azure and AWS parent nodes to match the static site's proficiency breakdown:

```json
{
  "name": "Azure",
  "icon": "VscAzure",
  "metadata": {
    "level": "Advanced",
    "yearsOfExperience": 6,
    "lastUsed": "Current"
  },
  "skills": [
    { "name": "Azure Active Directory", ... },
    { "name": "Azure DevOps", ... }
  ]
}
```

**Why this matters:**
- Static site: 45 Advanced skills (correct)
- API: 43 Advanced skills (**missing 2**)
- Proficiency heat map will show incorrect counts

## Visual Differences

### Static Site Shows:
- 13 categories
- 77 technologies mastered
- Proficiency breakdown: 16 Expert, 45 Advanced, 15 Intermediate, 3 Familiar

### Current Dynamic Site Should Show:
- 13 categories (same)
- 77 skills (matches API)
- Need to verify proficiency breakdown matches

## Action Items

1. ✅ **Identified discrepancy**: 2-skill difference (Azure/AWS parent nodes)
2. ⏳ **Decide**: Should Azure/AWS be skills or just categories?
3. ⏳ **Update**: Sync portfolio-admin data if needed
4. ⏳ **Verify**: Proficiency level counts match between static and dynamic sites
