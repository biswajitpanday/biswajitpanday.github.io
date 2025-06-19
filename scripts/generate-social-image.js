import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Since we can't use Canvas in Node.js easily without additional dependencies,
// let's create an HTML template that can be used to generate social media images

const generateSocialImageTemplate = () => {
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Social Media Preview Generator</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1c1c22 0%, #27272c 50%, #00ff99 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        
        .social-card {
            width: 1200px;
            height: 630px;
            background: linear-gradient(135deg, #1c1c22 0%, #27272c 70%, #00ff99 100%);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 60px;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
        }
        
        .social-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%2300ff99" fill-opacity="0.05"><circle cx="30" cy="30" r="2"/></g></g></svg>') repeat;
            pointer-events: none;
        }
        
        .content {
            flex: 1;
            z-index: 2;
            max-width: 650px;
        }
        
        .profile-section {
            flex-shrink: 0;
            z-index: 2;
            margin-left: 40px;
        }
        
        .name {
            font-size: 48px;
            font-weight: 800;
            color: white;
            margin: 0 0 16px 0;
            line-height: 1.1;
        }
        
        .title {
            font-size: 28px;
            font-weight: 600;
            color: #00ff99;
            margin: 0 0 24px 0;
            line-height: 1.2;
        }
        
        .description {
            font-size: 18px;
            color: rgba(255, 255, 255, 0.8);
            margin: 0 0 32px 0;
            line-height: 1.4;
        }
        
        .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 24px;
        }
        
        .skill {
            background: rgba(0, 255, 153, 0.1);
            border: 1px solid rgba(0, 255, 153, 0.3);
            color: #00ff99;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
        }
        
        .website {
            color: rgba(255, 255, 255, 0.6);
            font-size: 16px;
            font-weight: 500;
        }
        
        .profile-image {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00ff99, #00d4aa);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 72px;
            font-weight: 800;
            color: #1c1c22;
            box-shadow: 0 20px 40px rgba(0, 255, 153, 0.3);
        }
        
        .accent-circle {
            position: absolute;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 255, 153, 0.1) 0%, transparent 70%);
            top: -150px;
            right: -150px;
        }
    </style>
</head>
<body>
    <div class="social-card">
        <div class="accent-circle"></div>
        
        <div class="content">
            <h1 class="name">Biswajit Panday</h1>
            <h2 class="title">Full-Stack .NET Developer & Cloud Expert</h2>
            <p class="description">10+ years experience building scalable applications with .NET, React, Azure & AWS. Microsoft Certified Developer.</p>
            
            <div class="skills">
                <span class="skill">.NET Core</span>
                <span class="skill">React</span>
                <span class="skill">Azure</span>
                <span class="skill">AWS</span>
                <span class="skill">DevOps</span>
                <span class="skill">TypeScript</span>
            </div>
            
            <div class="website">biswajitpanday.github.io</div>
        </div>
        
        <div class="profile-section">
            <div class="profile-image">BP</div>
        </div>
    </div>
    
    <script>
        // Instructions for generating the image:
        // 1. Open this HTML file in a browser
        // 2. Take a screenshot of the social-card div (1200x630)
        // 3. Save as social-preview.webp in public/assets/
        // 4. Or use tools like Puppeteer to automate this process
        
        console.log('Social media preview template loaded');
        console.log('Card dimensions: 1200x630px');
        console.log('Perfect for Facebook, LinkedIn, Twitter, etc.');
    </script>
</body>
</html>`;

  const outputPath = path.join(__dirname, '../public/social-preview-template.html');
  fs.writeFileSync(outputPath, htmlTemplate);
  
  console.log('✅ Social media preview template generated at public/social-preview-template.html');
  console.log('📝 Instructions:');
  console.log('   1. Open the HTML file in your browser');
  console.log('   2. Take a screenshot of the card (1200x630px)');
  console.log('   3. Save as social-preview.webp in public/assets/');
  console.log('   4. Update your meta tags to use the new image');
};

generateSocialImageTemplate(); 