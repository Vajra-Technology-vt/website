import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

/* ── singleton across HMR reloads in dev ── */
const g = global as typeof global & { _vajraDB?: ReturnType<typeof Database> };

function buildDB() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const db = new Database(path.join(dir, "analytics.db"));
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS visits (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp     TEXT    NOT NULL DEFAULT (datetime('now')),
      ip            TEXT,
      country       TEXT,
      region        TEXT,
      city          TEXT,
      timezone      TEXT,
      isp           TEXT,
      lat           REAL,
      lon           REAL,
      browser_name  TEXT,
      browser_ver   TEXT,
      os_name       TEXT,
      os_ver        TEXT,
      device_type   TEXT,
      user_agent    TEXT,
      path          TEXT,
      referer       TEXT,
      session_id    TEXT
    );

    /* ── diagnostic lead submissions ── */
    CREATE TABLE IF NOT EXISTS leads (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp        TEXT    NOT NULL DEFAULT (datetime('now')),
      name             TEXT    NOT NULL,
      email            TEXT    NOT NULL,
      phone            TEXT,
      note             TEXT,
      source           TEXT,            -- 'homepage' | 'service-grow' | etc.
      -- Raw answer keys (e.g. 'stage_growth', 'need_build')
      stage            TEXT,
      need             TEXT,
      urgency          TEXT,
      -- Human-readable labels for the above
      stage_label      TEXT,
      need_label       TEXT,
      urgency_label    TEXT,
      -- All path-specific answers as a JSON object {key: label}
      path_answers     TEXT,
      -- The roadmap that was presented to the user
      roadmap_head     TEXT,
      roadmap_steps    TEXT,            -- JSON array [{t,d},…]
      roadmap_timeline TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_l_ts    ON leads(timestamp);
    CREATE INDEX IF NOT EXISTS idx_l_email ON leads(email);
    CREATE INDEX IF NOT EXISTS idx_l_need  ON leads(need);

    /* geo results cached by IP so ip-api.com is called at most once per IP */
    CREATE TABLE IF NOT EXISTS geo_cache (
      ip         TEXT PRIMARY KEY,
      country    TEXT,
      region     TEXT,
      city       TEXT,
      timezone   TEXT,
      isp        TEXT,
      lat        REAL,
      lon        REAL,
      cached_at  TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_v_ts   ON visits(timestamp);
    CREATE INDEX IF NOT EXISTS idx_v_ip   ON visits(ip);
    CREATE INDEX IF NOT EXISTS idx_v_path ON visits(path);
    CREATE INDEX IF NOT EXISTS idx_v_sid  ON visits(session_id);
  `);

  return db;
}

const db = g._vajraDB ?? buildDB();
if (process.env.NODE_ENV !== "production") g._vajraDB = db;

export default db;