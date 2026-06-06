# TrizenMart Monorepo

A premium full-stack e-commerce platform with a Vite + React frontend and an Express/Mongoose backend deployed as Vercel serverless functions.

## Project structure

```text
trizenmart-monorepo/
├── package.json
├── vercel.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs
├── .gitignore
├── api/                  # Express + Mongoose backend
│   ├── package.json
│   ├── config/db.js
│   ├── controllers/productController.js
│   ├── controllers/orderController.js
│   ├── models/Product.js
│   ├── models/Order.js
│   └── index.js
└── src/                  # React + Tailwind frontend
    ├── index.html
    ├── index.css
    ├── main.jsx
    ├── App.jsx
    ├── context/AppContext.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Hero3D.jsx
    │   ├── ProductCard.jsx
    │   └── AIExtractorCard.jsx
    └── pages/
        ├── Storefront.jsx
        ├── Checkout.jsx
        ├── Login.jsx
        └── AdminDashboard.jsx
```

## Features

- WebGL storefront hero using `@react-three/fiber` and `@react-three/drei`
- AI spec parser UI component for simulated product ingestion
- RBAC-style admin dashboard with inventory and order management
- MongoDB persistence using `mongoose`
- WhatsApp checkout workflow automation
- Vercel-friendly serverless API routing

## Prerequisites

- Node.js 20+ recommended
- MongoDB connection string

## Installation

```bash
cd d:\TrizenMart
npm install
cd api
npm install
cd ..
```

## Local development

```bash
npm run dev
```

The frontend will run via Vite. The backend API is included in the Vercel deployment configuration and can be tested through the `/api` endpoints.

## Environment variables

Create a `.env` file or set the following in your hosting environment:

```env
MONGODB_URI="your-mongodb-connection-string"
```

## Deployment

This project is configured for Vercel via `vercel.json`.

1. Push the repo to GitHub.
2. Import the project into Vercel.
3. Add `MONGODB_URI` to Vercel environment variables.
4. Deploy.

## Available scripts

- `npm run dev` - start frontend development server
- `npm run build` - build frontend for production
- `npm run preview` - preview built frontend
- `npm run lint` - run ESLint checks

## Notes

- The WhatsApp checkout URL currently uses a placeholder number. Update it in `src/pages/Checkout.jsx`.
- Admin access is gated by a simple passkey in `src/pages/Login.jsx`.
- The backend uses serverless Express for Vercel deployment.
