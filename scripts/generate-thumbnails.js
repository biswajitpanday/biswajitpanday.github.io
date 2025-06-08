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

// Define directories to process
const certificatesDir = path.join(assetsDir, 'certificates');
const portfolioDir = path.join(assetsDir, 'portfolio');
const thumbnailsDir = path.join(certificatesDir, 'thumbnails');
const portfolioThumbnailsDir = path.join(portfolioDir, 'thumbnails');

// Create thumbnails directories if they don't exist
for (const dir of [thumbnailsDir, portfolioThumbnailsDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

// Target thumbnail width (height will be auto-calculated to maintain aspect ratio)
const THUMBNAIL_WIDTH = 400;

// Process files in a directory
async function processDirectory(sourceDir, thumbDir) {
  if (!fs.existsSync(sourceDir)) {
    console.warn(`Directory doesn't exist: ${sourceDir}`);
    return { success: 0, error: 0, total: 0 };
  }

  // Get all files in directory
  const files = fs.readdirSync(sourceDir);

  // Process image files (skip directories and SVG files which are already optimized)
  const imageFiles = files.filter(file => {
    const filePath = path.join(sourceDir, file);
    const ext = path.extname(file).toLowerCase();
    return (
      fs.statSync(filePath).isFile() && 
      ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) &&
      !file.includes('thumbnail')
    );
  });

  console.log(`Found ${imageFiles.length} image files to process in ${sourceDir}`);
  
  let successCount = 0;
  let errorCount = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(sourceDir, file);
    const outputPath = path.join(thumbDir, file);
    
    try {
      await sharp(inputPath)
        .resize(THUMBNAIL_WIDTH, null, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .jpeg({ quality: 80, progressive: true })
        .toFile(outputPath);
      
      console.log(`✅ Created thumbnail: ${file}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
      errorCount++;
    }
  }

  return { success: successCount, error: errorCount, total: imageFiles.length };
}

// Find large images across the entire public directory
async function findLargeImages(minSize = 100 * 1024) { // minSize in bytes (default 100KB)
  const largeImages = [];
  
  // Recursive function to scan directories
  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules and thumbnails directories
        if (entry.name !== 'node_modules' && entry.name !== 'thumbnails') {
          scanDir(fullPath);
        }
      } else {
        // Check if it's an image
        const ext = path.extname(entry.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
          const stats = fs.statSync(fullPath);
          const sizeKB = Math.round(stats.size / 1024);
          
          if (stats.size > minSize) {
            // Get relative path from public directory
            const relativePath = path.relative(publicDir, fullPath);
            largeImages.push({
              path: relativePath,
              sizeKB: sizeKB
            });
          }
        }
      }
    }
  }
  
  scanDir(publicDir);
  
  // Sort by size (largest first)
  return largeImages.sort((a, b) => b.sizeKB - a.sizeKB);
}

// Main function
async function main() {
  console.log('=== Generating Thumbnails ===');
  
  // Process certificate images
  const certResults = await processDirectory(certificatesDir, thumbnailsDir);
  
  // Process portfolio images
  const portfolioResults = await processDirectory(portfolioDir, portfolioThumbnailsDir);
  
  // Print summary
  console.log('\n=== Thumbnail Generation Summary ===');
  console.log(`Certificates: ${certResults.success} successful, ${certResults.error} failed`);
  console.log(`Portfolio: ${portfolioResults.success} successful, ${portfolioResults.error} failed`);
  console.log(`Total: ${certResults.success + portfolioResults.success} successful, ${certResults.error + portfolioResults.error} failed`);
  
  console.log('\n=== Large Image Analysis ===');
  console.log('Scanning for large images (>100KB)...');
  
  const largeImages = await findLargeImages();
  
  console.log(`Found ${largeImages.length} large images:`);
  largeImages.forEach((img, index) => {
    console.log(`${index + 1}. ${img.path} (${img.sizeKB}KB)`);
  });
  
  console.log('\n=== Optimization Recommendations ===');
  console.log('1. For all large images, consider creating optimized versions');
  console.log('2. For vector graphics, use SVG format when possible');
  console.log('3. Use the Next.js Image component with quality settings for optimal delivery');
  console.log('4. Consider implementing responsive images with different sizes for different devices');
}

main().catch(err => {
  console.error('An error occurred:', err);
  process.exit(1);
}); 