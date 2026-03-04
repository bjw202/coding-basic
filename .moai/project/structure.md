# Project Structure

## Directory Tree

```
vibeclass-coding-1-month/
├── package.json
├── next.config.mjs
├── tsconfig.json
├── mdx-components.tsx
├── app/
│   ├── layout.tsx
│   └── [[...mdxPath]]/
│       └── page.tsx
├── content/
│   ├── _meta.js
│   ├── index.mdx
│   ├── week1/
│   │   ├── _meta.js
│   │   ├── index.mdx
│   │   ├── session1.mdx
│   │   ├── session2.mdx
│   │   └── session3.mdx
│   ├── week2/
│   │   ├── _meta.js
│   │   ├── index.mdx
│   │   ├── session4.mdx
│   │   ├── session5.mdx
│   │   └── session6.mdx
│   ├── week3/
│   │   ├── _meta.js
│   │   ├── index.mdx
│   │   ├── session7.mdx
│   │   ├── session8.mdx
│   │   └── session9.mdx
│   └── week4/
│       ├── _meta.js
│       ├── index.mdx
│       ├── session10.mdx
│       ├── session11.mdx
│       └── session12.mdx
└── public/
    ├── favicon.ico
    └── logo.svg
```

## Directory Purposes

### `app/`

The Next.js 15 App Router directory. Contains the root layout and the catch-all route that renders MDX content from the `content/` directory.

- **`app/layout.tsx`**: Root layout file that wraps the entire application. Configures the Nextra docs theme with sidebar settings (`defaultMenuCollapseLevel: 1`, `autoCollapse: true`), dark mode toggle, Korean UI text, footer, and other global theme options.
- **`app/[[...mdxPath]]/page.tsx`**: Catch-all dynamic route that maps URL paths to MDX files in the `content/` directory. This is the Nextra 4.x content directory convention for App Router.

### `content/`

The Nextra content directory containing all MDX documentation pages and navigation metadata files. Nextra 4.x uses this directory as the source for file-system-based routing.

- **`content/index.mdx`**: The site homepage. Displays the bootcamp title, overview, and links to each week.
- **`content/_meta.js`**: Top-level sidebar navigation configuration. Defines the ordering and display labels for the four week sections.

### `content/week1/`

Week 1 content covering web development fundamentals (Sessions 1-3).

- **`_meta.js`**: Sidebar configuration for Week 1 sessions with Korean display labels.
- **`index.mdx`**: Week 1 overview page with learning goals and session summaries.
- **`session1.mdx`**: Dev environment setup.
- **`session2.mdx`**: Frontend/Backend concepts and Node.js basics.
- **`session3.mdx`**: HTTP/REST, JSON, and CORS.

### `content/week2/`

Week 2 content covering React and Next.js (Sessions 4-6).

- **`_meta.js`**: Sidebar configuration for Week 2 sessions.
- **`index.mdx`**: Week 2 overview page.
- **`session4.mdx`**: React basics.
- **`session5.mdx`**: Next.js basics.
- **`session6.mdx`**: Async programming and debugging.

### `content/week3/`

Week 3 content covering databases, authentication, and AI (Sessions 7-9).

- **`_meta.js`**: Sidebar configuration for Week 3 sessions.
- **`index.mdx`**: Week 3 overview page.
- **`session7.mdx`**: Database fundamentals with PostgreSQL and Supabase.
- **`session8.mdx`**: MongoDB and ElasticSearch.
- **`session9.mdx`**: OAuth, JWT, and AI API integration.

### `content/week4/`

Week 4 content covering DevOps and deployment (Sessions 10-12).

- **`_meta.js`**: Sidebar configuration for Week 4 sessions.
- **`index.mdx`**: Week 4 overview page.
- **`session10.mdx`**: Docker containerization.
- **`session11.mdx`**: AWS EC2 and Nginx deployment.
- **`session12.mdx`**: CI/CD pipelines and custom domain setup.

### `public/`

Static assets served at the site root.

- **`favicon.ico`**: Browser tab icon.
- **`logo.svg`**: Site logo used in the sidebar header and navigation.

## Key File Locations and Roles

| File | Role |
|------|------|
| `package.json` | Project dependencies, scripts (`dev`, `build`, `start`), and metadata |
| `next.config.mjs` | Next.js configuration with Nextra plugin integration |
| `tsconfig.json` | TypeScript compiler options for the project |
| `mdx-components.tsx` | Custom MDX component overrides (Nextra 4.x requirement) |
| `app/layout.tsx` | Global layout with Nextra theme configuration |
| `app/[[...mdxPath]]/page.tsx` | Catch-all route rendering content directory MDX files |
| `content/_meta.js` | Top-level sidebar navigation structure |
| `content/week{N}/_meta.js` | Per-week sidebar navigation with session ordering |

## Module Organization

This project follows the **Nextra 4.x content directory convention**:

1. The `content/` directory serves as the single source of truth for all documentation pages.
2. Nextra automatically generates routes from the file system structure within `content/`.
3. Each subdirectory (`week1/`, `week2/`, etc.) becomes a collapsible section in the sidebar.
4. The `index.mdx` file in each directory serves as the landing page for that section.
5. Individual session files (`session1.mdx`, `session2.mdx`, etc.) become child pages under their respective week.

## Navigation Structure

Navigation is controlled entirely by `_meta.js` files at each level of the content hierarchy:

- **`content/_meta.js`** defines the top-level sidebar items: Week 1, Week 2, Week 3, and Week 4 with Korean labels.
- **`content/week{N}/_meta.js`** defines the ordering and display labels for sessions within each week.

The `_meta.js` files export a default object where keys correspond to file or directory names (without extensions) and values are the display labels shown in the sidebar. This allows full control over ordering, naming, and visibility without modifying the MDX content files.

## File Naming Conventions

- **Week directories**: `week1/`, `week2/`, `week3/`, `week4/` using lowercase with numeric suffix.
- **Session files**: `session{N}.mdx` using lowercase with sequential numbering (1-12) across all weeks.
- **Index files**: `index.mdx` for section landing pages in every directory.
- **Navigation files**: `_meta.js` for sidebar configuration in every content directory.
- **Configuration files**: Standard Next.js/Nextra naming (`next.config.mjs`, `tsconfig.json`, `mdx-components.tsx`).
- **Static assets**: Descriptive names in `public/` (`favicon.ico`, `logo.svg`).

## Total File Count

Approximately 31 files across the project:

- 4 root configuration files (`package.json`, `next.config.mjs`, `tsconfig.json`, `mdx-components.tsx`)
- 2 app route files (`layout.tsx`, `page.tsx`)
- 5 `_meta.js` navigation files (1 top-level + 4 per-week)
- 5 `index.mdx` overview pages (1 homepage + 4 week overviews)
- 12 `session{N}.mdx` content pages
- 2 static assets (`favicon.ico`, `logo.svg`)
- 1 `package-lock.json` (auto-generated)
