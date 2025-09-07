#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Fix paths in HTML files to use relative paths for GitHub Pages
function fixPathsInFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace absolute paths with relative paths
  content = content.replace(/href="\/build\//g, 'href="./build/');
  content = content.replace(/src="\/build\//g, 'src="./build/');
  content = content.replace(/href="\/css\//g, 'href="./css/');
  content = content.replace(/src="\/css\//g, 'src="./css/');
  content = content.replace(/data-resources-url="\/build\/"/g, 'data-resources-url="./build/"');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed paths in: ${filePath}`);
}

// Fix paths in all HTML files in www directory
const wwwDir = path.join(__dirname, 'www');
if (fs.existsSync(wwwDir)) {
  const files = fs.readdirSync(wwwDir);
  
  files.forEach(file => {
    if (file.endsWith('.html')) {
      fixPathsInFile(path.join(wwwDir, file));
    }
  });
  
  console.log('Path fixing completed!');
} else {
  console.log('www directory not found');
}