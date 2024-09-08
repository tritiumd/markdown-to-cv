import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import StoreProvider from "@/store/StoreProvider";
import { ThemeProvider } from "@/components/themeProvider/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Tritiumd",
};
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <StoreProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </StoreProvider>
  );
}
