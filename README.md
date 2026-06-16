# SAHIIX.AI Estate Dashboard

Dubai Real Estate Lead Management System

## Quick Start

```bash
npm start
```

Open `dashboard.html` in browser. API runs on `http://localhost:3001`.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /properties | List all properties |
| POST | /properties | Add property |
| GET | /leads | List all leads |
| POST | /leads | Add lead |
| PUT | /leads/:id | Update lead status |
| GET | /dashboard | Pipeline stats |

## Sample Data

- 4 Dubai properties (Palm Jumeirah, Downtown, Marina, JVC)
- Lead pipeline: new → contacted → qualified → closed

## Architecture

```
Dashboard (HTML/JS)
    ↓ REST API
Node.js Backend (Express)
    ↓ SQLite
Property & Lead Database
```
