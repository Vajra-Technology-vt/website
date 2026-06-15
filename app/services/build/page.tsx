import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata: Metadata = {
  title: "Software Development & AI Services — Apps, Web & Cloud | Vajra Technology",
  description:
    "Vajra Technology designs and builds software, mobile apps, AI products and cloud systems — a single team from spec to launch. Based in India, working globally.",
};

export default function BuildPage() {
  return (
    <ServicePageLayout
      theme="build"
      meta={metadata}
      hero={{
        h1: <>Products that work. <em>Built to last.</em></>,
        sub: "We design and build software, mobile apps, AI products, and cloud infrastructure — one team from the first idea to the live product, so nothing gets lost between disciplines.",
      }}
      means={{
        lead: <>You have the vision. <em>Shipping it properly is a different problem.</em></>,
        body: (
          <>
            <p>
              The most common thing we hear: the brief was clear, the agency seemed capable, and
              somehow the product that launched looked nothing like what was discussed. Or it
              launched, then nobody maintained it. Or it worked for six months and then couldn't
              scale.
            </p>
            <p>
              We build the right thing, the right way — design and engineering in the same room,
              from the start. And we stay after launch, because that&apos;s when the real work begins.
            </p>
          </>
        ),
      }}
      offerTitle="From idea to live product — everything it takes"
      offerCards={[
        { icon: "▢", title: "Web applications", body: "Full-stack web products designed for real users — fast, accessible, and built to grow. From marketing sites that convert to complex SaaS platforms that scale.", meta: "Next.js · React · Node.js · PostgreSQL" },
        { icon: "▤", title: "Mobile apps", body: "iOS and Android apps that feel native and perform brilliantly. We handle design, development, and submission — one team, no agency handoff.", meta: "React Native · Swift · Kotlin" },
        { icon: "▰", title: "Custom software & internal tools", body: "When off-the-shelf doesn't cut it. We architect and build the system around the real problem — designed for how your team actually works, not a generic workflow." },
        { icon: "✶", title: "AI & data products", body: "We build AI where it solves a real, measurable problem — not a feature to show in a demo. From LLM integrations to custom models, built into products that work.", meta: "OpenAI · Gemini · Custom fine-tuning · Pipelines" },
        { icon: "◎", title: "Cloud infrastructure & DevOps", body: "Deployments that stay up, scale when they need to, and don't cost a fortune. AWS, GCP, Vercel, Supabase — we set it up, monitor it, and own it." },
      ]}
      howTitle="How we build"
      howSteps={[
        { title: "We shape the spec first", body: "Even if you have a brief, we spend time turning it into a buildable spec — with UX wireframes, a clear architecture, and scope everyone agrees on. This is where most projects save the most time and money." },
        { title: "We design with the end-user in mind", body: "UI that's not just pretty but tested. We run prototypes past real users before writing production code, so we're building what people actually need." },
        { title: "We build in short sprints you can steer", body: "Regular demos, real code deployed to a staging environment, decisions made together. You're never waiting months for a \u201cbig reveal\u201d that surprises you." },
        { title: "We launch and stay", body: "QA, deployment, monitoring — then ongoing support after launch. When something goes wrong at 2am, we're the ones who get the call." },
      ]}
      proofCase={
        <>
          <div className="pk">Case study · PLACEHOLDER</div>
          <p><strong>[Client name]</strong> needed [X built]. We shipped in [Y weeks] — on time, on budget, and still the team they call for everything new.</p>
          <a className="readlink" href="/#case">Read the full case study <span className="arw">→</span></a>
        </>
      }
      proofQuote={{ text: "They explained every decision, kept us in the loop, and shipped exactly what we needed. Six months later we're still using the same team for new features.", initials: "S", nm: "[Full Name]", ti: "[Title], [Company] · PLACEHOLDER" }}
      whyTitle={<>We don&apos;t hand off. <em>We stay.</em></>}
      whyBody={
        <>
          <p>Most agencies disappear after launch. The client is left with a product they don&apos;t fully understand, a codebase nobody maintains, and a support email that goes unanswered. We built Vajra specifically to not be that.</p>
          <p>We design, build, and maintain — the same people, the whole way. And because the same team also handles your marketing and brand, your product, your campaigns, and your identity actually work together. No gaps. No finger-pointing. One team, all in.</p>
        </>
      }
      crosslinks={[
        { href: "/services/grow", label: "Need customers for what you're building? See Grow" },
        { href: "/services/brand", label: "Need the brand to match the product? See Brand" },
      ]}
      faqTitle="Before you ask"
      faqs={[
        { q: "Do you work with existing codebases or only greenfield projects?", a: "Both. We take on legacy codebases, do audits, refactors, and extensions. We'll tell you honestly if something is better to rebuild vs patch — and explain why before we touch anything." },
        { q: "How do you handle projects where the scope isn't fully defined?", a: "That's actually our speciality. We start with a discovery phase — typically one to two weeks — that produces a spec, architecture, and estimate you can hold us to. Uncertainty at the start is normal; delivering to a moving target is what we avoid." },
        { q: "Can we see the code? Will we own it?", a: "Yes and yes. You always own 100% of the code and IP. We use git from day one and can give you access at any time. No lock-in." },
        { q: "Do you build for India-specific constraints like low bandwidth or vernacular languages?", a: "Yes. We build for the real India — optimised for slower connections, tested on mid-range Android, and we have experience with vernacular UI when needed." },
      ]}
      ctaTitle={<>Ready to build something <em>that actually works?</em></>}
      ctaSub="Tell us what you're building. We'll tell you exactly how we'd approach it."
      diagSource="service-build"
    />
  );
}
