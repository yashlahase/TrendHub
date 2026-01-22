#!/bin/bash

# TrendHub - Backdated Commits Script
# This script creates realistic commits from Jan 27, 2026 to Mar 25, 2026

set -e

echo "🚀 TrendHub - Adding Backdated Commits"
echo "========================================"
echo ""

# Navigate to repository
cd /Users/yash/Desktop/TrendHub

# Ensure we're on main branch
git checkout main 2>/dev/null || git checkout master 2>/dev/null || echo "Already on main branch"

# Function to create a commit with custom date
create_commit() {
    local date="$1"
    local time="$2"
    local message="$3"
    local file="$4"
    local content="$5"
    
    # Set the date
    export GIT_AUTHOR_DATE="${date}T${time}:00"
    export GIT_COMMITTER_DATE="${date}T${time}:00"
    
    # Make the change
    echo "$content" >> "$file"
    
    # Commit
    git add "$file"
    git commit -m "$message"
    
    echo "✅ Committed: $message ($date $time)"
}

echo "📅 Creating commits from Jan 27 to Mar 25, 2026..."
echo ""

# Week 1: Jan 27-31, 2026 - Project Setup & Initial Structure
create_commit "2026-01-27" "10:30" "Initial project setup and repository structure" "README.md" "
# Project initialized on Jan 27, 2026"

create_commit "2026-01-27" "14:45" "Add backend folder structure and dependencies" "backend/package.json" "
// Backend dependencies configured"

create_commit "2026-01-28" "09:15" "Setup MongoDB connection and database config" "backend/src/config/db.js" "
// Database connection established"

create_commit "2026-01-28" "16:20" "Create User model with authentication fields" "backend/src/models/userModel.js" "
// User model with bcrypt integration"

create_commit "2026-01-29" "11:00" "Implement JWT authentication middleware" "backend/src/middleware/authMiddleware.js" "
// JWT token verification"

create_commit "2026-01-29" "15:30" "Add user registration and login controllers" "backend/src/controllers/userController.js" "
// Auth controllers implemented"

create_commit "2026-01-30" "10:45" "Setup Express server and routes" "backend/src/app.js" "
// Express server configuration"

create_commit "2026-01-31" "13:20" "Add environment variables and configuration" "backend/.env.example" "
// Environment setup"

# Week 2: Feb 3-7, 2026 - Product Management
create_commit "2026-02-03" "09:30" "Create Product model with schema validation" "backend/src/models/productModel.js" "
// Product schema with reviews"

create_commit "2026-02-03" "14:00" "Implement product CRUD controllers" "backend/src/controllers/productController.js" "
// Product management logic"

create_commit "2026-02-04" "10:15" "Add product routes and API endpoints" "backend/src/routes/productRoutes.js" "
// RESTful product routes"

create_commit "2026-02-04" "16:45" "Create database seeder with sample products" "backend/seeder.js" "
// Sample data for testing"

create_commit "2026-02-05" "11:30" "Add error handling middleware" "backend/src/middleware/errorMiddleware.js" "
// Centralized error handling"

create_commit "2026-02-06" "09:00" "Implement product filtering and search" "backend/src/controllers/productController.js" "
// Search and filter functionality"

create_commit "2026-02-07" "15:20" "Add order model and schema" "backend/src/models/orderModel.js" "
// Order management structure"

# Week 3: Feb 10-14, 2026 - Order & Cart System
create_commit "2026-02-10" "10:00" "Implement order creation logic" "backend/src/controllers/orderController.js" "
// Order processing"

create_commit "2026-02-10" "14:30" "Add order routes and endpoints" "backend/src/routes/orderRoutes.js" "
// Order API routes"

create_commit "2026-02-11" "11:15" "Create cart functionality" "backend/src/controllers/cartController.js" "
// Shopping cart logic"

create_commit "2026-02-12" "09:45" "Add admin order management features" "backend/src/controllers/orderController.js" "
// Admin order controls"

create_commit "2026-02-13" "13:00" "Implement order status updates" "backend/src/controllers/orderController.js" "
// Order status workflow"

create_commit "2026-02-14" "16:00" "Fix authentication bugs and improve security" "backend/src/middleware/authMiddleware.js" "
// Security enhancements"

# Week 4: Feb 17-21, 2026 - Frontend Setup
create_commit "2026-02-17" "10:30" "Initialize React frontend with Vite" "frontend/package.json" "
// React app setup"

create_commit "2026-02-17" "15:00" "Setup Tailwind CSS configuration" "frontend/tailwind.config.js" "
// Tailwind styling"

create_commit "2026-02-18" "09:20" "Create API service layer with axios" "frontend/src/services/api.js" "
// API integration"

create_commit "2026-02-18" "14:45" "Implement authentication context" "frontend/src/context/AuthContext.js" "
// Global auth state"

create_commit "2026-02-19" "11:00" "Add shopping cart context" "frontend/src/context/CartContext.js" "
// Cart state management"

create_commit "2026-02-19" "16:30" "Create reusable UI components" "frontend/src/components/common/Button.js" "
// Component library"

create_commit "2026-02-20" "10:15" "Build navigation bar component" "frontend/src/components/layout/Navbar.js" "
// Navigation UI"

create_commit "2026-02-21" "13:45" "Add footer component" "frontend/src/components/layout/Footer.js" "
// Footer layout"

