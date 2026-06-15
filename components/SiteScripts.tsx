"use client";
import { useEffect } from "react";

/**
 * SiteScripts — runs global JS effects that work across all server-rendered
 * sections: IntersectionObserver-based reveal animations and FAQ accordion.
 * Mounted once in the layout or page root.
 */
export default function SiteScripts() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        el.classList.add("in");
      });
      return;
    }

    /* Scroll reveal */
    const revObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => revObs.observe(el));

    /* FAQ accordion */
    const faqHandler = (e: MouseEvent) => {
      const q = (e.target as HTMLElement).closest(".faq-q");
      if (!q) return;
      const item = q.closest(".faq-item");
      if (!item) return;
      const isOpen = item.classList.contains("open");
      // close siblings
      q.closest(".faq-list")?.querySelectorAll(".faq-item.open").forEach((i) => {
        if (i !== item) {
          i.classList.remove("open");
          i.querySelector(".faq-q")?.setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("open", !isOpen);
      q.setAttribute("aria-expanded", String(!isOpen));
    };
    document.addEventListener("click", faqHandler);

    return () => {
      revObs.disconnect();
      document.removeEventListener("click", faqHandler);
    };
  }, []);

  return null;
}
