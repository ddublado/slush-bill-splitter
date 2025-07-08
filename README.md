# Slush Bill Splitter

A professional web application for splitting bills among groups with manual amount assignment and real-time validation.

## 🚀 Live Demo

- **Frontend**: [https://slush-bill-splitter-gbqptnnpi-dominic-joaquin-dublados-projects.vercel.app](https://slush-bill-splitter-gbqptnnpi-dominic-joaquin-dublados-projects.vercel.app)
- **Backend API**: [https://split-bill-interface-production.up.railway.app](https://split-bill-interface-production.up.railway.app)
- **GitHub Repository**: [https://github.com/ddublado/slush-bill-splitter](https://github.com/ddublado/slush-bill-splitter)

## 📋 Overview

Built for Slush LLC as a full-stack developer assessment, this application provides an intuitive interface for splitting bills among multiple participants with real-time validation and professional UI/UX design.

## 🏗️ Code Architecture Overview

### System Architecture

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│                 │ ──────────────> │                 │
│   Frontend      │                 │   Backend       │
│   (Next.js)     │ <────────────── │   (Fastify)     │
│   Port 3000     │                 │   Port 3001     │
└─────────────────┘                 └─────────────────┘
│                                   │
│ Vercel Deployment                 │ Railway Deployment
│ - Static Generation               │ - Docker Container
│ - Edge Caching                    │ - Auto-scaling
│ - CDN Distribution                │ - Health Monitoring
└─────────────────────────────────────────────────────┘
```

### Frontend Architecture (Next.js 14)

```
frontend/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── layout.tsx          # Root layout with header
│   │   ├── page.tsx            # Landing page with marketing
│   │   ├── split/              # Bill splitter feature
│   │   │   └── page.tsx        # Main splitting interface
│   │   └── globals.css         # Global styles + Tailwind
│   │
│   └── components/             # Reusable React components
│       ├── BillSplitter.tsx    # Core splitting logic
│       ├── Header.tsx          # Navigation component
│       ├── PhoneMockup.tsx     # Marketing phone display
│       └── DecorativeBackground.tsx
│
├── public/                     # Static assets
├── package.json               # Dependencies & scripts
├── tailwind.config.ts         # Tailwind CSS configuration
├── next.config.js             # Next.js configuration
└── vercel.json               # Deployment configuration
```

**Key Frontend Components:**

1. **Landing Page (`app/page.tsx`)**
   - Hero section with gradient design
   - Feature highlights
   - Call-to-action buttons
   - Phone mockup animation

2. **BillSplitter (`components/BillSplitter.tsx`)**
   - State management for participants and amounts
   - Real-time validation logic
   - API integration for backend validation
   - Form handling and user interactions

3. **Header (`components/Header.tsx`)**
   - Navigation between pages
   - Responsive design
   - Branding consistency

### Backend Architecture (Fastify)

```
backend/
├── index.js                   # Main server file
├── index.test.js             # Jest unit tests
├── package.json              # Dependencies & scripts
└── railway.json              # Railway deployment config
```

**API Endpoints:**

```javascript
// Root endpoint - API documentation
GET /
Response: {
  name: "Slush Bill Splitter API",
  version: "1.0.0",
  endpoints: { ... },
  status: "running"
}

// Health check
GET /health
Response: {
  status: "healthy",
  uptime: 12345
}

// Main validation endpoint
POST /api/validate-split
Request: {
  total: 125.00,
  splits: { "Alice": 60, "Bob": 65 }
}
Response: {
  success: true,
  message: "Split is valid.",
  difference: 0
}
```

### Data Flow Architecture

```
User Input → Frontend Validation → UI Update → Backend API → Response → UI Update

1. User enters total amount
   ↓
2. Real-time client validation
   ↓
3. Visual feedback (success/error states)
   ↓
4. User clicks "Continue"
   ↓
5. POST request to /api/validate-split
   ↓
6. Backend validates and responds
   ↓
7. Frontend shows completion flow
```

### State Management Pattern

```javascript
// BillSplitter.tsx - React State Management
const [totalAmount, setTotalAmount] = useState<number | ''>('');
const [participants, setParticipants] = useState<Participant[]>([...]);
const [validationStatus, setValidationStatus] = useState<'success' | 'error' | 'warning' | null>(null);
const [isLoading, setIsLoading] = useState<boolean>(false);
const [isComplete, setIsComplete] = useState<boolean>(false);

// Real-time validation with useEffect
useEffect(() => {
  // Trigger validation on amount/participant changes
  validateLocalSplit();
}, [totalAmount, participants]);
```

### Styling Architecture

```
Tailwind CSS + Custom CSS Variables
├── Global Theme (globals.css)
│   ├── CSS Variables for brand colors
│   ├── Component classes (.primary-btn, .feature-card)
│   └── Responsive utilities
│
├── Tailwind Configuration
│   ├── Custom color palette
│   ├── Font configurations
│   └── Responsive breakpoints
│
└── Component-Specific Styles
    ├── Gradient effects
    ├── Animation classes
    └── Mobile-first responsive design
```

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 14, React 18, TypeScript | Modern React framework with SSG |
| **Styling** | Tailwind CSS, Custom CSS | Utility-first styling with brand theming |
| **Icons** | React Icons | Consistent iconography |
| **Backend** | Node.js, Fastify | Lightweight, fast web framework |
| **Testing** | Jest | Unit testing for validation logic |
| **Deployment** | Vercel (Frontend), Railway (Backend) | Modern deployment platforms |

## 🏃‍♂️ Local Development

### Prerequisites
- Node.js (v18+)
- npm (v7+)

### Setup

```bash
# Clone repository
git clone https://github.com/ddublado/slush-bill-splitter.git
cd slush-bill-splitter

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running Locally

```bash
# Terminal 1: Start backend (from backend/)
npm run dev
# Runs on http://localhost:3001

# Terminal 2: Start frontend (from frontend/)
npm run dev
# Runs on http://localhost:3000
```

### Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend build test
cd frontend
npm run build
```

## 🚀 Deployment

### Frontend (Vercel)
- Automatic deployment from GitHub
- Static site generation
- Edge caching and CDN

### Backend (Railway)
- Docker containerization
- Automatic scaling
- Health monitoring

## 📊 Key Features Implemented

✅ **Frontend Requirements**
- Professional landing page with Slush branding
- Bill splitting interface with manual amount assignment
- Real-time validation and error handling
- "Split Evenly" functionality
- Responsive design for all devices

✅ **Backend Requirements**
- FastAPI-style backend (using Fastify)
- POST endpoint accepting specified JSON format
- Comprehensive validation logic
- Error handling for edge cases

✅ **Bonus Features**
- Unit tests with Jest
- Professional UI/UX design
- Deployment on modern platforms
- API documentation endpoints

## 🔧 Core Algorithms

### Split Validation Logic
```javascript
function validateSplit(total, splits) {
  const sum = Object.values(splits).reduce((acc, val) => acc + val, 0);
  return parseFloat(sum.toFixed(2)) === parseFloat(total.toFixed(2));
}
```

### Even Split with Rounding
```javascript
const evenSplit = total / participantCount;
const lastPersonAdjustment = total - (evenSplit * (participantCount - 1));
// Last person gets remainder to ensure exact total
```

## 📄 License

This project is proprietary and owned by Slush LLC. 