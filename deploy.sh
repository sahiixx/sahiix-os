#!/bin/bash
set -e

# SAHIIX.AI Estate — Production Deploy Script
# Usage: ./deploy.sh

cd "$(dirname "$0")"

echo "=== SAHIIX.AI Estate Deploy ==="

# Install PM2 if missing
if ! command -v pm2 &> /dev/null; then
  echo "Installing PM2..."
  npm install -g pm2
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Pull latest (optional — remove if you deploy manually)
# git pull origin main

# Stop existing PM2 processes
echo "Stopping existing PM2 processes..."
pm2 stop ecosystem.config.js 2>/dev/null || true
pm2 delete ecosystem.config.js 2>/dev/null || true

# Start with PM2
echo "Starting services with PM2..."
pm2 start ecosystem.config.js

# Save PM2 config to auto-restart on boot
pm2 save
pm2 startup systemd --user xx 2>/dev/null || true

echo ""
echo "=== Services running ==="
pm2 status

echo ""
echo "API:    http://localhost:3001"
echo "WhatsApp Bot: http://localhost:3002"
echo "Dashboard: http://localhost:3001/dashboard.html"
echo ""
echo "To expose via Cloudflare, run: ./tunnel.sh"
