import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Q&A AI Test',
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
      className={` min-h-screen bg-gray-800 px-4 text-text  ${inter.className}`}
    >
      {children}
    </section>
  );
}
