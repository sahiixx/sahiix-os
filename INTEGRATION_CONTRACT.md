# SAHIIXX OS — INTEGRATION CONTRACT
> All payload shapes for agent ↔ n8n communication
> Single source of truth. Update here, not scattered.
> Built: 2026-04-20

---

## ENTRYPOINTS

### Telegram Lead Message → OpenClaw
**n8n → OpenClaw webhook**

```json
POST /hooks/agent
Authorization: Bearer <OPENCLAW_GATEWAY_TOKEN>
Content-Type: application/json

{
  "message": "Hi, I'm looking to buy a 2BR in Dubai Marina, budget around 1.8M.",
  "session": {
    "session_id": "telegram:123456789",
    "caller": "n8n-telegram",
    "agent": "BrokerOps"
  },
  "channel": "telegram",
  "to": "123456789",
  "meta": {
    "platform": "telegram",
    "telegram_user_id": "987654321",
    "telegram_username": "ahmed_buyer",
    "language": "en",
    "source": "telegram_bot",
    "entrypoint": "lead_qualification"
  },
  "budget": {
    "max_turns": 8,
    "max_external_calls": 3,
    "deadline_ms": 10000
  }
}
```

**OpenClaw → n8n response**

```json
{
  "session_id": "telegram:123456789",
  "agent": "LeadIntake",
  "reply_text": "Hi! Great to meet you. Are you planning to buy in the next 3 months, or later?",
  "channel": "telegram",
  "to": "123456789",
  "meta": {
    "lead_id": "ld_20260420_00123",
    "next_step": "qualify_timeline"
  }
}
```

---

### Website Form → OpenClaw
**n8n → OpenClaw webhook**

```json
POST /hooks/agent
Authorization: Bearer <OPENCLAW_GATEWAY_TOKEN>
Content-Type: application/json

{
  "message": "New web form lead: Ahmed Khan, wants to buy in Dubai Marina, 2BR, budget 1.6–2.0M. Message: 'I'm relocating in July.'",
  "session": {
    "session_id": "webform:20260420_00123",
    "caller": "n8n-webform",
    "agent": "BrokerOps"
  },
  "channel": "telegram",
  "to": "123456789",
  "meta": {
    "platform": "webform",
    "form_id": "buy-side-main",
    "lead_email": "ahmed@example.com",
    "lead_phone": "+971500000000",
    "source": "website",
    "entrypoint": "lead_qualification"
  },
  "budget": {
    "max_turns": 6,
    "max_external_calls": 2,
    "deadline_ms": 8000
  }
}
```

---

### Retell Call Outcome → n8n → OpenClaw
**Retell → n8n webhook_retell_outcome**

```json
POST /webhook_retell_outcome
x-api-key: <SHARED_SECRET>

{
  "call_id": "call_abc123",
  "disposition": "INTERESTED",
  "contact_name": "CHEN XIAOLAN",
  "contact_phone": "+971581981892",
  "language": "zh",
  "total_volume_aed": 110350000,
  "rfm_score": 9.2,
  "duration_seconds": 147,
  "transcript": "...",
  "agent_id": "retell_agent_001",
  "called_at": "2026-04-20T12:00:00Z"
}
```

---

## n8n WEBHOOK PAYLOAD SCHEMAS

### 1. Enrichment — OpenClaw → n8n → External APIs → OpenClaw

**Request: OpenClaw → n8n**

```json
POST /webhook_enrich_lead
x-api-key: <SHARED_SECRET>
Content-Type: application/json

{
  "lead_id": "ld_20260420_00123",
  "full_name": "Ahmed Khan",
  "email": "ahmed@example.com",
  "phone": "+971500000000",
  "property_location": "Dubai Marina",
  "budget_min": 1500000,
  "budget_max": 2000000,
  "source": "Website",
  "meta": {
    "task_id": "t_20260420_abc123",
    "agent": "BrokerOps",
    "budget": {
      "max_external_calls": 3,
      "max_cost_usd": 0.02,
      "deadline_ms": 8000
    }
  }
}
```

