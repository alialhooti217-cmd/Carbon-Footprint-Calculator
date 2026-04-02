import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carbon Footprint Calculator",
  description: "Industrial carbon accounting for engineering teams.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
