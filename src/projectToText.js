const fs = require('fs');
const path = require('path');

// Directory you want to read
const projectDir = path.resolve(__dirname); // current directory
const outputFilePath = path.join(__dirname, 'project-context.txt');

// Define which file extensions to include
const includeExtensions = ['.js', '.jsx', '.json', '.css', '.html', '.md', '.txt'];

// Recursive function to read files and directories
function readDirectory(directory) {
  const fileList = [];
  const items = fs.readdirSync(directory);

  items.forEach(item => {
    const fullPath = path.join(directory, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      fileList.push(...readDirectory(fullPath)); // Recursively add files from subfolders
    } else {
      if (includeExtensions.includes(path.extname(fullPath))) {
        fileList.push(fullPath); // Only include files with specific extensions
      }
    }
  });

  return fileList;
}

// Main function to gather content
function gatherProjectContent() {
  const files = readDirectory(projectDir);

  let outputContent = '';

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(projectDir, file);
    outputContent += `\n\n----- File: ${relativePath} -----\n\n`;
    outputContent += content;
  });

  fs.writeFileSync(outputFilePath, outputContent);
  console.log(`Project content saved to ${outputFilePath}`);
}

// Run the function
gatherProjectContent();
