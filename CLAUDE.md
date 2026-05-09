# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **100 Mexicanos Dijeron** — a Mexican "Family Feud"-style game show frontend. It is an Angular 19 app styled with Tailwind CSS. A game host operates a control panel on one screen/tab; a separate board view is displayed to the audience on another screen/tab. The two views communicate exclusively via `localStorage` events (no WebSocket, no backend state).

## Commands

```bash
npm start          # dev server at http://localhost:4200
npm run build      # production build → dist/
npm run watch      # dev build with watch mode
npm test           # run Karma/Jasmine unit tests
```

To run a single test file, add `--include` to the `ng test` invocation:

```bash
npx ng test --include='src/app/modules/public-game/pages/control-game/control-game.component.spec.ts'
```

## Architecture

### Two-Screen Communication Pattern

The app is intentionally split into two browser views that share state through `localStorage`:

- **Control view** (`/public/control-game`) — the host's panel. Manages game state (`currentScore`, `currentQuestion`) and writes them to `localStorage` via `updateInfo()` after every state change.
- **Board view** (`/public/board`) — the audience display. Reads `localStorage` on init and listens for `storage` events to reactively update itself.

This means any change to game state in `ControlGameComponent` must call `updateInfo()` to propagate to the board. New game state fields added to `Score` or `Question` models must be JSON-serializable.

### Module Structure

```
src/app/
├── app.routes.ts                  # Root routes — lazy-loads auth and public-game modules
├── modules/
│   ├── models/
│   │   ├── question.model.ts      # Question class + Answers interface
│   │   └── score.model.ts         # Score class (both teams, current round, errors)
│   ├── auth/                      # Stub auth module (login page only, no real auth)
│   └── public-game/
│       ├── pages/
│       │   ├── control-game/      # Host control panel + ControlGameService
│       │   └── board/             # Audience board display
│       └── components/
│           └── list-answers/      # Unused stub component
```

### Game Data

Questions are loaded at runtime from `public/questions.json` via a plain `fetch()` call in `ControlGameService.getQuestions()`. The file contains 83 questions, each with 4–5 answers (`text`, `value`, `visible`). The `visible` flag on each answer controls whether it is revealed on the board; toggling it also adds/subtracts the answer's `value` from `currentScore.totalPoints`.

Audio cues are `.wav` files in `public/` and are played directly via the Web Audio API in `ControlGameService.play()`. The four named audio constants (`audioIntro`, `audioStrike`, `audioAnswerd`, `audioFinishedRound`) map to `audio2–5.wav`.

### Game Flow

1. Host clicks **Nueva Partida** → questions are shuffled, round counter starts at 1.
2. For each round: answers are revealed one at a time (toggling `visible`); strikes accumulate up to 3 via **Marcar Strike**.
3. **Terminar Ronda** prompts the host to award points to Team 1 or Team 2.
4. **Siguiente Ronda** advances to the next question.
5. When questions are exhausted, the winner is announced and state resets.

### Styling Conventions

- All layout uses **Tailwind CSS** utility classes directly in templates.
- The custom `.goldtext` class (gold-colored text) appears in `board.component.html` inline `<style>` and in `control-game.component.scss`.
- Component styles default to **SCSS** (set in `angular.json` schematics).
- The board forces a black background via an inline `<style>` block in `board.component.html`.

### Key Quirks

- `app-routing.module.ts` and `app.routes.ts` both define the same routes. The standalone bootstrap (`main.ts` / `app.config.ts`) uses `app.routes.ts`; `app-routing.module.ts` is a legacy artifact and is not actually loaded.
- `ListAnswersComponent` is declared but empty and currently unused.
- The `auth` module contains only a login page stub with no authentication logic.
