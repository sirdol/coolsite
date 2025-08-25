import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../app/components/Navbar"



export const metadata: Metadata = {
  title: "F.M.D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
