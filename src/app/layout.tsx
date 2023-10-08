import Nav from "@/components/Nav";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { AuthContextProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Q&A AI",
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
      <body className={`text-slate-100  ${inter.className}`}>
        <ThemeRegistry>
          <AuthContextProvider>
            <Nav />
            <ToastContainer />
            {children}
          </AuthContextProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
