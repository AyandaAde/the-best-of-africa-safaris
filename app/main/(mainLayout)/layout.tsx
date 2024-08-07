import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/NavBar";
import localFont from "next/font/local";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import QueryProvider from "@/components/query-providet";
import { Toaster } from "sonner";
import CustomerSupportWidget from "@/components/CustomerSupportWidget";
import ReduxProvider from "@/components/redux-provider";
import { prisma } from "@/lib/db/prisma";

const chillax = localFont({
  src: "../../../public/fonts/Chillax-Variable.ttf",
  variable: "--font-chillax",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "The Best of Africa Safaris",
  description: "Craft your dream African adventure with The Best of Africa Safaris.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const activities = await prisma.activity.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <html lang="en">
      <body className={`${poppins.className} ${chillax.variable}`}>
        <ReduxProvider>
          <QueryProvider>
            <Navbar className="hidden md:block" activities={activities} />
            <MobileNav />
            {children}
            <Toaster richColors />
            <CustomerSupportWidget />
            <Footer />
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
