import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Freedom Motors USA | Next.js App Router & Sanity Inventory Engine",
  description:
    "Enterprise Wheelchair Accessible Vehicle Inventory Engine with Daily FTP/Excel Synchronization, Webhook-driven ISR Revalidation, and Sanity Studio Field-Level Lock Architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] antialiased transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
        {/* Central Traffic Hub Tracker */}
        <img
          src="https://demo-traffic.vercel.app/api/px?p=freedom-motors-sync"
          alt=""
          width={1}
          height={1}
          style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
        />
      </body>
    </html>
  );
}
