# portfolio-admin Sync Checklist

These are the **content edits you must make in the portfolio-admin dashboard**
(https://portfolio-admin-blue.vercel.app). They are baked into the site at build
time, so the code changes already merged will NOT take effect until these are
updated and the site is rebuilt/redeployed.

All "current" values below were read live from the public API on 2026-06-14.

---

## 1. Site Metadata  (Settings / Metadata)

### `metaDescription`  ⭐ highest impact (this is your homepage SEO + social description)
**Current:**
> Senior .NET Architect with 10+ years building enterprise B2B platforms. Currently at Optimizely serving global enterprise clients. Passionate about AI integration—built SpireWiz achieving 80% efficiency gains. Microsoft Certified.

**New:**
> Senior .NET Architect with 11+ years building enterprise B2B platforms. Most recently at Optimizely, serving global enterprise clients. Passionate about AI integration—built SpireWiz achieving up to 80% efficiency gains. Microsoft Certified.

*(changes: 10+ → 11+ · "Currently at" → "Most recently at" · "80%" → "up to 80%")*

### `role`
**Current:** `Senior Developer`
**New:** `Senior .NET Developer`   *(matches resume/LinkedIn)*

### `tagline`  (optional — not shown on the hero, but used in some meta)
**Current:** `Senior .NET Architect & AI Solutions Engineer`
**New:** `Senior .NET Developer · AI-Driven Automation`   *(matches the hero badge)*

### `contactInfo.location`
**Current:** `Dhaka, Bangladesh`
**New:** `Cottbus, Germany`

### `contactInfo.phone` / `contactInfo.whatsapp`  (optional)
Currently `+880 1681642502` (Bangladesh). Update if you now use a German number.

### `displaySettings.showLookingForSection`
Currently `false`. The "Looking For" section (with the new **"Based in Germany"**
pill) only renders if you set this to `true`. Flip it on if you want that section visible.

---

## 2. DevSpace project  (Projects → DevSpace)

| Field | Current | New |
|---|---|---|
| `stacks[0]` | `Electron 27` | `Electron 22` |
| `stacks` (entry) | `Microsoft DataProtection (DPAPI)` | `ASP.NET Core Data Protection API` |
| `shortDescription` | …"encrypts per-project credentials with **Windows DPAPI**"… | …"encrypts per-project credentials with **ASP.NET Core Data Protection API**"… |
| `longDescription` | …"encrypted with **Microsoft DataProtection (DPAPI)**"… | …"encrypted with **ASP.NET Core Data Protection API**"… |
| `responsibilities` (entry) | …"credential vault using **Microsoft DataProtection (DPAPI)**"… | …"credential vault using **ASP.NET Core Data Protection API**"… |
| `metrics.other[0]` | "Per-project encrypted credential vault (**Windows DPAPI**) — never plain text on disk" | "Per-project encrypted credential vault (**ASP.NET Core Data Protection API**) — never plain text on disk" |

Leave intact: `.NET 9`, `React 18`, "100+ tools in under 3 seconds", "co-authored".

---

## 3. SpireWiz project  (Projects → SpireWiz)

Standardize every efficiency figure to **"up to 80%"**. Replace `70–80%` / `70-80%` → `up to 80%`:

| Field | Current snippet | New snippet |
|---|---|---|
| `shortDescription` | "reduce upgrade cycles by **70–80%**" | "reduce upgrade cycles by **up to 80%**" |
| `longDescription` | "slashes upgrade cycles by **70–80%**" | "slashes upgrade cycles by **up to 80%**" |
| `responsibilities[1]` | "reducing upgrade cycles by **70–80%** (from 40 hours down to 10)" | "reducing upgrade cycles by **up to 80%** (from 40 hours down to 10)" |
| `metrics.efficiency` | "**70-80%** time reduction (32-40h → 8-10h)" | "**up to 80%** time reduction (32-40h → 8-10h)" |
| `caseStudy.results[0]` | "(**70-80%** efficiency gain, 22-32 hours saved per cycle)" | "(**up to 80%** efficiency gain, 22-32 hours saved per cycle)" |
| `recognition[0].description` | "reducing upgrade cycles by **80%**" | "reducing upgrade cycles by **up to 80%**" |

✅ Already consistent — leave as-is: `25+ enterprise clients`, `~$180K annual value`,
`600+ developer hours`. (The "85% autonomous resolution" / "50–85%" figures are a
*different* metric — do NOT change them.)

---

## 4. Timeline → Optimizely entry  (Timeline → Optimizely)  ⚠ important

**Current:** `isCurrent = true`, `endDate = null` (empty)
This makes the site treat Optimizely as your **ongoing** position (shows "Present")
and feeds the auto-computed years of experience.

**New:**
- `isCurrent` → **false**
- `endDate` → your Optimizely end date (e.g. **June 2026**)

This is what makes the rest of the site read in past tense and keeps the computed
"11+ years" accurate. **Confirm the exact end month before saving.**

**Client count (optional consistency):** the Optimizely entry's description and a
results bullet say **"20+ enterprise B2B clients"**, while the SpireWiz project says
**"25+ enterprise clients"**. The code/SEO has been unified to 25+. If you want the
timeline to match, change `20+ enterprise B2B clients` → `25+ enterprise B2B clients`
in the Optimizely entry (description + results). Leave it if the 20+ figure is
intentionally the portfolio served vs. SpireWiz's 25+ annual capacity.

**Note on locations:** all four timeline jobs list `Dhaka, Bangladesh`. Those are
historical job locations and are probably correct to leave as-is — your *personal*
relocation to Cottbus is already reflected in the contact location + SEO. Only change
a timeline location if you specifically want it to.

---

## 5. After saving all of the above
1. Trigger a rebuild/redeploy of the frontend (GitHub Actions) so the new API content is baked in.
2. Regenerate `/public/assets/social-preview.webp` (the OG image is pre-rendered; the
   template text is updated in code but the image file isn't).
