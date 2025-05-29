# Portfolio Setup Guide

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/biswajitpanday/biswajitpanday.github.io.git
   cd biswajitpanday.github.io
   npm install
   ```

2. **Set Up Environment**
   - Create `.env.local` in project root
   - Add PageClip key: `NEXT_PUBLIC_PAGECLIP_API_KEY=your-key`

3. **Run Locally**
   ```bash
   npm run dev
   ```

## 🔑 PageClip Setup

1. **Get API Key**
   - Sign up at [PageClip](https://pageclip.co)
   - Create a new site
   - Copy your API key

2. **Configure Environment**
   - Local: Add to `.env.local`
   - Production: Add to GitHub Secrets

## 📦 Deployment

### GitHub Pages (Recommended)

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: GitHub Actions

2. **Add Secret**
   - Go to Settings → Secrets → Actions
   - Add `NEXT_PUBLIC_PAGECLIP_API_KEY`

3. **Deploy**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

### Alternative Platforms

**Vercel:**
1. Import GitHub repository
2. Add environment variable
3. Deploy automatically

**Netlify:**
1. Connect repository
2. Add environment variable
3. Deploy automatically

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Clear cache and rebuild
   rm -rf .next
   npm run build
   ```

2. **Form Not Working**
   - Check PageClip key in environment
   - Verify form submission in PageClip dashboard

3. **Deployment Issues**
   - Check GitHub Actions logs
   - Verify environment variables
   - Ensure proper permissions

### Quick Fixes

**Reset Authentication:**
```bash
gh auth login --scopes "repo,workflow"
```

**Fix Permissions:**
1. Repository Settings → Actions → General
2. Enable "Read and write permissions"

## 📋 File Structure

```
your-portfolio/
├── .env.local          # Local environment
├── app/                # Next.js app directory
├── components/         # React components
├── public/            # Static assets
└── docs/             # Documentation
```

## 🔄 Updates & Maintenance

1. **Update Dependencies**
   ```bash
   npm update
   ```

2. **Check for Issues**
   ```bash
   npm run lint
   ```

3. **Test Build**
   ```bash
   npm run build
   ```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [PageClip Documentation](https://pageclip.co/docs)
- [GitHub Pages Documentation](https://docs.github.com/pages)

---

Need help? Open an issue on GitHub! 