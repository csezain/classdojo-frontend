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
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <div className="Navbar">Navbar</div>
        <div className="flex-grow">
          <NextAuthProvider session={session}>{children}</NextAuthProvider>
        </div>
        <div className="Navbar">Footer</div>
        <Toaster />
      </body>
    </html>
  );
}
