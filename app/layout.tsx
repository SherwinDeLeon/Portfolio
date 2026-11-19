import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: `${site.name} | ${site.title}`, template: `%s | ${site.name}` },
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: { title: `${site.name} | ${site.title}`, description: site.description, type: "website" },
  twitter: { card: "summary", title: `${site.name} | ${site.title}`, description: site.description },
};

export const viewport: Viewport = { themeColor: "#0b0709", colorScheme: "dark" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
