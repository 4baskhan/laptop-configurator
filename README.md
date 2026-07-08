# FORGE — 3D Laptop Configurator

A real-time, 3D "build your own laptop" configurator built with plain **HTML + CSS + JavaScript**, **Three.js** for the 3D model, and **GSAP** for the lid-open animation. No build step, no framework — open `index.html` and it runs.

## What it does
- Live 3D laptop that rotates, opens/closes its lid, and changes chassis color + keyboard backlight color instantly as you pick options.
- Configurator for chassis finish, CPU, RAM, storage, display and keyboard glow, each with its own price.
- Running price total and a performance-score gauge that blends CPU/RAM/storage/display into one score.
- Cart + demo checkout flow (name, email, address → order confirmation, no real payment).
- **Save build** and **Compare builds** — saved builds persist in the browser (`localStorage`) and line up side by side in a comparison table. This is the "database" bonus, implemented without a backend.
- **Share link** — copies a URL with the current build encoded in it; opening that link restores the exact configuration.
- Fully responsive: single column on mobile, sticky 3D viewport on desktop.

## File structure
```
laptop-configurator/
├── index.html          # page structure
├── css/
│   └── style.css       # all styling, theme tokens, responsive rules
├── js/
│   ├── data.js          # options, prices, performance weights (edit here to add parts)
│   ├── laptop3d.js       # Three.js scene: builds the laptop, handles drag-rotate + color updates
│   └── app.js            # UI wiring: state, cart, checkout, save/compare, share link
└── README.md
```

## Run it locally
Just open `index.html` in a browser — everything is loaded from CDNs (Three.js, GSAP, Google Fonts), no install needed.

## Publish on GitHub Pages
1. Create a new repository on GitHub (e.g. `laptop-configurator`).
2. Upload all the files in this folder, keeping the same structure (`index.html` at the root, `css/` and `js/` folders alongside it).
3. Go to the repo's **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`, then **Save**.
5. Wait a minute, then your site is live at `https://<your-username>.github.io/<repo-name>/`.

## Notes for grading / extension ideas
- Adding a real backend: swap the `localStorage` calls in `app.js` (`getSavedBuilds`, `getCart`) for `fetch()` calls to any REST API or Firebase — the rest of the UI logic doesn't need to change.
- Adding more parts: add a new array to `CONFIG_DATA` in `js/data.js`, then render it with `renderPillGroup` or `renderSwatchGroup` in `app.js`.
