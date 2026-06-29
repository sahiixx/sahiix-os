#!/bin/bash
# OpenClaw Estate Bot Integration
# This script forwards OpenClaw WhatsApp messages to the Estate Bot

OPENCLAW_API="http://localhost:18789"
ESTATE_BOT="http://localhost:3002"
TOKEN="6467aa06c68e76e51622ea4d7996bbb62e73d06c9876937d"

echo "Setting up OpenClaw Estate Bot integration..."

# Create webhook config for OpenClaw
cat > /tmp/estate-webhook.json << 'EOF'
{
  "name": "estate-bot",
  "description": "SAHIIX.AI Estate WhatsApp Bot",
  "webhook": {
    "url": "http://localhost:3002/webhook",
    "events": ["message"],
    "headers": {
      "Content-Type": "application/json"
    }
  },
  "triggers": {
    "keywords": ["estate", "property", "listings", "villa", "apartment", "dubai"],
    "patterns": ["*property*", "*villa*", "*apartment*", "*listing*"]
  }
}
EOF

echo "Webhook config created at /tmp/estate-webhook.json"
echo ""
echo "To complete integration:"
echo "1. Open OpenClaw dashboard: http://localhost:18789"
echo "2. Go to Settings > Webhooks"
echo "3. Add webhook: http://localhost:3002/webhook"
echo "4. Enable for 'message' events"
echo ""
echo "Or use the OpenClaw CLI:"
echo "  openclaw webhook add --url http://localhost:3002/webhook --events message"
echo ""
echo "Test the integration:"
echo "  Send 'listings' to your WhatsApp bot"
echo "  Send 'property' to trigger the estate bot"
