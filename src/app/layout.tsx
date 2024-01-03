import { Inter, Urbanist } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/lib/auth/NextAuthProvider";
import { Session } from "next-auth";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./components/Navbar/Navbar";

// const inter = Inter({ subsets: ["latin"] });
 const primary = Urbanist({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-primary",
});

export default function RootLayout({
  children,
  params: { session },
}: {
  children: React.ReactNode;
  params: { session: Session };
}) {
  return (
    <html lang="en" className={`${primary.variable}`}>
      <body className={`flex flex-col min-h-screen font-primary`}>
        <Navbar />
        <div className="flex-grow">
          <NextAuthProvider session={session}>{children}</NextAuthProvider>
        </div>
        <div className="Navbar">Footer</div>
        <Toaster />
      </body>
    </html>
  );
}
