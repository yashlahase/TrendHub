# TrendHub – Fashion E-commerce Platform

TrendHub is a modern, full-stack fashion e-commerce application designed with a premium aesthetic and production-ready architecture.

## 🚀 Features

- **User Authentication**: Secure signup and login using JWT and Bcrypt.
- **Product Discovery**: Browse collections, search, and view detailed product information.
- **Shopping Cart**: Real-time cart management with quantity controls.
- **Order Management**: Full checkout flow and order history tracking.
- **Admin Dashboard**: Specialized tools for managing products and orders.
- **Containerized**: Fully Dockerized for seamless development and deployment.

## 🧱 Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Authentication**: JWT (JSON Web Tokens).
- **Infrastructure**: Docker, Nginx, GitHub Actions.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- Docker & Docker Compose
- MongoDB (Local or Atlas)

### Local Development (without Docker)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yashlahase/TrendHub.git
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   # Create .env and add PORT, MONGO_URI, and JWT_SECRET
   npm run dev
   ```

3. **Setup Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Local Development (with Docker)

1. **Run Docker Compose**:
   ```bash
   docker-compose up --build
   ```
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5001`
   - MongoDB: `http://localhost:27017`

## 📦 Deployment

- **Backend**: Can be deployed to Render, AWS EC2, or Heroku.
- **Frontend**: Optimized for Vercel, Netlify, or AWS S3 + CloudFront.
- **CI/CD**: Automatic builds via GitHub Actions on every push to `main`.

---

Built with ❤️ by the TrendHub Team.
