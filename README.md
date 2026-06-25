# Fruit Catcher - HTML5 Playable Mini Game

A mobile-first HTML5 playable mini game built with Vanilla JavaScript, Vite and CSS.

The player controls a basket, catches falling fruits, avoids bombs, earns points and tries to reach the target score before the timer runs out. The project is designed as a portfolio piece for HTML5 Game / Playable Ads development.

## Overview

Fruit Catcher is a lightweight HTML5 playable game prototype focused on mobile interaction, fast feedback and a clear playable ad flow.

The game includes an intro screen, active gameplay, win and game over states, score feedback, lives, bombs, difficulty progression and a CTA-style end screen.

## Features

* Mobile-first playable ad layout
* Intro, gameplay, win and game over screens
* Custom game loop with `requestAnimationFrame`
* Delta-time based movement
* Pointer and touch controls
* Falling fruit and bomb entities
* Collision detection
* Score system
* Lives system
* Win condition by target score
* Lose condition by timer or bombs
* Floating score feedback
* Hit feedback effects
* Dynamic difficulty progression
* CTA-style end screen
* Responsive fullscreen mobile experience

## Gameplay

The goal is to catch fruits and avoid bombs.

* Catch fruit: gain points
* Catch bomb: lose one life
* Reach the target score: win
* Lose all lives or run out of time: game over

## Tech Stack

* HTML5
* CSS3
* Vanilla JavaScript
* Vite

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run the development server on the local network:

```bash
npm run dev -- --host 0.0.0.0
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```
