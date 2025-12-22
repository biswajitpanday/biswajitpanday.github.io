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
const { glob } = require('glob');

// Patterns to match react-icons imports
const REACT_ICONS_IMPORT_PATTERN = /from\s+["']react-icons\/([a-z0-9]+)["']/g;

// List of icon libraries to replace
const ICON_LIBRARIES = ['fa', 'fa6', 'fi', 'si', 'di', 'tb', 'md', 'gr', 'ri', 'gi', 'go', 'pi', 'vsc', 'hi', 'hi2', 'ai', 'bs', 'io', 'io5'];

async function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

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

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Updated: ${filePath}`);
      return true;
    } else {
      console.log(`- Skipped (no changes): ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🔄 Starting react-icons to @iconify/react migration...\n');

  // Find all TypeScript/JavaScript files
  const files = await glob('**/*.{ts,tsx,js,jsx}', {
    ignore: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/dist/**',
      '**/build/**',
      '**/lib/icons.tsx',  // Skip the icons library itself
      '**/lib/iconify-converter.ts',  // Skip the converter
      '**/components/DynamicIcon.tsx'  // Skip DynamicIcon (already updated)
    ],
    cwd: path.resolve(__dirname, '..')
  });

  console.log(`Found ${files.length} files to process\n`);

  let updatedCount = 0;
  for (const file of files) {
    const fullPath = path.resolve(__dirname, '..', file);
    const updated = await replaceInFile(fullPath);
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

main().catch(console.error);
