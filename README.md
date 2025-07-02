# Slush Bill Splitter

A web application that allows users to manually assign amounts to each participant in a group bill splitting scenario.

## Overview

This application was built for Slush LLC as part of a full stack mobile developer job test. It provides a user-friendly interface for splitting bills among multiple participants, with real-time validation to ensure the split is accurate.

## Features

- Enter a total bill amount
- Add/remove participants
- Manually assign amounts to each participant
- Real-time validation of split totals
- "Split Evenly" button to automatically distribute the bill equally
- Backend validation API

## Tech Stack

### Frontend
- Next.js (React framework)
- TypeScript
- Tailwind CSS for styling
- React Icons for UI elements

### Backend
- Node.js with Fastify (lightweight alternative to Express)
- Jest for unit testing

## Architecture

The application follows a client-server architecture:

1. **Frontend (Next.js)**
   - User interface for bill splitting
   - Real-time client-side validation
   - Communication with backend API

2. **Backend (Fastify)**
   - RESTful API endpoint for validating bill splits
   - Business logic for validating splits
   - Unit tests for validation logic

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd slush-bill-splitter
   ```

2. Install dependencies:
   ```
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Start the development servers:
   ```
   # Start backend server (from the backend directory)
   npm run dev
   
   # In a new terminal, start frontend server (from the frontend directory)
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Deployment

### Frontend
The frontend is deployed on Vercel. To deploy your own instance:

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure the build settings and deploy

### Backend
The backend is deployed on Railway. To deploy your own instance:

1. Push your code to GitHub
2. Import the project in Railway
3. Configure the environment variables and deploy

## API Documentation

### Validate Split

**Endpoint:** `POST /api/validate-split`

**Request Body:**
```json
{
  "total": 125.00,
  "splits": {
    "Alice": 60,
    "Bob": 65
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Split is valid.",
  "difference": 0
}
```

## License

This project is proprietary and owned by Slush LLC. 