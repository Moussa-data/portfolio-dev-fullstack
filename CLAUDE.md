# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio site for Wane Camara Moussa, written entirely in vanilla HTML/CSS/JavaScript with React loaded from a CDN. The UI language is French. There is no build system, no package manager, and no test suite — the site is intentionally a learning artifact.

## Running the site

There is nothing to install or build. To preview:

- Open `index.html` directly in a browser, or
- Serve the directory with any static server (e.g. `python3 -m http.server`) and visit the printed URL.

`react-test.html` is a standalone sandbox page (separate from the main portfolio) used to experiment with a minimal React counter via Babel-in-the-browser. It is not linked from `index.html`.

## Architecture

- `index.html` — single page containing every section (hero, à propos, préférences, objectifs, projets, skills, freelance, liens, contact). Sections are linked by anchor IDs from the navbar.
- `app.js` — all interactive behavior, attached on DOMContentLoaded via `getElementById`. Each "Projet N" block (counter, EUR→USD, citations, météo, stats, contact form) is wrapped in an `if (...)` null-check so the same script can be loaded on any page without errors.
- `style.css` — all styling. The site uses a dark gradient theme (`radial-gradient` on `body`) and a card-based layout (`.card`, `.cards-row`).
- React in `index.html` — the "Projet React : Compteur" section is rendered into `#react-counter-root` using React 18 + ReactDOM + Babel standalone, all from `unpkg.com`. The JSX lives inline in a `<script type="text/babel">` block at the bottom of `index.html`.

## Conventions to preserve

- Keep all JS in `app.js` and gate every block on element existence (`if (el1 && el2) { ... }`) — there is no module system or per-page bundling.
- Do not introduce a build step, npm dependencies, or a framework. New "projets" should follow the existing pattern: a section in `index.html` with unique IDs, and a corresponding block in `app.js`.
- The contact form is intentionally simulated client-side only (no backend); the success message says so explicitly.
- UI strings are French — match the existing tone.
