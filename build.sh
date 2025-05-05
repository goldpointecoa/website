#!/bin/bash

# Create public directory
mkdir -p public
mkdir -p public/css
mkdir -p public/js

# Copy CSS and JS
cp -r css/* public/css/
cp -r js/* public/js/

# Copy necessary files
cp index.html about.html contact.html contact-success.html 404.html public/
cp -f *.png *.ico *.svg public/ 2>/dev/null || true
cp -f _redirects netlify.toml public/

# Use resources-original.html as the source and encrypt it for the public directory
echo "Encrypting resources page with password: goldpointe2025"
node encrypt.js || echo "Warning: Failed to encrypt resources page"

echo "Build completed successfully!"