**Response: n8n → OpenClaw**

```json
{
  "lead_id": "ld_20260420_00123",
  "status": "ok",
  "confidence": 0.86,
  "segments": ["investor", "secondary_market"],
  "portal_profiles": [
    {
      "site": "Bayut",
      "profile_url": "https://www.bayut.com/...",
      "last_activity": "2026-04-15"
    }
  ],
  "recommended_priority": "high",
  "notes": "Likely investor looking for 1BR units in Dubai Marina."
}
```

---

### 2. CRM Update — OpenClaw → n8n → HubSpot/Pipedrive/Airtable

**Request: OpenClaw → n8n**

```json
POST /webhook_update_crm
x-api-key: <SHARED_SECRET>

{
  "action": "upsert_lead",
  "lead_id": "ld_20260420_00123",
  "contact": {
    "full_name": "Ahmed Khan",
    "email": "ahmed@example.com",
    "phone": "+971500000000"
  },
  "details": {
    "intent": "buy",
    "city": "Dubai",
    "area": "Dubai Marina",
    "min_budget": 1500000,
    "max_budget": 2000000,
    "source": "Website",
    "tags": ["investor", "uae", "residential"]
  },
  "stage": "New Lead"
}
```

**Response: n8n → OpenClaw**

```json
{
  "status": "ok",
  "crm": "HubSpot",
  "contact_id": "12345",
  "deal_id": "67890",
  "stage": "New Lead"
}
```

---

### 3. WhatsApp Outbound — OpenClaw → n8n → Twilio/WhatsApp Business

**Request: OpenClaw → n8n**

```json
POST /webhook_send_whatsapp
x-api-key: <SHARED_SECRET>

{
  "channel": "whatsapp",
  "lead_id": "ld_20260420_00123",
  "to": "+971500000000",
  "template": null,
  "message": "Hi Ahmed, thanks for your interest in Dubai Marina properties. To recommend the best options, do you prefer Marina View or close to Metro?",
  "metadata": {
    "sequence_name": "buyer_welcome",
    "step": 1
  }
}
```

**Response: n8n → OpenClaw**

```json
{
  "status": "queued",
  "provider": "Twilio",
  "message_id": "SMxxxxxxxx",
  "eta_seconds": 5
}
```

---

### 4. Email Outbound — OpenClaw → n8n → SMTP/SendGrid

**Request: OpenClaw → n8n**

```json
POST /webhook_send_email
x-api-key: <SHARED_SECRET>

{
  "to": "ahmed@example.com",
  "subject": "Dubai Marina Properties — Personalized for You",
  "body": "Hi Ahmed,\n\nBased on your interest in Dubai Marina, I've shortlisted 3 properties...",
  "template_id": "buyer_welcome_v1",
  "lead_id": "ld_20260420_00123",
  "metadata": {
    "sequence_name": "buyer_welcome",
    "step": 1
  }
}
```

**Response: n8n → OpenClaw**

```json
{
  "status": "sent",
  "provider": "SendGrid",
  "message_id": "sg_xxxxxxxx",
  "timestamp": "2026-04-20T12:05:00Z"
}
```

---

### 5. Create Task — OpenClaw → n8n → CRM

**Request: OpenClaw → n8n**

```json
POST /webhook_create_task
x-api-key: <SHARED_SECRET>

{
  "lead_id": "ld_20260420_00123",
  "contact_name": "Ahmed Khan",
  "phone": "+971500000000",
  "task_type": "call_back",
  "due_date": "2026-04-22T10:00:00Z",
  "priority": "high",
  "notes": "Qualified buyer — 2BR in Dubai Marina, budget 1.6–2.0M. Interested in view properties.",
  "owner": "sahil"
}
```

**Response: n8n → OpenClaw**

```json
{
  "status": "created",
  "crm": "HubSpot",
  "task_id": "task_12345",
  "due_date": "2026-04-22T10:00:00Z"
}
```

---

