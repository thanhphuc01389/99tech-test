# 99Tech Code Challenge – Problems 1, 2, 3

One app (React + Vite) that runs **all 3 problems in 3 tabs**.

- [Problem 1: Three ways to sum to n](https://s5tech.notion.site/Problem-1-Three-ways-to-sum-to-n-6052097f0f144200bbea7c2fa75c0124)
- [Problem 2: Fancy Form](https://s5tech.notion.site/Problem-2-Fancy-Form-033865bc7c98401296f1caa748be1b04)
- [Problem 3: Messy React](https://s5tech.notion.site/Problem-3-Messy-React-20bf71f8e9de4228b606f240c446b722)

## How to run

### 1. Install and start the dev server

From the project root:

```bash
npm install
npm run dev
```

Vite will print a URL, usually **http://localhost:5173**. Open that URL in your browser and use the tabs to switch between Problem 1, 2, and 3.

### 2. If you can’t connect to localhost

- **Confirm the dev server is running**  
  You should see something like:
  ```text
  VITE v6.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
  ```
  If you don’t, run `npm run dev` again from the project folder.

- **Try the exact URL from the terminal**  
  The port might not be 5173 (e.g. 5174 if 5173 is in use). Use the `Local:` URL Vite prints.

- **Try 127.0.0.1 instead of localhost**  
  Open `http://127.0.0.1:5173` (or the port Vite shows).

- **Check firewall / antivirus**  
  They can block Node or the browser from binding to or connecting to localhost. Temporarily allow the app or Node and try again.

- **Use the production build**  
  If the dev server still fails, build and preview:
  ```bash
  npm run build
  npm run preview
  ```
  Then open the URL shown by `preview` (often http://localhost:4173).

## Build & preview

```bash
npm run build    # output in dist/
npm run preview  # serve dist/ and open in browser
```

## What’s in each tab

| Tab | Content |
|-----|--------|
| **Problem 1** | Three ways to sum to n: **loop**, **formula** `n(n+1)/2`, and **recursion**. |
| **Problem 2** | Fancy Form (Swap): amount to send/receive, swap button, rate, CONFIRM SWAP. |
| **Problem 3** | Messy React: issues list, before/after code, summary, and a small refactored todo (live). |

## Tech stack

- **React** (latest)
- **Vite** (build and dev server)

## Project layout

```
99tech-test/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── components/
│       ├── Problem1.jsx
│       ├── Problem2.jsx
│       ├── Problem2.css
│       ├── Problem3.jsx
│       └── Problem3.css
└── README.md
```

## Submission

Submitted as part of the 99Tech code challenge. All three problems run from one React app with three tabs.
