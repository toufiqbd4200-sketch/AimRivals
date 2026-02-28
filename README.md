# Rivals Aim-Trainer

> Personalized daily aim training routines for Kovaak's and Aimlabs.  
> Curated by **Kaiser Everhart**.

## 🎮 Features

- **Dual Platform Support** — Switch between Kovaak's (~72 scenarios) and Aimlabs (~100 scenarios)
- **Priority Sliders** — Adjust Flicking / Tracking / Switching balance (ternary — they sum to 100%)
- **Daily Routines** — 12 scenarios per day, structured as Warmup → Main → Challenge → Cooldown
- **3 Difficulty Tiers** — Beginner, Intermediate, Advanced
- **3 Themes** — Royal Blue/Gold, Sakura Pink/Gold, Stealth Red/White
- **3D Tracking Practice** — FPS-style camera controls with Pointer Lock, 4 movement patterns, mobile touch support
- **Copy Playlist** — One-click copy all scenario names
- **Share Config** — Generate a URL with your slider settings
- **Subscribe Gate** — Cute mascot-powered subscribe gate for training priority & tracking practice
- **LocalStorage** — Preferences saved automatically

## 🚀 Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `rivals-aim-trainer`)
2. Push these files to the `main` branch:
   ```
   index.html
   tracker.html
   styles.css
   app.js
   scenarios.js
   Mascot/
   README.md
   ```
3. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
4. Your site will be live at `https://yourusername.github.io/rivals-aim-trainer/`

## 📁 File Structure

```
├── index.html      — Main dashboard (daily quests, settings, sliders)
├── tracker.html    — 3D Tracking Practice (FPS camera, 4 patterns, mobile touch)
├── styles.css      — Gaming dashboard design system (3 themes)
├── app.js          — Core logic (rotation algorithm, sliders, persistence)
├── scenarios.js    — Curated scenario database (~170 scenarios)
├── Mascot/         — Chibi mascot assets for subscribe gate
└── README.md       — This file
```

## 📋 Scenario Sources

Scenarios curated from:
- **Voltaic Fundamentals** — The gold standard for aim training routines
- **VDIM (Voltaic Daily Improvement Method)** — Structured progressive training
- **Aimlabs Official Tasks** — Gridshot, Spidershot, Microshot, and more
- **Community Recommendations** — r/FPSAimTrainer, Voltaic Discord

---

Built with ♥ for the Rivals community
