# Product Definition

## Project Name

Vibe Coding 1-Month Bootcamp

Korean Title: vibeclass-coding-1-month

## Description

A documentation-style learning website hosting curriculum content for a 1-month (4 weeks, 12 sessions) coding bootcamp targeting junior developers. The site is built with Nextra 4.x and serves as both a self-paced learning platform and a companion reference for bootcamp participants. All instructional content is written in Korean.

## Target Audience

Junior developers learning full-stack web development. The curriculum assumes basic computer literacy but no prior programming experience, progressively building from environment setup through production deployment over 12 structured sessions.

## Core Features

1. **Left Sidebar Navigation**: Collapsible week-based sections with `defaultMenuCollapseLevel: 1` and `autoCollapse: true` for focused browsing.
2. **12 Session MDX Pages**: Each session follows a consistent template with learning objectives, core concepts, Mermaid diagrams, code examples, exercises, and a summary.
3. **Mermaid Diagrams**: Visual explanations embedded in each session, including flowcharts, sequence diagrams, ER diagrams, and state diagrams.
4. **Pagefind Search**: Built-in full-text search with Korean language support for quick content discovery.
5. **Dark Mode Support**: Toggle between light and dark themes for comfortable reading in any environment.
6. **Mobile Responsive**: Fully responsive layout optimized for desktop, tablet, and mobile devices.
7. **Vercel Deployment**: Production hosting on Vercel with zero-config deployment pipeline.
8. **Korean UI Text**: All interface elements and content presented in Korean for the target audience.

## Use Cases

- **Self-Paced Learning**: Individuals work through the 12-session curriculum at their own speed, using the site as a standalone learning resource.
- **Bootcamp Companion Site**: Instructors and students reference the site during live bootcamp sessions for lesson content, code examples, and exercises.
- **Curriculum Reference**: Graduates return to the site as a reference guide for topics covered during the bootcamp.

## Curriculum Overview

The bootcamp spans 4 weeks with 3 sessions per week, totaling 12 sessions.

### Week 1: Web Development Fundamentals

| Session | Title | Topics |
|---------|-------|--------|
| Session 1 | Dev Environment Setup | IDE installation, terminal basics, Git setup, project initialization |
| Session 2 | Frontend/Backend + Node.js Basics | Client-server architecture, HTML/CSS/JS overview, Node.js runtime, npm |
| Session 3 | HTTP/REST, JSON, CORS | HTTP methods, REST API design, JSON data format, CORS configuration |

### Week 2: React and Next.js

| Session | Title | Topics |
|---------|-------|--------|
| Session 4 | React Basics | Components, JSX, props, state, hooks, event handling |
| Session 5 | Next.js Basics | File-based routing, SSR/SSG, API routes, layouts |
| Session 6 | Async Programming + Debugging | Promises, async/await, fetch API, browser DevTools, debugging techniques |

### Week 3: Database, Auth, and AI

| Session | Title | Topics |
|---------|-------|--------|
| Session 7 | Database + PostgreSQL/Supabase | Relational databases, SQL basics, Supabase setup, CRUD operations |
| Session 8 | MongoDB + ElasticSearch | NoSQL concepts, MongoDB operations, ElasticSearch indexing and search |
| Session 9 | OAuth + JWT + AI API | Authentication flows, JWT tokens, OAuth providers, AI API integration |

### Week 4: DevOps and Deployment

| Session | Title | Topics |
|---------|-------|--------|
| Session 10 | Docker | Containers, Dockerfile, Docker Compose, image management |
| Session 11 | AWS EC2 + Nginx | Cloud hosting, EC2 instance setup, Nginx reverse proxy, SSL |
| Session 12 | CI/CD + Domain | GitHub Actions, automated deployment, custom domain configuration |

## Content Template Structure

Every session MDX page follows a consistent template to ensure a uniform learning experience:

1. **Learning Objectives**: Bulleted list of what the student will achieve by the end of the session.
2. **Core Concepts**: Detailed explanations of the session topic with progressive complexity.
3. **Mermaid Diagrams**: Visual representations of architectures, flows, or relationships relevant to the session.
4. **Code Examples**: Practical, runnable code snippets with syntax highlighting and inline commentary.
5. **Exercises**: Hands-on tasks for students to practice what they learned, with varying difficulty levels.
6. **Summary**: Recap of key takeaways and a preview of the next session.
