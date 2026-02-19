# GitHub Pages Deployment Guide

## Overview

This project uses **GitHub Actions** to automatically build and deploy to GitHub Pages. Environment variables (Firebase config) are stored as **GitHub Secrets** - never committed to the repository.

## Step 1: Push Code to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/plane_demo_2.git

# Push to main branch
git push -u origin main
```

## Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add each of these secrets (one at a time):

| Secret Name | Value (from Firebase Console) |
|-------------|-------------------------------|
| `VITE_FIREBASE_API_KEY` | Your Firebase API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | your-project.firebaseapp.com |
| `VITE_FIREBASE_PROJECT_ID` | your-project-id |
| `VITE_FIREBASE_STORAGE_BUCKET` | your-project.appspot.com |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | 123456789 |
| `VITE_FIREBASE_APP_ID` | 1:123:web:abc |

### How to find these values:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon → **Project settings**
4. Scroll to **"Your apps"** section
5. Copy each value

## Step 3: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under **"Build and deployment"**:
   - Source: **GitHub Actions**

## Step 4: Deploy

The deployment happens automatically when you push to the `main` branch.

To manually trigger deployment:
1. Go to **Actions** tab
2. Select **"Deploy to GitHub Pages"**
3. Click **"Run workflow"**

## Step 5: Access Your Site

After successful deployment, your site will be available at:

```
https://YOUR_USERNAME.github.io/plane_demo_2/
```

## Updating the Repository Name

If your repository has a different name, update `vite.config.ts`:

```typescript
base: process.env.GITHUB_PAGES ? '/YOUR_REPO_NAME/' : '/',
```

## Using a Custom Domain

If you want to use a custom domain (e.g., `airblock.ua`):

1. In your repository, go to **Settings** → **Pages**
2. Under **"Custom domain"**, enter your domain
3. Update `vite.config.ts`:
   ```typescript
   base: '/',  // Use root for custom domains
   ```
4. Add a `CNAME` file to the `public/` folder:
   ```
   airblock.ua
   ```

## Troubleshooting

### Build fails with "secret not found"
- Make sure all secrets are added in **Settings** → **Secrets and variables** → **Actions**
- Secret names must match exactly (case-sensitive)

### 404 error on page refresh
This is a GitHub Pages limitation with client-side routing. Add a `404.html` that redirects to `index.html`:

```bash
cp dist/index.html dist/404.html
```

Or add this to the build step in `.github/workflows/deploy.yml`:
```yaml
- name: Copy index.html to 404.html
  run: cp dist/index.html dist/404.html
```

### Admin page not working
Make sure you've added your GitHub Pages domain to Firebase Auth:
1. Go to Firebase Console → Authentication → Settings
2. Under **"Authorized domains"**, add:
   - `YOUR_USERNAME.github.io`

## Security Notes

✅ **Safe to commit:**
- All source code
- `vite.config.ts`
- `.github/workflows/deploy.yml`

❌ **Never commit:**
- `.env` files
- Firebase private keys
- Any file containing actual secret values

The GitHub Secrets are:
- Encrypted at rest
- Only exposed during the build process
- Not visible in logs (automatically masked)
