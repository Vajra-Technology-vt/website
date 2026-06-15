import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import {
  BeliefSection,
  ServicesSection,
  HowWeWorkSection,
  HumansSection,
  FinalCTASection,
} from "@/components/StaticSections";
import ProofSection from "@/components/ProofSection";
import CaseStudySection from "@/components/CaseStudySection";
import DiagnosticWidget from "@/components/DiagnosticSection";
import Footer from "@/components/Footer";
import SiteScripts from "@/components/SiteScripts";

export default function HomePage() {
  return (
    <>
      <Header />
      <SiteScripts />

      <main id="top">
        {/* S1 · Hero */}
        <HeroSection />

        {/* S2 · Belief */}
        <BeliefSection />

        {/* S3 · Services */}
        <ServicesSection />

        {/* S4 · Proof */}
        <ProofSection />

        {/* S5 · How we work */}
        <HowWeWorkSection />

        {/* S6 · Case study */}
        <CaseStudySection />

        {/* S7 · Humans */}
        <HumansSection />

        {/* S8a · Diagnostic */}
        <section
          className="diag-section surface-dark section-pad"
          id="contact"
          aria-label="Find your starting point"
        >
          <div className="wrap wrap-wide">
            <div className="diag-head reveal">
              <p className="tag">The 60-second diagnostic</p>
              <h2 className="display">
                Not sure where to start?<br />
                <em>Neither are most of our best clients.</em>
              </h2>
              <p>
                Answer a few quick questions. We&apos;ll show you exactly where we&apos;d
                begin and what it would take. Takes 60 seconds.
              </p>
            </div>
            <div className="reveal" data-d="1">
              <DiagnosticWidget source="homepage" />
            </div>
          </div>
        </section>

        {/* S8b · Final CTA */}
        <FinalCTASection />
      </main>

      <Footer />
    </>
  );
}
