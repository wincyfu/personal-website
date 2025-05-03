#!/bin/bash

echo "Restoring to version 1.3.5..."

# Check if backup exists
if [ -d "backup/v1.3.5" ]; then
  # Remove current files
  rm -rf src public
  rm -f package.json package-lock.json tsconfig.json next.config.js .gitignore tailwind.config.js postcss.config.js
  
  # Copy backup files
  cp -r backup/v1.3.5/src .
  cp -r backup/v1.3.5/public .
  cp backup/v1.3.5/package.json .
  cp backup/v1.3.5/package-lock.json .
  cp backup/v1.3.5/tsconfig.json .
  cp backup/v1.3.5/next.config.js .
  cp backup/v1.3.5/.gitignore .
  cp backup/v1.3.5/tailwind.config.js .
  cp backup/v1.3.5/postcss.config.js .
  
  echo "Version 1.3.5 has been restored successfully."
  echo "Please run 'npm install' to ensure all dependencies are correctly installed."
else
  echo "Error: Backup for version 1.3.5 was not found."
  echo "Make sure the backup folder 'backup/v1.3.5' exists."
  exit 1
fi 