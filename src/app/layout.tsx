import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NASDAQ App for THNDR Task",
  description: "Created by Ammar Almahdy for THNDR hiring process",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
