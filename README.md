# Dev Insights — Mini Blog

This is a small blog app I built for the "Dev Insights" project. It shows a list of short posts using React, TypeScript, and Vite.

## How to run it

The app is inside the [`mini-blog/`](mini-blog) folder. It was made with **Vite** (react-ts template).

You need Node.js and npm installed first.

```bash
git clone <this-repository-url>
cd react-mini-blog/mini-blog
npm install
```

Then to start it:

```bash
npm run dev
```

This opens a local dev server (usually `http://localhost:5173`). Open that link in your browser to see the app.

To build it for production:

```bash
npm run build
```

To check the code style:

```bash
npm run lint
```

## What's inside

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

## Why I built it this way

**Components:** Header, PostList, and App are simple functional components since they don't need much state. Post is a class component instead, mainly so I could show I understand both styles, and it also let me use `PureComponent` on it for optimization.

**Styling:** I used three ways to style things — a normal CSS file for the Header, styled-components for the PostList, and inline styles for the Post card. I used inline styles there because the styling changes depending on the post (like highlighting posts from "Admin", or showing a "New!" badge if the post was made in the last 24 hours).

**Optimization:** Post uses `PureComponent` so it doesn't re-render unless its data actually changes. Header uses `React.memo` for the same reason. Each post in the list also gets a unique `key`.

**HOC:** I made a small `withLogger` component that just logs to the console when something mounts and unmounts. I used it on PostList.

## Libraries used

- `styled-components` — for the CSS-in-JS styling
- everything else is just the default React + TypeScript + Vite setup

## A short reflection

The trickiest part was deciding where to use a class component vs a functional one — it would've been easier to just make everything functional, but I wanted Post to be a class component so I could actually justify it with the PureComponent optimization instead of picking randomly. Getting the "New!" badge and author-highlight logic to work cleanly also took a bit of trial and error, so I pulled that logic into small helper functions instead of cramming it all into the JSX.

Overall this project helped me understand why typing things properly (like the Post interface) actually matters — it caught a few small mistakes early. If I kept working on this, I'd want to add a real "new post" form and maybe write some tests for the styling logic.
