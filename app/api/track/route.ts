import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import db from "@/lib/db";

export const runtime = "nodejs";

/* ── helpers ── */
function isPrivate(ip: string) {
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
    ip.startsWith("::ffff:127.")
  );
}

interface GeoRow {
  ip: string;
  country: string | null;
  region: string | null;
  city: string | null;
  timezone: string | null;
  isp: string | null;
  lat: number | null;
  lon: number | null;
}

async function geoLookup(ip: string): Promise<GeoRow | null> {
  const cached = db
    .prepare("SELECT * FROM geo_cache WHERE ip = ?")
    .get(ip) as GeoRow | undefined;
  if (cached) return cached;

  try {
    /* ipapi.co — HTTPS, 30 k req/month free, no API key needed.
       Replaced the previous http://ip-api.com which many Node.js server
       environments block because it uses plain HTTP. */
    const res = await fetch(
      `https://ipapi.co/${ip}/json/`,
      {
        signal: AbortSignal.timeout(4000),
        headers: {
          /* ipapi.co requires a real User-Agent or returns 403 */
          "User-Agent": "VajraTechnology-Analytics/1.0",
        },
      }
    );
    const d = await res.json();

    /* ipapi.co signals errors via { "error": true, "reason": "..." } */
    if (d.error) return null;

    const row: GeoRow = {
      ip,
      country: d.country_name ?? null,
      region: d.region ?? null,
      city: d.city ?? null,
      timezone: d.timezone ?? null,
      isp: d.org ?? null,         // e.g. "AS12345 Jio Platforms Limited"
      lat: d.latitude ?? null,
      lon: d.longitude ?? null,
    };

    db.prepare(
      `INSERT OR REPLACE INTO geo_cache
         (ip, country, region, city, timezone, isp, lat, lon)
       VALUES
         (@ip, @country, @region, @city, @timezone, @isp, @lat, @lon)`
    ).run(row);

    return row;
  } catch {
    return null;
  }
}

const insertVisit = db.prepare(`
  INSERT INTO visits
    (ip, country, region, city, timezone, isp, lat, lon,
     browser_name, browser_ver, os_name, os_ver, device_type,
     user_agent, path, referer, session_id)
  VALUES
    (@ip, @country, @region, @city, @timezone, @isp, @lat, @lon,
     @browser_name, @browser_ver, @os_name, @os_ver, @device_type,
     @user_agent, @path, @referer, @session_id)
`);

/* ── POST /api/track ── */
export async function POST(req: NextRequest) {
  try {
    const {
      path = "/",
      referer = null,
      sessionId = null,
      /* Browser-provided coordinates sent by Analytics.tsx when the user
         has granted geolocation permission. Used as fallback when IP geo
         lookup returns null (private IPs, local dev, service failures). */
      lat: clientLat = null,
      lon: clientLon = null,
    } = await req.json();

    /* IP extraction: check Vercel-specific header first, then standard ones.
       x-vercel-forwarded-for is set by Vercel's edge before x-forwarded-for. */
    const ip =
      req.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "127.0.0.1";

    const ua = req.headers.get("user-agent") ?? "";
    const p = new UAParser(ua);
    const browser = p.getBrowser();
    const os = p.getOS();
    const device = p.getDevice();

    const geo = isPrivate(ip) ? null : await geoLookup(ip);

    insertVisit.run({
      ip,
      country: geo?.country ?? null,
      region: geo?.region ?? null,
      city: geo?.city ?? null,
      timezone: geo?.timezone ?? null,
      isp: geo?.isp ?? null,
      /* Prefer IP-derived coordinates; fall back to what the browser sent */
      lat: geo?.lat ?? clientLat ?? null,
      lon: geo?.lon ?? clientLon ?? null,
      browser_name: browser.name ?? null,
      browser_ver: browser.version ?? null,
      os_name: os.name ?? null,
      os_ver: os.version ?? null,
      device_type: device.type ?? "desktop",
      user_agent: ua,
      path,
      referer,
      session_id: sessionId,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[track]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}