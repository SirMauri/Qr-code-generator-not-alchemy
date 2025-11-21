import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free QR Code Generator | No Paywalls, No Limits",
  description: "Generate beautiful, customizable QR codes for free. No paywalls, no watermarks, no limitations. Choose colors, formats, and download instantly.",
  keywords: ["QR code", "generator", "free", "customizable", "download", "PNG", "SVG"],
  authors: [{ name: "Free QR Generator" }],
  openGraph: {
    title: "Free QR Code Generator",
    description: "Generate beautiful QR codes without paywalls or limitations",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
