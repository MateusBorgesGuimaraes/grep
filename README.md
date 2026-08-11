# grep

> A minimalist RSS reader for discovering, organizing, and keeping track of articles from your favorite feeds.

`grep` is a frontend application designed to provide a simple and organized experience for consuming RSS content. It brings articles, feeds, categories, search, filtering, saved articles, and feed management together in a clean, terminal-inspired interface.

## ✨ Features

* **Article feed** — browse articles from available RSS feeds.
* **Feed management** — add and manage RSS feeds.
* **Categories** — organize feeds into custom categories.
* **Search** — search through available articles.
* **Unread articles** — filter and keep track of unread content.
* **Saved articles** — save articles to read later.
* **Read status** — mark articles as read.
* **Filtering** — filter by category, feed, and unread status.
* **Sorting** — sort articles in ascending or descending order.
* **Pagination** — navigate through large collections of articles.
* **List/Grid views** — switch between different article layouts.
* **Theme support** — light, dark, and automatic themes.
* **Reusable components** — shared UI components for forms, cards, navigation, modals, pagination, and more.
* **Form validation** — validated forms using React Hook Form and Zod.
* **Toast notifications** — user feedback with Sonner.

## 🛠️ Tech Stack

### Core

* [React 19](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vite.dev/)
* [TanStack Start](https://tanstack.com/start)

### Routing & Data

* [TanStack Router](https://tanstack.com/router)
* [TanStack Query](https://tanstack.com/query)
* [Axios](https://axios-http.com/)

### Forms & Validation

* [React Hook Form](https://react-hook-form.com/)
* [Zod](https://zod.dev/)

### UI & Styling

* [Tailwind CSS](https://tailwindcss.com/)
* [Lucide React](https://lucide.dev/)
* [Iconoir](https://iconoir.com/)
* [Sonner](https://sonner.emilkowal.ski/)
* [Courier Prime](https://fonts.google.com/specimen/Courier+Prime)

## 🧩 Frontend Architecture

The project is structured around reusable components, route-level pages, custom hooks, API services, validation schemas, and TanStack integrations.

```text
src/
├── components/             # Reusable UI components
│   ├── form/               # Form controls and inputs
│   └── pages/              # Page-specific components
├── hooks/                  # Queries, mutations, and application logic
├── integrations/           # TanStack Query integration
├── routes/                 # File-based TanStack Router routes
├── schemas/                # Zod validation schemas
├── services/               # API communication
├── styles.css              # Global styles and theme variables
├── router.tsx              # Router configuration
└── routeTree.gen.ts        # Generated route tree
```

TanStack Router handles file-based routing, while TanStack Query manages server state, caching, and synchronization with the API.

Application filters are also synchronized with URL search parameters, keeping pagination, categories, feeds, search, sorting, and unread status connected to the current route.

## 🎨 Design

The interface follows a minimal, developer-oriented visual language inspired by terminal applications and desktop environments.

### Visual characteristics

* Monochromatic neutral palette
* `Courier Prime` typography
* Subtle borders and elevated surfaces
* macOS-inspired window controls
* Light and dark themes
* Automatic system theme detection
* Compact, information-dense layouts
* Minimal animations and transitions

The theme is initialized before the application renders to reduce visual changes during startup.

## 🧭 Application

### Home

The main article feed, providing filtering, sorting, pagination, and different viewing modes.

### Saved

A dedicated view for articles saved for later reading.

### Categories

Organize and navigate content through custom categories.

### Search

Search for articles across the available content.

### Manage Feeds

Interface for adding and managing RSS feeds.

### Settings

Application preferences and configuration.

## 🔎 Article Filtering

Articles can be filtered using URL search parameters:

* Search query
* Feed
* Category
* Unread status
* Sort order
* Page
* Page size

For example:

```text
/?page=1&limit=6&categoryId=2&unreadOnly=true&order=DESC
```

Keeping these filters in the URL makes the current view persistent across navigation and allows filtered views to be shared directly.

## 🧱 Reusable Components

The application uses a collection of reusable components to keep the interface consistent and reduce duplication.

Some of the main component groups include:

* Buttons
* Inputs
* Search inputs
* Selects
* Article cards
* Feed cards
* Category cards
* Modals
* Pagination
* Tags
* Toggles
* Theme controls
* Navigation components

The form components are designed to be reusable across different parts of the application, while the higher-level components focus on composing the interface and application behavior.

## 📁 Project Structure

```text
grep/
├── src/
│   ├── components/
│   │   ├── form/
│   │   └── pages/
│   ├── hooks/
│   ├── integrations/
│   │   └── tanstack-query/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── styles.css
│   ├── router.tsx
│   └── routeTree.gen.ts
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 📌 Project Status

`grep` is a personal frontend project currently at version **0.1.0**.

The project focuses on practicing and applying modern frontend development concepts such as:

* React application architecture
* TypeScript
* File-based routing
* Server-state management
* URL-based application state
* Form handling and validation
* Reusable component design
* Responsive interface development
* Theme management
* API integration

## 📄 License

No license is currently specified in the repository.

## 👨‍💻 Author

**Mateus Borges Guimarães**

[GitHub](https://github.com/MateusBorgesGuimaraes)

---

Built with React, TypeScript, TanStack, and a healthy obsession with organized feeds.
