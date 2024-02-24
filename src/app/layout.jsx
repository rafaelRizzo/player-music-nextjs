import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Player Rafael Rizzo",
  description: "Player de música NEXTJS Rafael Rizzo, playlist Rafael Rizzo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class" 
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
