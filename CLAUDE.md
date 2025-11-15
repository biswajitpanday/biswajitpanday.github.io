# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a professional portfolio website for Biswajit Panday, built with Next.js 15, TypeScript, and Tailwind CSS. The site features a modern glassmorphism design with smooth animations and comprehensive SEO optimization. It's configured for static export and deployment to GitHub Pages.

### Multi-Repository Architecture

This portfolio project consists of **two separate repositories**:

#### 1. Frontend Repository (`biswajitpanday.github.io`)
- **Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Deployment:** GitHub Pages (static export)
- **Location:** `biswajitpanday.github.io/`
- **Repository:** https://github.com/biswajitpanday/biswajitpanday.github.io
- **Purpose:** Portfolio website with AI chatbot UI component
- **Live URL:** https://biswajitpanday.github.io

#### 2. Chatbot API Repository (`portfolio-chatbot-api`)
- **Stack:** Vercel Serverless Functions, Node.js, TypeScript, Google Gemini AI
- **Deployment:** Vercel (free tier)
- **Location:** `biswajitpanday-portfolio-chatbot/` (local development folder)
- **Repository:** https://github.com/biswajitpanday/portfolio-chatbot-api
- **Purpose:** AI chatbot backend with rate limiting, CORS security, and AI integration
- **API Endpoint:** Set in `NEXT_PUBLIC_CHATBOT_API_URL` environment variable

#### Why Separate Repositories?

1. **Different Deployment Targets:** GitHub Pages (static) vs Vercel Serverless
2. **Independent Scaling:** Frontend and API can be updated independently
3. **Security Isolation:** API keys stored only in Vercel environment variables
4. **Technology Stack Separation:** Next.js frontend vs Node.js serverless functions
5. **Microservices Best Practice:** Separation of concerns and responsibilities

#### Development Workflow

**Working on Frontend:**
```bash
cd biswajitpanday.github.io
npm run dev                 # Runs on http://localhost:3000
```

**Working on Chatbot API (local testing):**
```bash
cd biswajitpanday-portfolio-chatbot
vercel dev                  # Runs on http://localhost:3001
```

**Running Both Simultaneously:**
- Frontend: Port 3000
- API: Port 3001 (via Vercel dev server)
- Frontend can call local API for testing before deployment

## Development Commands

### Essential Commands
```bash
npm run dev               # Start development server (localhost:3000)
npm run build             # Production build (includes sitemap generation)
npm run start             # Start production server
npm run lint              # Run ESLint for code quality
npm run analyze           # Analyze bundle size (ANALYZE=true npm run build)
npm run analyze-motion    # Analyze Framer Motion usage in components
npm run test-performance  # Test animation performance across components
```

### Image Optimization
```bash
npm run optimize # Complete image optimization workflow:
                 # - Profile image optimization (multiple sizes)
                 # - WebP conversion for all images
                 # - Thumbnail generation
                 # - Interactive source file cleanup
npm run sitemap  # Generate sitemap.xml for SEO
```

## Architecture & Structure

