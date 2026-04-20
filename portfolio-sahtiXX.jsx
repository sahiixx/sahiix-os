import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════
// SAHIIXX OS — HOLOGRAPHIC CHROME
// Frosted glass · Metallic gradients · Lab aesthetic
// Purple/blue neon traces · Floating HUD panels
// ═══════════════════════════════════════════════════════

const MARKET = {
  q1: "AED 176.7B", tx: "~48K", yoy: "+23.4%", sqft: "AED 1,949",
  off: "~70%", gdp: "~5%", damac: "AED 31.2B",
  areas: ["Dubai Hills", "JVC", "Business Bay", "AR3", "Dubai South", "Creek Harbour"],
};

const PROJECTS = [
  { tag: "SIG//INT", title: "GOLDMINE PROTOCOL", vis: "NEURAL MESH",
    sub: "Contact graph · RFM heat mapping · 16 language vectors",
    desc: "Autonomous signal intelligence. Maps, scores, and activates Dubai's highest-value RE network. RFM neural scoring, 16 language vectors, AI voice pursuit on cold signals.",
    stack: ["n8n","WATI","Retell.ai","Claude API","Airtable"], dots: 50, accent: "#7B61FF" },
  { tag: "AUTO//AGT", title: "SARA", vis: "SIGNAL WAVE",
    sub: "7-layer engineering · autonomous content · $10/mo",
    desc: "Autonomous AI influencer. Grounded in CS, Biology, Chemistry, Physics & Economics. Multilingual content, live streaming, sponsorship bot, affiliate tracking.",
    stack: ["Python","n8n","Docker","Actions","FastAPI"], dots: 35, accent: "#00D4FF" },
  { tag: "SPRT//TCH", title: "NIYYAH AI", vis: "CONSTELLATION",
    sub: "55 countries · verified agencies · PWA",
    desc: "Hajj/Umrah AI companion. JWT auth, 3-tier rate limiting, credit system, prayer times, verified agencies. 42 tests passed.",
    stack: ["Node.js","Claude","Express","LowDB","PWA"], dots: 28, accent: "#4DFFDF" },
  { tag: "B2B//ENG", title: "GAPSOLVER AI", vis: "GRID MATRIX",
    sub: "62 agents · PDPL compliant · 4-tier AED pricing",
    desc: "UAE B2B sales. 62 gap agents, WhatsApp automation, multi-channel acquisition, PDPL compliance, Next.js 14 + PostgreSQL.",
    stack: ["Next.js","Postgres","Fastify","Claude"], dots: 40, accent: "#FF6B9D" },
];

const STACK = ["Next.js 14","Fastify","Prisma","PostgreSQL","Redis BullMQ","Claude API","Ollama","n8n","CF Workers","Retell.ai","WATI","Docker"];

// ── Holographic Particles ──
function HoloField({ count, accent }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"), dpr = 2;
    const w = cv.offsetWidth, h = cv.offsetHeight;
    cv.width = w * dpr; cv.height = h * dpr; ctx.scale(dpr, dpr);
    const colors = [accent || "#7B61FF", "#00D4FF", "#4DFFDF"];
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.4, c: colors[Math.floor(Math.random() * colors.length)],
    }));
    let raf;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.shadowBlur = 4; ctx.shadowColor = p.c;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + "88"; ctx.fill();
        ctx.shadowBlur = 0;
        for (let j = i + 1; j < pts.length; j++) {
          const dx = p.x - pts[j].x, dy = p.y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 48) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pts[j].x, pts[j].y);
            const a = Math.round((1 - d / 48) * 30).toString(16).padStart(2, "0");
            ctx.strokeStyle = p.c + a; ctx.lineWidth = 0.35; ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [count, accent]);
  return <canvas ref={ref} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
}

