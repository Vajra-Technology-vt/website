import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata: Metadata = {
  title: "Brand Identity & Strategy — Story, Design & Positioning | Vajra Technology",
  description:
    "Vajra Technology builds brands people remember — identity, story, messaging and design that makes you impossible to ignore. Based in India, working globally.",
};

export default function BrandPage() {
  return (
    <ServicePageLayout
      theme="brand"
      meta={metadata}
      hero={{
        h1: <>A brand people remember. <em>A story they can't ignore.</em></>,
        sub: "We build the identity, voice, and visual language that makes your business impossible to scroll past — from the name and positioning to the look that works everywhere.",
      }}
      means={{
        lead: <>Your product is good. <em>The world doesn&apos;t know it yet.</em></>,
        body: (
          <>
            <p>
              Most businesses we meet have something genuinely worth talking about. The frustrating
              part is that it doesn&apos;t come across — the brand looks generic, the messaging
              sounds like everyone else in the category, and the people who'd love it most never
              quite get what makes it different.
            </p>
            <p>
              Brand strategy isn&apos;t a logo. It&apos;s the clarity you need before everything else
              can work — the story, the positioning, the reason someone chooses you. We find that,
              then make it visible.
            </p>
          </>
        ),
      }}
      offerTitle="Everything your brand needs to land"
      offerCards={[
        { icon: "◎", title: "Brand strategy & positioning", body: "Who you are, who you're for, why you win. We work through your positioning until we find the true story underneath the business — the one that makes the rest easy." },
        { icon: "❝", title: "Voice & messaging", body: "The words that make people pay attention. Taglines, copy frameworks, tone of voice guidelines — the verbal identity that runs through everything you publish." },
        { icon: "◈", title: "Visual identity", body: "Logo, colour, typography, layout system — a visual language that works from a phone screen to a billboard and doesn't date in three years." },
        { icon: "▦", title: "Brand guidelines", body: "A clear, usable document that means your brand stays consistent — whether it's being used by your team, a printer in Surat, or a freelancer in Berlin." },
        { icon: "✶", title: "Brand rollout", body: "Website, social profiles, decks, print — we deploy the new brand across every touchpoint so nothing is left looking like the old version.", soon: false },
      ]}
      howTitle="How we build your brand"
      howSteps={[
        { title: "We find the true story first", body: "Before any design, we do the strategy work — competitive positioning, audience definition, the thing that makes you genuinely different. Design without this is decoration." },
        { title: "We build the verbal identity", body: "The brand voice and messaging framework comes before the logo. If you can't say clearly what you are and why it matters, the visual layer can't do its job." },
        { title: "We design to a brief, not a mood", body: "Every visual decision comes from the strategy. We present our thinking behind every choice, so the outcome isn't subjective — it's the right answer for your positioning." },
        { title: "We hand it over properly", body: "Not just a PDF. A working system: guidelines, templates, files in the formats you actually need, and a walkthrough of how to use it consistently." },
      ]}
      proofCase={
        <>
          <div className="pk">Case study · PLACEHOLDER</div>
          <p><strong>[Client name]</strong> had been in business for [X years] with a brand that didn&apos;t reflect them. After the rebrand, [Y outcome] within [Z months].</p>
          <a className="readlink" href="/#case">Read the full case study <span className="arw">→</span></a>
        </>
      }
      proofQuote={{ text: "The process surfaced things about our business we'd never said out loud. What they produced felt like us — the real us — for the first time.", initials: "P", nm: "[Full Name]", ti: "[Title], [Company] · PLACEHOLDER" }}
      whyTitle={<>Design that works. <em>Strategy that lasts.</em></>}
      whyBody={
        <>
          <p>A lot of brand agencies produce beautiful things that don&apos;t actually work — because the visual layer was built before the strategic layer was solid. We always go strategy first. The look emerges from the thinking; it&apos;s not the starting point.</p>
          <p>And because we also handle software, marketing and growth, we build brands that function in the real world — designed to work on your website, in your ads, in your product UI, across every channel you actually use. One team. No handoffs. All in.</p>
        </>
      }
      crosslinks={[
        { href: "/services/grow", label: "Ready to put the brand to work? See Grow" },
        { href: "/services/build", label: "Building a product to match the brand? See Build" },
      ]}
      faqTitle="Before you ask"
      faqs={[
        { q: "We already have a logo. Do we need a full rebrand?", a: "Not necessarily. Sometimes the logo is fine and what's missing is strategy, messaging, or a consistent visual system around it. We'll tell you honestly what's working and what isn't — and only recommend a rebrand if it's genuinely the right call." },
        { q: "How long does a brand project take?", a: "A full brand — strategy, identity, guidelines — typically takes six to ten weeks. A focused refresh or messaging project can move faster. We'll give you an honest timeline at the start, not the optimistic one." },
        { q: "We're a startup and haven't launched yet. Is it too early for brand work?", a: "It's actually the best time. Getting the positioning and identity right before you launch means everything — your website, your pitch deck, your ads — starts from the right foundation. Much cheaper than rebranding in 18 months." },
        { q: "Can you handle the brand rollout — website, social, etc. — as well?", a: "Yes. That's exactly what we do. The team that built the brand can also build the website and run the social accounts, which means the brand is consistent everywhere without you having to manage multiple vendors." },
      ]}
      ctaTitle={<>Ready for a brand that <em>actually works?</em></>}
      ctaSub="Tell us where you are. We'll tell you where to start."
      diagSource="service-brand"
    />
  );
}
