# Full-Stack Starter Implementation TODO

## Phase 1: Core Infrastructure Setup

### 1.1 Server Package Setup with Effect

- [ ] Update server package.json with Effect dependencies (`effect`, `@effect/platform-node`, `@effect/schema`, `hono`, `tsx`)
- [ ] Create basic Effect server structure in `packages/server/src/`
  - [ ] `src/index.ts` - Main entry point with NodeRuntime
  - [ ] `src/server.ts` - HTTP server setup with Effect
  - [ ] `src/app.ts` - Hono app with basic routes
- [ ] Configure TypeScript for Effect patterns
- [ ] Add development scripts (dev, build, start)

### 1.2 Database Integration

- [ ] Add Drizzle ORM dependencies (`drizzle-orm`, `drizzle-kit`, `pg`, `@types/pg`)
- [ ] Create `drizzle.config.ts` configuration file
- [ ] Set up database connection service using Effect in `src/db/connection.ts`
- [ ] Create database schema structure:
  - [ ] `src/db/schema/users.ts` - User table schema
  - [ ] `src/db/schema/auth.ts` - Auth tables (sessions, accounts, verifications)
  - [ ] `src/db/schema/index.ts` - Export all schemas
- [ ] Add database scripts to package.json (generate, migrate, studio, push, seed)

### 1.3 Domain Package Enhancement

- [ ] Update domain package.json with Effect Schema dependencies
- [ ] Create shared schemas using `@effect/schema`:
  - [ ] `src/schemas/user.ts` - User validation schemas
  - [ ] `src/schemas/auth.ts` - Auth request/response schemas
  - [ ] `src/types/index.ts` - TypeScript types
  - [ ] `src/utils/validation.ts` - Validation utilities
- [ ] Export all schemas in `src/index.ts`

## Phase 2: Authentication System

### 2.1 better-auth Server Integration

- [ ] Add better-auth dependency to server package
- [ ] Create better-auth configuration in `src/auth/config.ts`
- [ ] Configure PostgreSQL adapter for better-auth
- [ ] Set up authentication providers (email/password)
- [ ] Create auth middleware using Effect in `src/auth/middleware.ts`
- [ ] Add environment variables for auth secrets

### 2.2 Database Schema for Auth

- [ ] Generate initial Drizzle migration for auth tables
- [ ] Create database seeding script in `src/scripts/seed.ts`
- [ ] Add test user accounts for development
- [ ] Set up user roles and permissions structure

### 2.3 Server Auth Endpoints

- [ ] Create auth router in `src/routes/auth.ts`
- [ ] Implement auth endpoints using Effect + better-auth:
  - [ ] POST `/auth/sign-up` - User registration
  - [ ] POST `/auth/sign-in` - User login
  - [ ] POST `/auth/sign-out` - User logout
  - [ ] GET `/auth/session` - Get current session
  - [ ] POST `/auth/verify-email` - Email verification
- [ ] Create protected route middleware
- [ ] Add user management endpoints:
  - [ ] GET `/api/users` - List users (admin)
  - [ ] GET `/api/users/:id` - Get user details
  - [ ] PUT `/api/users/:id` - Update user
  - [ ] DELETE `/api/users/:id` - Delete user (admin)
- [ ] Integrate auth routes with main app

## Phase 3: Client-Side Authentication

### 3.1 Client Auth Setup

- [ ] Add better-auth client package to client dependencies
- [ ] Create auth configuration in `src/lib/auth.ts`
- [ ] Set up auth context and providers in `src/providers/AuthProvider.tsx`
- [ ] Configure auth-aware routing with TanStack Router
- [ ] Create route guards for protected pages

### 3.2 Auth UI Components

- [ ] Create auth components:
  - [ ] `src/components/auth/LoginForm.tsx` - Login form
  - [ ] `src/components/auth/RegisterForm.tsx` - Registration form
  - [ ] `src/components/auth/UserMenu.tsx` - User dropdown menu
  - [ ] `src/components/auth/ProtectedRoute.tsx` - Route protection
- [ ] Create auth pages:
  - [ ] `src/routes/auth/login.tsx` - Login page
  - [ ] `src/routes/auth/register.tsx` - Registration page
  - [ ] `src/routes/auth/verify-email.tsx` - Email verification
- [ ] Add logout functionality
- [ ] Implement auth state management with React hooks

### 3.3 API Integration

- [ ] Create type-safe API client in `src/lib/api.ts`
- [ ] Configure authentication headers and interceptors
- [ ] Create React hooks for auth operations:
  - [ ] `src/hooks/useAuth.ts` - Auth state management
  - [ ] `src/hooks/useUser.ts` - User data management
  - [ ] `src/hooks/useApi.ts` - API calls with auth
- [ ] Add error handling for auth failures
- [ ] Implement loading states and error messages

## Phase 4: User Management System

### 4.1 Admin User Management

- [ ] Create admin dashboard routes:
  - [ ] `src/routes/admin/index.tsx` - Admin dashboard
  - [ ] `src/routes/admin/users.tsx` - User management page
- [ ] Implement user listing and search functionality
- [ ] Add user role management UI components
- [ ] Create user activation/deactivation features
- [ ] Add bulk user operations

### 4.2 User Profile Features

- [ ] Create user profile pages:
  - [ ] `src/routes/profile/index.tsx` - Profile overview
  - [ ] `src/routes/profile/edit.tsx` - Profile editing
  - [ ] `src/routes/profile/settings.tsx` - Account settings
- [ ] Implement profile editing forms
- [ ] Add password change functionality
- [ ] Create user preferences storage
- [ ] Add profile image upload capability

## Phase 5: Development Experience & Polish

### 5.1 Development Scripts & Tools

- [ ] Add comprehensive package.json scripts to root
- [ ] Create environment template files (.env.example)
- [ ] Set up hot reload for server development
- [ ] Add database seeding with sample data
- [ ] Create development user accounts script
- [ ] Configure CORS for local development

### 5.2 Testing Setup

- [ ] Add testing frameworks:
  - [ ] Vitest for client-side tests
  - [ ] Effect testing utilities for server
- [ ] Create test utilities and helpers
- [ ] Add auth integration tests
- [ ] Set up database testing with test containers
- [ ] Add API endpoint tests
- [ ] Create component testing setup

### 5.3 Documentation & Examples

- [ ] Create comprehensive README.md with:
  - [ ] Project overview and architecture
  - [ ] Setup and installation instructions
  - [ ] Development workflow
  - [ ] API documentation
  - [ ] Environment variables guide
- [ ] Add code examples and usage patterns
- [ ] Create contributing guidelines
- [ ] Document Effect patterns used in the project
- [ ] Add troubleshooting section

### 5.4 Production Readiness

- [ ] Add error handling and logging
- [ ] Implement rate limiting
- [ ] Add input validation and sanitization
- [ ] Configure security headers
- [ ] Set up health check endpoints
- [ ] Add monitoring and metrics
- [ ] Create Docker configurations
- [ ] Set up CI/CD pipeline basics

## Environment Variables Needed

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=starter

# Auth
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3001

# Email (optional)
EMAIL_FROM=noreply@yourdomain.com
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
```

## Key Technologies Stack

- **Server**: Effect TypeScript, Hono, better-auth, Drizzle ORM, PostgreSQL
- **Client**: React 19, TanStack Router, better-auth client, Tailwind CSS
- **Database**: PostgreSQL with Drizzle migrations
- **Shared**: @effect/schema for validation, shared types
- **Dev Tools**: TypeScript, Biome, pnpm workspaces, tsx for development
