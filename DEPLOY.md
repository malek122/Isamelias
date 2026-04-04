# How to Deploy to Netlify

## Option 1: Drag and Drop (Simplest)

1.  Go to [app.netlify.com](https://app.netlify.com) and log in.
2.  Go to the "Sites" tab.
3.  Drag the **entire** `Isamelias` folder (the one containing `index.html`) into the "Drag and drop your site output folder here" area.
4.  Netlify will upload and publish your site immediately.

## Option 2: Connect to Git (Recommended for updates)

1.  Push this project to a GitHub, GitLab, or Bitbucket repository.
2.  Log in to Netlify and click "Add new site" > "Import from an existing project".
3.  Select your Git provider and the repository.
4.  **Build Settings**:
    *   **Build command**: (Leave empty)
    *   **Publish directory**: `.` (or leave empty if it defaults to root)
5.  Click "Deploy site".

## Configuration

A `netlify.toml` file has been added to the project root to ensure Netlify knows how to serve your files correctly.
