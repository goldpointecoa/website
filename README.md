# Gold Pointe Condo Owner's Association Website

This repository contains the source code for the official website of Gold Pointe Condo Owner's Association. The website is designed to be simple, static, and easily deployable on platforms like GitHub Pages and Netlify.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup and Development](#setup-and-development)
- [Password Protection with StatiCrypt](#password-protection-with-staticrypt)
- [Netlify Form Integration](#netlify-form-integration)
- [Deployment](#deployment)
- [Customization](#customization)
- [License](#license)

## Features

- **Simple and clean design**: Responsive layout that works on all devices
- **Static HTML/CSS website**: No databases or complex server-side technologies
- **Password-protected resources page**: Secure access to owner documents using StatiCrypt
- **Netlify contact form**: Built-in form handling without server-side code
- **Google integration**: Links to Google Drive for documents and Google Calendar for events

## Project Structure

```
gold-pointe-coa-website/
├── index.html              # Home page
├── about.html              # About page
├── resources.html          # Resources page (to be encrypted)
├── contact.html            # Contact page with Netlify form
├── admin-encrypt.html      # Admin tool to encrypt resources page
├── encrypt-resources.js    # Script for resources page encryption
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── main.js             # Main JavaScript file
│   └── staticrypt.js       # StatiCrypt library for password protection
└── README.md               # Documentation
```

## Setup and Development

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/gold-pointe-coa-website.git
   cd gold-pointe-coa-website
   ```

2. Open the project in your favorite code editor

3. For local development, you can use any static file server. For example:
   ```
   # Using Python's built-in server
   python -m http.server 5000
   
   # Or with Node.js http-server
   npx http-server -p 5000
   ```

4. Visit `http://localhost:5000` in your browser to view the site

## Password Protection with StatiCrypt

The resources page is designed to be password-protected using StatiCrypt, which encrypts the entire page content client-side.

### How to Encrypt the Resources Page

#### Method 1: Using the Admin Tool (Recommended)

1. Navigate to `admin-encrypt.html` in your browser
2. Enter the desired password (default is "goldpointe2025")
3. Click "Encrypt Resources Page"
4. A download will start automatically with the encrypted version of resources.html
5. Replace the original resources.html with the downloaded file

#### Method 2: Using Browser Console

1. Open your website in a browser
2. Navigate to any page
3. Open the browser console (F12 or right-click > Inspect > Console)
4. Run the following command:
   ```javascript
   // With default password (goldpointe2025)
   StaticryptFunctions.encryptResourcesPage('goldpointe2025');
   ```
5. A download will start with the encrypted file
6. Replace the original resources.html with this file

#### Method 3: Using the JavaScript File

1. Create an HTML file that includes the encryption script:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
     <script src="js/staticrypt.js"></script>
     <script src="encrypt-resources.js"></script>
   </head>
   <body>
     <button onclick="encryptResourcesPage('goldpointe2025')">Encrypt Resources</button>
   </body>
   </html>
   ```
2. Open this file in a browser and click the button
3. Replace the original resources.html with the downloaded file

### Updating Protected Content

When you need to update the content in the resources page, you have two options:

#### Option 1: Using the Admin Dashboard (Recommended)

1. Navigate to the admin dashboard at `admin.html` (local) or your-site.com/admin.html (production)
2. Go to the "Edit Resources" tab
3. Click "Load Content" to load the current resources page content
4. Make your changes to the HTML content
5. Click "Save Changes" to download the updated `resources-original.html` file
6. Replace the existing `resources-original.html` with this downloaded file
7. Go to the "Encrypt Resources" tab
8. Enter the password (default is "goldpointe2025")
9. Click "Encrypt Resources Page"
10. A download will start with the encrypted version of `resources.html`
11. Replace the existing `resources.html` file with this downloaded file

The admin dashboard makes it easy to:
- Edit the content without editing the HTML file directly
- Preview the resources page before encrypting it
- Encrypt the page with one click

#### Option 2: Manual Update

1. Make changes to the `resources-original.html` file 
2. Re-encrypt the page using one of the encryption methods described above
3. Replace the encrypted version with the new encrypted file

#### Important Notes About Resources Page Updates

- The file `resources-original.html` contains the unencrypted content and is **not** deployed to your website (it's in the .gitignore file)
- The file `resources.html` is the encrypted version that visitors see on your website
- Always keep a backup of `resources-original.html` to make future updates easier

## Netlify Form Integration

The contact form is pre-configured to work with Netlify's form handling service. When you deploy the site to Netlify, the form will automatically be recognized and set up for processing.

Key features:
- No server-side code required
- Form submissions are stored in your Netlify dashboard
- Includes spam filtering with honeypot field
- Can be configured for email notifications

To set up email notifications for form submissions:
1. Log in to your Netlify dashboard
2. Go to Site settings > Forms > Form notifications
3. Add a notification for the "contact" form
4. Select "Email notification" and enter your email address

## Deployment

### Deploying to Netlify

The simplest way to deploy this website is through Netlify:

1. Sign up or log in to [Netlify](https://www.netlify.com/)
2. Click "New site from Git"
3. Select your Git provider (GitHub, GitLab, etc.)
4. Select the repository for this website
5. Configure build settings (not needed for this static site; leave defaults)
6. Click "Deploy site"

Your site will be deployed to a Netlify subdomain (e.g., `your-site-name.netlify.app`). You can connect a custom domain in the Netlify settings.

### Deploying to GitHub Pages

You can also deploy to GitHub Pages:

1. Push your code to a GitHub repository
2. Go to repository settings > Pages
3. Select the branch to deploy (usually `main` or `master`)
4. Select the folder (usually `/` or `/docs`)
5. Click "Save"

Your site will be available at `https://yourusername.github.io/repository-name/`.

## Customization

To customize the website for your own condo association:

1. **Update Content**:
   - Edit the HTML files to update text and information
   - Update contact details in all pages (address, phone, email)
   - Replace placeholder Google Drive and Calendar links with your actual links

2. **Visual Customization**:
   - Change colors in `css/styles.css` by modifying the variables in the `:root` section
   - Replace the hero image by changing the URL in the `.hero` section of CSS
   - Update font choices in the CSS variables

3. **Additional Pages**:
   - Create new HTML files for additional pages
   - Add links to the navigation menu in each page
   - Update the footer links in each page

## License

This project is licensed under the MIT License - see the LICENSE file for details.

