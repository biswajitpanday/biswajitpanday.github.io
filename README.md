# Biswajit Panday - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional layout with glassmorphism effects
- **Responsive**: Optimized for all device sizes
- **Performance**: Optimized animations and lazy loading
- **Dynamic Content**: Centralized data management
- **Search & Filter**: Advanced search and filtering capabilities (configurable)
- **Contact Form**: Functional form with validation and email notifications
- **Accessibility**: ARIA compliant and keyboard navigation
- **SEO Optimized**: Meta tags and structured data

## 🎛️ Feature Control

You can control search and filter functionality via environment variables for optimal performance:

```bash
# Enable/Disable Global Search functionality
NEXT_PUBLIC_ENABLE_SEARCH=true

# Enable/Disable Filter functionality (Portfolio & Skills pages)  
NEXT_PUBLIC_ENABLE_FILTER=true
```

### Performance Impact:
- **Disabling Search**: Saves ~70KB runtime memory, ~300ms faster TTI
- **Disabling Filters**: 15-20% faster initial render on portfolio page
- **Both Disabled**: Optimal performance for static portfolio viewing

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Form Validation**: Zod schema validation
- **Icons**: React Icons
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── (pages)/           # Page routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── data/                  # Centralized data files
├── constants/             # App constants
├── utils/                 # Utility functions
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/biswajitpanday/biswajitpanday.github.io.git
   cd biswajitpanday.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   # Create .env.local file
   echo "NEXT_PUBLIC_ENABLE_SEARCH=true" > .env.local
   echo "NEXT_PUBLIC_ENABLE_FILTER=true" >> .env.local
   # Add contact form service key if needed
   echo "NEXT_PUBLIC_PAGECLIP_API_KEY=your-api-key" >> .env.local
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_ENABLE_SEARCH` | Enable global search functionality | No | `true` |
| `NEXT_PUBLIC_ENABLE_FILTER` | Enable filter functionality | No | `true` |
| `NEXT_PUBLIC_PAGECLIP_API_KEY` | Contact form service key | No | - |

### Performance Impact:
- **Disabling Search**: Saves ~70KB runtime memory, ~300ms faster TTI
- **Disabling Filters**: 15-20% faster initial render on portfolio page
- **Both Disabled**: Optimal performance for static portfolio viewing

## 📦 Deployment

### GitHub Pages (Recommended)

1. **Repository Settings**
   - Go to Settings → Pages
   - Source: GitHub Actions

2. **Environment Variables** (if using contact form)
   - Settings → Secrets and Variables → Actions
   - Add `NEXT_PUBLIC_PAGECLIP_API_KEY` if needed

3. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy updates"
   git push origin main
   ```

### Alternative Platforms

**Vercel/Netlify:**
1. Import repository
2. Add environment variables
3. Deploy automatically

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── portfolio/         # Portfolio section
│   ├── skills/            # Skills section
│   ├── career/            # Career timeline
│   ├── contact/           # Contact form
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── data/                  # Centralized data files
├── constants/             # Application constants
├── helpers/               # Utility functions
├── hooks/                 # Custom React hooks
├── lib/                   # External library configs
└── public/               # Static assets
```

## 📊 Performance Optimizations

- **Synchronized Animations**: Reduced animation times from 0.8s to 0.4s
- **Debounced Search**: 300ms debounce for search inputs
- **Memoized Calculations**: useMemo for expensive filter operations
- **Bundle Optimization**: Dynamic imports and code splitting
- **Hardware Acceleration**: CSS transforms for smooth animations
- **Reduced Motion Support**: Respects user accessibility preferences
- **Static Export**: Fast loading static sites

## 🎨 Design Features

- **Glassmorphism**: Modern glass-like UI elements
- **Gradient Animations**: Smooth color transitions
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Dark Theme**: Professional dark color scheme
- **Micro-interactions**: Subtle hover and focus effects

## 📱 Pages

- **Home**: Introduction and overview with animated elements
- **Portfolio**: Project showcase with search/filter capabilities
- **Skills**: Interactive technology tree with proficiency levels
- **Career**: Professional timeline with glassmorphism design
- **Resume**: Detailed qualifications and experience
- **Contact**: Functional contact form with validation

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build  
npm run start        # Production server
npm run lint         # Code linting
npm run analyze      # Bundle analysis (if configured)
```

## 🐛 Troubleshooting

### Common Issues

**Build Errors:**
```bash
# Clear cache and rebuild
rm -rf .next
npm install
npm run build
```

**Form Issues:**
- Verify environment variables are set
- Check browser console for errors
- Test in production environment

**Deployment Issues:**
- Check GitHub Actions logs
- Verify environment variables in repository secrets
- Ensure proper repository permissions

### Quick Fixes

**Dependencies:**
```bash
npm update
npm audit fix
```

**Linting:**
```bash
npm run lint -- --fix
```

## 🚀 Production Checklist

### Before Deployment:
- [ ] Environment variables configured (if needed)
- [ ] Build runs successfully (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] Contact form tested (if API key provided)
- [ ] All pages load correctly

### After Deployment:
- [ ] Live site loads properly
- [ ] Contact form submissions work (if configured)
- [ ] Mobile responsiveness verified
- [ ] Performance metrics acceptable

## 📚 External Services

### Contact Form Service (Optional)
The contact form can integrate with form handling services:
- PageClip
- Formspree
- Netlify Forms
- Custom API endpoint

**Setup Steps:**
1. Sign up for a form service
2. Get your API key
3. Add to environment variables
4. Update form submission endpoint if needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: biswajitpanday.dev@gmail.com
- **LinkedIn**: [Biswajit Panday](https://linkedin.com/in/biswajitpanday)
- **GitHub**: [biswajitpanday](https://github.com/biswajitpanday)

---

Built with ❤️ by Biswajit Panday
