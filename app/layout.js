import { Syne, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "./components/AppShell";

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

// The utility face. Syne is wide and geometric, so Plex Mono complements it
// better than a narrower grotesque mono would.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

// Set NEXT_PUBLIC_SITE_URL to the custom domain once it's pointed; Vercel
// supplies VERCEL_URL for preview and production deploys in the meantime.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Portfolio | Axel Balitaan",
  description:
    "Axel Balitaan — Software Engineer building full-stack AI products. BS Computer Science, UP Los Baños.",
  openGraph: {
    title: "Portfolio | Axel Balitaan",
    description: "Software Engineer | Full-Stack & AI | Philippines",
    type: "website",
    images: [{ url: "/preview.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Axel Balitaan",
    description: "Software Engineer | Full-Stack & AI | Philippines",
    images: ["/preview.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${jakarta.variable} ${plexMono.variable}`}>
      <body className="bg-ground text-ink overflow-x-clip">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
