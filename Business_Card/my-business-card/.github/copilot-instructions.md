# Copilot instructions — my-business-card

-   Do not add borders to anything unless instructed to do so.
-   when generating components, use the colors from globals.css

Short, actionable instructions to help AI coding agents be productive in this repo.
This is a Next.js (app router) project using Tailwind v4 + TypeScript. Keep guidance
aligned to the installed packages and official docs.

-   Versions in this repo (verify package.json before changing guidance)

    -   next: ^16.0.2-canary.5
    -   react: ^19.2.0
    -   tailwind: ^4.0.0
    -   Never provide solutions for older major versions than the ones above. Always prioritize the official docs.

-   Tailwind (strict rules for this repo)

    -   Never use Tailwind v3 directives anywhere in this repo:
        -   Forbidden: `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`
    -   Required for Tailwind v4 (place only in src/app/globals.css):
        ```css
        @import "tailwindcss";
        @tailwind utilities;
        ```
    -   Always confirm the installed Tailwind version in package.json before proposing directives or examples.

-   Files & locations (big picture)

    -   Root layout: src/app/layout.tsx (imports src/app/globals.css)
    -   Global CSS: src/app/globals.css (Tailwind directives + custom CSS variables in @theme)
    -   Components: src/components/ (organized by feature: button/, card/, accessories/)
    -   Utilities: src/lib/utils.ts (exports `cn()` for className merging via clsx + tailwind-merge)
    -   Static assets: public/assets/images/ (reference via `/assets/images/...` in code)

-   Project architecture & design patterns

    -   **Component composition**: Main page (`src/app/page.tsx`) uses a card-based layout with `FrostedGlass`, `Button`, `ButtonGrid`, `Tag`, and `StylizedCircle` components
    -   **Glassmorphism UI**: Core design uses frosted glass effects via `FrostedGlass` component with `variant="light"` or `variant="dark"` and color themes (`white`, `grey`, `black`, `green`)
    -   **CSS Variables**: Use custom properties defined in `@theme` block in globals.css:
        -   Surface colors: `--color-surface-{color}-{primary|secondary|tertiary}` (e.g., `--color-surface-green-primary`)
        -   Text colors: `--color-text-white-{primary|secondary|tertiary}`
        -   Apply via `bg-[var(--color-surface-green-primary)]` in className
    -   **Overlay pattern**: `FrostedGlass` component supports `offset={true}` prop to create positioned overlays using React portals—measures reference element and renders overlay outside normal flow
    -   **Client components**: All interactive UI components use `"use client"` directive (Button, FrostedGlass, etc.)

-   Component conventions

    -   **Button component** (`src/components/button/Button.tsx`):
        -   Props: `variant` (solid/frosted), `shape` (default/circular/pill), `mode` (text/icon/text-icon), `color` (none/white/grey/black/green), `brightness` (light/dark), `clickable` (boolean)
        -   Use `clickable={false}` to strip hover/active/focus states for non-interactive display
    -   **FrostedGlass component** (`src/components/card/FrostedGlass.tsx`):
        -   Always add `.frosted-light-reference` class to in-flow light variant cards (done automatically)
        -   Overlay variant (`offset={true}`) uses portal rendering and measures reference element
        -   Use `color` prop to override background: `color="white" | "grey" | "black" | "green"`
    -   **Utility function**: Always use `cn()` from `@/lib/utils` to merge className strings (combines clsx + tailwind-merge)

-   PostCSS & Turbopack

    -   Current config uses `@tailwindcss/postcss` plugin:
        ```js
        export default {
        	plugins: { "@tailwindcss/postcss": {}, autoprefixer: {} },
        };
        ```
    -   If Turbopack shows `pluginFactory is not a function` or `Cannot find module 'css'`:
        1. Verify installed packages: `npm ls @tailwindcss/postcss autoprefixer css --depth=0`
        2. Install missing deps: `npm install -D @tailwindcss/postcss autoprefixer css`
        3. Restart dev server and VS Code/extensions

-   Dev / build commands

    -   Development: `npm run dev` (uses Turbopack via `--turbopack` flag)
    -   Production: `npm run build --turbopack` then `npm run start`
    -   Linting: `npm run lint`

-   TypeScript / CSS tips

    -   Side-effect CSS imports are used (e.g. `import './globals.css'`).
        Add `src/types/global.d.ts` with:
        ```ts
        declare module "*.css";
        declare module "*.module.css";
        ```
    -   Path alias `@/*` maps to `./src/*` (tsconfig.json)
    -   Avoid `@` alias in Tailwind arbitrary values; use public absolute paths: `bg-[url('/assets/images/...')]`
    -   Background image set in both globals.css (body selector) and layout.tsx body className

-   Conventions
    -   Use `"use client"` for components that need client-side behavior (DOM APIs, hooks, event handlers)
    -   Prefer server components by default; keep long-lived UI state in client components
    -   Use `react-icons` for icon components (already imported: `TiSocialLinkedin`, `FaPhone`, etc.)
    -   Follow official docs when behavior differs across versions:
        -   Next.js: https://nextjs.org/docs
        -   React: https://react.dev/
        -   Tailwind: https://tailwindcss.com/docs

If any of the above becomes incorrect (package bump, tooling change), update this file immediately.
