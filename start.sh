#!/bin/bash
# SAHIIX.AI Estate - Start all services

cd /home/xx/projects/sahiix-estate

echo "Starting SAHIIX.AI Estate..."

# Kill existing processes
pkill -f "node server.js" 2>/dev/null
pkill -f "node whatsapp-bot.js" 2>/dev/null
sleep 1

# Start Estate API
nohup node server.js > /tmp/estate-api.log 2>&1 &
echo "Estate API started on port 3001 (PID: $!)"

# Wait for API to be ready
sleep 2

# Start WhatsApp Bot
nohup node whatsapp-bot.js > /tmp/estate-whatsapp.log 2>&1 &
echo "WhatsApp Bot started on port 3002 (PID: $!)"

sleep 1

# Verify
echo ""
echo "=== Verifying ==="
curl -s http://localhost:3001/ && echo " - Estate API OK" || echo " - Estate API FAILED"
curl -s http://localhost:3002/ && echo " - WhatsApp Bot OK" || echo " - WhatsApp Bot FAILED"

echo ""
echo "Logs: /tmp/estate-api.log, /tmp/estate-whatsapp.log"
echo "Dashboard: file:///home/xx/projects/sahiix-estate/dashboard.html"
