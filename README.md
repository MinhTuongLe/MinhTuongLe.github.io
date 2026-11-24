# Le Minh Tuong — Personal Portfolio

Product-minded Frontend Engineer portfolio built in **Light Technical Mode** (*Tactile Product Engineering*), deployed directly on GitHub Pages with zero build dependencies.

## Project Structure

```text
.
├── index.html                  # Semantic entry document (+ JSON-LD & OG metadata)
├── 404.html                    # Custom GitHub Pages 404 route
├── robots.txt                  # Search crawler rules
├── sitemap.xml                 # XML sitemap for GitHub Pages
├── .gitignore                  # Repository ignore rules
├── .github/workflows/ci.yml    # Automated JS syntax, asset & content checks
├── assets/
│   ├── og-cover.png            # 1200x630 OpenGraph / social preview card
│   ├── docs/                   # Resume / CV PDF
│   ├── icons/                  # Brand SVG favicon & 180x180 Apple Touch Icon
│   └── thumbnails/             # Optimized 16:10 WebP project captures
├── docs/
│   └── design-system.md        # Visual tokens & architecture guidelines
└── src/
    ├── styles/
    │   ├── tokens.css          # Design tokens, typography, reset & grid
    │   ├── layout.css          # Header, mobile drawer, hero, sections & footer
    │   ├── components.css      # Cards, case study drawer, command palette, toast
    │   └── lab.css             # Interactive engineering sandboxes
    └── js/
        ├── main.js             # Application bootstrapper
        ├── data/
        │   └── portfolio.js    # Structured case study & command metadata
        └── modules/
            ├── a11y.js         # Shared modal/drawer focus-trap helper
            ├── navigation.js   # Scroll progress, scroll-spy, mobile nav & back-to-top
            ├── sandboxes.js    # Kindie sync, Kodo BLE & BAMI checkout labs
            ├── caseStudies.js  # Data-driven cards, filtering, drawer & lightbox
            ├── commandPalette.js # Keyboard-first Ctrl/Cmd+K navigation
            └── clipboard.js    # Clipboard helper & toast feedback
```

## Local Preview

Because the project uses native ES modules (`<script type="module">`), serve the root directory with any static server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
