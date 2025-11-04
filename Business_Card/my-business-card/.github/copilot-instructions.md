# Copilot instructions — my-business-card

Short, actionable instructions to help AI coding agents be productive in this repo.
This is a Next.js (app router) project using Tailwind v4 + TypeScript. Keep guidance
aligned to the installed packages and official docs.

-   Versions in this repo (verify package.json before changing guidance)

    -   next: ^16.0.2-canary.5
    -   react: ^19.2.0
    -   tailwind: ^4.0.0
    -   dotnet: ^9.0.0
    -   Never provide solutions for older major versions than the ones above. Always prioritize the official docs.

-   Tailwind (strict rules for this repo)

    -   Never use Tailwind v3 directives anywhere in this repo:
        -   Forbidden: `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`
    -   Required for Tailwind v4 (place only in src/app/globals.css):
        ```css
        @import "tailwindcss/preflight";
        @tailwind utilities;
        ```
    -   Always confirm the installed Tailwind version in package.json before proposing directives or examples.

-   Files & locations (big picture)

    -   Root layout: src/app/layout.tsx (imports src/app/globals.css)
    -   Global CSS: src/app/globals.css (Tailwind directives + global styles)
    -   Components: src/components/
    -   Static assets: public/assets/images/

-   PostCSS & Turbopack

    -   Keep postcss.config.mjs minimal and ensure plugin entries are objects:
        ```js
        // postcss.config.mjs
        export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
        ```
    -   If Turbopack shows `pluginFactory is not a function` or `Cannot find module 'css'`:
        1. Verify installed packages: `npm ls tailwindcss autoprefixer css --depth=0`
        2. Install missing deps: `npm install -D tailwindcss@^4.0.0 autoprefixer css`
        3. Restart dev server and VS Code/extensions.

-   Dev / build commands

    -   Development: `npm run dev`
    -   Production: `npm run build` then `npm run start`

-   TypeScript / CSS tips

    -   Side-effect CSS imports are used (e.g. `import './globals.css'`).
        Add `src/types/global.d.ts` with:
        ```ts
        declare module "*.css";
        declare module "*.module.css";
        ```
    -   Avoid `@` alias in Tailwind arbitrary values; use public absolute paths: `bg-[url('/assets/images/...')]`.

-   Conventions
    -   Use `"use client"` for components that need client-side behavior.
    -   Prefer server components by default; keep long-lived UI state in client components.
    -   Follow official docs when behavior differs across versions:
        -   Next.js: https://nextjs.org/docs
        -   React: https://react.dev/
        -   Tailwind: https://tailwindcss.com/docs

If any of the above becomes incorrect (package bump, tooling change), update this file immediately.
