# BHP Perfect - E-commerce Platform

## Overview

BHP Perfect is a full-stack e-commerce application for professional workwear and personal protective equipment (PPE). The application features a modern React frontend with an Express backend, supporting product catalog, shopping cart, orders, and customer reviews.

## Project Architecture

This is a monorepo application with the following structure:

- **apps/frontend/** - React + Vite frontend application
- **apps/backend/** - Express.js backend server  
- **packages/database/** - Drizzle ORM database schema and configuration
- **packages/shared/** - Shared types and schemas between frontend and backend

## Recent Changes

### Initial Replit Setup (November 21, 2025)
- Configured backend to bind to `0.0.0.0:5000` for Replit environment
- Updated Vite to allow all hosts for proxy support
- Set up SQLite database for development (DATABASE_URL is unset to force SQLite)
- Replaced missing image assets with placeholder URLs from Unsplash
- Configured deployment settings for autoscale deployment

## Technology Stack

### Frontend
- React 18
- Vite (build tool)
- Wouter (routing)
- TanStack Query (data fetching)
- Tailwind CSS + Radix UI (styling)
- TypeScript

### Backend
- Express.js
- Drizzle ORM
- Better-sqlite3 (development) / Neon PostgreSQL (production)
- Passport.js (authentication)
- TypeScript

## Development

### Running Locally

The application is configured to run with a single command:

```bash
npm run dev:backend
```

This starts:
- Express server on port 5000
- Vite development server (integrated via middleware)
- Hot module replacement for frontend

**Important**: The `DATABASE_URL` environment variable must be unset to use SQLite in development. The workflow automatically handles this.

### Database

The application uses:
- **Development**: SQLite (`packages/database/dev.sqlite`)
- **Production**: PostgreSQL (via DATABASE_URL)

To switch between databases:
- SQLite: Ensure `USE_SQLITE=true` or no `DATABASE_URL` is set
- PostgreSQL: Set `DATABASE_URL` to your PostgreSQL connection string

### Key Scripts

- `npm run dev` - Run both frontend and backend
- `npm run dev:backend` - Run backend only (serves frontend in dev mode)
- `npm run dev:frontend` - Run frontend only
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio for database management

## Environment Configuration

### Development Environment Variables
- `NODE_ENV=development` - Set automatically by scripts
- `USE_SQLITE=true` - Forces SQLite database usage
- `PORT=5000` - Server port (default)

### Production Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption key

## User Preferences

None documented yet.

## Deployment

The application is configured for autoscale deployment on Replit:

- **Build**: `npm run build`
- **Start**: `npm start`
- **Target**: Autoscale (stateless web application)

The production server:
1. Builds frontend assets to `dist/frontend`
2. Bundles backend code to `dist/backend`
3. Serves static frontend files and API routes from a single Express server on port 5000

## Known Issues

- Missing image assets in `attached_assets/` - currently using placeholder URLs
- Database migrations may fail with drizzle-kit due to ESM configuration issues - the database schema is created automatically by the application on startup

## Future Improvements

- Add actual product images to `attached_assets/` folder
- Set up proper image upload functionality
- Configure production PostgreSQL database
- Add database seeding for sample products
