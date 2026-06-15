import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata: Metadata = {
  title: "Growth Marketing Services — Social, Ads & SEO | Vajra Technology",
  description:
    "Vajra Technology runs your social media, paid ads, and SEO — one team, focused on leads and revenue, not vanity metrics. Based in India, working globally.",
};

export default function GrowPage() {
  return (
    <ServicePageLayout
      theme="grow"
      meta={metadata}
      hero={{
        h1: <>More customers. <em>Not just more followers.</em></>,
        sub: "We run your social media, paid ads, and SEO as one connected engine — because growth only happens when they work together. And we measure everything in customers, not clicks.",
      }}
      means={{
        lead: <>You&apos;re good at what you do. <em>Getting found is a different skill.</em></>,
        body: (
          <>
            <p>
              Most businesses we talk to have the same frustration: they know their product is good,
              but their pipeline is unpredictable. Some months are great. Most months feel like a
              lottery. They&apos;ve tried boosting posts, dabbling in ads, maybe hired someone for
              social — but it doesn&apos;t compound. Nothing connects.
            </p>
            <p>
              That&apos;s usually because growth is being treated as a collection of disconnected
              tasks instead of a single system. We build the system.
            </p>
          </>
        ),
      }}
      offerTitle="The whole growth engine, run by one team"
      offerCards={[
        { icon: "◎", title: "Social media management", body: "Strategy, content, scheduling, community management — across the platforms that actually matter for your audience. We don't just post; we build a presence that makes your brand impossible to scroll past.", meta: "Instagram · LinkedIn · Facebook · X · YouTube Shorts" },
        { icon: "⇲", title: "Paid advertising", body: "Campaigns designed to bring in qualified leads, not just traffic. We handle the targeting, the creative, the copy, and the constant optimisation — so your rupee (or dollar) works harder every week.", meta: "Meta Ads · Google Ads · LinkedIn Ads" },
        { icon: "◈", title: "Search engine optimisation (SEO)", body: "Long-term visibility that compounds. We handle technical SEO, content strategy, and on-page optimisation — so when your customers search for what you do, you show up." },
        { icon: "▦", title: "Performance analytics & reporting", body: "Every campaign, every channel, every week — measured and reported in plain language. Not a wall of numbers, but a clear read on what's working and what to do next." },
        { icon: "✎", title: "Content strategy & creation", body: "The words, images, and ideas that make people stop scrolling and start paying attention. Blog posts, ad creative, social content — produced in your brand's voice, on your brief." },
      ]}
      howTitle="How we grow you"
      howSteps={[
        { title: "We understand your customer first", body: "Before we touch a channel, we get into your customer's head. Who are they, where do they spend time online, what makes them choose you over anyone else. Growth without this is just spending money." },
        { title: "We build the system, not just the campaigns", body: "Social, ads, and SEO are set up to feed each other. Content created for SEO gets repurposed across social. Paid campaigns test messaging that informs organic. One system, not three vendors with no overlap." },
        { title: "We run and optimise every week", body: "We don't set-and-forget. Every week there's something to improve — a bid, a creative, a keyword. We're in the data so you don't have to be." },
        { title: "You see results in plain English", body: "Regular reports that answer the question you actually care about: is this bringing in more customers? If the answer isn't yes, we tell you why and what we're doing about it." },
      ]}
      proofCase={
        <>
          <div className="pk">Case study · PLACEHOLDER</div>
          <p><strong>[Client name]</strong> came to us with [X problem]. In [Y months], we 3×&apos;d their qualified enquiries and cut cost-per-lead by 40%.</p>
          <a className="readlink" href="/#case">Read the full case study <span className="arw">→</span></a>
        </>
      }
      proofQuote={{ text: "Working with Vajra on our marketing was the first time everything actually connected. They understood our business, not just our metrics.", initials: "A", nm: "[Full Name]", ti: "[Title], [Company] · PLACEHOLDER" }}
      whyTitle={<>We don&apos;t stop until <em>the numbers move.</em></>}
      whyBody={
        <>
          <p>Most marketing agencies optimise for their own metrics — follower counts, reach, impressions — because those are easy to report and hard to dispute. We don&apos;t. We measure success the way you measure success: leads, revenue, growth. And we don&apos;t stop until the numbers actually move.</p>
          <p>The other difference: we go all in. The same team running your campaigns also built your product and designed your brand. When your landing page needs fixing to convert better, we fix it. When your creative needs rethinking, we rethink it. No back-and-forth between vendors. No "that's not our scope." Just the work, done properly, until it works.</p>
        </>
      }
      crosslinks={[
        { href: "/services/build", label: "Also building a product? See Build" },
        { href: "/services/brand", label: "Need your brand sorted first? See Brand" },
      ]}
      faqTitle="Before you ask"
      faqs={[
        { q: "Do you just manage social, or is there actual strategy involved?", a: "There's always a strategy first. Posting without a strategy is just noise. We start by understanding what you're trying to achieve, who you're talking to, and what will actually move them — then we build the content and campaigns around that." },
        { q: "How long before we see results?", a: "Paid ads can show results in weeks. SEO takes longer — typically three to six months before it compounds meaningfully. Social builds over time. We're honest about timelines and won't promise overnight miracles, but we'll show you leading indicators early so you're never flying blind." },
        { q: "We've tried agencies before and it didn't work. Why would this be different?", a: "Fair question. The most common reason agencies fail is that they optimise for their own metrics (follower count, impressions) rather than yours (leads, revenue). We measure success by what you measure success by. And because we're a small senior team — not an account manager reading from a report — you're always talking to the people actually doing the work." },
        { q: "Do you work with businesses outside India?", a: "Yes. We work with clients across India and internationally. Growth marketing strategy and execution doesn't require us to be in the same city — or the same country." },
      ]}
      ctaTitle={<>Ready to stop guessing <em>and start growing?</em></>}
      ctaSub="Tell us about your business. We'll tell you exactly where we'd start."
      diagSource="service-grow"
    />
  );
}
