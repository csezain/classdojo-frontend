import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/lib/auth/NextAuthProvider";
import { Session } from "next-auth";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params: { session },
}: {
  children: React.ReactNode;
  params: { session: Session };
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
