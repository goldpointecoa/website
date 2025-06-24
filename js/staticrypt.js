/**
 * StatiCrypt
 * Copyright (c) 2016-2020 Robinmoisson
 * Licensed under the MIT License
 * 
 * This is a simple JavaScript library to password-protect static HTML pages.
 * It uses AES-256 to encrypt the content of a page and creates a password prompt.
 * 
 * Adapted from: https://github.com/robinmoisson/staticrypt
 */

// Base template for the password prompt page
const templateHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Protected: Resources - Gold Pointe Condo Owners Association</title>
    <meta name="description" content="Password-protected resources for Gold Pointe owners">
    <link rel="stylesheet" href="css/styles.css">
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .password-container {
            max-width: 400px;
            margin: 100px auto;
            padding: 30px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        
        .password-container h2 {
            color: #1f3a5f;
            margin-bottom: 20px;
        }
        
        .password-container p {
            margin-bottom: 25px;
        }
        
        .password-form {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .password-input {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #dee2e6;
            border-radius: 4px;
        }
        
        .password-submit {
            display: inline-block;
            padding: 10px 20px;
            background-color: #b8860b;
            color: white;
            border: none;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .password-submit:hover {
            background-color: #1f3a5f;
        }
        
        .password-error {
            color: #dc3545;
            margin-top: 15px;
            display: none;
        }
        
        .back-link {
            margin-top: 20px;
            display: inline-block;
            color: #1f3a5f;
        }
        
        .back-link:hover {
            color: #b8860b;
        }
    </style>
</head>
<body>
    <header>
        <div class="logo">
            <h1>Gold Pointe</h1>
            <p>Condo Owners Association</p>
        </div>
        <nav>
            <button class="menu-toggle" aria-label="Toggle menu">
                <i class="fas fa-bars"></i>
            </button>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="events.html">Events</a></li>
                <li><a href="resources.html" class="active">Resources</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <div class="password-container">
            <h2>Owner Resources</h2>
            <p>This page is password-protected. Please enter the password to access the resources.</p>
            
            <div id="password-form" class="password-form">
                <input type="password" id="password-input" class="password-input" placeholder="Enter password" required>
                <button type="button" id="password-submit" class="password-submit">Access Resources</button>
                <p id="password-error" class="password-error">Incorrect password. Please try again.</p>
            </div>
            
            <a href="index.html" class="back-link">Return to homepage</a>
        </div>
    </main>

    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>Gold Pointe COA</h3>
                <p>3008 N Narrows Dr.<br>Tacoma, WA 98407</p>
            </div>
            <div class="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="events.html">Events</a></li>
                    <li><a href="resources.html">Resources</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Gold Pointe Condo Owners Association. All rights reserved.</p>
        </div>
    </footer>

    <script>
        // Decrypt and display the page content if the password is correct
        document.getElementById('password-submit').addEventListener('click', function() {
            checkPassword();
        });
        
        // Allow hitting enter to submit password
        document.getElementById('password-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
        
        function checkPassword() {
            const passwordInput = document.getElementById('password-input');
            const passwordError = document.getElementById('password-error');
            const password = passwordInput.value;
            
            if (decrypt(password)) {
                // Password is correct
                passwordError.style.display = 'none';
            } else {
                // Password is incorrect
                passwordError.style.display = 'block';
                passwordInput.value = '';
                passwordInput.focus();
            }
        }
        
        // Decryption function - will be injected by the StatiCrypt script
        function decrypt(password) {
            // This function will be replaced when the page is encrypted
            return false;
        }
        
        // Mobile menu toggle functionality
        document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            
            if (menuToggle) {
                menuToggle.addEventListener('click', function() {
                    navLinks.classList.toggle('active');
                });
            }
            
            // Add current year to footer copyright
            const yearElement = document.querySelector('.footer-bottom p');
            if (yearElement) {
                const currentYear = new Date().getFullYear();
                yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
            }
        });
    </script>
</body>
</html>
`;

/**
 * StatiCrypt encryption function
 * @param {string} content - The content to encrypt
 * @param {string} password - The password to use for encryption
 * @returns {string} - The encrypted content as a standalone HTML file
 */
function encryptContent(content, password) {
    if (!content || !password) {
        console.error('Content and password are required for encryption');
        return null;
    }
    
    // Import CryptoJS library dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';
    script.async = true;
    
    return new Promise((resolve, reject) => {
        script.onload = function() {
            try {
                // Generate a random salt
                const salt = CryptoJS.lib.WordArray.random(128 / 8);
                
                // Derive key from password using PBKDF2
                const key = CryptoJS.PBKDF2(password, salt, {
                    keySize: 256 / 32,
                    iterations: 1000
                });
                
                // Generate random IV
                const iv = CryptoJS.lib.WordArray.random(128 / 8);
                
                // Encrypt content
                const encrypted = CryptoJS.AES.encrypt(content, key, {
                    iv: iv,
                    padding: CryptoJS.pad.Pkcs7,
                    mode: CryptoJS.mode.CBC
                });
                
                // Create data object with all encryption info
                const data = {
                    salt: salt.toString(),
                    iv: iv.toString(),
                    encrypted: encrypted.toString()
                };
                
                // Create the decryption function for the template
                const decryptFunction = `
                function decrypt(password) {
                    try {
                        const encrypted = "${data.encrypted}";
                        const salt = CryptoJS.enc.Hex.parse("${data.salt}");
                        const iv = CryptoJS.enc.Hex.parse("${data.iv}");
                        
                        const key = CryptoJS.PBKDF2(password, salt, {
                            keySize: 256 / 32,
                            iterations: 1000
                        });
                        
                        const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
                            iv: iv,
                            padding: CryptoJS.pad.Pkcs7,
                            mode: CryptoJS.mode.CBC
                        });
                        
                        const content = decrypted.toString(CryptoJS.enc.Utf8);
                        
                        if (content) {
                            // Replace entire page content with decrypted content
                            document.open();
                            document.write(content);
                            document.close();
                            return true;
                        }
                        return false;
                    } catch (e) {
                        console.error(e);
                        return false;
                    }
                }`;
                
                // Create the final HTML by adding the CryptoJS library and replacing the decrypt function
                let finalHtml = templateHtml.replace('function decrypt(password) {\n            // This function will be replaced when the page is encrypted\n            return false;\n        }', decryptFunction);
                
                // Add CryptoJS library to the template
                finalHtml = finalHtml.replace('</head>', '<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>\n</head>');
                
                resolve(finalHtml);
            } catch (error) {
                reject(error);
            }
        };
        
        script.onerror = function() {
            reject(new Error('Failed to load CryptoJS library'));
        };
        
        document.head.appendChild(script);
    });
}

/**
 * Function to encrypt the resources.html page
 * @param {string} password - The password to use for encryption
 */
async function encryptResourcesPage(password) {
    try {
        // Get the resources.html content
        const response = await fetch('resources.html');
        if (!response.ok) {
            throw new Error('Failed to fetch resources.html');
        }
        
        const content = await response.text();
        
        // Encrypt the content
        const encryptedHtml = await encryptContent(content, password);
        
        // Create a download link for the encrypted file
        const blob = new Blob([encryptedHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resources.html';
        a.style.display = 'none';
        
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
        
        console.log('Resources page encrypted successfully. Download should start automatically.');
    } catch (error) {
        console.error('Error encrypting resources page:', error);
    }
}

// Export the functions for use in the command line or web interface
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        encryptContent,
        encryptResourcesPage
    };
}

// If this script is loaded in a browser directly, make the functions globally available
if (typeof window !== 'undefined') {
    window.StaticryptFunctions = {
        encryptContent,
        encryptResourcesPage
    };
}
