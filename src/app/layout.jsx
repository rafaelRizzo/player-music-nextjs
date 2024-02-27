import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider/theme-provider";
import { Toaster } from "@/components/ui/toaster"
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Player Rafael Rizzo",
  description: "Player de música NEXTJS Rafael Rizzo, playlist Rafael Rizzo",
  icon: '/favicon.ico', 
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>

      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
