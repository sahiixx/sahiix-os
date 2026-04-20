# N8N WORKFLOW — Retell.ai → WhatsApp → Airtable
> Bridges your AI voice campaign to follow-up and tracking
> Triggered by Retell.ai call dispositions

---

## WORKFLOW OVERVIEW

```
Retell.ai Call Ends
       │
       ▼
Webhook Trigger (n8n)
       │
       ├─ disposition = "INTERESTED" ──→ Send WhatsApp (yes pitch)
       ├─ disposition = "QUALIFIED" ────→ Send WhatsApp (meeting book)
       ├─ disposition = "NOT_INTERESTED" → Send WhatsApp (soft exit)
       ├─ disposition = "OBJECTION" ─────→ Send WhatsApp (callback offer)
       ├─ disposition = "VOICEMAIL" ──────→ Send WhatsApp (voicemail msg)
       ├─ disposition = "NO_ANSWER" ──────→ Schedule retry (30 min)
       └─ disposition = "WRONG_NUMBER" ───→ Log bad number → update CRM
       │
       ▼
Airtable Logging (all dispositions)
       │
       ▼
RFM Recalculation (qualified only)
```

---

## WORKFLOW NAME
`Retell → WhatsApp → Airtable`

---

## NODES

### NODE 1: Webhook (Trigger)
```
Name:        Retell Webhook
URL:         https://your-n8n.io/webhook/retell-call
Method:      POST
Auth:        Header: x-api-key = YOUR_KEY
```

**Expected payload from Retell.ai:**
```json
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

### NODE 2: Switch (Disposition Router)
```
Name:        Route by Disposition
Type:        IF condition
Conditions:
  ├─ disposition = "INTERESTED"
  ├─ disposition = "QUALIFIED"
  ├─ disposition = "NOT_INTERESTED"
  ├─ disposition = "OBJECTION"
  ├─ disposition = "VOICEMAIL"
  ├─ disposition = "NO_ANSWER"
  ├─ disposition = "WRONG_NUMBER"
  └─ (default) → Log and exit
