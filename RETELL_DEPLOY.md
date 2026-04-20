# RETELL.AI DEPLOYMENT — VIP Campaign (Script 1)
_AED 22.46B pipeline · 366 contacts · CLOSER Framework_

---

## STEP 1 — Upload Contacts

1. Log in to [app.retell.ai](https://app.retell.ai)
2. Go to **Contacts** → **Add Contacts** → Upload CSV
3. Use: `goldmine_vip_retell.csv`
4. Map fields:
   - `name` → Full Name
   - `phone` → Phone Number
   - `language` → Language (for routing)
   - `nationality` → Custom Field 1
   - `total_volume_aed` → Custom Field 2
   - `rfm_score` → Custom Field 3
   - `areas` → Custom Field 4
   - `prop_types` → Custom Field 5
   - `last_date` → Custom Field 6
   - `frequency` → Custom Field 7

---

## STEP 2 — Create Intake Questionnaire

Go to **Engagements** → **Create** → **Outbound Call**

### Basic Info
- **Name:** VIP Exclusive — Goldmine Script 1
- **Objective:** Qualify high-value Dubai RE buyers, schedule viewings
- **Call Mode:** Voicemail Drop (leave message if no answer)

### Intake Settings
```
max_silence_seconds: 8
answering_machine_detection: true
voicemail_drop_threshold: 25
endpointing_timeout: 5
```

### Global Variables (set these once)
| Variable | Value |
|----------|-------|
| `company_name` | APEX Estates Dubai |
| `agent_name` | Sahil |
| `website` | sahiix.ai |
| `whatsapp` | +971585476077 |
| `language_default` | en |
| `script_version` | v1.0 |
| `campaign_date` | April 2026 |

---

## STEP 3 — Script Configuration

Copy Script 1 from `Retell_CLOSER_Scripts_Goldmine.docx` into Retell.

### Required Variables (Retell format: `{{variable_name}}`)
```
{{contact_name}}
{{last_transaction_date}}
{{total_volume_aed}}
{{preferred_areas}}
{{language}}
{{property_type}}
```

### Variable Mapping → Retell Custom Fields
- `{{contact_name}}` → maps to `name`
- `{{last_transaction_date}}` → maps to `last_date`
- `{{total_volume_aed}}` → maps to `total_volume_aed`
- `{{language}}` → maps to `language`
- `{{preferred_areas}}` → maps to `areas`
- `{{property_type}}` → maps to `prop_types`

### Disposition Codes (required)
| Code | Label | Meaning |
|------|-------|---------|
| `CONNECTED` | Connected | Live answer, conversation started |
| `VOICEMAIL` | Voicemail | Left message |
| `NO_ANSWER` | No Answer | Ring, no voicemail |
| `BUSY` | Busy | Line busy |
| `INTERESTED` | Interested | Wants to hear more |
| `QUALIFIED` | Qualified | Meets criteria, schedule viewing |
| `NOT_INTERESTED` | Not Interested | Declined |
| `OBJECTION` | Objection | Needs follow-up |
| `WRONG_NUMBER` | Wrong Number | Bad contact |
| `LATER` | Callback Later | Ask to call back |

---

## STEP 4 — Voice Settings

```
voice_model: enhanced
voice_speed: 1.0
voice_pitch: 1.0
background_denoise: true
noise_cancellation_level: high
```

**Recommended voices for Dubai HNWIs:**
- `Matthew` (English, UK/US accent, professional)
- `Amy` (English, British, warm)
- `Arjun` (English, Indian) — for Indian nationals
- `Ali` (Arabic) — for Arabic speakers

Set language-based routing: if contact language = `ar` → use `Ali` voice.

---

## STEP 5 — Upload to Retell

### Option A: Manual Upload (per contact)
1. Go to Contacts
2. Add one by one
3. Set custom fields manually

### Option B: CSV Upload (bulk)
1. Prepare CSV with columns: name, phone, language, nationality, total_volume_aed, rfm_score, areas, prop_types, last_date, frequency
2. Import to Retell
3. Map fields

### Option C: API Upload
```bash
curl -X POST https://api.retell.ai/v1/contact \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "name": "CHEN XIAOLAN",
    "phone": "+971581981892",
    "language": "zh",
    "custom_fields": {
      "nationality": "Peoples Republic of China (China)",
      "total_volume_aed": 110350000,
      "rfm_score": 9.2,
      "areas": "Burj Khalifa",
      "prop_types": "Flat"
    }
  }'
```

---

## STEP 6 — Start Campaign

1. Go to **Dashboard** → **Outbound Calls**
2. Select your engagement
3. Set **start_time** (recommend: 10 AM GST for maximum answer rate)
4. Set **max_parallel_calls** (start with 3, scale to 10)
5. Set **call_attempt** (max 3 attempts, 30 min between attempts)
6. Monitor live at: [app.retell.ai/dashboard](https://app.retell.ai/dashboard)

---

## STEP 7 — Monitor & Iterate

### Daily Metrics to Track
```
Calls made
Connected (%)
Voicemails (%)
Interested (%)
Qualified (%)
Meetings booked
```

### Live Dashboard Checks
- Avg call duration → if < 60s, script needs work
- Disconnection rate → if > 30%, check voicemail drops
- Conversion rate → interested / connected

### Weekly Review
- Pull worst 3 calls → listen and fix
- Review objection types → update CLOSER script
- A/B test different openers

---

## CAMPAIGN TIMELINE

| Day | Action |
|-----|--------|
| 1 | Upload contacts, configure engagement |
| 2 | Run 10 test calls → review transcripts |
| 3 | Fix script based on test feedback |
| 4 | Scale to 50 calls/day |
| 5+ | Full pipeline: 100 calls/day |

---

## BATCH CONTACT STATUS

**VIP_Exclusive ready for Script 1: 366 contacts**

| Language | Count | Notes |
|----------|-------|-------|
| EN | 91 | UK/US/Canada/Cambodia/Gambia/Ireland |
| AR | 97 | UAE/Saudia/Egypt/Lebanon/Jordan/Kuwait |
| ZH | 37 | China |
| HI | 37 | India |
| UR | 23 | Pakistan |
| RU | 17 | Russia/Ukraine |
| FR | 10 | France/Belgium/Morocco |
| FA | 10 | Iran |
| Other | 44 | DE/TR/IT/ES/TL/JA/BN/etc |

---

_Saved: 2026-04-20_
