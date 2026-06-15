"use client";
import { useEffect, useRef } from "react";

interface MetricProps {
  to: number;
  dec: number;
  suffix: string;
  label: string;
}

function Metric({ to, dec, suffix, label }: MetricProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const observed = useRef(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !observed.current) {
            observed.current = true;
            obs.unobserve(el);
            if (reduce) { el.textContent = to.toFixed(dec); return; }
            const dur = 1400;
            let start: number | null = null;
            const frame = (ts: number) => {
              if (start === null) start = ts;
              const p = Math.min((ts - start) / dur, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = (to * eased).toFixed(dec);
              if (p < 1) requestAnimationFrame(frame);
              else el.textContent = to.toFixed(dec);
            };
            requestAnimationFrame(frame);
          }
        });
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, dec]);

  return (
    <div className="metric reveal" data-d="1">
      <div className="big">
        <span ref={spanRef}>{(0).toFixed(dec)}</span>
        {suffix}
      </div>
      <div className="mlabel">
        {label}
        <span className="ph-tag">PLACEHOLDER</span>
      </div>
    </div>
  );
}

export default function ProofSection() {
  return (
    <section className="proof surface-dark section-pad" id="proof" aria-label="Proof">
      <div className="wrap wrap-wide">
        <div className="proof-top reveal">
          <p className="tag">Proof</p>
          <h2
            className="display"
            style={{ fontSize: "clamp(30px,4.4vw,52px)", margin: "14px 0 0" }}
          >
            Don&apos;t take our word for it.
          </h2>
        </div>

        <div className="metrics">
          <Metric to={3.4} dec={1} suffix="×" label="Average lead growth in the first 90 days" />
          <Metric to={6} dec={0} suffix=" wks" label="Average time from idea to live product" />
          <Metric to={20} dec={0} suffix="+" label="Businesses we've gone all in on" />
        </div>

        <div className="quotes">
          <figure className="quote reveal" data-d="1">
            <p>
              &ldquo;They didn&apos;t just deliver the project. They were available every
              step of the way — explained everything, solved problems we didn&apos;t
              even know we had, and were still there after launch when we needed
              them.&rdquo;
            </p>
            <figcaption className="who">
              <span className="av">A</span>
              <span>
                <span className="nm">[Full Name]</span>
                <span className="ti">[Title], [Company] · PLACEHOLDER</span>
              </span>
            </figcaption>
          </figure>
          <figure className="quote reveal" data-d="2">
            <p>
              &ldquo;One team for our brand, our app, and our marketing. No
              finger-pointing, no delays. It just got done.&rdquo;
            </p>
            <figcaption className="who">
              <span className="av">M</span>
              <span>
                <span className="nm">[Full Name]</span>
                <span className="ti">[Title], [Company] · PLACEHOLDER</span>
              </span>
            </figcaption>
          </figure>
        </div>

      </div>
    </section>
  );
}
