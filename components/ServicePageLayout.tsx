import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DiagnosticWidget from "@/components/DiagnosticSection";
import SiteScripts from "@/components/SiteScripts";

export interface ServicePageProps {
  theme: "grow" | "build" | "brand";
  meta: Metadata;
  hero: { h1: React.ReactNode; sub: string };
  means: { lead: React.ReactNode; body: React.ReactNode };
  offerTitle: React.ReactNode;
  offerCards: { icon: string; title: string; body: string; meta?: string; soon?: boolean }[];
  howTitle: string;
  howSteps: { title: string; body: string }[];
  proofCase: React.ReactNode;
  proofQuote: { text: string; initials: string; nm: string; ti: string };
  whyTitle: React.ReactNode;
  whyBody: React.ReactNode;
  crosslinks: { href: string; label: string }[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  ctaTitle: React.ReactNode;
  ctaSub: string;
  diagSource: string;
}

export default function ServicePageLayout({
  theme,
  hero,
  means,
  offerTitle,
  offerCards,
  howTitle,
  howSteps,
  proofCase,
  proofQuote,
  whyTitle,
  whyBody,
  crosslinks,
  faqTitle,
  faqs,
  ctaTitle,
  ctaSub,
  diagSource,
}: ServicePageProps) {
  return (
    <html lang="en" data-theme={theme}>
      <body>
        <Header currentService={theme} />
        <SiteScripts />

        <main>
          {/* S1 · Hero */}
          <section className="spage-hero surface-light" aria-label={theme}>
            <div className="hero-glow" />
            <div className="wrap wrap-wide spage-hero-inner">
              <div className="breadcrumb">
                <a href="/">Home</a>
                <span>/</span> Services <span>/</span> {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </div>
              <h1>{hero.h1}</h1>
              <p className="hsub">{hero.sub}</p>
              <div className="hcta">
                <a className="btn btn-accent btn-lg" href="#contact">
                  See what we&apos;d build for you <span className="arw">→</span>
                </a>
                <a className="btn btn-ghost-line btn-lg" href="/#case">
                  See our work ↗
                </a>
              </div>
            </div>
          </section>

          {/* S2 · What this means for you */}
          <section className="means surface-light alt section-pad" aria-label="What this means for you">
            <div className="wrap wrap-wide">
              <p className="tag reveal">What this means for you</p>
              <h2 className="means-lead reveal" data-d="1">{means.lead}</h2>
              <div className="means-body reveal" data-d="2">{means.body}</div>
            </div>
          </section>

          {/* S3 · What we do */}
          <section className="offer surface-light section-pad" aria-label="What we do">
            <div className="wrap wrap-wide">
              <p className="tag reveal">What we do</p>
              <h2 className="reveal" data-d="1">{offerTitle}</h2>
              <div className="offer-grid">
                {offerCards.map((c) => (
                  <div className={`offer-card reveal${c.soon ? " soon" : ""}`} key={c.title}>
                    {c.soon && <div className="soon-badge">Coming soon</div>}
                    <div className="oc-ic">{c.icon}</div>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                    {c.meta && <div className="oc-meta">{c.meta}</div>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* S4 · How it works */}
          <section className="how surface-light alt section-pad" aria-label="How it works">
            <div className="wrap wrap-wide">
              <p className="tag reveal">How it works</p>
              <h2 className="reveal" data-d="1">{howTitle}</h2>
              <div className="how-steps">
                {howSteps.map((s, i) => (
                  <div className="hstep reveal" key={i}>
                    <div className="hnum">0{i + 1}</div>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* S5 · Proof */}
          <section className="sproof surface-light section-pad" aria-label="Proof">
            <div className="wrap wrap-wide">
              <p className="tag reveal">Proof</p>
              <h2 className="reveal" data-d="1">It works. Here&apos;s evidence.</h2>
              <div className="sproof-grid">
                <div className="sproof-case reveal" data-d="1">
                  {proofCase}
                </div>
                <figure className="sproof-quote reveal" data-d="2">
                  <div className="qm">&ldquo;</div>
                  <p>{proofQuote.text}</p>
                  <figcaption className="who">
                    <span className="av">{proofQuote.initials}</span>
                    <span>
                      <span className="nm">{proofQuote.nm}</span>
                      <span className="ti">{proofQuote.ti}</span>
                    </span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* S6 · Why Vajra */}
          <section className="why-band surface-dark section-pad" aria-label="Why Vajra">
            <div className="wrap wrap-wide">
              <p className="tag reveal">Why Vajra</p>
              <h2 className="reveal" data-d="1">{whyTitle}</h2>
              <div className="why-body reveal" data-d="2">{whyBody}</div>
              <div className="crosslinks reveal" data-d="3">
                {crosslinks.map((x) => (
                  <a className="xlink" href={x.href} key={x.href}>
                    {x.label} <span className="arw">→</span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* S7 · FAQ */}
          <section className="faq surface-light alt section-pad" aria-label="FAQ">
            <div className="wrap wrap-wide">
              <p className="tag reveal">Questions, answered honestly</p>
              <h2 className="reveal" data-d="1">{faqTitle}</h2>
              <div className="faq-list">
                {faqs.map((f) => (
                  <div className="faq-item" key={f.q}>
                    <button className="faq-q" aria-expanded="false">
                      {f.q}<span className="ficon" aria-hidden="true" />
                    </button>
                    <div className="faq-a">
                      <div className="faq-a-inner"><p>{f.a}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* S8 · CTA + Diagnostic */}
          <section className="scta surface-dark section-pad" id="contact" aria-label="Get started">
            <div className="wrap wrap-wide">
              <div className="scta-head reveal">
                <p className="tag" style={{ justifyContent: "center", display: "flex" }}>
                  The 60-second diagnostic
                </p>
                <h2>{ctaTitle}</h2>
                <p>{ctaSub}</p>
                <p className="scta-alt">
                  Rather just talk?{" "}
                  <a href="mailto:hello@vajratechnology.in">hello@vajratechnology.in</a>
                  {" · "}
                  <a href="https://wa.me/+918200324879">WhatsApp</a>
                </p>
              </div>
              <div className="reveal" data-d="1">
                <DiagnosticWidget source={diagSource} />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </body>
    </html>
  );
}
