import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "@/providers";

const inter = Inter({ subsets: ["latin"] });

import "./globals.css";
import { EdgeStoreProvider } from "@/components/libs/edgestore";

export const metadata: Metadata = {
  title: "akaDCI",
  description: "Trang quản trị akaDCI",
  icons: "/icons/layout/logo.svg",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("🚀 ~ !!!!:", process.env.EDGE_STORE_ACCESS_KEY);
  console.log("🚀 ~ !!!!:", process.env.EDGE_STORE_SECRET_KEY);
  return (
    <html>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </Providers>
      </body>
    </html>
  );
}
