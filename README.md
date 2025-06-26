# Leaderz Frontend

A React-based frontend for the Leaderz golf tournament leaderboard app, built with Vite and TypeScript.

## Features

- Real-time leaderboard updates using Server-Sent Events (SSE)
- Live chat functionality
- Responsive design with Tailwind CSS
- TypeScript for type safety

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Client-side routing

## Development

### Prerequisites

- Node.js 22.x
- npm

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your environment variables:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000`.

## Building for Production

```bash
npm run build
```

## Deployment on Railway

This frontend is configured for deployment on Railway with private network communication:

1. **Docker-based deployment** - Uses a Dockerfile for consistent builds
2. **Private network** - Communicates with backend via Railway's internal network
3. **Environment variables** - Set `VITE_API_BASE_URL` to the internal backend URL
4. **Health checks** - Automatic health monitoring
5. **Auto-restart** - Automatic restart on failures

### Railway Environment Variables

Set these in your Railway project:

- `VITE_API_BASE_URL` - Internal URL of your backend API: `http://leaderz-backend.railway.internal:3000/api`

### Railway Private Network Setup

1. **Backend Service**: Deploy your backend first and note its internal hostname
2. **Frontend Service**: Deploy your frontend and set the environment variable to point to the backend's internal URL
3. **Network Communication**: The frontend will communicate with the backend using Railway's private network

### Deployment Steps

1. Deploy your backend service to Railway first
2. Note the internal hostname (e.g., `leaderz-backend.railway.internal`)
3. Deploy your frontend service to Railway
4. Set `VITE_API_BASE_URL=http://leaderz-backend.railway.internal:3000/api` in the frontend's environment variables
5. The frontend will be available at your Railway URL

## API Integration

The frontend communicates with the backend via:

- **REST API** - For fetching tournament data and chat messages
- **Server-Sent Events (SSE)** - For real-time updates to leaderboard and chat

## Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── types/         # TypeScript type definitions
├── App.tsx        # Main app component
└── main.tsx       # App entry point
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server (for Railway)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