```

---

### NODE 3a: WhatsApp — Interested
```
Name:        WhatsApp — Interested (Yes Pitch)
Node:        Twilio Message
From:       +1XXXXXXXXXX (your Twilio number
To:         {{contact_phone}}
Message:
---
Salam {{contact_name}},

This is Sahil from APEX Estates Dubai.

You sounded interested in hearing about what's available right now. I'll send you a short breakdown of properties matched to your profile — two options I'd personally recommend.

Give me 24 hours and I'll have something worth your time.

Sahil
+971 58 547 6077
sahiix.ai
---
```

---

### NODE 3b: WhatsApp — Qualified
```
Name:        WhatsApp — Qualified (Meeting Book)
Node:        Twilio Message
To:          {{contact_phone}}
Message:
---
{{contact_name}} — quick one.

We have a viewing lined up that fits your profile — limited slots this week. 

Want me to book one for you? I can send you the address and a bit of context on what's there.

Sahil
+971 58 547 6077
---
```

---

### NODE 3c: WhatsApp — Not Interested
```
Name:        WhatsApp — Soft Exit
Node:        Twilio Message
To:          {{contact_phone}}
Message:
---
No problem at all {{contact_name}}. 

Markets moving fast here — I'll keep you on file and reach out when something specific matches what you're looking for.

Take care.
Sahil | APEX Estates
---
```

---

### NODE 3d: WhatsApp — Objection
```
Name:        WhatsApp — Objection (Callback Offer)
Node:        Twilio Message
To:          {{contact_phone}}
Message:
---
Hey {{contact_name}} — Sahil here.

Totally understand if timing's off. I've noted your points and I'll check back in a few weeks with something fresh.

If anything changes before then, I'm here.
+971 58 547 6077
---
```

---

### NODE 3e: WhatsApp — Voicemail
```
Name:        WhatsApp — Voicemail Drop
Node:        Twilio Message
To:          {{contact_phone}}
Message:
---
Hi {{contact_name}}, Sahil from APEX Estates Dubai here.

I tried calling about a property opportunity I'd love to share with you. Happy to connect whenever you're free — no pressure at all.

Call or WhatsApp me anytime.
+971 58 547 6077 | sahiix.ai
---
```

---

### NODE 4: Airtable (All Dispositions)
```
Name:        Log to Airtable
Node:        Airtable Create Record
Base:        SAHIIXX_OS
Table:       Call_Log
Fields:
  ├─ Call_ID:        {{call_id}}
  ├─ Contact_Name:   {{contact_name}}
  ├─ Phone:          {{contact_phone}}
  ├─ Language:       {{language}}
  ├─ Volume_AED:     {{total_volume_aed}}
  ├─ RFM_Score:      {{rfm_score}}
  ├─ Disposition:    {{disposition}}
  ├─ Duration_sec:   {{duration_seconds}}
  ├─ Called_At:      {{called_at}}
  ├─ Campaign:       "VIP_Exclusive_Script1"
  └─ WhatsApp_Sent:   {{was_whatsapp_sent}}
```

---

### NODE 5: Airtable — Update RFM (Qualified only)
```
Name:        Update RFM — Qualified
Node:        Airtable Update Record
Condition:   disposition = "QUALIFIED"
Base:        SAHIIXX_OS
Table:       Goldmine_Contacts
Filter:       Phone = {{contact_phone}}
Fields:
  ├─ Last_Call_Date:    {{called_at}}
  ├─ Call_Count:        +1
  ├─ Last_Disposition:  "QUALIFIED"
  ├─ Meeting_Booked:    true
  └─ Recency_Score:     recalculate (now = 0)
```

---

### NODE 6: Schedule Retry (No Answer)
```
Name:        Schedule Retry
Node:        Schedule Trigger
Condition:   disposition = "NO_ANSWER"
Delay:       30 minutes
Action:      Re-add to Retell campaign queue
```

---

### NODE 7: Bad Number Flag
```
Name:        Flag Wrong Number
Node:        Airtable Update Record
Condition:   disposition = "WRONG_NUMBER"
Base:        SAHIIXX_OS
Table:       Goldmine_Contacts
Fields:
  ├─ Phone_Valid:    false
  └─ Notes:          "Wrong number — removed from campaign"
```

---

## AIRTABLE SCHEMA

**Table: Call_Log**
| Field | Type |
|-------|------|
| Call_ID | Text |
| Contact_Name | Text |
| Phone | Phone |
| Language | Text |
| Volume_AED | Number |
| RFM_Score | Number |
| Disposition | Select |
| Duration_sec | Number |
| Called_At | Date |
| Campaign | Text |
| WhatsApp_Sent | Checkbox |
| Transcript | Long text |

**Table: Goldmine_Contacts** (existing — add fields)
| Field | Type |
|-------|------|
| Last_Call_Date | Date |
| Call_Count | Number |
| Last_Disposition | Select |
| Meeting_Booked | Checkbox |
| Phone_Valid | Checkbox |
| Next_Call_Date | Date |

---

## DISPOSITION → ACTION MATRIX

| Disposition | WhatsApp | Airtable | Retry |
|------------|----------|----------|-------|
| INTERESTED | ✅ Yes pitch | Log | — |
| QUALIFIED | ✅ Book meeting | Update RFM | — |
| NOT_INTERESTED | ✅ Soft exit | Log | — |
| OBJECTION | ✅ Callback offer | Log | — |
| VOICEMAIL | ✅ Voicemail msg | Log | — |
| NO_ANSWER | ❌ | Log | ✅ 30 min |
| WRONG_NUMBER | ❌ | Flag bad # | ❌ |

---

## SETUP STEPS

### 1. Create n8n workflow
Copy the node structure above into n8n canvas.

### 2. Add Twilio credentials
```
Node: Twilio API
Account SID:  from twilio.com/console
Auth Token:   from twilio.com/console
From number:  your Twilio WhatsApp number
```

### 3. Add Airtable credentials
```
Node: Airtable
API Key:      from airtable.com/account
Base ID:      from your Airtable base URL
```

### 4. Configure Retell webhook
In Retell.ai → your engagement → webhook:
```
URL: https://your-n8n.io/webhook/retell-call
Events: call_completed, call_started
Auth:   x-api-key header
```

### 5. Set up Airtable base
Create base `SAHIIXX_OS` with tables:
- `Call_Log` — fields per schema above
- `Goldmine_Contacts` — import goldmine_vip_retell.csv

---

## TESTING

1. Use n8n's test webhook mode
2. Send sample payload:
```bash
curl -X POST https://your-n8n.io/webhook/retell-call \
  -H "Content-Type: application/json" \
  -d '{
    "call_id": "test_001",
    "disposition": "INTERESTED",
    "contact_name": "Test Contact",
    "contact_phone": "+971501234567",
    "language": "en",
    "total_volume_aed": 50000000,
    "rfm_score": 9.2,
    "duration_seconds": 90,
    "called_at": "2026-04-20T12:00:00Z"
  }'
```
3. Verify: WhatsApp sent → Airtable logged

---

## SCALING

Once tested, duplicate the workflow for:
- `Script 2: Win_Back_Premium` (change campaign name + Retell engagement ID)
- `Script 3: Reactivation_Soft`

Keep the same Airtable base — just tag each log with the campaign name.

---

_Saved: 2026-04-20_
