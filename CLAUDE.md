# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a professional portfolio website for Biswajit Panday, built with Next.js 15, TypeScript, and Tailwind CSS. The site features a modern glassmorphism design with smooth animations and comprehensive SEO optimization. It's configured for static export and deployment to GitHub Pages.

## Development Commands

### Essential Commands
```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build (includes sitemap generation)
npm run start    # Start production server
npm run lint     # Run ESLint for code quality
npm run analyze  # Analyze bundle size (ANALYZE=true npm run build)
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
- Uses Next.js 15 App Router with TypeScript
- Static export configuration (`output: "export"`) for GitHub Pages
- All pages are in `app/` directory with nested layouts
- Each page has its own layout.tsx for SEO metadata

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

### Styling System
- **Tailwind CSS** with custom theme configuration
- **Color Scheme**: Primary (#1c1c22), Secondary (#00BFFF)
- **Font**: JetBrains Mono variable font
- **Animations**: Framer Motion with optimized performance (0.4s duration)
- **Responsive**: Mobile-first design with custom breakpoints

## Key Features & Integrations

### Performance Optimizations
- Image optimization pipeline with WebP conversion
- Bundle analysis with @next/bundle-analyzer
- Tree shaking and code splitting
- Hardware-accelerated CSS animations
- Debounced search (300ms) and memoized filters

### SEO & Analytics
- Comprehensive metadata with OpenGraph and Twitter cards
- Google Analytics with gtag events
- Structured data (Person, Website, Organization schemas)
- Google Search Console verification included
- Dynamic sitemap generation

### Feature Toggles (Environment Variables)
```bash
NEXT_PUBLIC_ENABLE_SEARCH=true   # Global search functionality
NEXT_PUBLIC_ENABLE_FILTER=true   # Filter panels for all sections
NEXT_PUBLIC_PAGECLIP_API_KEY=    # Contact form service (optional)
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
- Run `npm run lint` to ensure code quality
- Run `npm run build` to verify production build
- Run `npm run optimize` for image optimization
- Test all pages and features locally
- Verify environment variables if using contact form

## Important Configuration Files

- `next.config.ts` - Next.js configuration with bundle optimization
- `tailwind.config.js` - Custom theme and responsive breakpoints
- `tsconfig.json` - TypeScript strict mode enabled
- `eslint.config.mjs` - ESLint configuration for code quality
- `.github/workflows/deploy.yml` - GitHub Actions deployment pipeline

## Performance Monitoring

The site includes WebVitals tracking and analytics:
- Core Web Vitals monitoring
- Google Analytics with custom events
- Bundle size analysis tools
- Performance-optimized animations and images