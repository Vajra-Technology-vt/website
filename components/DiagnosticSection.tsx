"use client";
import { useState, useEffect, useRef } from "react";

/* ——————————————————————————————————————————
   QUESTION DEFINITIONS
   —————————————————————————————————————————— */
type Opt = { v: string; i: string; t: string; d: string };
type Question = { key: string; q: string; hint: string; fork?: boolean; opts: Opt[] };

const Q_STAGE: Question = {
  key: "stage",
  q: "Where are you right now?",
  hint: "Pick the one that fits best — no wrong answers.",
  opts: [
    { v: "stage_idea",   i: "✦", t: "Just an idea, starting fresh", d: "Nothing built yet" },
    { v: "stage_growth", i: "▲", t: "Up and running, want to grow", d: "Live, ready for more" },
    { v: "stage_mature", i: "◆", t: "Established, need to modernise", d: "Working, due an upgrade" },
  ],
};
const Q_NEED: Question = {
  key: "need",
  q: "What do you need help with?",
  hint: "This points us to the right questions for you.",
  fork: true,
  opts: [
    { v: "need_build", i: "▰", t: "Building something", d: "Software, an app, AI" },
    { v: "need_grow",  i: "↗", t: "Getting more customers", d: "Marketing, leads" },
    { v: "need_both",  i: "✶", t: "Both — tech and customers", d: "The whole thing" },
    { v: "need_brand", i: "◈", t: "A brand", d: "Identity, story, design" },
  ],
};
const Q_BUILD_1: Question = {
  key: "build_what",
  q: "What are we building?",
  hint: "Roughly — we'll get into detail on a call.",
  opts: [
    { v: "build_web",      i: "▢", t: "A website or web app", d: "Browser-based" },
    { v: "build_mobile",   i: "▤", t: "A mobile app", d: "iOS / Android" },
    { v: "build_software", i: "▰", t: "Custom software / internal tool", d: "Platform or system" },
    { v: "build_ai",       i: "✶", t: "Something with AI or data at its core", d: "Intelligent product" },
    { v: "build_unsure",   i: "◇", t: "Not sure yet", d: "That's part of what I need help with" },
  ],
};
const Q_BUILD_2: Question = {
  key: "build_stage",
  q: "How far along are you?",
  hint: "Helps us know where to jump in.",
  opts: [
    { v: "build_ready", i: "◎", t: "I have designs / a clear spec", d: "Ready to build" },
    { v: "build_rough", i: "◐", t: "I have rough ideas", d: "Need help shaping them" },
    { v: "build_blank", i: "○", t: "Starting from a blank page", d: "From zero" },
  ],
};
const Q_GROW_1: Question = {
  key: "grow_where",
  q: "Where do you want to grow?",
  hint: "Pick what matters most — you can tell us more later.",
  opts: [
    { v: "grow_social", i: "◎", t: "Social media presence", d: "Audience & content" },
    { v: "grow_ads",    i: "⇲", t: "Paid ads", d: "Google, Meta, etc." },
    { v: "grow_seo",    i: "◈", t: "Search ranking / SEO", d: "Get found organically" },
    { v: "grow_all",    i: "✶", t: "All of the above, honestly", d: "The whole engine" },
  ],
};
const Q_BOTH_1: Question = {
  key: "both_gap",
  q: "What's the bigger gap right now?",
  hint: "We'll cover both, but where do we start?",
  opts: [
    { v: "both_tech_first", i: "▰", t: "The product / tech isn't there yet", d: "Build first" },
    { v: "both_grow_first", i: "↗", t: "The product's fine, we need customers", d: "Grow first" },
    { v: "both_equal",      i: "✶", t: "Genuinely both, equally", d: "In parallel" },
  ],
};
const Q_BOTH_2: Question = {
  key: "urgency",
  q: "How soon do you need to see results?",
  hint: "Be honest — we move quickly either way.",
  opts: [
    { v: "both_urgent",  i: "⚡", t: "Fast — we're in a hurry", d: "Weeks, not months" },
    { v: "both_quarter", i: "◔", t: "Over the next quarter", d: "A focused run" },
    { v: "both_plan",    i: "◇", t: "Still planning", d: "Exploring options" },
  ],
};
const Q_BRAND_1: Question = {
  key: "brand_need",
  q: "What does your brand need?",
  hint: "Pick the closest.",
  opts: [
    { v: "brand_new",     i: "✦", t: "A brand from scratch", d: "New business" },
    { v: "brand_refresh", i: "↻", t: "A refresh", d: "We've outgrown our look" },
    { v: "brand_logo",    i: "◈", t: "Just a logo / visual identity", d: "The visual layer" },
    { v: "brand_story",   i: "❝", t: "The story & messaging", d: "Not just the look" },
  ],
};
const Q_BRAND_2: Question = {
  key: "brand_start",
  q: "Do you have anything to start from?",
  hint: "No wrong answer.",
  opts: [
    { v: "brand_assets",    i: "◎", t: "Existing brand assets / guidelines", d: "Something to build on" },
    { v: "brand_logo_only", i: "◐", t: "A logo, but nothing else", d: "Partial" },
    { v: "brand_nothing",   i: "○", t: "Nothing yet", d: "Blank slate" },
  ],
};
const Q_URGENCY: Question = {
  key: "urgency",
  q: "How soon do you need this?",
  hint: "Be honest — we move quickly either way.",
  opts: [
    { v: "time_urgent",  i: "⚡", t: "Fast, we move quickly", d: "Weeks, not months" },
    { v: "time_quarter", i: "◔", t: "Next quarter", d: "A focused run" },
    { v: "time_explore", i: "◇", t: "Just exploring", d: "No rush yet" },
  ],
};

