import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base directory
const publicDir = path.join(__dirname, '../public');
const assetsDir = path.join(publicDir, 'assets');

async function optimizeProfileImage() {
  console.log('=== Optimizing Profile Image ===');
  
  const originalImage = path.join(assetsDir, 'Panday.png');
  
  // Check if the original image exists
  if (!fs.existsSync(originalImage)) {
    console.error(`Original image not found: ${originalImage}`);
    return false;
  }
  
  // Create different sizes of the profile image
  const sizes = [
    { name: 'large', width: 600 },
    { name: 'medium', width: 400 },
    { name: 'small', width: 200 },
    { name: 'thumbnail', width: 100 }
  ];
  
  // Create the optimized versions directory if it doesn't exist
  const optimizedDir = path.join(assetsDir, 'profile');
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
    console.log(`Created directory: ${optimizedDir}`);
  }
  
  try {
    // Original image stats
    const originalStats = fs.statSync(originalImage);
    const originalSizeKB = Math.round(originalStats.size / 1024);
    console.log(`Original image size: ${originalSizeKB}KB`);
    
    // Create WebP versions in different sizes
    for (const size of sizes) {
      // WebP version (best compression)
      const webpOutput = path.join(optimizedDir, `profile-${size.name}.webp`);
      await sharp(originalImage)
        .resize(size.width, null, { fit: 'contain' })
        .webp({ quality: 80 })
        .toFile(webpOutput);
      
      // PNG version as fallback
      const pngOutput = path.join(optimizedDir, `profile-${size.name}.png`);
      await sharp(originalImage)
        .resize(size.width, null, { fit: 'contain' })
        .png({ quality: 80 })
        .toFile(pngOutput);
      
      // Get file sizes
      const webpStats = fs.statSync(webpOutput);
      const pngStats = fs.statSync(pngOutput);
      
      console.log(`Created ${size.name} (${size.width}px):`);
      console.log(`  - WebP: ${Math.round(webpStats.size / 1024)}KB (${Math.round((1 - webpStats.size / originalStats.size) * 100)}% reduction)`);
      console.log(`  - PNG: ${Math.round(pngStats.size / 1024)}KB (${Math.round((1 - pngStats.size / originalStats.size) * 100)}% reduction)`);
    }
    
    return true;
  } catch (error) {
    console.error('Error optimizing profile image:', error);
    return false;
  }
}

optimizeProfileImage().then(success => {
  if (success) {
    console.log('\n=== Profile Image Optimization Complete ===');
    console.log('The optimized images are available in public/assets/profile/');
    console.log('To use these images, update your components to reference:');
    console.log('- /assets/profile/profile-large.webp (with PNG fallback)');
    console.log('- /assets/profile/profile-medium.webp (with PNG fallback)');
    console.log('- /assets/profile/profile-small.webp (with PNG fallback)');
    console.log('- /assets/profile/profile-thumbnail.webp (with PNG fallback)');
  } else {
    console.error('Profile image optimization failed');
    process.exit(1);
  }
}); 