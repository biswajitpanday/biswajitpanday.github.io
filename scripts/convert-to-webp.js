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
  path.join(assetsDir, 'certificates'),
  path.join(assetsDir, 'portfolio')
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
    
    const dirName = path.basename(dir);
    console.log(`\nProcessing directory: ${dirName}`);
    
    // Create webp directory if it doesn't exist
    const webpDir = path.join(dir, 'webp');
    if (!fs.existsSync(webpDir)) {
      fs.mkdirSync(webpDir, { recursive: true });
      console.log(`Created directory: ${webpDir}`);
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
        !file.includes('webp') &&
        !path.dirname(filePath).includes('webp') &&
        !path.dirname(filePath).includes('thumbnails')
      );
    });
    
    console.log(`Found ${imageFiles.length} images to convert`);
    
    for (const file of imageFiles) {
      const inputPath = path.join(dir, file);
      const fileNameWithoutExt = path.parse(file).name;
      const outputPath = path.join(webpDir, `${fileNameWithoutExt}.webp`);
      
      totalProcessed++;
      
      try {
        // Get original file size
        const originalStats = fs.statSync(inputPath);
        const originalSize = originalStats.size;
        
        // Convert to WebP
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        // Get new file size
        const webpStats = fs.statSync(outputPath);
        const webpSize = webpStats.size;
        
        // Calculate savings
        const savingsBytes = originalSize - webpSize;
        const savingsPercent = Math.round((savingsBytes / originalSize) * 100);
        totalSavings += savingsBytes;
        
        console.log(`✅ ${file} → ${fileNameWithoutExt}.webp (${savingsPercent}% smaller)`);
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
  console.log(`Skipped: ${totalSkipped}`);
  console.log(`Failed: ${totalFailed}`);
  console.log(`Total disk space saved: ${Math.round(totalSavings / 1024)}KB (${Math.round(totalSavings / 1024 / 1024)}MB)`);
  
  return totalSuccess > 0;
}

// Run the conversion
convertToWebP().then(success => {
  if (success) {
    console.log('\n=== WebP Conversion Complete ===');
    console.log('The WebP images are available in the webp subdirectories:');
    console.log('- /assets/certificates/webp/');
    console.log('- /assets/portfolio/webp/');
    console.log('\nTo use these images, update your data files to reference the WebP versions.');
    console.log('For example: change "/assets/portfolio/project.png" to "/assets/portfolio/webp/project.webp"');
    console.log('\nFor browser compatibility, consider using the <picture> element:');
    console.log(`
<picture>
  <source srcset="/assets/portfolio/webp/project.webp" type="image/webp">
  <img src="/assets/portfolio/project.png" alt="Project">
</picture>
    `);
  } else {
    console.error('WebP conversion failed or no images were converted');
    process.exit(1);
  }
}); 