### 6. LLM Router (optional cost optimization)

**Request: OpenClaw → n8n**

```json
POST /webhook_llm_call
x-api-key: <SHARED_SECRET>

{
  "task_type": "summarize_lead_history",
  "max_cost_usd": 0.01,
  "max_latency_ms": 3000,
  "input_tokens_estimate": 1200,
  "payload": {
    "lead_notes": "Ahmed viewed 3 properties. Marina gate, Marina promenade, and Bahar. Preferred Marina Gate. Budget flexible up to 2.1M..."
  }
}
```

**Response: n8n → OpenClaw**

```json
{
  "status": "ok",
  "result": "Investor profile. Views Marina Gate as top choice. Budget flexible. Timeline: Q3 2026. Action: schedule viewing.",
  "model_used": "gpt-4o-mini",
  "cost_usd": 0.005
}
```

---

## RETELL.AI → n8n → WhatsApp DISPOSITION FLOW

```
Retell call ends
       │
       ▼
POST /webhook_retell_outcome
       │
       ▼
┌─────────────────────────────────────────────────────┐
│                  n8n Router                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  disposition = "INTERESTED"                         │
│    → POST /webhook_send_whatsapp (yes pitch)       │
│    → POST /webhook_update_crm (stage: Interested)  │
│                                                     │
│  disposition = "QUALIFIED"                          │
│    → POST /webhook_send_whatsapp (book meeting)    │
│    → POST /webhook_update_crm (stage: Qualified)   │
│    → POST /webhook_create_task (callback)           │
│                                                     │
│  disposition = "NOT_INTERESTED"                     │
│    → POST /webhook_update_crm (stage: Cold)        │
│    → POST /webhook_send_whatsapp (soft exit)       │
│                                                     │
│  disposition = "OBJECTION"                          │
│    → POST /webhook_send_whatsapp (callback offer)  │
│    → POST /webhook_update_crm (stage: Objection)   │
│                                                     │
│  disposition = "VOICEMAIL"                          │
│    → POST /webhook_send_whatsapp (voicemail msg)   │
│    → POST /webhook_update_crm (stage: Voicemail)  │
│                                                     │
│  disposition = "NO_ANSWER"                          │
│    → Wait 30 min → Re-add to Retell queue          │
│                                                     │
│  disposition = "WRONG_NUMBER"                       │
│    → POST /webhook_update_crm (phone_valid: false) │
│    → Remove from campaign                           │
│                                                     │
└─────────────────────────────────────────────────────┘
       │
       ▼
Log to Call_Log table (Airtable)
       │
       ▼
Forward to OpenClaw (BrokerOps updates memory)
```

---

## TELEGRAM → n8n → OpenClaw → n8n → Telegram FLOW

```
1. User sends message on Telegram
          ↓
2. n8n Telegram Trigger fires
          ↓
3. n8n builds incoming_message payload
          ↓
4. POST /hooks/agent (OpenClaw)
          ↓
5. BrokerOps receives → spawns LeadIntake
          ↓
6. LeadIntake generates reply
          ↓
7. OpenClaw responds: {reply_text, channel, to}
          ↓
8. n8n reads reply_text → Telegram Send Message
          ↓
9. LeadIntake calls:
   - POST /webhook_enrich_lead
   - POST /webhook_update_crm
          ↓
10. LeadIntake tells lead human will follow up
```

---

## WEBSITE FORM → n8n → OpenClaw FLOW

```
1. Lead submits form on website
          ↓
2. n8n Form Trigger fires
          ↓
3. n8n Function node normalizes to synthetic message
          ↓
4. POST /hooks/agent (OpenClaw)
          ↓
5. BrokerOps → LeadIntake qualifies
          ↓
6. OpenClaw reply goes to Sahil's Telegram (to: 123456789)
          ↓
7. n8n also sends confirmation email to lead
          ↓
8. n8n posts lead summary to team channel
```

---

## AGENT CONFIG REFERENCE

### BrokerOps SOUL-like config

