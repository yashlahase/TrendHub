#!/bin/bash
git add frontend/src/components/Hero.jsx frontend/src/components/Navbar.jsx
git commit -m "Enhance UI components and navigation"

git add frontend/src/pages/Home.jsx frontend/src/components/ProductCard.jsx
git commit -m "Update homepage and product card layout"

git add frontend/src/context/ShopContext.jsx
git commit -m "Improve global state management and cart handling"

git add frontend/src/pages/Cart.jsx
git commit -m "Fix cart quantity edge cases"

git add frontend/src/pages/Checkout.jsx
git commit -m "Implement full checkout page functionality"

git add frontend/src/pages/OrderHistory.jsx
git commit -m "Create comprehensive order history page with tracking"

git add frontend/src/pages/Wishlist.jsx frontend/src/pages/Category.jsx
git commit -m "Add wishlist and category browsing capabilities"

git add frontend/src/pages/ProductDetails.jsx
git commit -m "Enhance product details and add review submission UI"

git add backend/src/controllers/productController.js backend/src/routes/productRoutes.js
git commit -m "Implement backend search filtering and review endpoints"

git add frontend/src/pages/Search.jsx
git commit -m "Develop frontend search results interface"

git add frontend/src/pages/AdminProducts.jsx frontend/src/pages/AdminProductEdit.jsx
git commit -m "Build admin product management and editing dashboard"

git add backend/src/models/orderModel.js backend/src/controllers/orderController.js backend/src/routes/orderRoutes.js
git commit -m "Update order schema and backend cancellation logic"

git add frontend/src/pages/AdminOrders.jsx
git commit -m "Create admin order fulfillment management page"

git add frontend/src/App.jsx
git commit -m "Register all newly created routes"

git add check_casing.py
git commit -m "Add casing validation script"

git push origin main
