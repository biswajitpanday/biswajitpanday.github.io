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

// Directories to process
const dirsToProcess = [
  assetsDir, // Main assets directory (for photo.png, logos, etc.)
  path.join(assetsDir, 'certificates'),
  path.join(assetsDir, 'portfolio'),
  path.join(assetsDir, 'profile'),
  path.join(assetsDir, 'logos'),
  path.join(assetsDir, 'company-icon')
];

// Track statistics
let totalProcessed = 0;
let totalSuccess = 0;
let totalSkipped = 0;
let totalFailed = 0;
let totalSavings = 0;

async function convertToWebP() {
  console.log('=== Converting Images to WebP ===');
  
  for (const dir of dirsToProcess) {
    // Skip if directory doesn't exist
    if (!fs.existsSync(dir)) {
      console.warn(`Directory doesn't exist: ${dir}`);
      continue;
    }
    
    const dirName = path.relative(assetsDir, dir) || 'assets';
    console.log(`\nProcessing directory: ${dirName}`);
    
    // For main assets directory, create webp files in the same directory
    // For subdirectories, create webp subdirectory
    let webpDir;
    if (dir === assetsDir) {
      webpDir = dir; // Same directory for main assets
    } else {
      webpDir = path.join(dir, 'webp');
      if (!fs.existsSync(webpDir)) {
        fs.mkdirSync(webpDir, { recursive: true });
        console.log(`Created directory: ${webpDir}`);
      }
    }
    
    // Get all files in directory
    const files = fs.readdirSync(dir);
    
    // Process image files (skip directories and already WebP files)
    const imageFiles = files.filter(file => {
      const filePath = path.join(dir, file);
      const ext = path.extname(file).toLowerCase();
      return (
        fs.statSync(filePath).isFile() && 
        ['.jpg', '.jpeg', '.png'].includes(ext) &&
        !file.includes('.webp') &&
        !path.dirname(filePath).includes('webp') &&
        !path.dirname(filePath).includes('thumbnails')
      );
    });
    
    console.log(`Found ${imageFiles.length} images to convert`);
    
    for (const file of imageFiles) {
      const inputPath = path.join(dir, file);
      const fileNameWithoutExt = path.parse(file).name;
      const outputPath = path.join(webpDir, `${fileNameWithoutExt}.webp`);
      
      // Skip if WebP version already exists and is newer
      if (fs.existsSync(outputPath)) {
        const originalStats = fs.statSync(inputPath);
        const webpStats = fs.statSync(outputPath);
        
        if (webpStats.mtime > originalStats.mtime) {
          console.log(`⏭️  Skipping ${file} (WebP version is up to date)`);
          totalSkipped++;
          continue;
        }
      }
      
      totalProcessed++;
      
      try {
        // Get original file size
        const originalStats = fs.statSync(inputPath);
        const originalSize = originalStats.size;
        
        // Convert to WebP with different quality settings based on file size
        let quality = 80;
        if (originalSize > 500 * 1024) { // Files larger than 500KB
          quality = 75;
        } else if (originalSize > 100 * 1024) { // Files larger than 100KB
          quality = 80;
        } else {
          quality = 85; // Smaller files can have higher quality
        }
        
        await sharp(inputPath)
          .webp({ quality, effort: 6 }) // Higher effort for better compression
          .toFile(outputPath);
        
        // Get new file size
        const webpStats = fs.statSync(outputPath);
        const webpSize = webpStats.size;
        
        // Calculate savings
        const savingsBytes = originalSize - webpSize;
        const savingsPercent = Math.round((savingsBytes / originalSize) * 100);
        totalSavings += savingsBytes;
        
        const originalSizeKB = Math.round(originalSize / 1024);
        const webpSizeKB = Math.round(webpSize / 1024);
        
        console.log(`✅ ${file} (${originalSizeKB}KB) → ${fileNameWithoutExt}.webp (${webpSizeKB}KB) - ${savingsPercent}% smaller`);
        totalSuccess++;
      } catch (error) {
        console.error(`❌ Error converting ${file}:`, error.message);
        totalFailed++;
      }
    }
  }
  
  // Print summary
  console.log('\n=== Conversion Summary ===');
  console.log(`Total processed: ${totalProcessed}`);
  console.log(`Successfully converted: ${totalSuccess}`);
  console.log(`Skipped (up to date): ${totalSkipped}`);
  console.log(`Failed: ${totalFailed}`);
  console.log(`Total disk space saved: ${Math.round(totalSavings / 1024)}KB (${Math.round(totalSavings / 1024 / 1024 * 10) / 10}MB)`);
  
  return totalSuccess > 0 || totalSkipped > 0;
}

// Run the conversion
convertToWebP().then(success => {
  if (success) {
    console.log('\n=== WebP Conversion Complete ===');
    console.log('WebP images are now available. Key locations:');
    console.log('- Main assets: /assets/*.webp');
    console.log('- Profile images: /assets/profile/*.webp');
    console.log('- Certificates: /assets/certificates/webp/');
    console.log('- Portfolio: /assets/portfolio/webp/');
    console.log('\n🚀 Next steps:');
    console.log('1. Update your components to use WebP images with PNG fallbacks');
    console.log('2. Use Next.js Image component with proper format detection');
    console.log('3. Test the changes and run PageSpeed Insights again');
    console.log('\nExample usage in Next.js:');
    console.log(`
import Image from 'next/image';

// Next.js will automatically serve WebP if supported
<Image
  src="/assets/photo.png"
  alt="Description"
  width={500}
  height={300}
  priority // For above-the-fold images
/>
    `);
  } else {
    console.error('WebP conversion failed or no images were processed');
    process.exit(1);
  }
}); 