### Next.js App Router Structure
- Uses Next.js 15 App Router with TypeScript strict mode
- Static export configuration (`output: "export"`) for GitHub Pages compatibility
- All pages are in `app/` directory with nested layouts for route grouping
- Each page has its own layout.tsx for SEO metadata and structured data
- Path aliases configured (@/* points to root directory)
- Bundle analyzer integration for performance monitoring

### Data Architecture
All content is centralized in `data/` directory:
- `portfolioData.ts` - Project portfolio with categories, tech stacks, company associations
- `skillsData.ts` - Technical skills with proficiency levels
- `certificationsData.ts` - Professional certifications with validation
- `timelineData.ts` - Career timeline and experience
- `navigationData.ts` - Site navigation structure
- `schemaData.ts` - Structured data for SEO

### Component Architecture
- **UI Components**: Shadcn/ui based components in `components/ui/`
- **Feature Components**: Specialized components for portfolio sections
- **Layout Components**: Header, Navigation, PageTransition
- **SEO Components**: StructuredData, SEOOptimizer, CanonicalUrl
- **Analytics**: GoogleAnalytics, WebVitalsTracker
- **Filter Systems**: Advanced filtering for projects, skills, certifications
- **AI Chatbot**: AIChatbot.tsx - Floating chatbot UI that connects to Vercel API
  - ChatMessage.tsx - Individual chat message component
  - SuggestedQuestions.tsx - Quick question suggestions

### Styling System
- **Tailwind CSS** with custom theme configuration
- **Color Scheme**: Primary (#1c1c22), Secondary (#00BFFF)
- **Font**: JetBrains Mono variable font
- **Animations**: Framer Motion with optimized performance (0.4s duration)
- **Responsive**: Mobile-first design with custom breakpoints

## Key Features & Integrations

### AI Chatbot Integration
- **Provider:** Google Gemini AI (free tier)
- **Architecture:** Frontend UI (React) → Vercel Serverless API → Gemini AI
- **Features:**
  - Floating chat button with expandable window
  - Suggested questions for common queries
  - Rate limiting (10 requests/minute)
  - CORS security (only allows requests from portfolio domain)
  - Conversation history (last 4 messages)
  - Mobile-responsive design
- **Knowledge Base:** Hardcoded portfolio data (projects, skills, certifications)
- **Deployment:** Separate Vercel project (see Multi-Repository Architecture)

### Performance Optimizations
- Image optimization pipeline with WebP conversion and multiple size variants
- Bundle analysis with @next/bundle-analyzer (npm run analyze)
- Tree shaking and code splitting with vendor/common chunk separation
- Hardware-accelerated CSS animations (0.4s duration for consistency)
- Debounced search (300ms) and memoized filters
- Package import optimization for react-icons, framer-motion, and lucide-react
- Console.log removal in production builds
- Webpack fallbacks configured for client-side only operations

### SEO & Analytics
- Comprehensive metadata with OpenGraph and Twitter cards
- Google Analytics with gtag events
- Structured data (Person, Website, Organization schemas)
- Google Search Console verification included
- Dynamic sitemap generation

### Feature Toggles (Environment Variables)
```bash
NEXT_PUBLIC_ENABLE_SEARCH=true          # Global search functionality
NEXT_PUBLIC_ENABLE_FILTER=true          # Filter panels for all sections
NEXT_PUBLIC_PAGECLIP_API_KEY=           # Contact form service (optional)
NEXT_PUBLIC_CHATBOT_API_URL=            # AI Chatbot API endpoint (Vercel)
                                        # Example: https://portfolio-chatbot-api.vercel.app/api/chat
```

## Development Guidelines

### Adding New Projects
1. Update `data/portfolioData.ts` with Project interface
2. Required fields: category, title, descriptions, stacks, company association
3. Add images to `public/assets/portfolio/` and run `npm run optimize`
4. Categories: "Full-Stack", "Frontend", "Backend", "Mobile", "Windows App"

### Adding New Skills
1. Update `data/skillsData.ts` with skill categories
2. Include proficiency percentage and icon references
3. Skills are organized by: Frontend, Backend, DevOps, Cloud, etc.

### Adding New Certifications
1. Update `data/certificationsData.ts`
2. Include certification level, provider, validation links
3. Add certificate images to `public/assets/certificates/`

### Component Development
- Follow existing patterns in `components/` directory
- Use TypeScript interfaces for all props
- Implement responsive design with Tailwind classes
- Add proper ARIA attributes for accessibility
- Use Framer Motion for animations with 0.4s duration

### Image Management
- Always run `npm run optimize` after adding new images
- Script handles WebP conversion, thumbnails, and cleanup
- Profile images generate multiple sizes automatically
- Maintains both WebP and fallback formats

## Deployment

### GitHub Pages Setup
1. Repository configured for GitHub Actions deployment
2. Build command includes sitemap generation (`prebuild` script)
3. Static export compatible with GitHub Pages
4. Environment variables set in repository secrets

### Pre-deployment Checklist
- Run `npm run lint` to ensure code quality (strict linting enabled)
- Run `npm run build` to verify production build (includes sitemap generation via prebuild)
- Run `npm run optimize` for image optimization (WebP conversion, thumbnails, cleanup)
- Run `npm run analyze` to check bundle size and optimization
- Test all pages and features locally with static export
- Verify environment variables if using contact form or analytics
- Ensure TypeScript compilation passes without build errors

## Important Configuration Files

- `next.config.ts` - Next.js configuration with bundle optimization, static export, and webpack customizations
- `tailwind.config.js` - Custom theme and responsive breakpoints
- `tsconfig.json` - TypeScript strict mode enabled with path aliases (@/*)
- `eslint.config.mjs` - ESLint configuration for code quality
- `postcss.config.cjs` - PostCSS configuration for Tailwind CSS processing
- `.github/workflows/deploy.yml` - GitHub Actions deployment pipeline

## Performance Monitoring

The site includes WebVitals tracking and analytics:
- Core Web Vitals monitoring
- Google Analytics with custom events
- Bundle size analysis tools
- Performance-optimized animations and images

## Development Guidelines for AI Assistants

### Task Tracking
- After completing each Phase, Epic, Task, or Subtask, **mark it with completion signs/checkmarks** in relevant documentation
- Update `docs/todo-content.md` progress tracker when content tasks are completed
- Update `docs/Todo.md` when technical tasks are completed

### Code Quality & Verification
**Be a skeptical, senior pair-programmer. Verify before you assert.**

**Guidelines:**
- State assumptions explicitly
- Cross-check anything nontrivial (APIs, versions, platform differences) using reasoning or citable sources
- If unsure, say so clearly
- Prefer minimal, clean, idiomatic code with strong defaults and only meaningful comments
- Suggest better designs when appropriate and explain trade-offs concisely
- If uncertain, provide a safe fallback and a quick validation test
- **Do not write code until you are at least 95% confident in the approach**
- If something is missing, unclear, or risky: **pause and ask directly** using `AskUserQuestion` tool

### Context Window Management
**When approaching context window limit (85-90% capacity):**
1. **Pause immediately** and share remaining incomplete todos
2. **Ask**: "Approaching context limit. Continue with remaining tasks?"
3. **After user compacts conversation**: Resume from exact stopping point and complete remaining work

**Never silently hit the limit mid-task.**