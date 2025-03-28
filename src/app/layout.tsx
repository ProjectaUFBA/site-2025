import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Barlow } from "next/font/google";
import "./globals.scss";

import Navbar from "./components/navbar/navbar";
import Footer from './components/footer/footer';

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

const inter = Inter({ subsets: ["latin"] });
const barlow = Barlow({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700'], variable: '--font-barlow'});

export const metadata: Metadata = {
  title: "Projecta",
  description: "Descrição Website Projecta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.prismic.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.prismic.io" />

        <link rel="preconnect" href="https://prismic-io.s3.amazonaws.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://prismic-io.s3.amazonaws.com" />
        <script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=projecta-3-poc"></script>
      </head>
      <body className={barlow.variable}>
        <Navbar/>
        {children}
        {/* @ts-expect-error Async Server Component */}
        <Footer/>
        {/* @ts-expect-error Async Server Component */}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
