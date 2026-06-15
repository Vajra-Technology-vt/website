import type { Metadata } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: "Vajra Technology — We don't stop until you win.",
  description:
    "One team for your brand, software, AI and marketing — all in on your success. No handoffs, nothing falls through the cracks. More customers, end to end.",
  openGraph: {
    type: "website",
    title: "Vajra Technology — We don't stop until you win.",
    description:
      "Brand, software, marketing, AI — one team that treats your success as the only acceptable outcome. We go all in, every time.",
    images: [{ url: "/og-image.png" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="amber" data-services="list">
      <head>
        {/* Preconnect for faster font load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500;1,6..72,600&family=Hanken+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vajra Technology",
              url: "https://vajratechnology.in",
              slogan: "We don't stop until you win.",
              description:
                "Full-stack technology and brand company — brand, software, AI, cloud and marketing under one team.",
              areaServed: ["IN", "Worldwide"],
            }),
          }}
        />
      </head>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
