"use client";
import { useEffect, useRef, useState } from "react";

const beats = [
  {
    key: "The problem",
    h: "[What was broken. The stakes.]",
    p: "[Set up why it mattered — the cost of staying where they were. Make the reader feel the pressure the client was under before we arrived.]",
    panel: { title: "Problem", sub: "Before — the starting point" },
  },
  {
    key: "The insight",
    h: "[The thing we saw that others missed.]",
    p: "[This is where the thinking shows — the non-obvious read on the real problem that reframed the whole engagement.]",
    panel: { title: "Insight", sub: "The reframe" },
  },
  {
    key: "What we built",
    h: "[Concrete — brand, product, campaign, system.]",
    p: "[Exactly what was made, and how the one-team model meant it shipped together and fast — no gaps between brand, build and growth.]",
    panel: { title: "What we built", sub: "Brand · product · growth" },
  },
  {
    key: "The result",
    h: null,
    bignum: "[X]×",
    p: "[Hard outcomes. The before and after, in numbers — and what it actually meant for their business.]",
    panel: { title: "The result", sub: "After — the outcome" },
  },
];

export default function CaseStudySection() {
  const [active, setActive] = useState(0);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = beatRefs.current.indexOf(e.target as HTMLDivElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-20% 0px -30% 0px" }
    );
    beatRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="case surface-light section-pad" id="case" aria-label="Case study">
      <div className="wrap wrap-wide">
        <div className="case-head reveal">
          <p className="tag">The deep dive</p>
          <h2 className="display">
            How we took <em>[Client]</em> from [problem] to [result].
          </h2>
          <span className="case-note">
            ◆ Awaiting the real strongest-win story — structure &amp; motion are
            final, copy is placeholder.
          </span>
        </div>

        <div className="scrolly">
          <div className="scrolly-text">
            {beats.map((b, i) => (
              <div
                key={b.key}
                className={`beat${active === i ? " active" : ""}`}
                ref={(el) => { beatRefs.current[i] = el; }}
              >
                <div className="bk">{b.key}</div>
                {b.bignum ? (
                  <div className="bignum">{b.bignum}</div>
                ) : (
                  <h3>{b.h}</h3>
                )}
                <p>{b.p}</p>
              </div>
            ))}
          </div>

          <div className="scrolly-sticky">
            <div className="stage">
              {beats.map((b, i) => (
                <div key={b.key} className={`panel${active === i ? " show" : ""}`}>
                  <div className="label">
                    {b.panel.title}
                    <small>{b.panel.sub}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="case-cta reveal">
          <a className="btn btn-accent btn-lg" href="#contact">
            Want results like these? <span className="arw">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
