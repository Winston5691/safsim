import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { AppThemeProvider } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dealer SIM Distribution Returns — Prototype",
  description:
    "Static prototype: dealer SIM returns filing, validation steps, and compliance overview (RTC).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppThemeProvider>
          <AppShell>{children}</AppShell>
        </AppThemeProvider>
      </body>
    </html>
  );
}
