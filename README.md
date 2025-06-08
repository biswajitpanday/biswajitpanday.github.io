# Biswajit Panday - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional layout with glassmorphism effects
- **Responsive**: Optimized for all device sizes
- **Performance**: Optimized animations, lazy loading, and image optimization
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

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Form Validation**: Zod schema validation
- **Icons**: React Icons
- **Deployment**: GitHub Pages
- **Image Optimization**: Sharp, WebP conversion

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── (pages)/           # Page routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── data/                  # Centralized data files
├── constants/             # App constants
├── scripts/               # Utility scripts (image optimization, etc.)
├── utils/                 # Utility functions
└── public/                # Static assets
    └── assets/            # Images and other media
        ├── certificates/  # Certificate images
        │   ├── thumbnails/# Certificate thumbnails
        │   └── webp/      # WebP versions of certificates
        ├── portfolio/     # Portfolio project images
        │   ├── thumbnails/# Project thumbnails
        │   └── webp/      # WebP versions of projects
        └── profile/       # Profile images in various sizes/formats
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

## 🔧 Development Scripts

```bash
npm run dev                   # Development server
npm run build                 # Production build  
npm run start                 # Production server
npm run lint                  # Code linting
npm run analyze               # Bundle analysis
npm run generate-thumbnails   # Generate image thumbnails
npm run optimize-profile      # Optimize profile image
npm run convert-to-webp       # Convert images to WebP format
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

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: biswajitmailid@gmail.com
- **LinkedIn**: [Biswajit Panday](https://linkedin.com/in/biswajitpanday)
- **GitHub**: [biswajitpanday](https://github.com/biswajitpanday)

---

Built with ❤️ by Biswajit Panday

See [PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md) for detailed project information including design features, image optimization techniques, and more.