function buildFlow(need: string | null): Question[] {
  const base = [Q_STAGE, Q_NEED];
  if (need === "need_build") return [...base, Q_BUILD_1, Q_BUILD_2, Q_URGENCY];
  if (need === "need_grow")  return [...base, Q_GROW_1, Q_URGENCY];
  if (need === "need_both")  return [...base, Q_BOTH_1, Q_BOTH_2];
  if (need === "need_brand") return [...base, Q_BRAND_1, Q_BRAND_2, Q_URGENCY];
  return base;
}

/* ——— labels / roadmap config ——— */
const LABELS: Record<string, string> = {
  stage_idea: "Just an idea", stage_growth: "Up & running", stage_mature: "Established business",
  need_build: "Build", need_grow: "Grow", need_both: "Both", need_brand: "Brand",
  build_web: "Website / web app", build_mobile: "Mobile app", build_software: "Custom software",
  build_ai: "AI / data product", build_unsure: "Not sure yet",
  build_ready: "Has spec/designs", build_rough: "Rough ideas", build_blank: "Blank page",
  grow_social: "Social media", grow_ads: "Paid ads", grow_seo: "SEO", grow_all: "All channels",
  both_tech_first: "Tech first", both_grow_first: "Customers first", both_equal: "Both equally",
  both_urgent: "Urgent", both_quarter: "This quarter", both_plan: "Still planning",
  brand_new: "Brand from scratch", brand_refresh: "Brand refresh", brand_logo: "Logo / identity", brand_story: "Story & messaging",
  brand_assets: "Has assets", brand_logo_only: "Logo only", brand_nothing: "Nothing yet",
  time_urgent: "Urgent", time_quarter: "Next quarter", time_explore: "Exploring",
};

const HEADLINE: Record<string, string> = {
  need_build: "A product, built right",
  need_grow: "A pipeline that fills itself",
  need_both: "The tech and the customers, together",
  need_brand: "A brand that's impossible to ignore",
};
const INTRO: Record<string, string> = {
  build_blank: "We'd start by shaping your idea into a clear spec, then build it properly — one team from design to launch, so nothing gets lost along the way.",
  build_rough: "We'd turn your rough ideas into a buildable spec, then design and ship it in short cycles you can steer the whole way.",
  build_ready: "You've done the thinking — we'd validate the spec, then build and launch it properly, the same team start to finish.",
  build_web: "We'd design and build your web product end to end — proper engineering you'll be proud to put in front of customers.",
  build_mobile: "We'd design and build your app for the device your customers actually use — from prototype to the store.",
  build_software: "We'd architect and build the system around the real business problem — built to scale, not to impress a screenshot.",
  build_ai: "We'd build the AI where it solves a real problem — useful, measured, and wired into a product that works.",
  build_unsure: "We'd start with a short discovery to figure out exactly what to build — then build it. That clarity saves the most money.",
  grow_ads: "We'd put your budget to work across the right channels — paid and organic together — and measure everything, so you see leads, not just impressions.",
  grow_social: "We'd build a social presence with a strategy behind it, feeding the rest of your funnel — not posting for the sake of posting.",
  grow_seo: "We'd build search visibility that compounds — technical SEO and content aimed at the moments people are deciding.",
  grow_all: "We'd build the whole growth engine — social, ads and SEO set up to feed each other, measured in customers, not clicks.",
  both_tech_first: "We'd build the product first so it actually works, then turn on the growth engine to bring the customers. One team, so the two fit together.",
  both_grow_first: "We'd switch on growth against what you already have, while we strengthen the product underneath — in the right order, by one team.",
  both_equal: "We'd run product and growth in parallel — one team, no handoffs — so the build and the customers arrive together.",
  brand_new: "We'd start with your story and identity — the look, the voice, the reason people remember you — before we build anything on top.",
  brand_refresh: "We'd sharpen what's already working and rebuild what isn't — a refresh that finally matches your ambition.",
  brand_logo: "We'd give you a visual identity that works everywhere — from a thumbnail to a billboard — built on real positioning.",
  brand_story: "We'd find the true story underneath the business and say it clearly — the words and narrative your whole brand runs on.",
};
const URGENCY_LINE: Record<string, string> = {
  urgent: "Because you need this fast, we'd run the pieces in parallel — one team, no handoffs, which is exactly how we move quickly.",
  quarter: "With a quarter to work in, we'd phase it — quick wins first, then the deeper work.",
  explore: "Since you're exploring, we'd start with a short strategy session to find the highest-impact first move.",
};

