# Stopwatch (Static Web App)

A simple stopwatch built with plain HTML, CSS and JavaScript. This repo is set up to be published to GitHub Pages.

Features
- Start / Stop / Lap / Reset controls
- Keyboard shortcuts: Space = Start/Stop, L = Lap, R = Reset
- Copy current time by double-clicking the display

How to connect to GitHub (quick start - PowerShell)
1. Create a new repository on GitHub (https://github.com/new). Note the repository URL (HTTPS or SSH).
2. In your project folder (`C:\STOPWATCH`) run:

```powershell
git init
git add -A
git commit -m "Initial commit: stopwatch"
# replace <REMOTE_URL> with the GitHub repo HTTPS or SSH url
git remote add origin <REMOTE_URL>
git branch -M main
git push -u origin main
```

Deploy to GitHub Pages automatically (recommended)
This repository includes a GitHub Actions workflow that deploys the repository root to the `gh-pages` branch whenever you push to `main`.

To enable:
- Push this repo to GitHub as shown above.
- On GitHub, go to Settings > Pages and ensure the source is the `gh-pages` branch (the action will create/update it).

Manual publish (alternative)
You can also enable Pages from the `main` branch source in the repository settings and upload files, but the automated workflow is easier and reproducible.

Development
- Open `index.html` in your browser (or open with a simple static server).
- Edit `css/styles.css` and `js/script.js` to customize behavior and style.

License
MIT
