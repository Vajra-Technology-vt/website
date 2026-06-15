"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function HeroSection() {
  const [show, setShow] = useState<"A" | "B">("A");
  const [animDone, setAnimDone] = useState(false);
  const [scrollGone, setScrollGone] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const reduce =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  /* Headline A/B auto-cycle every 4 s */
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => {
      setShow((v) => (v === "A" ? "B" : "A"));
    }, 4000);
    return () => window.clearInterval(t);
  }, [reduce]);

  /* Remove data-anim after entrance completes */
  useEffect(() => {
    if (reduce) { setAnimDone(true); return; }
    const t = window.setTimeout(() => setAnimDone(true), 1400);
    return () => window.clearTimeout(t);
  }, [reduce]);

  /* Scroll indicator fades on first scroll */
  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 40) {
        setScrollGone(true);
        window.removeEventListener("scroll", handler);
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero surface-light"
      aria-label="Intro"
      {...(!animDone ? { "data-anim": "run" } : {})}
    >
      <div className="hero-glow" />
      <div aria-hidden="true" className="hero-watermark">Vajra</div>
      <div className="wrap wrap-wide hero-inner">
        <p className="tag rise" style={{ animationDelay: ".05s" }}>
          Brand · Software · Marketing · AI &amp; Cloud
        </p>

        <div
          className="hero-headline rise"
          data-show={show}
          style={{ animationDelay: ".2s" }}
        >
          <h1 className="hl-a display">
            All in,<span className="br" />
            <span className="accent">on You.</span>
          </h1>
          <h1 className="hl-b display">
            We don&apos;t stop<span className="br" />
            <span className="accent">until you win.</span>
          </h1>
        </div>

        <div className="pills rise" style={{ animationDelay: ".4s" }} aria-label="Capabilities">
          <span className="pill">Brand</span>
          <span className="pill">Software</span>
          <span className="pill">Marketing</span>
          <span className="pill">AI &amp; Cloud</span>
        </div>

        <p className="hero-sub rise" style={{ animationDelay: ".6s" }}>
          One team. Every capability your business needs. And the commitment to see it
          through — because your success is the only outcome we&apos;re building for.
        </p>

        <div className="hero-cta rise" style={{ animationDelay: ".8s" }}>
          <Link className="btn btn-accent btn-lg" href="#contact">
            See what we&apos;d build for you <span className="arw">→</span>
          </Link>
          <Link className="btn btn-ghost-line btn-lg" href="#case">
            See our work ↗
          </Link>
        </div>
      </div>
      <span className={`hero-scroll${scrollGone ? " gone" : ""}`} aria-hidden="true">
        Scroll to explore
      </span>
    </section>
  );
}
