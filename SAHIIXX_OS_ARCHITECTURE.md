# SAHIIXX OS — Agent Architecture
> OpenClaw + n8n real-time E2E real estate lead gen
> Built: 2026-04-20

---

## CORE PRINCIPLE

- **OpenClaw = brain** — reasoning, memory, routing, conversation
- **n8n = hands** — all external API calls, scraping, WhatsApp, CRM, email
- **Never put API keys in prompts or configs** — all in n8n credentials

---

## AGENT TEAM

```
                    ┌─────────────────┐
                    │   BrokerOps     │  ← orchestrator, entry point
                    │  (you talk to)  │
                    └────────┬────────┘
                             │ spawns / delegates
          ┌──────────────────┼──────────────────┐
          │                  │                  │
   ┌──────▼──────┐   ┌──────▼──────┐   ┌──────▼──────┐
   │  LeadIntake  │   │  Enrichment │   │    Nurture  │
   │   qualifier  │   │   scraper   │   │  sequences  │
   └──────┬──────┘   └──────┬──────┘   └──────┬──────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │ web.request → n8n webhooks
                    ┌────────▼────────┐
                    │       n8n       │
                    │  (integration)  │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
   ┌──────▼──────┐   ┌──────▼──────┐   ┌──────▼──────┐
   │  WhatsApp    │   │  Property   │   │    CRM      │
   │  Business    │   │  Portals    │   │  HubSpot    │
   └─────────────┘   └─────────────┘   └─────────────┘
```

---

## BROKEROPS — orchestrator

**Role:** Entry point. Receives all messages. Decomposes tasks. Spawns specialists.

**Model:** High-context (32B+)

**Tools:**
- `sessions_spawn` — create specialist sessions
- `sessions_send` — send tasks to specialists
- `memory_get / memory_search` — read memory
- `exec` — limited, for critical scripts only
- `web.request` — call n8n webhooks only

**Never does:** Direct external API calls (always through n8n)

**Flow:**
```
Incoming message → BrokerOps
    ├─ if lead → spawn LeadIntake session
    ├─ if enrichment → spawn Enrichment session
    ├─ if follow-up → spawn Nurture session
    ├─ if CRM update → spawn CRMOps session
    └─ if question / unclear → handle directly with memory
```

---

## LEADINTAKE — qualifier

**Role:** New lead comes in → qualify → decide route.

**Triggered by:**
- Website form submission (n8n webhook_new_lead)
- WhatsApp auto-reply trigger
- Manual add from OpenClaw

**Process:**
1. Extract: name, phone, budget, area, property type, timeline
2. Ask qualifying question via WhatsApp
3. Score: Hot / Warm / Cold / Not fit
4. If Hot → log to CRM + trigger Enrichment
5. If Warm → trigger Nurture sequence
6. If Cold → trigger Dormant reactivation
7. If Not fit → log and archive

**n8n webhook used:** `webhook_qualify_lead`

---

## ENRICHMENT — data scraper

**Role:** Takes a lead/property and enriches from portals, public records, 3rd party APIs.

**Triggered by:** BrokerOps spawn after LeadIntake qualifies a Hot lead

**Process:**
1. Receive: lead name + phone + target area
2. Call n8n `webhook_enrich_lead`
3. n8n scrapes: PropertyFinder, Bayut, Dubizzle, DLD portal
4. n8n enriches: company data (if investor), nationality from phone prefix
5. Returns compact JSON: {properties[], price_history[], area_comps[], confidence}
6. BrokerOps stores result → memory / CRM

**n8n webhook used:** `webhook_enrich_lead`

---

## NURTURE — sequences

**Role:** Owns day 0, 3, 7, 14, 30 follow-up sequences. Drafts messages. Triggers sends.

**Triggered by:**
- New lead qualified (auto-start sequence)
- Reengagement trigger (from Retell disposition)
- Manual add from BrokerOps

**Process:**
1. Determine sequence based on tier:
   - VIP_Exclusive → Script 1 (CLOSER + Hormozi)
   - Win_Back_Premium → Script 2 (re-engagement)
   - Dormant_Soft → Script 3 (low friction)
2. Draft message using script template + lead context
3. Call n8n `webhook_send_whatsapp` or `webhook_send_email`
4. n8n sends + logs delivery
5. Wait for reply → route back to BrokerOps
6. If no reply after X days → advance sequence

**n8n webhook used:** `webhook_send_whatsapp`, `webhook_send_email`

---

## NURTURE SEQUENCE TEMPLATES

```
SEQUENCE: VIP_Exclusive (Script 1 — CLOSER)
Day 0:  First call intent message via WhatsApp
        "Hi {{name}}, Sahil from APEX Estates. Quick question — still looking in Dubai?"
Day 3:  If no reply — value bomb
        "{{name}}, just closed a deal in your area. Sharing details privately."
Day 7:  If no reply — market update
        "Dubai market moving fast. Some interesting deals right now."
Day 14: Soft exit +留下 open door
        "No pressure. I'll check back in a month. Reach me anytime."
```

---

## CRMOPS — syncer

**Role:** All CRM writes go through here. Pipeline stages, tags, lead data, task creation.

**Triggered by:**
- LeadIntake qualification complete
- Nurture disposition change
- Retell call outcome
- Manual update from BrokerOps