// ── Glass Card ──
function Glass({ children, style = {}, glow, noBorder }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      border: noBorder ? "none" : "1px solid rgba(255,255,255,0.06)",
      borderRadius: "12px",
      boxShadow: glow ? `0 0 20px ${glow}15, 0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)` : "0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Terminal ──
function Terminal() {
  const [q, setQ] = useState("");
  const [msgs, setMsgs] = useState([{ r: "sys", t: "⬡ SAHIIXX OS v2.0 · Neural link active. Query market data, agent capabilities, or investment vectors." }]);
  const [busy, setBusy] = useState(false);
  const sc = useRef(null);

  const send = useCallback(async () => {
    if (!q.trim() || busy) return;
    const txt = q.trim(); setQ(""); setMsgs(p => [...p, { r: "u", t: txt }]); setBusy(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: `You are SAHIIXX OS — AI infrastructure in Dubai. 33+ agents, 150+ repos, 4K+ n8n flows. Licensed RE agent at APEX Estates.

DUBAI Q1 2026: AED 176.7B sales, ~48K tx (+23.4% YoY). AED 1,949/sqft. Off-plan ~70%. Villas +206% post-pandemic. DAMAC AED 31.2B March. UAE GDP ~5%. ~120K new units 2026. Top areas: Dubai Hills, JVC, Business Bay, AR3, Dubai South. No property/capital gains/rental tax. Golden Visa AED 2M+.

Systems: Goldmine Protocol (signal intelligence), SARA (autonomous AI), Niyyah AI (Hajj/Umrah), GapSolver (B2B).

Respond precise, data-driven, under 100 words. Use ⬡ symbol. You ARE the system.`,
          messages: [{ role: "user", content: txt }],
        }),
      });
      const data = await res.json();
      setMsgs(p => [...p, { r: "ai", t: data.content?.map(b => b.text || "").join("") || "⬡ Signal lost." }]);
    } catch { setMsgs(p => [...p, { r: "ai", t: "⬡ Link interrupted." }]); }
    setBusy(false);
  }, [q, busy]);

  useEffect(() => { sc.current?.scrollTo({ top: sc.current.scrollHeight, behavior: "smooth" }); }, [msgs]);

  const col = { u: "#FF6B9D", ai: "#00D4FF", sys: "#7B61FF88" };
  const lab = { u: "YOU", ai: "SAHIIXX", sys: "SYS" };

  return (
    <Glass glow="#7B61FF" style={{ overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "7px", padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: "rgba(123,97,255,0.03)" }}>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00D4FF", boxShadow: "0 0 8px #00D4FF", animation: "pulse 2s infinite" }} />
        <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "#00D4FF", letterSpacing: "2px" }}>NEURAL LINK</span>
        <div style={{ flex: 1 }} />
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4DFFDF", boxShadow: "0 0 6px #4DFFDF", animation: "pulse 2s .5s infinite" }} />
        <span style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "rgba(255,255,255,0.2)" }}>LIVE</span>
      </div>
      <div ref={sc} style={{ height: "175px", overflow: "auto", padding: "10px 14px" }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ marginBottom: "8px" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "9px", fontWeight: 600, letterSpacing: "1px", color: col[m.r] }}>{lab[m.r]} ▸</span>
            <p style={{ fontFamily: "var(--mono)", fontSize: "10.5px", color: "rgba(200,210,230,0.85)", lineHeight: 1.55, margin: "2px 0 0", whiteSpace: "pre-wrap" }}>{m.t}</p>
          </div>
        ))}
        {busy && <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "#7B61FF66", animation: "pulse 1s infinite" }}>⬡ processing...</div>}
      </div>
      <div style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
          placeholder="⬡ query the system..."
          style={{ flex: 1, background: "rgba(123,97,255,0.03)", border: "none", outline: "none", padding: "12px 14px", fontFamily: "var(--mono)", fontSize: "10.5px", color: "#E0E8F0" }} />
        <button onClick={send} style={{
          background: "linear-gradient(135deg, #7B61FF, #00D4FF)", border: "none", padding: "0 18px", cursor: "pointer",
          fontFamily: "var(--mono)", fontSize: "11px", color: "#fff", fontWeight: 700,
        }}>⬡</button>
      </div>
    </Glass>
  );
}

