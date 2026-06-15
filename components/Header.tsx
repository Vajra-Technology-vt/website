"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface HeaderProps {
  currentService?: "grow" | "build" | "brand";
}

export default function Header({ currentService }: HeaderProps) {
  const [shrunk, setShrunk] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const ddRef = useRef<HTMLLIElement>(null);

  /* sticky shrink */
  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* toggle body class for mobile menu */
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  /* close dropdown when clicking outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) {
        setDdOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`site-header${shrunk ? " shrink" : ""}`}>
        <div className="wrap wrap-wide header-inner">
          <Link className="brand" href="/" aria-label="Vajra Technology home">
            <span className="mark">▲</span>&nbsp;Vajra<span className="tm">TECH</span>
          </Link>
          <nav className="nav" aria-label="Primary">
            <ul className="nav-links">
              <li>
                <Link href="/#case">Work</Link>
              </li>
              <li
                ref={ddRef}
                className={`has-dropdown${ddOpen ? " open" : ""}`}
              >
                <button
                  className="dd-trigger"
                  onClick={(e) => {
                    e.preventDefault();
                    setDdOpen((v) => !v);
                  }}
                  aria-expanded={ddOpen}
                  aria-haspopup="true"
                >
                  Services <span className="caret" aria-hidden="true" />
                </button>
                <div className="dd-menu" role="menu">
                  <Link
                    className="dd-item"
                    role="menuitem"
                    href="/services/grow"
                    aria-current={currentService === "grow" ? "page" : undefined}
                  >
                    <span className="dd-ic grow">↗</span>
                    <span className="dd-text">
                      <span className="dd-t">Grow</span>
                      <span className="dd-d">Social, paid ads &amp; SEO — more customers</span>
                    </span>
                  </Link>
                  <Link
                    className="dd-item"
                    role="menuitem"
                    href="/services/build"
                    aria-current={currentService === "build" ? "page" : undefined}
                  >
                    <span className="dd-ic build">▰</span>
                    <span className="dd-text">
                      <span className="dd-t">Build</span>
                      <span className="dd-d">Software, apps, AI &amp; cloud</span>
                    </span>
                  </Link>
                  <Link
                    className="dd-item"
                    role="menuitem"
                    href="/services/brand"
                    aria-current={currentService === "brand" ? "page" : undefined}
                  >
                    <span className="dd-ic brand">◈</span>
                    <span className="dd-text">
                      <span className="dd-t">Brand</span>
                      <span className="dd-d">Identity, story &amp; design</span>
                    </span>
                  </Link>
                  <div className="dd-foot">
                    <Link href="/#contact">
                      Not sure which? Take the 60-second diagnostic →
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <Link href="/#humans">About</Link>
              </li>
            </ul>
            <Link className="btn btn-accent" href="/#contact">
              Let&apos;s talk
            </Link>
            <button
              className="nav-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <div className="mobile-menu" aria-hidden={!menuOpen}>
        <Link href="/#case" onClick={closeMenu}>Work</Link>
        <Link href="/services/grow" onClick={closeMenu}
          aria-current={currentService === "grow" ? "page" : undefined}>
          Grow
        </Link>
        <Link href="/services/build" onClick={closeMenu}
          aria-current={currentService === "build" ? "page" : undefined}>
          Build
        </Link>
        <Link href="/services/brand" onClick={closeMenu}
          aria-current={currentService === "brand" ? "page" : undefined}>
          Brand
        </Link>
        <Link href="/#humans" onClick={closeMenu}>About</Link>
        <Link href="/#how" onClick={closeMenu}>How we work</Link>
        <Link className="btn btn-accent btn-lg" href="/#contact" onClick={closeMenu}>
          Let&apos;s talk →
        </Link>
      </div>
    </>
  );
}
