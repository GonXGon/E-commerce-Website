const fs = require('fs');
const path = require('path');

// Directory you want to read (current backend directory)
const backendDir = path.resolve(__dirname); // Set your backend folder here
const outputFilePath = path.join(__dirname, 'backend-context.txt');

// List of backend directories to include
const includeFolders = ['config', 'controllers', 'middleware', 'routes', 'models', 'uploads']; // Add other backend folders as necessary
// Define which file extensions to include
const includeExtensions = ['.js', '.json', '.md', '.txt'];

// Recursive function to read files and directories
function readDirectory(directory) {
  const fileList = [];
  const items = fs.readdirSync(directory);

  items.forEach(item => {
    const fullPath = path.join(directory, item);
    const stat = fs.statSync(fullPath);

    // Skip node_modules and other unwanted directories
    if (stat.isDirectory() && item !== 'node_modules' && includeFolders.includes(item)) {
      fileList.push(...readDirectory(fullPath)); // Recursively add files from subfolders
    } else if (!stat.isDirectory() && includeExtensions.includes(path.extname(fullPath))) {
      fileList.push(fullPath); // Only include files with specific extensions
    }
  });

  return fileList;
}

// Main function to gather content
function gatherProjectContent() {
  const files = readDirectory(backendDir);

  let outputContent = '';

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(backendDir, file);
    outputContent += `\n\n----- File: ${relativePath} -----\n\n`;
    outputContent += content;
  });

  fs.writeFileSync(outputFilePath, outputContent);
  console.log(`Backend content saved to ${outputFilePath}`);
}

// Run the function
gatherProjectContent();
