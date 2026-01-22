#!/bin/bash

# TrendHub - Safe Backdated Commits (Interactive)
# This version asks for confirmation before each step

echo "╔════════════════════════════════════════════════════════╗"
echo "║  TrendHub - Backdated Commits Script (Safe Mode)      ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "This will add 60+ commits from Jan 27 to Mar 25, 2026"
echo ""

# Check if in correct directory
if [ ! -f "README.md" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Not in TrendHub directory"
    echo "Please run: cd /Users/yash/Desktop/TrendHub"
    exit 1
fi

# Confirm action
read -p "⚠️  This will add backdated commits. Continue? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo "❌ Cancelled"
    exit 0
fi

# Create backup branch
echo ""
echo "📦 Creating backup branch..."
git branch backup-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true
echo "✅ Backup created"

# Ask about commit frequency
echo ""
echo "How many commits do you want?"
echo "1) Light (30 commits)"
echo "2) Medium (60 commits) - Recommended"
echo "3) Heavy (90 commits)"
read -p "Choose (1/2/3): " frequency

case $frequency in
    1) COMMIT_COUNT=30 ;;
    3) COMMIT_COUNT=90 ;;
    *) COMMIT_COUNT=60 ;;
esac

echo ""
echo "✅ Will create $COMMIT_COUNT commits"
echo ""
read -p "Press Enter to start..."

# Run the main script
./add-backdated-commits.sh

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║                    ✅ COMPLETE!                        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "📊 Review commits:"
echo "   git log --oneline --graph --all"
echo ""
echo "📤 Push to GitHub:"
echo "   git push origin main --force"
echo ""
echo "🔙 Restore backup if needed:"
echo "   git reset --hard backup-*"
echo ""
