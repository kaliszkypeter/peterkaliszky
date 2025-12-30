# Peter Kaliszky Portfolio

## Overview

A personal portfolio website for Peter Kaliszky, a Product Owner with 6+ years of experience in payment systems and fintech. The site showcases professional experience, skills, blog posts, and contact information. Built with a modern React frontend and Express backend, following a clean, minimalist design inspired by Linear, Stripe, and Vercel portfolios.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Typography**: Inter (body) and Space Grotesk (display) from Google Fonts

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Design**: RESTful endpoints under `/api` prefix
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Validation**: Zod with drizzle-zod integration
- **Development Server**: Vite dev server with HMR, proxied through Express

### Build System
- **Frontend Build**: Vite for development and production builds
- **Backend Build**: esbuild for bundling server code
- **Output**: Frontend to `dist/public`, backend to `dist/index.cjs`

### Project Structure
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    pages/        # Route-level page components
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  routes.ts       # API route definitions
  storage.ts      # Data access layer (in-memory with DB schema ready)
shared/           # Shared types and schema definitions
  schema.ts       # Drizzle database schema and Zod types
```

### Data Layer
- **Current State**: In-memory storage with seeded blog posts
- **Database Ready**: PostgreSQL schema defined with Drizzle, migrations configured
- **Entities**: Users (authentication ready), BlogPosts (title, slug, content, category, reading time)

### Key Design Decisions
1. **Monorepo Structure**: Client, server, and shared code in one repository for simplified deployment and type sharing
2. **Path Aliases**: `@/` for client imports, `@shared/` for shared types
3. **Theme System**: CSS custom properties enable runtime theme switching without rebuild
4. **API Pattern**: Query keys match API paths for automatic fetching with React Query

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires DATABASE_URL environment variable)
- **Drizzle Kit**: Database migrations via `npm run db:push`

### UI Libraries
- **Radix UI**: Accessible primitive components (dialog, dropdown, tabs, etc.)
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel component
- **Recharts**: Charting library (available but not currently used)

### Development Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Server bundling for production
- **TypeScript**: Full type safety across client and server

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment indicator