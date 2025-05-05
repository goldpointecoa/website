// Command line utility to encrypt the resources page
// Usage: node encrypt-resources.js [password]
// If no password is provided, it will use the default 'goldpointe2025'

const fs = require('fs');
const path = require('path');
const StaticryptFunctions = require('./js/staticrypt');

/**
 * Encrypt the resources page with the given password
 * @param {string} password - The password to use for encryption
 */
async function encryptWithPassword(password = 'goldpointe2025') {
    console.log(`Encrypting resources page with password: ${password}`);

    try {
        // Read the resources-original.html file
        let content;
        try {
            content = fs.readFileSync('resources-original.html', 'utf8');
            console.log('Using resources-original.html as source');
        } catch (err) {
            // Fallback to resources.html if resources-original.html doesn't exist
            console.log('resources-original.html not found, using resources.html as source');
            content = fs.readFileSync('resources.html', 'utf8');
        }

        // Encrypt the content
        const encryptedHtml = await StaticryptFunctions.encryptContent(content, password);

        // Write the encrypted content to resources.html
        fs.writeFileSync('resources.html', encryptedHtml);
        console.log('Resources page encrypted successfully!');
        console.log('Encrypted file saved to: resources.html');

    } catch (error) {
        console.error('Error encrypting resources page:', error);
        process.exit(1);
    }
}

// Get the password from command line arguments or use default
const password = process.argv[2] || 'goldpointe2025';
encryptWithPassword(password);