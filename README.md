# chat-devops

A full-stack real-time chat application built as a hands-on DevOps learning project. The backend uses Express with TypeScript and connects with MongoDB, sending real-time updates via Socket.IO. The frontend is a Vite + React SPA handling auth, API calls, and live chat. The project is fully containerised with Docker and ships with a GitHub Actions CI/CD pipeline that lints, builds, and deploys to AWS EC2 automatically on every push.

## Features

- Email/password sign up and login with JWT tokens.
- Live chat room with message history, typing indicators, and join/leave alerts.
- Live dashboard stats showing total users, messages, and active users.
- Clean React component library with shared hooks and context providers.
- Pagination endpoint to fetch older messages when scrolling up.
- Dockerised backend and frontend with Docker Compose for local development.
- GitHub Actions CI pipeline with lint and format checks on every pull request.
- Automated CD pipeline deploying to AWS EC2 via SSH on every push to `main`.

## Tech Stack

- **Backend:** Node.js, Express, Socket.IO, Mongoose, TypeScript.
- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS, Radix UI, Socket.IO Client.
- **DevOps:** Docker, Docker Compose, GitHub Actions, AWS EC2.
- **Tooling:** Axios, ts-node, nodemon, Sonner notifications.

## CI/CD Pipeline

### Continuous Integration
Every pull request triggers a GitHub Actions workflow that:
- Checks code formatting and linting on both backend and frontend.
- Fails fast on any lint or format errors before merge.

### Continuous Deployment
Every push to `main` triggers a deployment workflow that:
- SSHs into the AWS EC2 instance.
- Pulls the latest code from the repository.
- Rebuilds and restarts the containers using Docker Compose.

### Branch Protection
The `main` branch is protected — PRs must pass all CI checks before they can be merged.

## Project Structure

chat-devops/
├── .github/
│   └── workflows/
│       ├── ci.yml            # Lint and format checks on PRs
│       └── deploy.yml        # SSH deploy to EC2 on push to main
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── config/           # Mongo connection helper
│       ├── controllers/      # Auth, user, and message handlers
│       ├── middleware/        # Auth guard + error handler
│       ├── models/           # Mongoose schemas (User, Message)
│       ├── routes/           # REST routes mounted under /api
│       ├── socket/           # Socket.IO setup and events
│       ├── types/            # Shared TypeScript types
│       ├── utils/            # JWT helpers
│       └── server.ts         # Express app entry point
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── api/              # Axios instance and REST helpers
│       ├── components/       # UI building blocks (chat, forms, UI kit)
│       ├── config/           # Auth form config
│       ├── context/          # Auth and socket providers
│       ├── hooks/            # Custom hooks for auth/socket
│       ├── pages/            # Route-level screens (Home, Auth, Chat)
│       ├── service/          # API calls grouped by feature
│       ├── types/            # Shared TypeScript types
│       └── main.tsx          # React entry point
├── docker-compose.yml        # Local dev orchestration
└── README.md


## Prerequisites

- Node.js 18+ and npm.
- Docker and Docker Compose.
- Running MongoDB instance (local Docker or Atlas URI).

## Getting Started

### With Docker Compose (recommended)

```bash
git clone <repo-url> chat-devops
cd chat-devops
```

Create your env files (see Environment Variables below), then:

```bash
docker compose up --build
```

- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:5173`

### Without Docker

Clone the repo and install dependencies in both folders:

```bash
git clone <repo-url> chat-devops
cd chat-devops

cd backend && npm install
cd ../frontend && npm install
```

#### Backend

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

#### Frontend

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

PORT=5000
MONGODB_URI=mongodb://localhost:27017/chat-devops
JWT_SECRET=change-me
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development

### `frontend/.env`

VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000


## API & Socket Overview

- `POST /api/auth/register` – create an account.
- `POST /api/auth/login` – authenticate and return JWT.
- `GET /api/auth/me` – profile of the currently authenticated user.
- `GET /api/messages/older?before=<messageId>` – paginate message history on scroll.
- `GET /api/stats` – totals for users and messages.
- Socket.IO emits/receives:
  - `sendMessage` / `message`
  - `typing` / `userTyping`
  - `stopTyping` / `userStopTyping`
  - `loadMessages`, `stats`, `userJoined`, `userLeft`

## Useful Commands

- Backend: `npm run dev`, `npm run build`, `npm start`.
- Frontend: `npm run dev`, `npm run lint`, `npm run build`, `npm run preview`.
- Docker: `docker compose up --build`, `docker compose down`.