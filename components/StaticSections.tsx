import Link from "next/link";

/* ======= S2 · BELIEF ======= */
export function BeliefSection() {
  return (
    <section className="belief surface-light alt section-pad" aria-label="Why we exist">
      <div className="wrap">
        <div className="reveal">
          <p className="tag">Why we exist</p>
          <h2 className="display">
            We don&apos;t take on projects.<br />
            We go all in on <span className="u">outcomes.</span>
          </h2>
        </div>
        <div className="belief-body reveal" data-d="1">
          <p>
            We started Vajra because we believed a client should be able to hand
            their digital problems to one team — completely — without worrying
            whether the designer understands the tech, or the marketing team has
            read the brief.
          </p>
          <p>
            We don&apos;t over-promise. We work with what&apos;s real. We tell you the
            truth, even when it&apos;s inconvenient. And we stay until the problem is
            solved — because that&apos;s what going all in actually means.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ======= S3 · SERVICES ======= */
export function ServicesSection() {
  return (
    <section className="services surface-light section-pad" id="services" aria-label="What we do">
      <div className="wrap wrap-wide">
        <div className="svc-head reveal">
          <div>
            <p className="tag">What we do</p>
            <h2 className="display">What we do</h2>
          </div>
          <p className="svc-desc">
            Three capabilities. One team. The only partner that covers all three — together.
          </p>
        </div>
        <div className="svc-list">
          <Link className="srow reveal" data-d="1" href="/services/grow" data-svc="grow">
            <div className="s-num">01</div>
            <div className="s-main">
              <h3>Grow</h3>
              <div className="s-tags">Social · Paid Ads · SEO · Content</div>
            </div>
            <div className="s-desc">More customers. Real ones. Measured in revenue, not vanity metrics.</div>
            <div className="s-arw">→</div>
          </Link>
          <Link className="srow reveal" data-d="2" href="/services/build" data-svc="build">
            <div className="s-num">02</div>
            <div className="s-main">
              <h3>Build</h3>
              <div className="s-tags">Software · Apps · AI · Cloud</div>
            </div>
            <div className="s-desc">Products and technology that work — built properly, built to scale.</div>
            <div className="s-arw">→</div>
          </Link>
          <Link className="srow reveal" data-d="3" href="/services/brand" data-svc="brand">
            <div className="s-num">03</div>
            <div className="s-main">
              <h3>Brand</h3>
              <div className="s-tags">Identity · Story · Design</div>
            </div>
            <div className="s-desc">A name people remember. A story that makes you impossible to ignore.</div>
            <div className="s-arw">→</div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ======= S5 · HOW WE WORK ======= */
export function HowWeWorkSection() {
  return (
    <section className="how surface-light alt section-pad" id="how" aria-label="How we work">
      <div className="wrap">
        <div className="reveal">
          <p className="tag">How we work</p>
          <h2 className="display">What working with us actually looks like.</h2>
        </div>
        <div className="how-steps">
          {[
            {
              n: "01",
              title: "We understand your reality first",
              body: "Not your brief — your reality. What's actually broken, what actually matters, what a win genuinely looks like for your specific business. This takes longer than most agencies spend on it. That's why the work lands.",
            },
            {
              n: "02",
              title: "We tell you what we think, even when it's inconvenient",
              body: "If something isn't feasible right now, we say so. If the brief needs to change, we'll tell you why. You always know exactly where you are. No mirages, no yes-men.",
            },
            {
              n: "03",
              title: "We build in the open",
              body: "Regular updates, clear explanations, nothing hidden behind jargon. You're kept close enough to make good decisions throughout — not handed a \u201cbig reveal\u201d after months of silence.",
            },
            {
              n: "04",
              title: "We stay",
              body: "After the launch. After the campaign. When something unexpected happens. When the next problem arrives. We're still here. That's what being a true partner means.",
            },
          ].map((s) => (
            <div className="hstep reveal" data-d="1" key={s.n}>
              <div className="hnum">{s.n}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======= S7 · HUMANS ======= */
export function HumansSection() {
  return (
    <section className="humans surface-light alt section-pad" id="humans" aria-label="The people">
      <div className="wrap wrap-wide">
        <div className="humans-grid">
          <div className="reveal">
            <p className="tag">The people behind the work</p>
            <h2 className="display">
              Four people who refused to let the dream stay a dream.
            </h2>
            <p>
              We&apos;re not a corporation. We&apos;re four close friends who spent too long
              talking about building something real — and finally did it. Outside job
              hours, on conviction, with nothing but each other and the belief that a
              client deserves better than the usual runaround.
            </p>
            <div className="allin">
              <div className="big">All in.</div>
              <div className="sub">It&apos;s not a tagline. It&apos;s the only way we work.</div>
            </div>
          </div>
          <figure className="human-card reveal" data-d="1">
            <div className="qmark">&ldquo;</div>
            <p>
              Working with Vajra felt different from the first call. They understood
              our business, not just the brief. And they were still there six months
              later when we needed them.
            </p>
            <figcaption className="who">
              <span className="av">R</span>
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

/* ======= S8b · FINAL CTA ======= */
export function FinalCTASection() {
  return (
    <section className="final-cta surface-light section-pad" aria-label="Get started">
      <div className="wrap">
        <p className="tag" style={{ justifyContent: "center", display: "flex" }}>
          Let&apos;s get started
        </p>
        <h2 className="display reveal">
          Ready for a team that goes <em>all in?</em>
        </h2>
        <div className="cta-row reveal" data-d="1">
          <Link className="btn btn-accent btn-lg" href="#contact">
            See what we&apos;d build for you <span className="arw">→</span>
          </Link>
          <span className="or">OR</span>
          <a className="btn btn-ghost-line btn-lg" href="mailto:hello@vajratechnology.in">
            Just say hi →
          </a>
        </div>
      </div>
    </section>
  );
}
