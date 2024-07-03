import { Inter } from "next/font/google";
import "./globals.css";
import HeaderCompo from "@/components/header";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "My AI friend",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderCompo/>
        {children}
      </body>
    </html>
  );
}
