# StencilJS GitHub Pages Deployment

This repository includes a GitHub Action workflow that automatically builds and deploys the StencilJS project to GitHub Pages.

## Project Location
The StencilJS project is located at: `src/frontend/src/components/twui/`

## Deployment Details

### Automatic Deployment
The workflow triggers automatically when:
- Changes are pushed to the `main` or `master` branch
- Changes are made to files in `src/frontend/src/components/twui/**`

### Manual Deployment
You can also trigger deployment manually:
1. Go to the "Actions" tab in the GitHub repository
2. Select the "Deploy StencilJS to GitHub Pages" workflow
3. Click "Run workflow"

### Build Process
The workflow performs the following steps:
1. Checks out the repository code
2. Sets up Node.js environment
3. Installs dependencies in the StencilJS project directory
4. Builds the StencilJS project using `npm run build`
5. Deploys the generated `www` directory to GitHub Pages

### Configuration Requirements

#### Repository Settings
To enable GitHub Pages deployment, ensure the repository has:
1. **Pages enabled**: Go to Settings → Pages
2. **Source set to GitHub Actions**: Select "GitHub Actions" as the source
3. **Proper permissions**: The workflow has necessary permissions configured

#### Dependencies
The build process automatically:
- Skips Puppeteer download (using `PUPPETEER_SKIP_DOWNLOAD=true`)
- Uses npm ci for faster, reliable dependency installation
- Caches Node.js modules for improved performance

### Output
The deployed site will be available at: `https://{username}.github.io/{repository-name}`

For more information about GitHub Pages, see the [official documentation](https://docs.github.com/en/pages).