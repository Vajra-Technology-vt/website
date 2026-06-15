"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    /* Stable session ID for this browser tab session */
    let sid = sessionStorage.getItem("_vsid");
    if (!sid) {
      sid = Date.now().toString(36) + Math.random().toString(36).slice(2);
      sessionStorage.setItem("_vsid", sid);
    }

    const baseBody = {
      path: pathname,
      referer: document.referrer || null,
      sessionId: sid,
    };

    const sendTrack = (coords?: { lat: number; lon: number }) => {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...baseBody, ...coords }),
      }).catch(() => {});
    };

    if (!("geolocation" in navigator)) {
      /* Geolocation not supported — rely on IP geo only */
      sendTrack();
      return;
    }

    /* Ask for location directly. If the user has already granted permission
       the browser uses the cached result silently (no prompt). If they haven't
       decided yet the browser shows its one-time native permission prompt.
       If they previously denied it the error callback fires immediately and we
       fall through to IP-only tracking. */
    let done = false;

    /* Safety net: send without coords after 5 s if geo hangs */
    const fallback = setTimeout(() => {
      if (!done) { done = true; sendTrack(); }
    }, 5000);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (done) return;
        done = true;
        clearTimeout(fallback);
        sendTrack({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => {
        /* Permission denied or position unavailable — IP geo handles it */
        if (done) return;
        done = true;
        clearTimeout(fallback);
        sendTrack();
      },
      { timeout: 5000, maximumAge: 600_000, enableHighAccuracy: false }
    );
  }, [pathname]);

  return null;
}