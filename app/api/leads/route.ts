import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const runtime = "nodejs";

/* ── prepared statement ── */
const insertLead = db.prepare(`
  INSERT INTO leads
    (name, email, phone, note, source,
     stage, need, urgency,
     stage_label, need_label, urgency_label,
     path_answers, roadmap_head, roadmap_steps, roadmap_timeline)
  VALUES
    (@name, @email, @phone, @note, @source,
     @stage, @need, @urgency,
     @stage_label, @need_label, @urgency_label,
     @path_answers, @roadmap_head, @roadmap_steps, @roadmap_timeline)
`);

/* ── POST /api/leads ── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone = null,
      note = null,
      source = "homepage",
      diagnostic_answers: da = {},
    } = body;

    /* basic validation — name and email are required */
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ ok: false, error: "name required" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ ok: false, error: "valid email required" }, { status: 400 });
    }

    const result = insertLead.run({
      name:             name.trim(),
      email:            email.trim().toLowerCase(),
      phone:            phone?.trim() || null,
      note:             note?.trim() || null,
      source,
      stage:            da.stage            ?? null,
      need:             da.need             ?? null,
      urgency:          da.urgency          ?? null,
      stage_label:      da.stage_label      ?? null,
      need_label:       da.need_label       ?? null,
      urgency_label:    da.urgency_label    ?? null,
      /* store structured data as JSON strings */
      path_answers:     da.path_answers     ? JSON.stringify(da.path_answers)  : null,
      roadmap_head:     da.roadmap_head     ?? null,
      roadmap_steps:    da.roadmap_steps    ? JSON.stringify(da.roadmap_steps) : null,
      roadmap_timeline: da.roadmap_timeline ?? null,
    });

    return NextResponse.json({ ok: true, id: result.lastInsertRowid });
  } catch (err) {
    console.error("[leads]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

/* ── GET /api/leads  (protected — same key as analytics) ── */
export async function GET(req: NextRequest) {
  const key = req.headers.get("x-analytics-key") ?? req.nextUrl.searchParams.get("key");
  if (!process.env.ANALYTICS_KEY || key !== process.env.ANALYTICS_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = db.prepare(
    `SELECT id, timestamp, name, email, phone, note, source,
            stage_label, need_label, urgency_label,
            path_answers, roadmap_head, roadmap_steps, roadmap_timeline
     FROM leads
     ORDER BY timestamp DESC`
  ).all();

  /* parse JSON columns back to objects */
  const parsed = (leads as Record<string, unknown>[]).map((row) => ({
    ...row,
    path_answers:  row.path_answers  ? JSON.parse(row.path_answers  as string) : null,
    roadmap_steps: row.roadmap_steps ? JSON.parse(row.roadmap_steps as string) : null,
  }));

  return NextResponse.json({ leads: parsed, total: parsed.length });
}