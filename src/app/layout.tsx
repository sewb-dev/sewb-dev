import Nav from "@/components/Nav";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer} from 'react-toastify';
 import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QNAI",
  description:
    "Generate Quality Questions and Answers from any text using the power of AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-gray-800 text-slate-100  ${inter.className}`}>
        <Nav />
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
