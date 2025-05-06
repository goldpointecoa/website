# Architecture Overview - Gold Pointe Condo Owner's Association Website

## 1. Overview

The Gold Pointe Condo Owner's Association website is a static HTML website designed to provide information and resources to condominium owners. The site follows a simple, traditional web architecture with HTML, CSS, and minimal JavaScript, focusing on ease of maintenance and deployment. The site includes public-facing content as well as password-protected resources for owners.

## 2. System Architecture

The application follows a simple static website architecture:

```
Gold Pointe Website
├── Frontend (Static HTML/CSS/JS)
│   ├── Public Pages (Home, About, Contact)
│   └── Protected Pages (Resources)
├── Deployment
│   └── Netlify Integration
└── Form Handling
    └── Netlify Forms
```

### Key Architecture Decisions

- **Static Site Approach**: The website is built using static HTML files rather than a dynamic content management system. This approach was chosen for simplicity, security, and minimal hosting requirements.
  - **Pros**: Fast loading, improved security, low hosting costs, easy maintenance
  - **Cons**: Limited dynamic functionality without additional services

- **Password Protection**: The resources page uses client-side password protection via the StatiCrypt library to encrypt and protect content without requiring server-side authentication.
  - **Pros**: Enables basic content protection without a backend
  - **Cons**: Client-side encryption is not as secure as server-side authentication

## 3. Key Components

### 3.1 Frontend

The frontend is built using standard web technologies:

- **HTML**: Core content structure with semantic markup
- **CSS**: Styling with a responsive design approach
- **JavaScript**: Minimal client-side functionality
  - Mobile menu toggle
  - Year updating in the footer
  - Password protection for resources

#### File Structure

```
/
├── index.html             # Homepage
├── about.html             # About page
├── contact.html           # Contact form
├── resources.html         # Password-protected resources
├── contact-success.html   # Form submission confirmation
├── 404.html               # Custom error page
├── css/
│   └── styles.css         # Global styles
└── js/
    ├── main.js            # General site functionality
    └── staticrypt.js      # Password protection script
```

### 3.2 Form Handling

The site uses Netlify Forms for contact form submission and processing:
- HTML forms with the `data-netlify="true"` attribute
- Form success page (`contact-success.html`) for post-submission feedback

### 3.3 Authentication

The site implements a simple client-side password protection for the resources page:
- StatiCrypt library for AES-256 encryption of protected content
- No server-side authentication or user accounts

## 4. Data Flow

The data flow in the application is straightforward:

1. **Public Content Access**:
   - User requests a page → Static HTML is served → User views content

2. **Protected Content Access**:
   - User navigates to resources page → Password prompt displayed → User enters password → Client-side script decrypts content if password is correct → User views protected content

3. **Form Submission**:
   - User fills out contact form → Form submitted to Netlify → User redirected to success page → Netlify processes and stores form submission

## 5. External Dependencies

The website has minimal external dependencies:

- **Font Awesome**: Used for icons throughout the site
  - Loaded via CDN: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`

- **Netlify**: Used for hosting, forms processing, and redirect rules
  - Configuration in `netlify.toml`

- **StatiCrypt**: Client-side encryption library for password protection
  - Included in `js/staticrypt.js`

## 6. Deployment Strategy

The site is configured for deployment on Netlify with the following features:

### 6.1 Netlify Configuration

The `netlify.toml` file specifies:
- HTTP security headers
- Custom redirects and error pages
- URL normalization rules
- Build and publish configuration

### 6.2 Development Environment

The repository includes:
- `.replit` configuration for running a development server
- Python HTTP server for local testing (`python -m http.server 5000`)
- `package.json` with `http-server` dependency for Node.js-based local testing

### 6.3 Resource Protection

The site implements several security measures:
- Password protection for sensitive resources
- Redirect rules to prevent access to internal files like `README.md` and `admin-encrypt.html`
- Security headers for improved browser security