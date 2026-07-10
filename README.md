# SOCRA — Smart Study Companion

> **Stop re-reading. Start remembering.**

SOCRA is an AI-powered study companion that converts your course materials into personalised **Socratic dialogues**, **smart quizzes**, and **spaced-repetition flashcards** — helping students build deep understanding instead of shallow memorisation.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)

---

## Table of Contents

- [Demo Video](#demo-video)
- [Live / Deployed Version](#live--deployed-version)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the App](#running-the-app)
- [Building for Production](#building-for-production)
- [Environment Variables](#environment-variables)
- [Related Files & Key Directories](#related-files--key-directories)

---

## Demo Video

> A 5-minute walkthrough showcasing SOCRA's core features (document upload, Socratic dialogue, quiz mode, flashcards, knowledge gap map, Canvas LMS integration, and dashboard analytics).

**[Watch the Demo Video](https://your-video-link-here.com)** *(replace with actual link)*

---

## Live / Deployed Version

**[https://your-deployed-url-here.com](https://your-deployed-url-here.com)** *(replace with actual link)*

---

## Core Features

| Feature | Description |
|---|---|
| **Document Upload & Processing** | Upload PDFs and course materials; SOCRA's backend extracts topics and generates study content automatically. |
| **Socratic Dialogue** | An AI tutor engages you in guided, question-driven conversations that progress through Bloom's Taxonomy levels. |
| **Smart Quizzes** | Auto-generated multiple-choice quizzes with confidence rating, timed responses, and detailed explanations. |
| **Spaced-Repetition Flashcards** | Flashcards powered by the SM-2 algorithm — reviews are scheduled based on how well you remember each card. |
| **Knowledge Gap Map** | A visual overview of all your topics categorised as *mastered*, *shaky*, or *forgotten*, helping you prioritise study time. |
| **Canvas LMS Integration** | Connect your Canvas account to sync courses, modules, and track quiz/assignment performance alongside SOCRA insights. |
| **Dashboard & Analytics** | At-a-glance stats: study streak, mastery percentage, topics due for review, and quick-start actions. |
| **Post-Session Summary** | After each study session, get a summary of what you covered, your progress, and what to review next. |
| **Notifications** | Stay informed about upcoming reviews and study reminders. |
| **Onboarding Flow** | Guided setup: profile configuration → document upload → study mode selection. |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vite.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) |
| **Routing** | [React Router v6](https://reactrouter.com/) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) (auth, documents, notifications, sessions) |
| **Server State** | [TanStack React Query](https://tanstack.com/query) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Markdown Rendering** | [react-markdown](https://github.com/remarkjs/react-markdown) |
| **Linting** | [ESLint](https://eslint.org/) with TypeScript support |

---

## Project Structure

```
socra-frontend/
├── public/                          # Static assets
├── build/                           # Production build output
├── src/
│   ├── main.tsx                     # App entry point (React Query + Router providers)
│   ├── index.css                    # Global styles (Tailwind directives)
│   ├── router/
│   │   └── index.tsx                # All route definitions (public + protected)
│   ├── pages/
│   │   ├── LandingPage.tsx          # Marketing / hero page
│   │   ├── DashboardPage.tsx        # Main dashboard with stats & quick actions
│   │   ├── DocumentLibraryPage.tsx  # Upload & browse documents
│   │   ├── DocumentDetailPage.tsx   # Single document view with study options
│   │   ├── StudyNotesPage.tsx       # AI-generated study notes
│   │   ├── KnowledgeGapPage.tsx     # Knowledge gap visualisation
│   │   ├── CanvasPerformancePage.tsx # Canvas LMS analytics
│   │   ├── PostSessionPage.tsx      # Post-study session summary
│   │   ├── SettingsPage.tsx         # User settings
│   │   ├── auth/                    # Sign-in, sign-up, password reset, Canvas SSO, email verification
│   │   ├── onboarding/              # Profile → Upload → Study-mode steps
│   │   └── study/                   # Flashcard, Quiz, Socratic study pages
│   ├── components/
│   │   ├── auth/                    # Auth forms & protected route wrapper
│   │   ├── dashboard/               # Welcome banner, streak counter, quick-start buttons
│   │   ├── documents/               # Document cards, upload zone, Canvas sync modal
│   │   ├── knowledgegap/            # Knowledge gap map, topic bubbles, filters
│   │   ├── layout/                  # Navbar, Sidebar, BottomNav, PageWrapper
│   │   ├── notifications/           # Notification bell, items, detail view
│   │   ├── session/                 # Post-session summary component
│   │   ├── study/                   # Flashcard, quiz, and Socratic dialogue components
│   │   └── ui/                      # Reusable UI primitives (Button, Card, Modal, Spinner, etc.)
│   ├── hooks/                       # Custom React hooks (useAuth, useDocumentUpload, useStudySession, etc.)
│   ├── services/                    # API service modules (auth, documents, study, Canvas, notifications, analytics)
│   ├── store/                       # Zustand stores (auth, documents, notifications, sessions)
│   ├── types/                       # TypeScript type definitions
│   └── utils/                       # Helpers (Bloom's taxonomy, SM-2 algorithm, formatters, constants)
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
└── postcss.config.js
```

---

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** — version **18.x** or higher → [Download Node.js](https://nodejs.org/)
- **npm** — comes bundled with Node.js (v9+ recommended), or use **yarn** / **pnpm**
- **Git** — [Download Git](https://git-scm.com/)

Verify your installations:

```bash
node --version    # Should output v18.x or higher
npm --version     # Should output v9.x or higher
git --version
```

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/socra-frontend.git
cd socra-frontend
```

*(Replace the URL with the actual repository URL.)*

### 2. Install dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. Configure environment variables

Create a `.env` file in the project root:

```bash
cp .env.example .env    # if an example file exists, otherwise create manually
```

Add the following variable:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

> Change the value to match your backend API URL. For production, use the deployed backend URL (e.g., `https://api.socra-app.com/api`).

### 4. Ensure the backend is running

SOCRA's frontend communicates with a REST API backend. Make sure the backend server is running at the URL specified in `VITE_API_BASE_URL` before using the app. Refer to the backend repository's README for setup instructions.

---

## Running the App

### Development server

```bash
npm run dev
```

This starts the Vite development server with hot module replacement (HMR). By default, the app will be available at:

```
http://localhost:5173
```

### Linting

```bash
npm run lint
```

Runs ESLint across the project to check for code quality issues.

### Preview production build locally

```bash
npm run preview
```

Serves the production build locally for testing before deployment.

---

## Building for Production

```bash
npm run build
```

This will:

1. Run the TypeScript compiler (`tsc -b`) to type-check the entire project.
2. Bundle the application with Vite into the `build/` directory.

The output in `build/` is ready to be deployed to any static hosting provider (Vercel, Netlify, AWS S3 + CloudFront, etc.).

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_API_BASE_URL` | Yes | Base URL for the SOCRA backend API (e.g., `http://localhost:8000/api`) |

> All client-side environment variables must be prefixed with `VITE_` to be exposed by Vite.

---

## Related Files & Key Directories

| File / Directory | Purpose |
|---|---|
| `package.json` | Project metadata, scripts, and dependency list |
| `vite.config.ts` | Vite build configuration (React plugin, output directory) |
| `tailwind.config.ts` | Tailwind CSS theme customisation and design tokens |
| `tsconfig.json` | Root TypeScript configuration |
| `tsconfig.app.json` | TypeScript config for the application source code |
| `tsconfig.node.json` | TypeScript config for Node-side files (Vite config, etc.) |
| `eslint.config.js` | ESLint flat config with TypeScript and React plugins |
| `postcss.config.js` | PostCSS configuration (Tailwind + Autoprefixer) |
| `index.html` | HTML entry point — Vite injects the app bundle here |
| `src/main.tsx` | Application bootstrap — React Query provider, Router provider |
| `src/router/index.tsx` | Centralised route definitions (public and authenticated routes) |
| `src/services/api.ts` | Axios instance with auth interceptor and response unwrapper |
| `src/store/authStore.ts` | Zustand store for authentication state and JWT management |
| `src/utils/sm2.ts` | SM-2 spaced repetition algorithm implementation |
| `src/utils/bloomsHelper.ts` | Bloom's Taxonomy level utilities for Socratic dialogue |
