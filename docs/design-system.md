---
name: portfolio-product-engineer
description: Design system, architectural rules, and copywriting guidelines for Le Minh Tuong's personal portfolio (Tactile Product Engineering style).
---

# Portfolio Engineering & Design Skill

## 1. Core Positioning & Language
- **Language:** 100% English (professional, concise, product-engineering tone).
- **Identity:** Le Minh Tuong — Product-Minded Frontend Engineer (~3 years experience in React.js, TypeScript, React Native/Expo, Payment SDKs, and BLE IoT).
- **Anti-AI Cliché Rule:** Strictly avoid generic AI portfolio tropes:
  - NO purple/neon dark-mode gradients or heavy glassmorphism.
  - NO buzzword fluff ("passionate", "pixel-perfect", "crafting seamless experiences").
  - Replace adjectives with concrete ownership verbs: *Owned end-to-end, Architected, Integrated native SDKs, Shipped to App Store & Google Play*.

## 2. Visual System ("Tactile Product Engineering")
- **Color Palette (Light Technical Mode):**
  - Background: `#F8FAFC` with subtle `48px` architectural grid lines (`rgba(226, 232, 240, 0.55)`).
  - Surface / Cards: `#FFFFFF` with crisp `1px solid #E2E8F0` borders.
  - Primary Ink: `#0F172A` | Secondary Text: `#475569` | Muted Labels: `#64748B`.
  - Single Accent Color: `#2563EB` (Cobalt Blue) for interactive triggers and technical highlights.
  - Semantic Status: Emerald `#059669` (live/verified), Amber `#D97706` (pending/TX).
- **Typography:**
  - UI & Headings: `Inter` (`letter-spacing: -0.025em` to `-0.035em` on headings).
  - Telemetry, Tags, Logs & Keyboard Shortcuts: `JetBrains Mono` (`11px`–`13px`).
- **Geometry:** Crisp border-radius (`6px` for buttons/inputs, `10px`–`14px` for containers).

## 3. Architectural Components & UX Standards
1. **Hero + Telemetry Card:** Pair value proposition with a structured JSON/key-value profile telemetry panel (`EXPERIENCE`, `CORE STACK`, `PRODUCTION APPS`, `DOMAIN DEPTH`, `ENGLISH PROFICIENCY`).
2. **Interactive Engineering Lab (Proof of Work):**
   - Prioritize interactive state-machine sandboxes over static screenshots:
     - *Kindie:* Web-to-Mobile state synchronization simulator.
     - *Kodo Fragrances:* BLE IoT discovery, handshake authentication, and real-time packet log console.
     - *BAMI:* Multi-gateway checkout abstraction (Apple Pay, Google Pay, Stripe, ANZ).
3. **Case Studies Structure:**
   - Filterable by domain (`All`, `Mobile & Store`, `Real-time & IoT`, `Web Platforms`).
   - Every project card must follow: **Domain & Platform Metadata -> Problem/Ownership Summary -> Engineering & UX Highlight Box -> Tech Stack Tags**.
4. **Keyboard-First Navigation:**
   - Maintain a Command Palette (`Ctrl+K` / `Cmd+K`, dismissible via `Esc`) for instant section jumping, email copying, and external links.
5. **Performance & Motion:**
   - Zero heavy scroll-jacking libraries. Use subtle CSS transitions (`150ms`–`250ms`) only on direct user interactions.

## 4. Architecture & Constraints
- **Current Architecture:** Modular zero-build static frontend (`index.html`, `src/styles/*.css`, `src/js/data/*.js`, `src/js/modules/*.js`) deployed directly on GitHub Pages (`MinhTuongLe.github.io`).
- **Positioning Constraints:**
  - Do NOT display LinkedIn links.
  - Do NOT include job-seeking / "open to opportunities" messaging.
  - Only include external live project links for personal project **LexiNote** (`https://lexi-note.vercel.app`); company products remain private without external URLs.