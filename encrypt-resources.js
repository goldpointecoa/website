/**
 * Simple script to encrypt the resources.html page with StatiCrypt
 * 
 * This script can be used in two ways:
 * 1. Include it in a webpage and call encryptWithPassword() function
 * 2. Run it directly from the browser console
 */

// Load required libraries
document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>');
document.write('<script src="js/staticrypt.js"></script>');

/**
 * Encrypt the resources page with the given password
 * @param {string} password - The password to use for encryption
 */
async function encryptWithPassword(password = 'goldpointe2025') {
    try {
        console.log('Starting encryption process...');
        
        // Check if StaticryptFunctions is available
        if (typeof StaticryptFunctions === 'undefined') {
            console.error('StaticryptFunctions not found. Make sure staticrypt.js is loaded.');
            return;
        }
        
        // Encrypt the resources page
        await StaticryptFunctions.encryptResourcesPage(password);
        
        console.log('Encryption complete. The encrypted file has been downloaded.');
        console.log('Replace your resources.html file with the downloaded file.');
    } catch (error) {
        console.error('Error during encryption:', error);
    }
}

// Self-executing function to allow console usage
(function() {
    if (typeof window !== 'undefined') {
        // Make the function available globally
        window.encryptResourcesPage = encryptWithPassword;
        
        // Add message for console users
        console.log('To encrypt resources.html, run: encryptResourcesPage("your-password")');
        console.log('Or use the default password (goldpointe2025) by running: encryptResourcesPage()');
    }
})();