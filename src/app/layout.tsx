import type { Metadata } from "next";

import "./globals.css";
import { Footer } from "@/components";
import { AuthProvider } from "./providers/AuthProvider";

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
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
