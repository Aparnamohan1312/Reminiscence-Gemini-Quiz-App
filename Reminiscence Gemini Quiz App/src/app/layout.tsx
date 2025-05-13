import type {Metadata} from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; 

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: 'Memory Lane Quiz',
  description: 'Discover a cherished memory and get a personalized AI-generated caption.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={`antialiased font-sans`}> {/* Use font-sans which maps to --font-geist-sans */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
