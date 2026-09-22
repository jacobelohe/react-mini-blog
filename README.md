# Dev Insights — Mini Blog

A small internal blog platform built for the "Dev Insights" scenario, using React, TypeScript, and Vite. Employees can browse a list of shared tips/updates rendered by reusable components.

## Getting Started

This project was scaffolded with **Vite** (`react-ts` template) and lives in the [`mini-blog/`](mini-blog) directory.

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

```bash
git clone <this-repository-url>
cd react-mini-blog/mini-blog
npm install
```

### Running the app (development)

```bash
npm run dev
```

This starts the Vite dev server (with hot module replacement) — open the printed local URL (usually `http://localhost:5173`) in your browser.

### Building for production

```bash
npm run build
```

Type-checks the project with `tsc` and bundles it with Vite into `mini-blog/dist`.

### Previewing the production build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
mini-blog/
  src/
    components/
      Header/       # Header.tsx + Header.css
      Post/          # Post.tsx (class component)
      PostList/      # PostList.tsx
    hoc/
      withLogger.tsx # Higher-Order Component
    types/
      post.ts        # Post TypeScript interface
    App.tsx
    main.tsx
```

## Design Decisions

### Component Types

- **Header**, **PostList**, and **App** are **functional components**, since they hold little to no local state/lifecycle logic and functional components with hooks are the idiomatic default in modern React.
- **Post** is implemented as a **class component** (extending `React.PureComponent`) instead of a functional one. This was a deliberate choice to demonstrate the class-based component syntax covered in Week 3, and to pair it directly with a relevant optimization technique: `PureComponent` automatically shallow-compares props and skips re-rendering `Post` when its `post` prop hasn't changed, which is a natural fit for a component rendered repeatedly inside a list.

### Styling

Two styling methods are used:

1. **External CSS** — `Header.css`, imported into `Header.tsx`, styles the site header/logo/nav.
2. **CSS-in-JS (styled-components)** — `PostList.tsx` uses `styled-components` to style the list wrapper and heading.
3. **Inline styles** — `Post.tsx` uses inline styles to implement conditional styling based on post data (see below), since the styling depends on runtime values per post.

**Conditional styling** implemented in `Post.tsx`:
- Posts authored by `"Admin"` get a highlighted background/border.
- Posts with a `datePosted` within the last 24 hours display a green **"New!"** badge.

### Optimization & HOC

- `Post` extends `React.PureComponent` to avoid unnecessary re-renders when its props haven't changed.
- `Header` is wrapped in `React.memo` since it receives no props and never needs to re-render for unrelated parent updates.
- Every item in `PostList` is rendered with a stable, unique `key={post.id}`.
- `withLogger` is a Higher-Order Component (`src/hoc/withLogger.tsx`) that logs a console message when the wrapped component mounts and unmounts. It's applied to `PostList` (`export default withLogger(PostList)`).

## External Libraries Used

- [`styled-components`](https://styled-components.com/) — CSS-in-JS styling for `PostList`.
- Everything else (React, TypeScript, Vite tooling) comes from the standard `react-ts` Vite template.

## Challenges & Reflection

The main challenge was deciding where to draw the line between the two component paradigms — it would have been easy to make everything a functional component with hooks, but the assessment specifically asked for a justified choice, so `Post` became the class component since pairing it with `PureComponent` gave a concrete, meaningful reason for the choice rather than an arbitrary one. Getting the conditional "highlight by author" and "New!" badge logic to read cleanly inside inline styles (rather than sprawling across multiple CSS files) also took a couple of iterations — computing `isHighlighted` and `isNew` as small helper functions before returning JSX kept the render method readable.

Working through this project reinforced how much component boundaries and typing decisions (the `Post` interface, prop typing) pay off once a "list of similar things" pattern shows up — TypeScript caught a couple of typos in prop names during development. Going further, I'd like to explore React Context or a small state library for managing an actual "add new post" form, plus writing tests for the conditional styling logic.
