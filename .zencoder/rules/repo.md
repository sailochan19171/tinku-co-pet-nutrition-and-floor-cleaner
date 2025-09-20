---
description: Repository Information Overview
alwaysApply: true
---

# Tinku Project Information

## Summary
A web application built with React (frontend) and Express (backend) that appears to be related to pet nutrition services. The project is structured as a monorepo with separate frontend and backend packages.

## Structure
- **project/**: Main project directory containing both frontend and backend code
  - **src/**: Frontend React application source code
  - **server/**: Backend Express server code
  - **public/**: Static assets including images

## Frontend (React Application)

### Language & Runtime
**Language**: TypeScript
**Framework**: React 18
**Build System**: Vite
**Package Manager**: npm

### Dependencies
**Main Dependencies**:
- react: ^18.3.1
- react-dom: ^18.3.1
- react-router-dom: ^6.26.2
- framer-motion: ^12.23.16
- @supabase/supabase-js: ^2.57.4
- firebase: ^10.13.1
- lucide-react: ^0.544.0

**Development Dependencies**:
- typescript: ^5.5.3
- vite: ^5.4.2
- @vitejs/plugin-react: ^4.3.1
- tailwindcss: ^3.4.1
- eslint: ^9.9.1

### Build & Installation
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Main Files
**Entry Point**: src/main.tsx
**Configuration**: vite.config.ts, tailwind.config.js
**Routing**: Uses react-router-dom for navigation

## Backend (Express Server)

### Language & Runtime
**Language**: TypeScript
**Framework**: Express
**Package Manager**: npm

### Dependencies
**Main Dependencies**:
- express: ^4.21.2
- cors: ^2.8.5
- dotenv: ^16.6.1
- mongodb: ^6.6.2
- mongoose: ^8.18.1
- nodemailer: ^6.9.14
- openai: ^4.104.0
- razorpay: ^2.9.6

**Development Dependencies**:
- typescript: ^5.9.2
- ts-node: ^10.9.2
- tsx: ^4.20.5
- nodemon: ^3.0.2
- @types/express: ^4.17.23
- @types/cors: ^2.8.19

### Build & Installation
```bash
# Install dependencies
cd server
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Main Files
**Server Structure**:
- routes/: API route definitions
- utils/: Utility functions including mailer
- jobs/: Background jobs including subscription emails

### API Integration
The frontend connects to the backend API through a proxy configuration in Vite, targeting localhost:5050 for API requests.