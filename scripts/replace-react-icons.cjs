/**
 * Script to replace react-icons imports with @/lib/icons imports
 *
 * This script automatically updates all files that import from react-icons
 * to use the new centralized Iconify-based icon library.
 *
 * Usage: node scripts/replace-react-icons.js
 */

const fs = require('fs');
const path = require('path');

// List of icon libraries to replace
const ICON_LIBRARIES = ['fa', 'fa6', 'fi', 'si', 'di', 'tb', 'md', 'gr', 'ri', 'gi', 'go', 'pi', 'vsc', 'hi', 'hi2', 'ai', 'bs', 'io', 'io5'];

// Directories to skip
const SKIP_DIRS = ['node_modules', '.next', 'out', 'dist', 'build', '.git'];

function shouldSkipFile(filePath) {
  return (
    filePath.includes('lib\\icons.tsx') ||
    filePath.includes('lib/icons.tsx') ||
    filePath.includes('iconify-converter') ||
    filePath.includes('components\\DynamicIcon.tsx') ||
    filePath.includes('components/DynamicIcon.tsx')
  );
}

function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    const originalContent = content;

    // Replace each icon library import
    ICON_LIBRARIES.forEach(lib => {
      const pattern = new RegExp(`from\\s+["']react-icons/${lib}["']`, 'g');
      if (pattern.test(content)) {
        content = content.replace(pattern, `from "@/lib/icons"`);
        modified = true;
      }
    });

    // Also replace IconType import
    const iconTypePattern = /import\s+\{\s*IconType\s*\}\s+from\s+["']react-icons["']/g;
    if (iconTypePattern.test(content)) {
      content = content.replace(iconTypePattern, `import { IconType } from "@/lib/icons"`);
      modified = true;
    }

    if (modified && content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Updated: ${path.relative(process.cwd(), filePath)}`);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip certain directories
      if (!SKIP_DIRS.includes(file)) {
        walkDir(filePath, fileList);
      }
    } else if (
      (file.endsWith('.ts') ||
        file.endsWith('.tsx') ||
        file.endsWith('.js') ||
        file.endsWith('.jsx')) &&
      !shouldSkipFile(filePath)
    ) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function main() {
  console.log('🔄 Starting react-icons to @iconify/react migration...\n');

  const rootDir = path.resolve(__dirname, '..');
  const files = walkDir(rootDir);

  console.log(`Found ${files.length} files to process\n`);

  let updatedCount = 0;
  for (const file of files) {
    const updated = replaceInFile(file);
    if (updated) {
      updatedCount++;
    }
  }

  console.log(`\n✅ Migration complete!`);
  console.log(`   Updated: ${updatedCount} files`);
  console.log(`   Skipped: ${files.length - updatedCount} files`);
  console.log(`\nNext steps:`);
  console.log(`1. Run: npm run dev (to test the changes)`);
  console.log(`2. Run: npm run build (to verify production build)`);
  console.log(`3. If successful, run: npm uninstall react-icons`);
}

main();
