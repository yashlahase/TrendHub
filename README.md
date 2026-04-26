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

- **Backend**: Containerized and deployed to Amazon ECS Fargate.
- **Frontend**: Containerized and deployed alongside the backend on ECS.
- **CI/CD**: Fully automated pipeline via GitHub Actions. Pushes to `main` trigger tests, Docker builds, ECR pushes, and ECS updates.

## 📖 Explanation (Project Architecture & DevOps)

### Architecture
TrendHub is built on a decoupled architecture. The React/Vite frontend communicates with a RESTful Express.js backend. The backend interfaces with MongoDB for persistent storage. Both the frontend and backend are containerized using Docker, ensuring consistency across environments.

### Workflow & CI/CD
We utilize a robust GitHub Actions pipeline that ensures code quality and automates deployment:
1. **Linting & Testing**: Every push and pull request triggers ESLint and our test suites (Jest/Vitest).
2. **Container Registry (ECR)**: Upon a push to `main`, Docker images are built and pushed to Amazon Elastic Container Registry (ECR).
3. **Container Orchestration (ECS)**: The workflow automatically updates the Amazon ECS Task Definitions with the new image tags and triggers a deployment to the ECS cluster.

### Design Decisions
- **Docker First**: Chose Docker to eliminate "it works on my machine" issues.
- **Decoupled Frontend/Backend**: Allows for independent scaling of the UI and API layers.
- **Automated Testing**: Implemented unit, integration, and E2E testing (Cypress) to catch regressions early before they hit production.

### Idempotency
Our deployment scripts and CI/CD pipelines are fully idempotent. Running the GitHub Actions workflow multiple times on the same commit will produce the exact same outcome (updating the ECS service to the desired state) without causing failures or unintended side effects, mimicking `mkdir -p` behavior over a simple `mkdir`.

---

Built with ❤️ by the TrendHub Team.
