// app/layout.js
import { Inter } from "next/font/google";
import "./globals.scss";
import { UserProvider } from '../contexts/UserContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Healthmaster",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}