function normUrgency(answers: Record<string, string>) {
  const u = answers.urgency;
  if (u === "both_urgent" || u === "time_urgent") return "urgent";
  if (u === "both_quarter" || u === "time_quarter") return "quarter";
  return "explore";
}
function timelineOf(u: string) { return u === "urgent" ? "4–6 weeks" : u === "quarter" ? "8–12 weeks" : "Phased"; }
function focusOf(need: string) {
  return need === "need_build" ? "Build-led" : need === "need_grow" ? "Growth-led" : need === "need_brand" ? "Brand-led" : "Full squad";
}
function primaryAnswer(answers: Record<string, string>) {
  return answers.build_what || answers.build_stage || answers.grow_where || answers.both_gap || answers.brand_need || "";
}

function roadmapItems(answers: Record<string, string>): { t: string; d: string }[] {
  const need = answers.need;
  if (need === "need_build") {
    const items: { t: string; d: string }[] = [];
    if (["build_blank", "build_rough"].includes(answers.build_stage) || answers.build_what === "build_unsure")
      items.push({ t: "Discovery & spec", d: "Shape the idea into something clear and buildable." });
    items.push({ t: "Design & prototype", d: "UX you can test with real people before we write code." });
    items.push({ t: "Build in sprints", d: "Short cycles, regular demos — you always know where we are." });
    items.push({ t: "Launch & iterate", d: "QA, deploy, then stay with it as it grows." });
    return items.slice(0, 4);
  }
  if (need === "need_grow") {
    return [
      { t: "Customer & channel read", d: "Who buys, where they are, what moves them." },
      { t: "Build the system", d: answers.grow_where === "grow_seo" ? "SEO + content set up to compound over time." : "Social, ads and SEO wired to feed each other." },
      { t: "Run & optimise weekly", d: "We're in the data so you don't have to be." },
      { t: "Report in plain English", d: "Is it bringing customers? Yes or why not." },
    ];
  }
  if (need === "need_both") {
    let first = answers.both_gap === "both_grow_first"
      ? { t: "Switch on growth", d: "Bring customers to what you already have." }
      : { t: "Build the product right", d: "Get the tech solid and shippable." };
    let second = answers.both_gap === "both_grow_first"
      ? { t: "Strengthen the product", d: "Shore up the tech underneath as demand grows." }
      : { t: "Turn on the growth engine", d: "Marketing that fills the pipeline." };
    if (answers.both_gap === "both_equal") {
      first  = { t: "Build & grow in parallel", d: "Product and pipeline, same team, at once." };
      second = { t: "Tighten the loop", d: "Feed growth learnings back into the product." };
    }
    return [first, second, { t: "Brand glue", d: "One identity holding it all together." }, { t: "Measure & tune", d: "Optimise for revenue, not vanity metrics." }];
  }
  const bi: { t: string; d: string }[] = [{ t: "Strategy & positioning", d: "Who you are, who you're for, why you win." }];
  if (answers.brand_need !== "brand_logo") bi.push({ t: "Voice & messaging", d: "The words that make people care." });
  bi.push({ t: "Identity & design", d: "A look that works everywhere and lasts." });
  bi.push({ t: "Roll out everywhere", d: "Website, social, decks — the brand, deployed." });
  return bi.slice(0, 4);
}

/* ——————————————————————————————————————————
   COMPONENT
   —————————————————————————————————————————— */
type Phase = "q" | "roadmap" | "success";

