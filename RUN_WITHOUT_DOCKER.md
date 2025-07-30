# Running the Project Without Docker

This guide explains how to run the Next.js lawyer portfolio project without Docker.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- TypeScript

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

The project uses Prisma with SQLite. Set up the database:

```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push
```

### 3. Development Mode

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Production Mode

For production deployment:

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

Or use the combined command:

```bash
npm run start:prod
```

The application will be available at `http://localhost:3000` (or the port specified by the `PORT` environment variable).

## Environment Variables

You can set the following environment variables:

- `NODE_ENV`: Set to 'production' for production mode
- `PORT`: The port number to run the server on (default: 3000)

Example:

```bash
NODE_ENV=production PORT=8080 npm run start
```

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Prisma** ORM with SQLite database
- **Socket.IO** for real-time features
- **Responsive design** for all devices
- **Blog system** with search and filtering
- **Contact form** with API integration

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage (lawyer portfolio)
│   ├── blog/              # Blog pages
│   └── api/               # API endpoints
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
└── lib/                  # Utilities and configurations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run start:prod` - Build and start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:reset` - Reset database

## Troubleshooting

### Port Already in Use

If you get a port already in use error, you can:

1. Change the port:
   ```bash
   PORT=3001 npm run dev
   ```

2. Kill the process using the port:
   ```bash
   # On Linux/Mac
   lsof -ti:3000 | xargs kill -9
   
   # On Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

### Database Issues

If you encounter database issues:

1. Reset the database:
   ```bash
   npm run db:reset
   ```

2. Regenerate Prisma client:
   ```bash
   npm run db:generate
   ```

### Build Issues

If the build fails:

1. Clean the build cache:
   ```bash
   rm -rf .next
   npm run build
   ```

2. Check for TypeScript errors:
   ```bash
   npx tsc --noEmit
   ```

## Deployment

The project is ready for deployment on any platform that supports Node.js:

- **Vercel**: Connect your GitHub repository and deploy
- **Netlify**: Use the build command `npm run build` and publish directory `.next`
- **AWS/Azure/GCP**: Deploy as a Node.js application

For production deployment, make sure to set the `NODE_ENV=production` environment variable.