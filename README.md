# sahiix-os

![Node](https://img.shields.io/badge/node-20+-green)

Dubai Real Estate Lead Management System

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [WhatsApp Bridge Configuration](#whatsapp-bridge-configuration)
- [Model Routing](#model-routing)
- [Project Layout](#project-layout)
- [Development](#development)
- [Related Repositories](#related-repositories)

## Overview

Dubai Real Estate Lead Management System

| | |
|---|---|
| **Stack** | node |
| **Frameworks** | — |
| **Tests** | Node.js built-in regression tests (`npm test`) |
| **Commits** | 2 |
| **Last activity** | 2026-08-10 |
| **Visibility** | public |

## Quick Start

### Install

Requires Node.js 20.17 or newer (for the SQLite dependency).

```bash
npm ci
```

### Run

```bash
npm start
```

The API and dashboard run at `http://localhost:3001`. `npm start` runs
`node server.js`; use `PORT` and `HOST` to override the defaults (`3001` and
`0.0.0.0`). The local SQLite database is `estate.db` in the repository directory.

## WhatsApp Bridge Configuration

Run the bot separately with `node whatsapp-bot.js`. It listens on port `3002`
by default and uses an OpenClaw-compatible HTTP bridge with a `POST /send`
endpoint accepting `{ "chatId": "...", "message": "..." }`.

| Variable | Default | Purpose |
|---|---|---|
| `BRIDGE_TOKEN` | None | Bearer token for bridge sends; supply through the process environment. |
| `BRIDGE_API` | `http://127.0.0.1:18789` | HTTP bridge base URL, without a trailing slash. |
| `ESTATE_API` | `http://localhost:3001` | HTTP estate API base URL, without a trailing slash. |
| `PORT` | `3002` | Bot listening port (separate from the API process's `PORT`). |
| `HOST` | `0.0.0.0` | Bot listening interface. |

Set `BRIDGE_TOKEN` in the bot's environment before enabling sends. Explicit
outbound sends and webhook replies return an error if it is missing; the bot
can still start and process outbound dry-runs without it. No credential is
stored in the source, and `.env` files are not loaded automatically.

`POST /outbound` defaults to dry-run and returns a preview with `sent: false`,
without contacting the bridge. Sending requires the JSON boolean
`"dry_run": false` or `"dryRun": false`. `POST /webhook` replies to the supplied
`from`/`sender` through the bridge and does not have a dry-run mode.

Example dry-run (with the bot running):

```bash
curl -X POST http://localhost:3002/outbound \
  -H 'Content-Type: application/json' \
  -d '{"to":"15555550123","message":"Preview only"}'
```

## Model Routing

Agent work in this repo routes through Azure AI Foundry. See [`AGENTS.md`](./AGENTS.md)
for the full contract.

| Purpose | Deployment | Endpoint |
|---|---|---|
| Default / general | `gpt-5.6-sol` | `/openai/v1/chat/completions` |
| Deep reasoning | `claude-opus-5` | `/openai/v1/responses` **only** |
| Embeddings | `text-embedding-3-small` | `/openai/v1/embeddings` |

```bash
export AZURE_FOUNDRY_API_KEY=...        # never commit this
export AZURE_FOUNDRY_BASE_URL=https://<resource>.openai.azure.com/openai/v1
```

> **Gotcha:** Claude deployments on Azure return `404 api_not_supported` on
> `/chat/completions`. They answer **only** via the Responses API.

## Project Layout

```
AGENTS.md
LICENSE
README.md
dashboard-v2.html
dashboard-v3.html
dashboard.html
deploy.sh
ecosystem.config.js
frontend/
manifest.json
openclaw-webhook.json
package-lock.json
package.json
server.js
test/
whatsapp-bot.js
```

## Development

```bash
# regression tests (in-memory SQLite and a stubbed bridge; no real sends)
npm test

# syntax checks
node --check server.js
node --check whatsapp-bot.js
```

The `hermes-azure-check.yml` workflow checks the Azure endpoint using CI secrets;
it is a live service check, not a local application test.

Secrets live in environment variables and CI secrets — never in tracked files.

## Related Repositories

Part of a 84-repository workspace sharing one agentic contract:

- **[agentic-harness](https://github.com/sahiixx/agentic-harness)** — patterns, contracts, and reference implementations
- `AGENTS.md` in every repo pins identical model routing

---

<sub>README maintained by the agentic harness · last regenerated 2026-08-10</sub>
