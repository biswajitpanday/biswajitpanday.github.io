# Biswajit Panday Portfolio Website

Welcome to my professional portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Optimized for all device sizes
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Dynamic Content**: Portfolio, skills, and career data driven from shared data sources
- **Contact Form**: Fully functional contact form with validation
- **Static Site Generation**: Fast loading and SEO optimized
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework

## 📋 Pages

- **Home**: Introduction and overview
- **Career**: Professional experience timeline
- **Portfolio**: Projects showcase with company-specific styling
- **Skills**: Technical expertise and skill tree
- **Resume**: Detailed professional background
- **Contact**: Contact form and information

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Icons**: React Icons
- **Deployment**: GitHub Pages

## 📧 Contact Form Setup

The contact form is built with React Hook Form and Zod validation. To make it fully functional with email sending, choose one of the following options:

### Option 1: PageClip (Recommended for static sites)

PageClip is perfect for static sites and GitHub Pages deployment. It's free for up to 1,000 submissions per month.

1. **Sign up at [PageClip](https://pageclip.co/)**

2. **Create a new form**
   - Click "Add a Site" or "New Form"
   - Give your form a name (e.g., "Portfolio Contact Form")
   - Copy your unique PageClip API key (looks like `abc123def456`)

3. **Set up environment variables (Recommended for security)**
   
   Create a `.env.local` file in your project root:
   
   ```env
   NEXT_PUBLIC_PAGECLIP_API_KEY=your-actual-api-key-here
   ```
   
   The form is already configured to use this environment variable. This keeps your API key secure and out of your source code.

4. **Alternative: Direct API key (Not recommended for production)**
   
   If you prefer to hardcode the key temporarily, find this line in `app/contact/page.tsx`:
   
   ```typescript
   const response = await fetch(`https://send.pageclip.co/${PAGECLIP_API_KEY}`, {
   ```
   
   And replace the environment variable approach with:
   
   ```typescript
   const response = await fetch('https://send.pageclip.co/your-actual-api-key', {
   ```

5. **Test your form**
   - Deploy your site or run locally
   - Submit a test message
   - Check your PageClip dashboard for submissions
   - Configure email notifications in PageClip settings

6. **Configure notifications (Optional)**
   - In PageClip dashboard, go to your form settings
   - Set up email notifications to receive form submissions
   - Customize the notification template

**PageClip Features:**
- ✅ Free tier: 1,000 submissions/month
- ✅ Spam protection included
- ✅ Email notifications
- ✅ Export submissions to CSV
- ✅ No server required
- ✅ Works with static sites

**Security Note:** The form is configured to use environment variables to keep your API key secure. See `docs/ENVIRONMENT_SETUP.md` for detailed setup instructions.

### Option 2: EmailJS (Alternative for client-side sending)

1. **Sign up at [EmailJS](https://www.emailjs.com/)**

2. **Create an email service**
   - Go to Email Services
   - Add a new service (Gmail, Outlook, etc.)
   - Note your `service_id`

3. **Create an email template**
   - Go to Email Templates
   - Create a new template with these variables:
     - `{{from_name}}`
     - `{{from_email}}`
     - `{{phone}}`
     - `{{message}}`
   - Note your `template_id`

4. **Get your public key**
   - Go to Account > API Keys
   - Note your `public_key`

5. **Install EmailJS**
   ```bash
   npm install @emailjs/browser
   ```

6. **Update the contact form**
   
   Replace the PageClip code in `app/contact/page.tsx`:
   
   ```typescript
   import emailjs from '@emailjs/browser';
   
   // Replace the onSubmit function content:
   try {
     await emailjs.send(
       'your_service_id',
       'your_template_id',
       {
         from_name: `${data.firstName} ${data.lastName}`,
         from_email: data.email,
         phone: data.phone || 'Not provided',
         message: data.message,
       },
       'your_public_key'
     );
     
     setSubmitStatus('success');
     setSubmitMessage('Thank you! Your message has been sent successfully. I will get back to you soon.');
     reset();
   } catch (error) {
     setSubmitStatus('error');
     setSubmitMessage('Something went wrong. Please try again or contact me directly via email.');
     console.error('Form submission error:', error);
   }
   ```

### Option 3: Custom API Route

For server-side email sending, you can create an API route with services like:
- Nodemailer
- SendGrid
- Mailgun
- Resend

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

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── career/            # Career timeline page
│   ├── contact/           # Contact form page
│   ├── portfolio/         # Projects showcase
│   ├── resume/            # Professional background
│   ├── skills/            # Technical skills
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── ...               # Other components
├── data/                 # Shared data sources
│   ├── portfolioData.ts  # Projects data
│   ├── skillsData.ts     # Skills tree data
│   └── timelineData.ts   # Career timeline data
├── helpers/              # Utility functions
├── public/               # Static assets
└── ...                   # Config files
```

## 🎨 Customization

### Data Sources
- **Portfolio Projects**: Edit `data/portfolioData.ts`
- **Skills Tree**: Edit `data/skillsData.ts`
- **Career Timeline**: Edit `data/timelineData.ts`

### Styling
- **Colors**: Update Tailwind config in `tailwind.config.js`
- **Components**: Modify component styles in respective files
- **Global Styles**: Edit `app/globals.css`

### Content
- **Personal Information**: Update contact details in `app/contact/page.tsx`
- **Resume**: Replace PDF in `public/assets/`
- **Images**: Add your photos to `public/assets/`

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Static Generation**: All pages pre-rendered
- **Optimized Images**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Bundle Size**: Optimized with tree shaking

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📞 Contact

- **Email**: biswajitmailid@gmail.com
- **Phone**: +880 1681642502
- **LinkedIn**: [Biswajit Panday](https://www.linkedin.com/in/biswajitpanday)
- **GitHub**: [biswajitpanday](https://github.com/biswajitpanday)

---

Built with ❤️ by Biswajit Panday
