import type { Metadata } from "next";
import { AuthProvider } from '@/context/AuthContext';

import "./globals.css";
import { Footer } from "@/components";

export const metadata: Metadata = {
  title: "Cards Legends",
  description: "Avalie os jogadores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
