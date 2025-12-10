const fs = require('fs');

// Read main branch skills data
const mainContent = fs.readFileSync('temp_main_skills.txt', 'utf-8');

// Extract all skill names from main branch
const mainSkillsRegex = /name:\s*"([^"]+)",\s*metadata:\s*{\s*icon:[^}]+,\s*level:/g;
const mainSkills = [];
let match;
while ((match = mainSkillsRegex.exec(mainContent)) !== null) {
  mainSkills.push(match[1]);
}

console.log('Main branch skills (' + mainSkills.length + '):');
console.log(mainSkills.sort().join('\n'));
