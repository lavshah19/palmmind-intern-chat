# Palmmind Intern Chat

This is a full-stack chat application. The backend uses Express with TypeScript and connects with MongoDB, sending real-time updates via Socket.IO. On the frontend, a Vite + React SPA handles the API, manages authentication, and displays the live chat data.


## Features
- Email/password sign up and login with JWT tokens.
- Live chat room with message history, typing status, and join/leave alerts.
- live dashboard stats showing total users and messages and active users.
- Clean React component library with shared hooks and context providers.
- Pagination endpoint to fetch older messages when scrolling up.

## Tech Stack
- **Backend:** Node.js, Express, Socket.IO, Mongoose, TypeScript.
- **Frontend:** React 19, Vite, TypeScript, Tailwind, Radix UI, Socket.IO Client.
- **Tooling:** Axios, ts-node, nodemon, Sonner notifications.

## Project Structure
```
palmmind-intern-chat/
├── backend/
│   ├── package.json          # Backend dependencies and scripts
│   └── src/
│       ├── config/           # Mongo connection helper
│       ├── controllers/      # Auth, user, and message handlers
│       ├── middleware/       # Auth guard + error handler
│       ├── models/           # Mongoose schemas (User, Message)
│       ├── routes/           # REST routes mounted under /api
│       ├── socket/           # Socket.IO setup and events
|       ├── types/            # Shared TypeScript types
|       ├── utils/            # utils for jwt
│       └── server.ts         # Express app entry point
├── frontend/
│   ├── package.json          # Frontend dependencies and scripts
│   └── src/
│       ├── api/              # Axios instance and REST helpers
│       ├── components/       # UI building blocks (chat, forms, UI kit)
|       ├── config/           #config for auth form 
│       ├── context/          # Auth and socket providers
│       ├── hooks/            # Custom hooks for auth/socket
│       ├── pages/            # Route-level screens (Home, Auth, Chat)
│       ├── service/          # API calls grouped by feature
│       ├── types/            # Shared TypeScript types
│       └── main.tsx          # React entry point
└── README.md
```

## Prerequisites
- Node.js 18+ and npm.
- Running MongoDB instance (local Docker or Atlas URI).
- Two terminals (or panes) to run backend and frontend dev servers concurrently.

## Getting Started
Clone the repo and install dependencies in both folders:
```bash
git clone <repo-url> palmmind-intern-chat
cd palmmind-intern-chat

cd backend && npm install
cd ../frontend && npm install
```

### Backend (API + Socket server)
1. Create `backend/.env` with the variables below.
2. Start the dev server:
   ```bash
   cd backend
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build && npm start
   ```

### Frontend (Vite + React)
1. Create `frontend/.env` with the variables below.
2. Run the dev server:
   ```bash
   cd frontend
   npm run dev
   ```
   Vite defaults to `http://localhost:5173`.
3. Build + preview:
   ```bash
   npm run build
   npm run preview
   ```

## Environment Variables
### `backend/.env`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/palmmind-chat
JWT_SECRET=change-me
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### `frontend/.env`
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## API & Socket Overview
- `POST /api/auth/register` – create an account.
- `POST /api/auth/login` – authenticate and return JWT.
- `GET /api/auth/me` – profile of currently authenticated user.
- `GET /api/users` – list users (JWT required); supports `/:id`, `PUT`, `DELETE`. but now it is not in used 
- `GET /api/messages/older?before=<messageId>` – paginate message history on scroll.
- `GET /api/stats` – totals for users and messages.
- Socket.IO namespace (default) emits/receives:
  - `sendMessage` / `message`
  - `typing` / `userTyping`
  - `stopTyping` / `userStopTyping`
  - `loadMessages`, `stats`, `userJoined`, `userLeft`

## Useful Commands
- Backend: `npm run dev`, `npm run build`, `npm start`.
- Frontend: `npm run dev`, `npm run lint`, `npm run build`, `npm run preview`.

