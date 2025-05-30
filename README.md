# Biswajit Panday - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional layout with glassmorphism effects
- **Responsive**: Optimized for all device sizes
- **Performance**: Optimized animations and lazy loading
- **Dynamic Content**: Centralized data management
- **Search & Filter**: Advanced search and filtering capabilities (configurable)
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
   NEXT_PUBLIC_ENABLE_SEARCH=true
   NEXT_PUBLIC_ENABLE_FILTER=true
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📊 Performance Optimizations

- **Synchronized Animations**: Reduced animation times from 0.8s to 0.4s
- **Debounced Search**: 300ms debounce for search inputs
- **Memoized Calculations**: useMemo for expensive filter operations
- **Bundle Optimization**: Dynamic imports and code splitting
- **Hardware Acceleration**: CSS transforms for smooth animations
- **Reduced Motion Support**: Respects user accessibility preferences

## 🎨 Design Features

- **Glassmorphism**: Modern glass-like UI elements
- **Gradient Animations**: Smooth color transitions
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Dark Theme**: Professional dark color scheme
- **Micro-interactions**: Subtle hover and focus effects

## 📱 Pages

- **Home**: Introduction and overview
- **Portfolio**: Project showcase with search/filter
- **Skills**: Interactive technology tree
- **Career**: Professional timeline
- **Resume**: Detailed qualifications
- **Contact**: Contact form and information

## 🔧 Development

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint

# Type check
npm run type-check
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: biswajitpanday.dev@gmail.com
- **LinkedIn**: [Biswajit Panday](https://linkedin.com/in/biswajitpanday)
- **GitHub**: [biswajitpanday](https://github.com/biswajitpanday)

---

Built with ❤️ by Biswajit Panday
