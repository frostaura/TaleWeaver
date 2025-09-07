# GitHub Pages Setup for Root Domain Deployment

This document explains how to deploy the TaleWeaver StencilJS application to your root GitHub Pages URL (`https://frostaura.github.io/`) instead of the project subdirectory (`https://frostaura.github.io/TaleWeaver/`).

## 🎯 Problem Solved

**Before:** Application deployed to `https://frostaura.github.io/TaleWeaver/` with routing/loading issues  
**After:** Application will deploy to `https://frostaura.github.io/` with proper path resolution

## 🔧 Solution Overview

By default, GitHub Pages deploys project repositories to `<username>.github.io/<repository-name>/`. To deploy to the root URL (`<username>.github.io/`), you need to:

1. Create a repository named `<username>.github.io` (in your case: `frostaura.github.io`)
2. Configure the workflow to deploy to that repository
3. Set up a Personal Access Token for cross-repository deployment

## 📋 Setup Instructions

### Step 1: Create Your User Pages Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named **exactly**: `frostaura.github.io`
3. Make it public (required for GitHub Pages)
4. Initialize with a README if you want
5. Go to the repository Settings → Pages
6. Set Source to "Deploy from a branch"
7. Set Branch to "main" and folder to "/ (root)"

### Step 2: Create a Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Set expiration as needed (recommend 1 year)
4. Select these scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Generate the token and **copy it immediately** (you won't see it again)

### Step 3: Add the Token to Repository Secrets

1. Go to this repository's Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `PAGES_DEPLOY_TOKEN`
4. Value: Paste the Personal Access Token you created
5. Click "Add secret"

### Step 4: Enable the New Workflow

The new workflow file `deploy-to-user-pages.yml` will automatically:
- ✅ Build the StencilJS application when you push changes
- ✅ Deploy the built files to your `frostaura.github.io` repository
- ✅ Use relative paths that work correctly at the root domain
- ✅ Trigger on pushes to main/master branches in the StencilJS directory

### Step 5: Disable the Old Workflow (Optional)

You can disable or delete the old `deploy-stencil-to-pages.yml` workflow if you no longer want to deploy to the project subdirectory.

## 🛠️ How It Works

1. **Trigger:** When you push changes to the TaleWeaver StencilJS code
2. **Build:** Workflow builds the StencilJS application with proper path configuration
3. **Deploy:** Built files are pushed to the `frostaura.github.io` repository
4. **Live:** GitHub Pages automatically serves content from `https://frostaura.github.io/`

## ✅ Technical Verification

The solution has been tested and verified:
- ✅ StencilJS builds successfully with relative paths
- ✅ All CSS, JS, and image resources use `./` relative paths
- ✅ Application loads correctly when served from root domain
- ✅ Workflow YAML syntax is valid
- ✅ Build process completes without errors

## 🚨 Troubleshooting

### Repository Not Found Error
- Make sure you've created the `frostaura.github.io` repository
- Verify the repository is public
- Check that the Personal Access Token has the correct permissions

### Authentication Error
- Verify the `PAGES_DEPLOY_TOKEN` secret is correctly set
- Make sure the Personal Access Token hasn't expired
- Confirm the token has `repo` scope permissions

### Content Not Updating
- Check the Actions tab for any workflow failures
- Verify the `frostaura.github.io` repository received the new commits
- GitHub Pages may take a few minutes to update after deployment

## 📁 Files Modified

- ✅ `.github/workflows/deploy-to-user-pages.yml` - New workflow for root domain deployment
- ✅ `src/frontend/src/components/twui/fix-paths.js` - Already configured for relative paths
- ✅ `src/frontend/src/components/twui/stencil.config.ts` - Already configured for www output

The existing path-fixing mechanisms in the StencilJS build ensure that all resources (CSS, JS, images) use relative paths that work correctly at the root domain.

## 🎉 Expected Result

After setup, your TaleWeaver application will be available at:
- **New URL:** `https://frostaura.github.io/` ← **This is what you wanted!**
- **Old URL:** `https://frostaura.github.io/TaleWeaver/` ← Will still work if you keep the old workflow