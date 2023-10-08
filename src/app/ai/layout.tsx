import Nav from '@/components/Nav';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Q&A AI',
  description:
    'Generate Quality Questions and Answers from any text using the power of AI.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className={`h-screen w-screen bg-gray-800 px-4 text-text  ${inter.className}`}
    >
      {children}
    </section>
  );
}
