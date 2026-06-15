import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap wrap-wide">
        <div className="footer-cta">
          <div className="pos">Brand. Software. Marketing. One team. All in.</div>
          <Link className="btn btn-accent btn-lg" href="#contact">
            Let&apos;s build something <span className="arw">→</span>
          </Link>
        </div>
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="brand" href="/">
              <span className="mark">▲</span>&nbsp;Vajra<span className="tm">TECH</span>
            </Link>
            <p>One team for your brand, your software and your customers. Built together, all in.</p>
          </div>
          <div className="fcol">
            <h4>Services</h4>
            <ul>
              <li><Link href="/services/grow">Grow</Link></li>
              <li><Link href="/services/build">Build</Link></li>
              <li><Link href="/services/brand">Brand</Link></li>
            </ul>
          </div>
          <div className="fcol">
            <h4>Company</h4>
            <ul>
              <li><Link href="/#case">Work</Link></li>
              <li><Link href="/#humans">About</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>
          <div className="fcol">
            <h4>Get in touch</h4>
            <ul>
              <li><a href="info.vajratechnology@gmail.com">info.vajratechnology@gmail.com</a></li>
              <li><a href="https://wa.me/+918200324879">WhatsApp · +91 8200324879</a></li>
              <li><Link href="/#contact">India · working globally</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © 2026 Vajra Technology ·{" "}
            <Link href="/privacy">Privacy policy</Link>
          </span>
          <span className="social">
            <a href="#" rel="noopener noreferrer">LinkedIn</a>
            <a href="#" rel="noopener noreferrer">Instagram</a>
            <a href="#" rel="noopener noreferrer">X</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