interface DiagProps { source?: string; }

export default function DiagnosticWidget({ source = "homepage" }: DiagProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flow, setFlow] = useState<Question[]>(() => buildFlow(null));
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("q");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [rmIn, setRmIn] = useState<boolean[]>([]);
  const rmTimeout = useRef<ReturnType<typeof setTimeout>[]>([]);

  const total = flow.length + 1;
  const reduce = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  /* animate rm-items in on roadmap render */
  useEffect(() => {
    if (phase !== "roadmap") return;
    const items = roadmapItems(answers);
    setRmIn(new Array(items.length).fill(false));
    rmTimeout.current.forEach(clearTimeout);
    rmTimeout.current = items.map((_, i) =>
      setTimeout(() => {
        setRmIn((prev) => { const n = [...prev]; n[i] = true; return n; });
      }, reduce ? 0 : 120 + i * 100)
    );
  }, [phase]); // eslint-disable-line

  const pickAnswer = (q: Question, v: string) => {
    const updated = { ...answers, [q.key]: v };
    if (q.fork) {
      // clear stale path answers
      ["build_what","build_stage","grow_where","both_gap","brand_need","brand_start","urgency"]
        .forEach((k) => delete updated[k]);
      setFlow(buildFlow(v));
    }
    setAnswers(updated);
    setTimeout(() => {
      if (idx < (q.fork ? buildFlow(v).length : flow.length) - 1) {
        setIdx((i) => i + 1);
      } else {
        setPhase("roadmap");
      }
    }, 240);
  };

  const goBack = () => {
    if (phase === "roadmap") { setPhase("q"); setIdx(flow.length - 1); return; }
    if (idx === 0) return;
    const newIdx = idx - 1;
    // Clear the destination screen's answer and everything after it
    const keysToDelete = flow.slice(newIdx).map((q) => q.key);
    setAnswers((prev) => {
      const next = { ...prev };
      keysToDelete.forEach((k) => delete next[k]);
      return next;
    });
    // If the fork question's answer is being cleared, reset flow to base
    const forkQ = flow.find((q) => q.fork);
    if (forkQ && keysToDelete.includes(forkQ.key)) {
      setFlow(buildFlow(null));
    }
    setIdx(newIdx);
  };

  /* submit */
  const handleSubmit = async () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Your name, please.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = "A valid email so we can reach you.";
    if (phone.trim() && phone.replace(/\D/g, "").length < 7) errs.phone = "That phone number looks too short.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const u = normUrgency(answers);
    const items = roadmapItems(answers);

    /* Collect path-specific answers (everything except the first two questions
       and urgency which are stored in their own columns) */
    const pathAnswers: Record<string, string> = {};
    Object.entries(answers).forEach(([k, v]) => {
      if (!["stage", "need", "urgency"].includes(k)) {
        pathAnswers[k] = LABELS[v] ?? v;
      }
    });

    const payload = {
      name:  name.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      note:  note.trim()  || null,
      source,
      diagnostic_answers: {
        stage:            answers.stage   ?? null,
        need:             answers.need    ?? null,
        urgency:          answers.urgency ?? null,
        stage_label:      LABELS[answers.stage]   ?? answers.stage   ?? null,
        need_label:       LABELS[answers.need]    ?? answers.need    ?? null,
        urgency_label:    LABELS[answers.urgency] ?? answers.urgency ?? null,
        path_answers:     pathAnswers,
        roadmap_head:     HEADLINE[answers.need]        ?? null,
        roadmap_steps:    items,
        roadmap_timeline: timelineOf(u),
      },
    };

    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* network error — swallow silently; the user still sees success */
    } finally {
      setSubmitting(false);
      setPhase("success");
    }
  };

  /* ——— progress bar ——— */
  const current = phase === "q" ? idx : flow.length;
  const shown = phase === "q" ? idx + 1 : total;

  /* ——— render ——— */
  const q = flow[idx];
  const u = normUrgency(answers);
  const items = roadmapItems(answers);
  const intro = INTRO[primaryAnswer(answers)] || "Here's the path we'd take, in order — tailored to where you are.";
  const head = HEADLINE[answers.need] || "Here's where we'd start";

  return (
    <div className="diag" id="diagnostic" data-source={source}>
      {/* Progress bar */}
      <div className="diag-progress" role="progressbar" aria-valuenow={shown} aria-valuemax={total}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`seg${i < current || phase !== "q" ? " done" : ""}`}><i /></div>
        ))}
        <div className="cnt">{shown < 10 ? "0" : ""}{shown} / {total < 10 ? "0" : ""}{total}</div>
      </div>

      {/* Question */}
      {phase === "q" && q && (
        <div className="diag-step" key={idx}>
          <p className="diag-q">{q.q}</p>
          <p className="diag-hint">{q.hint}</p>
          <div className={`opts${q.opts.length >= 4 ? " two" : ""}`} role="listbox" aria-label={q.q}>
            {q.opts.map((o) => {
              const sel = answers[q.key] === o.v;
              return (
                <button
                  key={o.v}
                  className={`opt${sel ? " sel" : ""}`}
                  role="option"
                  aria-selected={sel}
                  onClick={() => pickAnswer(q, o.v)}
                >
                  <span className="oi">{o.i}</span>
                  {/* opt-label wrapper ensures title sits above description */}
                  <span className="opt-label">
                    <span className="ot">{o.t}</span>
                    <span className="od">{o.d}</span>
                  </span>
                  <span className="chk">
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                      <path d="M1 4.5L4.5 8L11 1" stroke="#1a1611" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="diag-nav">
            <button className="diag-back" onClick={goBack} style={idx === 0 ? { visibility: "hidden" } : {}}>← Back</button>
            <span className="diag-hint" style={{ margin: 0, fontSize: 13 }}>Tap to choose</span>
          </div>
        </div>
      )}

      {/* Roadmap + capture form */}
      {phase === "roadmap" && (
        <div className="diag-step roadmap" key="roadmap">
          <div className="rm-eyebrow">Where we&apos;d start</div>
          <h3>{head}</h3>
          <p className="rm-sub">{intro}</p>
          <div className="rm-list">
            {items.map((it, i) => (
              <div key={it.t} className={`rm-item${rmIn[i] ? " in" : ""}`}>
                <span className="rn">0{i + 1}</span>
                <span className="rm-item-text">
                  <span className="rt">{it.t}</span>
                  <span className="rd">{it.d}</span>
                </span>
              </div>
            ))}
          </div>
          <p className="rm-urgency">{URGENCY_LINE[u]}</p>
          <div className="rm-meta">
            <div><div className="k">Likely timeline</div><div className="v"><em>{timelineOf(u)}</em></div></div>
            <div><div className="k">Team shape</div><div className="v">{focusOf(answers.need)}</div></div>
            <div><div className="k">Owned by</div><div className="v">One team</div></div>
          </div>
          <p className="rm-transition">Want the full plan? Drop your details and we&apos;ll send a tailored roadmap — and set up a quick call.</p>
          <div className="diag-form">
            <div className="field">
              <label htmlFor="d-name">Your name</label>
              <input id="d-name" type="text" placeholder="First name is fine" autoComplete="name"
                value={name} onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }} />
              {errors.name && <span className="diag-err">{errors.name}</span>}
            </div>
            <div className="field">
              <label htmlFor="d-email">Email</label>
              <input id="d-email" type="email" placeholder="you@company.com" autoComplete="email"
                value={email} onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }} />
              {errors.email && <span className="diag-err">{errors.email}</span>}
            </div>
            <div className="field">
              <label htmlFor="d-phone">Phone / WhatsApp <span className="opt-tag">optional</span></label>
              <input id="d-phone" type="tel" placeholder="+91 or international" autoComplete="tel"
                value={phone} onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }} />
              {errors.phone && <span className="diag-err">{errors.phone}</span>}
            </div>
            <div className="field">
              <label htmlFor="d-note">Anything else? <span className="opt-tag">optional</span></label>
              <textarea id="d-note" rows={2} placeholder="The more context, the better — but no pressure."
                value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
            <p className="diag-consent">
              We&apos;ll only use these details to get back to you about your project — nothing else, no spam.{" "}
              <a href="/privacy" tabIndex={-1}>Privacy policy.</a>
            </p>
          </div>
          <div className="diag-nav">
            <button className="diag-back" onClick={goBack}>← Back</button>
            <button className="btn btn-accent" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Sending…" : <> Send my roadmap <span className="arw">→</span></>}
            </button>
          </div>
        </div>
      )}

      {/* Success */}
      {phase === "success" && (
        <div className="diag-step" key="success">
          <div className="diag-success">
            <div className="tick">
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                <path d="M2 11L10 19L26 2" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>Got it{name ? `, ${name.split(" ")[0]}` : ""} — we&apos;ll be in touch.</h3>
            <p>
              We&apos;ll review your answers and come back within one working day with how we&apos;d make it happen.
              We don&apos;t stop until we&apos;ve found the right answer for you.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}