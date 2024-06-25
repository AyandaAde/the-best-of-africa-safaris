import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import Script from "next/script";

const chillax = localFont({
  src: "../public/fonts/Chillax-Variable.ttf",
  variable: "--font-chillax",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",

});

export const metadata: Metadata = {
  title: "The Best of Africa Safaris",
  description: "Craft your dream African adventure with The Best of Africa Safaris.",
  openGraph: {
    title: "The Best of Africa Safaris",
    description: "Craft your dream African adventure with The Best of Africa Safaris.",
    url: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    siteName: "The Best of Africa Safaris",
    images: [
      {
        url: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        width: 1920,
        height: 1080,
        alt: "The Best of Africa Safaris",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "The Best of Africa Safaris",
    description: "Craft your dream African adventure with The Best of Africa Safaris.",
    card: "summary_large_image",
    images: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
        variables: {
          colorPrimary: "#2F7339",
        },
    }}
    >
    <html lang="en">
      <head>
      <Script src="https://kit.fontawesome.com/1dce5cdcc1.js"/>
      </head>
      <body className={`${poppins.className} ${chillax.variable}`}>
        <ThemeProvider
          attribute="class"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
