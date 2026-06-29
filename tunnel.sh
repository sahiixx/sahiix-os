#!/bin/bash
# Quick Cloudflare tunnel for local development / demos
# For a permanent domain, set up a named tunnel (see ~/.cloudflared/)

npx --yes cloudflared tunnel --url http://localhost:3001
