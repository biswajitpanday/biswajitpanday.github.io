# GitHub Pages Deployment Guide

## 🚀 Complete Setup for GitHub.io Hosting

### Step 1: Add API Key to GitHub Secrets

1. **Go to your GitHub repository**
2. **Click "Settings" tab** (in your repository, not your profile)
3. **Navigate to "Secrets and variables" > "Actions"**
4. **Click "New repository secret"**
5. **Add your secret:**
   - **Name**: `NEXT_PUBLIC_PAGECLIP_API_KEY`
   - **Value**: `Your-PageClip-Key`
6. **Click "Add secret"**

### Step 2: Enable GitHub Pages

1. **In your repository settings**
2. **Scroll down to "Pages" section**
3. **Source**: Select "Deploy from a branch"
4. **Branch**: Select "gh-pages" (it will be created automatically)
5. **Click "Save"**

### Step 3: Push Your Changes

```bash
git add .
git commit -m "Add PageClip integration with environment variables"
git push origin main
```

### Step 4: Monitor Deployment

1. **Go to "Actions" tab** in your repository
2. **Watch the deployment process**
3. **Your site will be available at**: `https://yourusername.github.io/biswajitpanday.github.io`

### Step 5: Configure PageClip Email Notifications

1. **Go to [PageClip Dashboard](https://pageclip.co/forms)**
2. **Click on your form**
3. **Go to "Settings" tab**
4. **Under "Email Notifications":**
   - **To Email**: `biswajitmailid@gmail.com`
   - **From Name**: `Portfolio Contact Form`
   - **Subject**: `New Contact Form Submission`
   - **Enable notifications**: ✅ Check the box
5. **Click "Save Settings"**

## 🔧 How It Works

### Local Development
- Uses `.env.local` file (create this locally)
- API key is read from environment variable

### Production (GitHub Pages)
- Uses GitHub Actions secret
- API key is injected during build process
- No sensitive data in your repository

## ✅ Verification Checklist

### Before Deployment:
- [ ] GitHub secret `NEXT_PUBLIC_PAGECLIP_API_KEY` is set
- [ ] GitHub Actions workflow includes environment variable
- [ ] Code is committed and pushed

### After Deployment:
- [ ] Visit your live site
- [ ] Test the contact form
- [ ] Check PageClip dashboard for submissions
- [ ] Verify email notifications are working

## 🎯 Your Site URLs

- **Repository**: `https://github.com/biswajitpanday/biswajitpanday.github.io`
- **Live Site**: `https://biswajitpanday.github.io` (once deployed)
- **PageClip Dashboard**: `https://pageclip.co/forms`

## 🐛 Troubleshooting

### Form Not Submitting on Live Site
1. Check browser console for errors
2. Verify GitHub secret is set correctly
3. Check GitHub Actions logs for build errors

### Not Receiving Emails
1. Check PageClip dashboard for submissions
2. Verify email notifications are enabled
3. Check spam folder
4. Ensure correct email address in PageClip settings

### Environment Variable Issues
```bash
# Check GitHub Actions logs for:
✅ "NEXT_PUBLIC_PAGECLIP_API_KEY: ***" (masked value)
❌ "NEXT_PUBLIC_PAGECLIP_API_KEY: undefined"
```

## 🔄 Update Process

When you need to update your API key:

1. **Update GitHub Secret**:
   - Repository Settings > Secrets > Edit `NEXT_PUBLIC_PAGECLIP_API_KEY`
   
2. **Trigger Redeploy**:
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push origin main
   ```

## 📞 Support

- **PageClip Issues**: support@pageclip.co
- **GitHub Pages Issues**: [GitHub Support](https://support.github.com/)
- **Portfolio Issues**: Open an issue in your repository

---

**🎉 Once deployed, your contact form will be fully functional and you'll receive email notifications for all submissions!** 