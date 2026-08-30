# portfolio-admin Sync Checklist

**Status: superseded by the 2026-08-30 RoleForge reconciliation.**

All content edits that used to be listed here (plus a much larger set) were applied in one
pass on 2026-08-30, sourced from the audited RoleForge profile data
(`C:\PROJECTS\ROBINS\RoleForge\data\master-panday.yaml` + `data/codebase/*`).

## How the sync now works

1. **Desired state lives in the dump**: `C:\PROJECTS\PORTFOLIO\db-dump\*.data.json` was
   edited to the corrected values (reviewed, assertion-checked transforms).
2. **Applied to live MongoDB** via `portfolio-admin/scripts/apply-content-fixes.ts`
   (dry-run by default; `APPLY=1` writes; field-level `$set` + guarded inserts/deletes).
3. **Chatbot**: `portfolio-chatbot-api/scripts/sync-knowledge-base-enhanced.ts` was
   corrected (hardcoded personal/education/contact/achievements/FAQ blocks), then
   `npm run sync-knowledge-base` regenerates `lib/knowledgeBase.ts` from the fixed API.
4. **Site**: rebuild via GitHub Actions (`deploy.yml` now passes
   `NEXT_PUBLIC_API_BASE_URL`; `rebuild-on-demand.yml` now wipes the fetch cache).

## What changed (2026-08-30 reconciliation, highlights)

- **Timeline**: Optimizely tense/facts (ADI 60-day engagement, ERP pipelines, Opal,
  "first completed" not "first-ever", 15+ upgrades); Kaz (Ocelot gateways, 40+ .NET
  services / 9+ Linux servers, auth microservice + SDK, position
  "Software Engineer → Senior Software Engineer"); Chorki (Notification Hub);
  Brain Station-23 jobType → Internship.
- **Projects**: Configured Commerce & SpireWiz set to ended (June 2026); SpireWiz
  "co-engineered" + AI-generated test-coverage claims removed; DevSpace reframed solo,
  layered architecture (no CQRS/DDD), Electron 22, ASP.NET Core Data Protection API;
  BugBusters de-CQRS'd; Reganalytics de-AWS'd + auth-microservice mechanism added;
  SVS corrected to services/servers/Ocelot; Portfolio Website → Gemini 3 Flash
  (preview), no "$5/session"; currentdt-mcp "co-authored"; Devensoft "Contributed to";
  WebEvv Step Functions/Cognito specifics; **all project-embedded testimonials removed**.
- **Metadata**: role "Senior .NET Developer", +49 phone (WhatsApp stays +880), bio +
  hero phrases + SEO keywords filled, `showLookingForSection: true`.
- **Certifications**: Opal certs featured; AZ-204 target moved to 2026-12; typos fixed.
- **Skills**: DDD/CQRS deactivated; Claude Code renamed; Go → Familiar; new
  "Performance & Diagnostics" and "Security & Auth" groups; Ocelot, hapi.js,
  Optimizely Configured Commerce/Opal, Vite, Webpack added.
- **Blog**: sample "55% cloud savings" post deleted; author role standardized.

## Still manual after any future content change

1. Trigger a rebuild (GitHub Actions `rebuild-on-demand.yml` or wait for the
   twice-daily cron) so the static site re-bakes API data.
2. Re-run the chatbot knowledge-base sync + redeploy the chatbot on Vercel.
3. If SEO/title text changed, regenerate `public/assets/social-preview.webp`
   (template: `public/social-preview-template.html`).
