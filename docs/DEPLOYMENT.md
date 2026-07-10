# Deployment Plan & Execution

## Architecture overview

```
┌──────────────┐        HTTPS         ┌──────────────────┐        REST API        ┌──────────────┐
│   Browser     │ ──────────────────▶ │  Static Hosting   │ ──────────────────────▶ │  Backend API  │
│  (React SPA)  │ ◀────────────────── │  (Vercel/Netlify) │ ◀────────────────────── │  (Node/Java)  │
└──────────────┘    HTML/JS/CSS       └──────────────────┘      JSON responses     └──────────────┘
```

## Deployment steps

### Step 1 — Build the production bundle

```bash
npm run build
```

This runs `tsc -b && vite build`, producing an optimised static bundle in the `build/` directory with hashed filenames for cache-busting.

### Step 2 — Choose a hosting platform

| Platform | Recommended for | Configuration |
|---|---|---|
| **Vercel** | Easiest setup; GitHub integration | Connect repo → auto-detects Vite; set `Build Command: npm run build`, `Output Directory: build` |
| **Netlify** | Similar ease; form/redirect support | Connect repo → set `Build command: npm run build`, `Publish directory: build` |
| **AWS S3 + CloudFront** | Production-grade; custom domain + CDN | Upload `build/` to S3 bucket; configure CloudFront distribution with SPA fallback (`index.html` for 404s) |
| **Docker** | Self-hosted / on-prem | Use an `nginx` image serving the `build/` folder (see Dockerfile below) |

### Step 3 — Configure environment variables

Set the following environment variable on the hosting platform:

```
VITE_API_BASE_URL=https://your-backend-api.com/api
```

> On Vercel/Netlify, add this in the dashboard under **Environment Variables**. The variable is embedded at build time.

### Step 4 — Configure SPA routing

Since SOCRA is a single-page application with client-side routing (`react-router-dom`), all paths must redirect to `index.html`:

- **Vercel**: Add a `vercel.json` file:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
- **Netlify**: Add a `_redirects` file in `public/`:
  ```
  /*    /index.html   200
  ```
- **Nginx**: Add `try_files $uri /index.html;` to the server block.

### Step 5 — Verify deployment

1. Visit the deployed URL and confirm the landing page loads.
2. Navigate to `/signin` and `/dashboard` to verify client-side routing works (no 404).
3. Sign in and test a core flow (upload a document → start a Socratic session) to confirm the backend API connection.
4. Test on mobile (phone browser) to verify responsive layout.

## Tools used

| Tool | Purpose |
|---|---|
| **Vite** | Bundling, tree-shaking, code-splitting, and asset hashing |
| **TypeScript Compiler (`tsc`)** | Pre-build type-checking to catch errors before deployment |
| **Vercel / Netlify** | Hosting, CI/CD, HTTPS, and CDN distribution |
| **Git + GitHub** | Version control, branch-based deployments, and PR previews |