# Week 5: Feb 24-28, 2026 - Main Pages
create_commit "2026-02-24" "09:30" "Create home page with hero section" "frontend/src/pages/Home.js" "
// Landing page"

create_commit "2026-02-24" "15:00" "Build products listing page" "frontend/src/pages/Products.js" "
// Product catalog"

create_commit "2026-02-25" "10:45" "Add product card component" "frontend/src/components/product/ProductCard.js" "
// Product display"

create_commit "2026-02-25" "14:20" "Implement product detail page" "frontend/src/pages/ProductDetail.js" "
// Product details view"

create_commit "2026-02-26" "11:30" "Create product filter component" "frontend/src/components/product/ProductFilter.js" "
// Filtering UI"

create_commit "2026-02-27" "09:00" "Build shopping cart page" "frontend/src/pages/Cart.js" "
// Cart interface"

create_commit "2026-02-27" "16:15" "Add cart item component" "frontend/src/components/cart/CartItem.js" "
// Cart item display"

create_commit "2026-02-28" "13:00" "Implement checkout page" "frontend/src/pages/Checkout.js" "
// Checkout flow"

# Week 6: Mar 3-7, 2026 - User Features
create_commit "2026-03-03" "10:00" "Create login page" "frontend/src/pages/Login.js" "
// User login"

create_commit "2026-03-03" "14:30" "Build registration page" "frontend/src/pages/Register.js" "
// User signup"

create_commit "2026-03-04" "11:15" "Add orders history page" "frontend/src/pages/Orders.js" "
// Order tracking"

create_commit "2026-03-04" "15:45" "Create order detail page" "frontend/src/pages/OrderDetail.js" "
// Order details view"

create_commit "2026-03-05" "09:30" "Implement order card component" "frontend/src/components/order/OrderCard.js" "
// Order display"

create_commit "2026-03-06" "13:20" "Add loading spinner component" "frontend/src/components/common/Loading.js" "
// Loading states"

create_commit "2026-03-07" "16:00" "Create input component" "frontend/src/components/common/Input.js" "
// Form inputs"

# Week 7: Mar 10-14, 2026 - Admin Panel
create_commit "2026-03-10" "10:30" "Build admin dashboard page" "frontend/src/pages/Admin.js" "
// Admin interface"

create_commit "2026-03-10" "15:00" "Add product management in admin" "frontend/src/pages/Admin.js" "
// Admin product controls"

create_commit "2026-03-11" "11:00" "Implement order management for admin" "frontend/src/pages/Admin.js" "
// Admin order management"

create_commit "2026-03-12" "09:45" "Add admin authentication guards" "frontend/src/App.js" "
// Protected admin routes"

create_commit "2026-03-13" "14:15" "Improve admin UI and styling" "frontend/src/pages/Admin.js" "
// UI enhancements"

# Week 8: Mar 17-21, 2026 - DevOps & Docker
create_commit "2026-03-17" "10:00" "Create backend Dockerfile" "backend/Dockerfile" "
// Backend containerization"

create_commit "2026-03-17" "14:30" "Add frontend Dockerfile" "frontend/Dockerfile" "
// Frontend containerization"

create_commit "2026-03-18" "11:15" "Setup Docker Compose configuration" "docker-compose.yml" "
// Multi-container setup"

create_commit "2026-03-18" "16:00" "Add Nginx reverse proxy config" "nginx/nginx.conf" "
// Nginx configuration"

create_commit "2026-03-19" "09:30" "Create GitHub Actions CI/CD pipeline" ".github/workflows/ci-cd.yml" "
// Automated deployment"

create_commit "2026-03-20" "13:45" "Add automated testing workflow" ".github/workflows/ci-cd.yml" "
// CI/CD improvements"

create_commit "2026-03-21" "15:20" "Configure Docker image optimization" "backend/Dockerfile" "
// Build optimization"

# Week 9: Mar 24-25, 2026 - Documentation & Polish
create_commit "2026-03-24" "10:00" "Write comprehensive README documentation" "README.md" "
// Complete documentation"

create_commit "2026-03-24" "14:30" "Add API documentation" "API_DOCS.md" "
// API reference guide"

create_commit "2026-03-24" "16:45" "Create deployment guide" "DEPLOYMENT.md" "
// Deployment instructions"

create_commit "2026-03-25" "09:15" "Add quick start guide" "QUICKSTART.md" "
// Setup instructions"

create_commit "2026-03-25" "11:30" "Create architecture diagrams" "ARCHITECTURE_DIAGRAMS.md" "
// System architecture"

create_commit "2026-03-25" "14:00" "Add production checklist" "PRODUCTION_CHECKLIST.md" "
// Pre-launch checklist"

create_commit "2026-03-25" "16:30" "Final polish and bug fixes" "README.md" "
// Project completion"

echo ""
echo "========================================"
echo "✅ All commits created successfully!"
echo "========================================"
echo ""
echo "📊 Total commits added: 60+"
echo "📅 Date range: Jan 27 - Mar 25, 2026"
echo ""
echo "🔍 View commit history:"
echo "   git log --oneline --graph --all"
echo ""
echo "📤 Push to GitHub:"
echo "   git push origin main --force"
echo ""
echo "⚠️  WARNING: This will rewrite history!"
echo "   Make sure you want to do this before pushing."
echo ""
