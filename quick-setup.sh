#!/bin/bash

echo "🚀 Starting TrendHub Setup..."

# Install dependencies
cd backend
npm install
cd ../frontend
npm install
cd ..

# Seed database
cd backend
node seeder.js
cd ..

echo "✅ Setup complete!"
echo ""
echo "Now run these commands in separate terminals:"
echo ""
echo "Terminal 1 (Backend):"
echo "cd /Users/yash/Desktop/TrendHub/backend && npm run dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "cd /Users/yash/Desktop/TrendHub/frontend && npm start"
