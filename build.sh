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

# Nothing needed here

# Use resources-original.html as the source and encrypt it for the public directory
echo "Encrypting resources page with password: goldpointe2025"
node -e "
const fs = require('fs');
const CryptoJS = require('crypto-js');

// Read resources-original.html
const sourceHtml = fs.readFileSync('resources-original.html', 'utf8');
const password = 'goldpointe2025';

// Simple encryption for demo purpose - in production use proper StaticryptJS
const encrypted = CryptoJS.AES.encrypt(sourceHtml, password).toString();

// Create a simple password page
// Template literals seem to have an issue in this environment
// Let's use string concatenation instead
const protectedPage = 
`<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Protected: Resources - Gold Pointe Condo Owner's Association</title>
    <link rel='stylesheet' href='css/styles.css'>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js'></script>
</head>
<body>
    <header>
        <div class='logo'>
            <h1>Gold Pointe</h1>
            <p>Condo Owner's Association</p>
        </div>
        <nav>
            <button class='menu-toggle' aria-label='Toggle menu'>
                <i class='fas fa-bars'></i>
            </button>
            <ul class='nav-links'>
                <li><a href='index.html'>Home</a></li>
                <li><a href='about.html'>About</a></li>
                <li><a href='resources.html' class='active'>Resources</a></li>
                <li><a href='contact.html'>Contact</a></li>
            </ul>
        </nav>
    </header>

    <main class='container'>
        <div class='password-container'>
            <h2>Password Protected Area</h2>
            <p>This page is for Gold Pointe condo owners only. Please enter the password to access resources.</p>
            <form id='password-form'>
                <div class='form-group'>
                    <label for='password'>Password:</label>
                    <input type='password' id='password' name='password' required>
                </div>
                <button type='submit' class='btn'>Access Resources</button>
                <p id='error-message' class='error-message'></p>
            </form>
        </div>
    </main>

    <footer>
        <div class='footer-content'>
            <div class='footer-section'>
                <h3>Gold Pointe COA</h3>
                <p>123 Gold Avenue<br>Anytown, ST 12345</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@goldpointecoa.com</p>
            </div>
            <div class='footer-section'>
                <h3>Quick Links</h3>
                <ul>
                    <li><a href='index.html'>Home</a></li>
                    <li><a href='about.html'>About</a></li>
                    <li><a href='resources.html'>Resources</a></li>
                    <li><a href='contact.html'>Contact</a></li>
                </ul>
            </div>
        </div>
        <div class='footer-bottom'>
            <p>&copy; 2023 Gold Pointe Condo Owner's Association. All rights reserved.</p>
        </div>
    </footer>

    <script>
        document.getElementById('password-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const encrypted = '` + encrypted + `';
            
            try {
                // Try to decrypt
                const decrypted = CryptoJS.AES.decrypt(encrypted, password).toString(CryptoJS.enc.Utf8);
                
                if (decrypted) {
                    // Store success in sessionStorage
                    sessionStorage.setItem('resourcesContent', decrypted);
                    // Replace the page content with decrypted content
                    document.open();
                    document.write(decrypted);
                    document.close();
                } else {
                    document.getElementById('error-message').textContent = 'Incorrect password. Please try again.';
                }
            } catch (e) {
                document.getElementById('error-message').textContent = 'Incorrect password. Please try again.';
            }
        });
    </script>
</body>
</html>`;

fs.writeFileSync('public/resources.html', protectedPage);
console.log('Resources page encrypted and saved to public/resources.html');
" || echo "Warning: Failed to encrypt resources page"

echo "Build completed successfully!"