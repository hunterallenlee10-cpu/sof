import type { Metadata, Viewport } from "next";
import { Work_Sans, Zilla_Slab } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import PlannerProvider from "@/components/VisitPlanner/PlannerProvider";
import HolidayBar from "@/components/sections/HolidayBar";
import SiteHeader from "@/components/sections/SiteHeader";
import SiteFooter from "@/components/sections/SiteFooter";
import { BUSINESS, IS_LIVE, SITE_URL } from "@/lib/business";

const zilla = Zilla_Slab({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-zilla",
  display: "swap",
});

const work = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gift Shop in Leonardtown, MD | Shepherd's Old Field Market",
    template: "%s | Shepherd's Old Field Market",
  },
  applicationName: BUSINESS.name,
  robots: IS_LIVE ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5EFE3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${zilla.variable} ${work.variable} antialiased`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-3 focus:text-cream"
        >
          Skip to content
        </a>
        <PlannerProvider>
          <HolidayBar />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </PlannerProvider>
        <Analytics />
      </body>
    </html>
  );
}
