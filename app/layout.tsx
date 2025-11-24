import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { generateMetadata, generateAllSchemas } from "@/lib/seo";

// Generate comprehensive SEO metadata
export const metadata: Metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate all JSON-LD schemas for SEO and GEO
  const schemas = generateAllSchemas('en');

  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data for SEO and GEO (Generative Engine Optimization) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />

        {/* Google Analytics 4 - Replace with your actual Measurement ID */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
