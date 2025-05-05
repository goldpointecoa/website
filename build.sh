#!/bin/bash

# Create public directory
mkdir -p public

# Copy all files to public directory
cp -r *.html css js images *.png *.ico *.svg _redirects 404.html contact-success.html public/

# Copy Netlify configuration files
cp -f netlify.toml public/

# Ensure sensitive files are not included
rm -f public/admin.html
rm -f public/resources-original.html
rm -f public/README.md
rm -f public/encrypt-resources.js
rm -f public/.gitignore
rm -f public/build.sh

echo "Build completed without sensitive files."