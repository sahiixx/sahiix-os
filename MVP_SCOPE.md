# SAHIIXX OS — MVP DEPLOYMENT SCOPE
> Week 1–2. Ship fast. Cut scope to what earns.
> Built: 2026-04-20

---

## MVP PRINCIPLE

Ship the minimum that generates a real lead → meeting. Everything else is secondary.

**Target:** 1 qualified lead → meeting booked in 14 days.

---

## WEEK 1 — FOUNDATION

### What you're building

```
Goal: Get Retell.ai running with Script 1 on 10 test contacts
```

| # | Task | File | Time |
|---|------|------|------|
| 1 | Set up Retell.ai account + load 10 VIP contacts | goldmine_vip_retell.csv (first 10 rows) | 30 min |
| 2 | Configure Script 1 (CLOSER framework) in Retell | RETELL_DEPLOY.md | 1 hour |
| 3 | Set up n8n workflow: Retell → WhatsApp → Airtable | N8N_RETELL_WHATSAPP.md | 2 hours |
| 4 | Configure Twilio WhatsApp Business | Twilio console | 30 min |
| 5 | Create Airtable base: Call_Log + Goldmine_Contacts | Airtable | 1 hour |
| 6 | Run 10 test calls → review transcripts | Retell dashboard | 2 hours |
| 7 | Fix objections based on transcript review | Update script | 1 hour |

### Exit criteria for Week 1
- [ ] 10 test calls made
- [ ] At least 1 INTERSTED or QUALIFIED disposition
- [ ] WhatsApp message sent successfully
- [ ] Call logged in Airtable

---

## WEEK 2 — SCALE

### What you're building

```
Goal: Scale to 50 calls/day, establish follow-up loop
```

| # | Task | File | Time |
|---|------|------|------|
| 1 | Load remaining 356 VIP contacts to Retell | goldmine_vip_retell.csv | 30 min |
| 2 | Set up n8n: WhatsApp follow-up sequences | N8N_RETELL_WHATSAPP.md | 2 hours |
| 3 | Configure webhook_retell_outcome in n8n | INTEGRATION_CONTRACT.md | 1 hour |
| 4 | Connect Airtable to Retell outcomes | N8N_RETELL_WHATSAPP.md | 1 hour |
| 5 | Set up daily metrics dashboard (Retell + Airtable) | — | 1 hour |
| 6 | Scale to 50 calls/day | Retell dashboard | ongoing |
| 7 | Review daily dispositions → fix scripts | Retell transcripts | 30 min/day |

### Exit criteria for Week 2
- [ ] 50 calls/day running
- [ ] WhatsApp follow-up triggering on dispositions
- [ ] All calls logged to Airtable
- [ ] At least 3 INTERSTED dispositions
- [ ] 1 meeting booked

---

## THE MVP STACK (exactly what's needed)

```
Retell.ai (voice)     → outbound calls
Twilio WhatsApp       → follow-up messages
n8n                   → routing + automation
Airtable              → logging + CRM
goldmine_vip_retell.csv → 366 contacts
```

**Nothing else needed for MVP.**

---

## WHAT'S NOT IN MVP

These are week 3+:
- OpenClaw multi-agent team (BrokerOps, LeadIntake, etc.)
- Website form → OpenClaw ingress
- Enrichment workflows (PropertyFinder/Bayut scraping)
- Full CRM sync (HubSpot/Pipedrive)
- Email sequences
- Language-split campaigns beyond English

---

## DAILY CHECKLIST (while running MVP)

```
Morning (10 min):
- Check Retell dashboard: calls yesterday, dispositions
- Check Airtable: new QUALIFIED leads
- WhatsApp: any replies to follow-up messages?

After each call batch:
- Review transcripts of INTERESTED/OBJECTION calls
- Update CLOSER script if needed

Evening (5 min):
- Log disposition breakdown
- Note any patterns (times that work, objections that repeat)
```

---

## SUCCESS METRICS — MVP

| Metric | Week 1 Target | Week 2 Target |
|--------|--------------|---------------|
| Calls made | 10 | 200 (50/day) |
| Connected | 3+ | 60+ |
| Interested | 1+ | 10+ |
| Qualified | — | 3+ |
| Meetings booked | — | 1+ |
| WhatsApp sent | 3+ | 60+ |

---

## THE ONE THING THAT MATTERS

**Meeting booked > everything else.**

If you get 1 meeting in 14 days, the MVP is a success. Everything else is polish.

---

_Saved: 2026-04-20_