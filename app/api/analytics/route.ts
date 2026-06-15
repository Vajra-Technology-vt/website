import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const runtime = "nodejs";

/* Protect with a secret key stored in .env.local → ANALYTICS_KEY=... */
export async function GET(req: NextRequest) {
  const key = req.headers.get("x-analytics-key") ?? req.nextUrl.searchParams.get("key");
  if (!process.env.ANALYTICS_KEY || key !== process.env.ANALYTICS_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const q = <T>(sql: string, params: unknown[] = []) =>
    db.prepare(sql).all(...params) as T[];
  const q1 = <T>(sql: string, params: unknown[] = []) =>
    db.prepare(sql).get(...params) as T;

  const summary = {
    total_visits:    (q1<{ c: number }>("SELECT COUNT(*) c FROM visits")).c,
    unique_ips:      (q1<{ c: number }>("SELECT COUNT(DISTINCT ip) c FROM visits")).c,
    unique_sessions: (q1<{ c: number }>("SELECT COUNT(DISTINCT session_id) c FROM visits")).c,
  };

  const top_pages = q(
    "SELECT path, COUNT(*) visits FROM visits GROUP BY path ORDER BY visits DESC LIMIT 20"
  );

  const top_countries = q(
    "SELECT country, COUNT(*) visits FROM visits WHERE country IS NOT NULL GROUP BY country ORDER BY visits DESC LIMIT 15"
  );

  const top_cities = q(
    "SELECT city, country, COUNT(*) visits FROM visits WHERE city IS NOT NULL GROUP BY city ORDER BY visits DESC LIMIT 15"
  );

  const browsers = q(
    "SELECT browser_name, COUNT(*) visits FROM visits WHERE browser_name IS NOT NULL GROUP BY browser_name ORDER BY visits DESC"
  );

  const os_breakdown = q(
    "SELECT os_name, COUNT(*) visits FROM visits WHERE os_name IS NOT NULL GROUP BY os_name ORDER BY visits DESC"
  );

  const devices = q(
    "SELECT device_type, COUNT(*) visits FROM visits WHERE device_type IS NOT NULL GROUP BY device_type ORDER BY visits DESC"
  );

  const visits_by_day = q(
    "SELECT date(timestamp) day, COUNT(*) visits FROM visits GROUP BY day ORDER BY day DESC LIMIT 30"
  );

  const recent = q(
    `SELECT timestamp, ip, country, city, browser_name, os_name, device_type, path, referer, session_id
     FROM visits ORDER BY timestamp DESC LIMIT 100`
  );

  /* ── leads ── */
  const leads_summary = {
    total: (q1<{ c: number }>("SELECT COUNT(*) c FROM leads")).c,
    by_need: q("SELECT need_label, COUNT(*) cnt FROM leads WHERE need_label IS NOT NULL GROUP BY need_label ORDER BY cnt DESC"),
    by_source: q("SELECT source, COUNT(*) cnt FROM leads WHERE source IS NOT NULL GROUP BY source ORDER BY cnt DESC"),
  };

  const recent_leads = db.prepare(
    `SELECT id, timestamp, name, email, phone, note, source,
            stage_label, need_label, urgency_label,
            path_answers, roadmap_head, roadmap_steps, roadmap_timeline
     FROM leads ORDER BY timestamp DESC LIMIT 50`
  ).all();

  const leads = (recent_leads as Record<string, unknown>[]).map((row) => ({
    ...row,
    path_answers:  row.path_answers  ? JSON.parse(row.path_answers  as string) : null,
    roadmap_steps: row.roadmap_steps ? JSON.parse(row.roadmap_steps as string) : null,
  }));

  return NextResponse.json({
    summary,
    top_pages,
    top_countries,
    top_cities,
    browsers,
    os_breakdown,
    devices,
    visits_by_day,
    recent,
    leads_summary,
    leads,
  });
}