// ═══ MAIN ═══
export default function SAHIIXXOS() {
  const [loaded, setLoaded] = useState(false);
  const [ap, setAp] = useState(null);
  const [mkt, setMkt] = useState(false);
  const [hi, setHi] = useState(0);
  const hero = ["AI INFRASTRUCTURE", "SIGNAL INTELLIGENCE", "AGENT NETWORKS", "VOICE AI SYSTEMS"];

  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);
  useEffect(() => { const iv = setInterval(() => setHi(p => (p + 1) % hero.length), 3800); return () => clearInterval(iv); }, []);

  const sectionLabel = (n, t) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
      <div style={{ width: "16px", height: "16px", borderRadius: "4px", background: "linear-gradient(135deg, #7B61FF22, #00D4FF22)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(123,97,255,0.15)" }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "#7B61FF", fontWeight: 700 }}>{n}</span>
      </div>
      <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "3px" }}>{t}</span>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(123,97,255,0.12), transparent)" }} />
    </div>
  );

  return (
    <div style={{
      background: "#0A0B14", color: "#C8D0E0", minHeight: "100vh",
      fontFamily: "'Exo 2',sans-serif", "--mono": "'Share Tech Mono',monospace",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&family=Exo+2:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes heroSwap{0%{opacity:0;transform:translateY(12px) scale(0.98)}8%{opacity:1;transform:translateY(0) scale(1)}88%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-12px) scale(0.98)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes orbGlow{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.7;transform:scale(1.1)}}
        @keyframes borderShimmer{0%{border-color:rgba(123,97,255,0.1)}50%{border-color:rgba(0,212,255,0.15)}100%{border-color:rgba(123,97,255,0.1)}}
        input::placeholder{color:rgba(123,97,255,0.25)}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(123,97,255,0.2);border-radius:2px}
      `}</style>

      {/* ── Ambient Background ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {/* Main gradient */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 20%, #1a1040 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #0a1828 0%, transparent 50%)" }} />
        {/* Orbs */}
        <div style={{ position: "absolute", top: "8%", right: "10%", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, #7B61FF08 0%, transparent 70%)", animation: "orbGlow 6s ease infinite", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "5%", width: "250px", height: "250px", borderRadius: "50%", background: "radial-gradient(circle, #00D4FF06 0%, transparent 70%)", animation: "orbGlow 8s ease 2s infinite", filter: "blur(50px)" }} />
        <div style={{ position: "absolute", top: "50%", right: "20%", width: "150px", height: "150px", borderRadius: "50%", background: "radial-gradient(circle, #FF6B9D05 0%, transparent 70%)", animation: "orbGlow 7s ease 1s infinite", filter: "blur(35px)" }} />
        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(123,97,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        {/* Horizon line */}
        <div style={{ position: "absolute", bottom: "35%", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent 5%, rgba(0,212,255,0.06) 30%, rgba(123,97,255,0.08) 50%, rgba(0,212,255,0.06) 70%, transparent 95%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ═══ HERO ═══ */}
        <section style={{ padding: "52px 24px 20px", opacity: loaded ? 1 : 0, transition: "opacity .8s" }}>
          {/* Status bar */}
          <Glass style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", marginBottom: "20px" }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4DFFDF", boxShadow: "0 0 8px #4DFFDF", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(77,255,223,0.7)", letterSpacing: "3px" }}>SAHIIXX_OS://v2.0</span>
          </Glass>

          <div style={{ minHeight: "85px" }}>
            <div key={hi} style={{ animation: "heroSwap 3.8s ease" }}>
              <h1 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "34px", fontWeight: 700, letterSpacing: "2px", lineHeight: 1.05, color: "#F0F2F8" }}>
                {hero[hi]}
              </h1>
              <div style={{
                fontFamily: "'Rajdhani',sans-serif", fontSize: "18px", fontWeight: 600, letterSpacing: "3px", marginTop: "4px",
                background: "linear-gradient(90deg, #7B61FF, #00D4FF, #FF6B9D)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                FOR DUBAI ⬡
              </div>
            </div>
          </div>

          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(200,210,230,0.4)", lineHeight: 1.7, marginTop: "10px" }}>
            33+ specialist agents // 150+ repositories<br />
            UAE real estate // fintech // enterprise
          </p>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "6px", marginTop: "24px" }}>
            {[
              { v: "150+", l: "REPOS", c: "#7B61FF" },
              { v: "33+", l: "AGENTS", c: "#00D4FF" },
              { v: "4K+", l: "FLOWS", c: "#4DFFDF" },
              { v: "6", l: "LAYERS", c: "#FF6B9D" },
            ].map((s, i) => (
              <Glass key={i} glow={s.c} style={{
                padding: "14px 4px", textAlign: "center",
                opacity: loaded ? 1 : 0,
                animation: loaded ? `fadeUp .5s ease ${.3 + i * .1}s forwards, float 4s ease ${i * 0.5}s infinite` : "none",
              }}>
                <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "20px", fontWeight: 700, color: s.c, textShadow: `0 0 15px ${s.c}44` }}>{s.v}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "7px", color: "rgba(255,255,255,0.2)", letterSpacing: "2px", marginTop: "1px" }}>{s.l}</div>
              </Glass>
            ))}
          </div>
        </section>

        {/* ═══ TICKER ═══ */}
        <div style={{ overflow: "hidden", padding: "9px 0", borderTop: "1px solid rgba(123,97,255,0.06)", borderBottom: "1px solid rgba(123,97,255,0.06)", margin: "8px 0" }}>
          <div style={{ display: "flex", gap: "30px", animation: "scroll 22s linear infinite", whiteSpace: "nowrap", fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(0,212,255,0.35)" }}>
            {[...Array(2)].flatMap(() => [`⬡ Q1: ${MARKET.q1}`, `YoY: ${MARKET.yoy}`, `${MARKET.sqft}/sqft`, `OFF-PLAN: ${MARKET.off}`, `GDP: ${MARKET.gdp}`, `DAMAC: ${MARKET.damac}`]).map((t, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#7B61FF", opacity: 0.4 }} />{t}
              </span>
            ))}
          </div>
        </div>

        {/* ═══ MARKET ═══ */}
        <section style={{ padding: "18px 24px" }}>
          <button onClick={() => setMkt(!mkt)} style={{
            width: "100%", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
            background: "linear-gradient(135deg, rgba(123,97,255,0.04), rgba(0,212,255,0.02))",
            backdropFilter: "blur(12px)", border: "1px solid rgba(123,97,255,0.1)",
            borderRadius: "10px", padding: "12px 14px", animation: "borderShimmer 4s ease infinite",
          }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FF6B9D", boxShadow: "0 0 8px #FF6B9D", animation: "pulse 1.5s infinite" }} />
            <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "#00D4FF", letterSpacing: "2.5px", flex: 1, textAlign: "left" }}>⬡ MARKET INTEL // Q1 2026</span>
            <svg width="10" height="10" viewBox="0 0 12 12" style={{ color: "rgba(123,97,255,0.3)", transform: mkt ? "rotate(180deg)" : "", transition: "transform .25s" }}><path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
          </button>
          {mkt && (
            <Glass style={{ marginTop: "6px", padding: "14px", animation: "fadeIn .25s" }} glow="#7B61FF">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
                {[
                  { l: "Q1 SALES", v: MARKET.q1, c: "#7B61FF" }, { l: "TRANSACTIONS", v: MARKET.tx, c: "#00D4FF" },
                  { l: "YOY VALUE", v: MARKET.yoy, c: "#4DFFDF" }, { l: "AVG/SQFT", v: MARKET.sqft, c: "#FF6B9D" },
                  { l: "OFF-PLAN", v: MARKET.off, c: "#7B61FF" }, { l: "UAE GDP", v: MARKET.gdp, c: "#00D4FF" },
                ].map((d, i) => (
                  <div key={i} style={{ background: "rgba(0,0,0,0.25)", padding: "9px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.03)" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "7px", color: "rgba(255,255,255,0.15)", letterSpacing: "1.5px" }}>{d.l}</div>
                    <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "14px", fontWeight: 700, color: d.c, textShadow: `0 0 10px ${d.c}33`, marginTop: "2px" }}>{d.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "8px" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: "7px", color: "rgba(123,97,255,0.3)", letterSpacing: "1.5px", marginBottom: "5px" }}>⬡ GROWTH VECTORS</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                  {MARKET.areas.map((a, i) => (
                    <span key={i} style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "rgba(0,212,255,0.5)", background: "rgba(0,212,255,0.04)", padding: "3px 7px", borderRadius: "4px", border: "1px solid rgba(0,212,255,0.08)" }}>{a}</span>
                  ))}
                </div>
              </div>
            </Glass>
          )}
        </section>

        {/* ═══ TERMINAL ═══ */}
        <section style={{ padding: "4px 24px 22px" }}>
          {sectionLabel("00", "NEURAL LINK")}
          <Terminal />
        </section>

        {/* ═══ SYSTEMS ═══ */}
        <section style={{ padding: "4px 24px 22px" }}>
          {sectionLabel("01", "SYSTEMS")}
          {PROJECTS.map((p, i) => (
            <div key={i} onClick={() => setAp(ap === i ? null : i)} style={{ marginBottom: "8px", cursor: "pointer" }}>
              <Glass glow={ap === i ? p.accent : null} style={{
                overflow: "hidden", transition: "all .25s",
                border: ap === i ? `1px solid ${p.accent}22` : "1px solid rgba(255,255,255,0.04)",
                opacity: loaded ? 1 : 0, animation: loaded ? `fadeUp .5s ease ${.5 + i * .1}s forwards` : "none",
              }}>
                {/* Particles */}
                <div style={{ position: "relative", height: ap === i ? "72px" : "0", transition: "height .3s", overflow: "hidden", background: "rgba(0,0,0,0.3)" }}>
                  <HoloField count={p.dots} accent={p.accent} />
                  <div style={{ position: "absolute", bottom: "6px", left: "14px", fontFamily: "var(--mono)", fontSize: "8px", color: `${p.accent}55`, letterSpacing: "2.5px" }}>⬡ {p.vis}</div>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "8px", color: p.accent, letterSpacing: "2.5px" }}>{p.tag}</span>
                      <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "17px", fontWeight: 700, marginTop: "2px", letterSpacing: "1.5px", color: "#E8ECF4" }}>{p.title}</h3>
                    </div>
                    <div style={{
                      width: "24px", height: "24px", borderRadius: "6px",
                      background: `linear-gradient(135deg, ${p.accent}15, transparent)`,
                      border: `1px solid ${p.accent}20`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: p.accent, boxShadow: `0 0 6px ${p.accent}`, animation: "pulse 2s infinite" }} />
                    </div>
                  </div>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(200,210,230,0.3)", marginTop: "3px" }}>{p.sub}</p>
                  {ap === i && (
                    <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: `1px solid ${p.accent}0d`, animation: "fadeIn .2s" }}>
                      <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(200,210,230,0.55)", lineHeight: 1.6 }}>{p.desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "10px" }}>
                        {p.stack.map((s, j) => (
                          <span key={j} style={{
                            fontFamily: "var(--mono)", fontSize: "8px", color: `${p.accent}88`,
                            background: `${p.accent}08`, padding: "3px 7px", borderRadius: "4px", border: `1px solid ${p.accent}12`,
                          }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Glass>
            </div>
          ))}
        </section>

        {/* ═══ STACK ═══ */}
        <section style={{ padding: "4px 24px 22px" }}>
          {sectionLabel("02", "TECH STACK")}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "5px" }}>
            {STACK.map((s, i) => {
              const colors = ["#7B61FF", "#00D4FF", "#4DFFDF", "#FF6B9D"];
              const c = colors[i % colors.length];
              return (
                <Glass key={i} style={{ padding: "10px 4px", textAlign: "center", border: `1px solid ${c}08` }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: `${c}88` }}>{s}</div>
                </Glass>
              );
            })}
          </div>
        </section>

        {/* ═══ OPERATOR ═══ */}
        <section style={{ padding: "4px 24px 14px" }}>
          {sectionLabel("03", "OPERATOR")}
          <p style={{ fontFamily: "var(--mono)", fontSize: "10.5px", color: "rgba(200,210,230,0.35)", lineHeight: 1.75 }}>
            Dubai-based AI developer + automation specialist + licensed RE agent. Production-grade AI for UAE — autonomous agents, multilingual voice, signal intelligence — deployed from mobile terminal.
          </p>
        </section>

        {/* ═══ CTA ═══ */}
        <section style={{ padding: "14px 24px 52px" }}>
          <a href="https://wa.me/971585476077" target="_blank" rel="noopener noreferrer" style={{
            display: "block", width: "100%", padding: "16px", textAlign: "center", textDecoration: "none",
            background: "linear-gradient(135deg, #7B61FF, #00D4FF, #FF6B9D)",
            color: "#fff", borderRadius: "10px",
            fontFamily: "'Rajdhani',sans-serif", fontSize: "13px", fontWeight: 700, letterSpacing: "3px",
            boxShadow: "0 0 25px rgba(123,97,255,0.2), 0 0 50px rgba(0,212,255,0.1)",
          }}>
            ⬡ INITIATE CONTACT
          </a>
          <a href="mailto:sahiixx@proton.me" style={{
            display: "block", width: "100%", padding: "13px", marginTop: "8px",
            background: "rgba(123,97,255,0.04)", color: "rgba(200,210,230,0.3)", textAlign: "center",
            borderRadius: "10px", textDecoration: "none", border: "1px solid rgba(123,97,255,0.08)",
            fontFamily: "var(--mono)", fontSize: "10px", backdropFilter: "blur(8px)",
          }}>
            sahiixx@proton.me
          </a>
          <p style={{ textAlign: "center", fontFamily: "var(--mono)", fontSize: "8px", color: "rgba(123,97,255,0.12)", marginTop: "16px" }}>
            SAHIIXX_OS:// {new Date().getFullYear()} // DUBAI
          </p>
        </section>
      </div>
    </div>
  );
}
