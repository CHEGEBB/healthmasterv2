import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/theme-provider";
const fontoutfit = Outfit({ 
  subsets: ["latin"],
  weight: ['300' , '400' ,'500', '600' ,'700'],
  variable: '--font-outfit'


 });

export const metadata: Metadata = {
  title: "Healthmaster",
  description: "Your healthcare management companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-dark-300 font-outfit antialiased', fontoutfit.variable)}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          </body>
    </html>
  );
} 
