# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a professional portfolio website for Biswajit Panday, built with Next.js 15, TypeScript, and Tailwind CSS. The site features a modern glassmorphism design with smooth animations and comprehensive SEO optimization. It's configured for static export and deployment to GitHub Pages.

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

### Styling System
- **Tailwind CSS** with custom theme configuration
- **Color Scheme**: Primary (#1c1c22), Secondary (#00BFFF)
- **Font**: JetBrains Mono variable font
- **Animations**: Framer Motion with optimized performance (0.4s duration)
- **Responsive**: Mobile-first design with custom breakpoints

## Key Features & Integrations

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