**Identity:**
> "You are BrokerOps, the orchestrator for a UAE real-estate AI system. You do not talk to leads directly. You decompose tasks, coordinate specialist agents, enforce budgets, and summarize results for human operators."

**Responsibilities:**
- Receive tasks from: Telegram, webhooks, CRM events
- Spawn: LeadIntake, Enrichment, Nurture, CRMOps
- Route based on: new lead / known lead / follow-up / CRM sync

**Tools:**
- sessions_spawn, sessions_send (specialist routing)
- memory_get, memory_search (context)
- web.request (n8n webhooks only)

**Budget rules:**
- Max 3 specialist agents per top-level task
- Max 8 total agent turns per task
- Max 3 external skill calls per task

---

### LeadIntake SOUL-like config

**Identity:**
> "You are LeadIntake, a concise, friendly lead qualification agent for Dubai real estate. You ask the minimum number of questions required to qualify and then stop."

**Goals:**
- Identify: buy/rent, budget, areas, bedroom count, timeline, financing
- Confirm: preferred channel and time to talk to human

**Budget rules:**
- Max 4 qualification questions
- Max 2 n8n calls per qualification (enrichment + CRM)
- Never ask for same info twice

**Behavior:**
1. Greet + ask 1–2 key questions
2. Build normalized lead JSON
3. Call /webhook_enrich_lead
4. Call /webhook_update_crm
5. Confirm human will follow up with time window

---

## BUDGET CONTRACT

Every OpenClaw → n8n call includes a meta.budget object:

```json
{
  "meta": {
    "task_id": "t_20260420_abc123",
    "agent": "BrokerOps",
    "budget": {
      "max_external_calls": 3,
      "max_cost_usd": 0.02,
      "deadline_ms": 8000
    }
  }
}
```

n8n reads meta.budget:
- If cannot honor → return partial result or `{"status": "budget_exceeded", "reason": "..."}`
- If honored → proceed normally

---

## WEBHOOK AUTH MATRIX

| Webhook | Auth | Who calls it |
|---------|------|-------------|
| `/hooks/agent` | Bearer token | n8n |
| `/webhook_enrich_lead` | x-api-key | OpenClaw (Enrichment agent) |
| `/webhook_update_crm` | x-api-key | OpenClaw (CRMOps agent) |
| `/webhook_send_whatsapp` | x-api-key | OpenClaw (Nurture agent) |
| `/webhook_send_email` | x-api-key | OpenClaw (Nurture agent) |
| `/webhook_create_task` | x-api-key | OpenClaw (CRMOps agent) |
| `/webhook_llm_call` | x-api-key | OpenClaw (BrokerOps fallback) |
| `/webhook_retell_outcome` | x-api-key | Retell.ai |
| `/webhook_new_lead` | x-api-key | External forms |

---

## ALL PAYLOAD SHAPES — QUICK REFERENCE

| Flow | Direction | Key fields |
|------|-----------|-----------|
| Telegram message | n8n → OpenClaw | message, session_id, channel, to, meta, budget |
| Agent reply | OpenClaw → n8n | reply_text, channel, to, meta.lead_id |
| Enrich lead | OpenClaw → n8n | lead_id, full_name, phone, property_location, budget_min/max, meta/budget |
| Enrich response | n8n → OpenClaw | lead_id, status, confidence, segments, notes |
| CRM upsert | OpenClaw → n8n | action, lead_id, contact{}, details{}, stage |
| CRM response | n8n → OpenClaw | status, crm, contact_id, deal_id, stage |
| WhatsApp send | OpenClaw → n8n | channel, lead_id, to, message, metadata |
| WhatsApp response | n8n → OpenClaw | status, provider, message_id |
| Retell outcome | Retell → n8n | call_id, disposition, contact_name, phone, language, volume_aed, rfm_score |
| Task create | OpenClaw → n8n | lead_id, task_type, due_date, priority, notes, owner |

---

_Saved: 2026-04-20_
_Update this file when any payload shape changes. It's the contract._