import type { Metadata } from "next";
import "@/assets/globals.css";

export const metadata: Metadata = {
  title: "Next.js auth template",
  description: "A template for Next.js with authentication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
