import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import RootLayout from './RootLayout';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Q&A AI',
  description:
    'Generate Quality Questions and Answers from any text using the power of AI.',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`text-slate-100  ${inter.className}`}>
        <RootLayout>
          {children}
        </RootLayout>
      </body>
    </html>
  );
}