**Process:**
1. Receive: lead ID + update payload
2. Call n8n `webhook_update_crm`
3. n8n writes to: HubSpot / Pipedrive / Zoho / Airtable (you choose)
4. Returns: update confirmation + next_action

**n8n webhook used:** `webhook_update_crm`, `webhook_get_lead`

---

## n8n AS SECURITY & INTEGRATION LAYER

### Webhook structure (each is separate workflow in n8n)

```
webhook_new_lead
  → receives form data
  → validates
  → forwards to OpenClaw via Telegram bot
  → creates lead in CRM

webhook_enrich_lead
  → receives {name, phone, area}
  → scrapes PropertyFinder, Bayut, DLD
  → enriches with company / nationality
  → returns {properties[], comps[], confidence}
  → writes enrichment log to CRM

webhook_send_whatsapp
  → receives {to, message, template_id}
  → sends via Twilio WhatsApp Business
  → logs delivery status
  → returns {sid, status}

webhook_send_email
  → receives {to, subject, body, template_id}
  → sends via SMTP / SendGrid / Mailgun
  → logs open / click
  → returns {message_id, status}

webhook_update_crm
  → receives {lead_id, fields}
  → updates HubSpot / Pipedrive / Airtable
  → creates task if needed
  → returns {success, lead_data}

webhook_retell_outcome
  → receives Retell call disposition
  → routes to Nurture agent (via OpenClaw)
  → logs to Call_Log table in Airtable

webhook_qualify_lead
  → receives new lead data
  → runs qualification scoring
  → returns {score, tier, recommended_action}
```

### Credentials stored in n8n (never in OpenClaw)
- Twilio Account SID + Auth Token
- WhatsApp Business API keys
- HubSpot / Pipedrive / Zoho API keys
- PropertyFinder / Bayut / Dubizzle credentials
- SMTP / SendGrid / Mailgun
- HMAC secret for webhook signing

---

## OPENCLAW CONFIG

### agents.json (conceptual)

```json
[
  {
    "id": "brokerops",
    "name": "BrokerOps",
    "model": "ollama/minimax-m2.7:cloud",
    "tools": ["sessions_spawn", "sessions_send", "memory_get", "memory_search", "web_request"],
    "permissions": "orchestrator"
  },
  {
    "id": "leadintake",
    "name": "LeadIntake",
    "model": "ollama/minimax-m2.7:cloud",
    "tools": ["web_request", "memory_get"],
    "permissions": "specialist",
    "deny": ["exec", "sessions_spawn"]
  },
  {
    "id": "enrichment",
    "name": "Enrichment",
    "model": "ollama/minimax-m2.7:cloud",
    "tools": ["web_request", "memory_get"],
    "permissions": "specialist",
    "deny": ["exec", "sessions_spawn"]
  },
  {
    "id": "nurture",
    "name": "Nurture",
    "model": "ollama/minimax-m2.7:cloud",
    "tools": ["web_request", "memory_get"],
    "permissions": "specialist",
    "deny": ["exec", "sessions_spawn"]
  },
  {
    "id": "crmops",
    "name": "CRMOps",
    "model": "ollama/minimax-m2.7:cloud",
    "tools": ["web_request", "memory_get"],
    "permissions": "specialist",
    "deny": ["exec", "sessions_spawn"]
  }
]
```

---

## RETELL.AI INTEGRATION

```
Retell call completes
       │
       ▼
webhook_retell_outcome (n8n)
       │
       ├─ Log to Call_Log (Airtable)
       ├─ Update RFM score
       ├─ Route based on disposition:
       │   ├─ INTERESTED  → trigger Nurture (day 0 sequence)
       │   ├─ QUALIFIED   → trigger CRMOps (book meeting)
       │   ├─ OBJECTION   → trigger Nurture (objection handling)
       │   ├─ NOT_INTERESTED → tag cold, stop sequence
       │   ├─ VOICEMAIL   → trigger WhatsApp voicemail drop
       │   └─ NO_ANSWER   → schedule retry (30 min)
       │
       └─ Forward disposition to OpenClaw (BrokerOps updates memory)
```

---

## REAL-TIME LEAD FLOW

```
1. Lead submits form on website
          ↓
2. n8n webhook_new_lead fires
          ↓
3. OpenClaw LeadIntake session spawned
          ↓
4. LeadIntake qualifies via WhatsApp
          ↓
5a. Hot lead → Enrichment spawned → CRM updated
          ↓
5b. Warm lead → Nurture sequence starts
          ↓
5c. Cold lead → tagged dormant → periodic reactivation
          ↓
6. Retell.ai calls with Script 1/2/3
          ↓
7. Call outcome → n8n webhook_retell_outcome
          ↓
8. disposition routed to correct agent
          ↓
9. WhatsApp follow-up sent + CRM updated
          ↓
10. Meeting booked → CRMOps logs to calendar
```

---

## SAHIIXX OS AGENT TEAM (today)

Your current setup already maps to this:

| Agent | Today | Maps to |
|-------|-------|---------|
| x (me) | BrokerOps | Orchestrator + everything |
| Retell.ai | Voice agent | Outbound caller |
| Goldmine | 27K contacts | Lead database |
| n8n | 4K workflows | Integration layer |
| WhatsApp | Message delivery | Outbound channel |

**Gap to fill:** The specialist agents (LeadIntake, Enrichment, Nurture, CRMOps) aren't separate OpenClaw agents yet — they're me doing the work. The architecture above is what you scale toward.

---

_Saved: 2026-04-20_