#!/bin/bash

# Build the Next.js application
echo "Building the application..."
npm run build

# Ensure the build directory exists
if [ ! -d "build" ]; then
  echo "Error: Build directory not found!"
  exit 1
fi

# Create .nojekyll file to allow files starting with underscore
touch ./build/.nojekyll

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
npx gh-pages -d build -t true

echo "Deployment complete!" 