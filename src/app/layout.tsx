import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Advance Academy Career Sorting Ceremony',
  description:
    'Discover your Career Character in 20 questions. Take the magical quiz and find your path in the UK job market — powered by The Advance Academy.',
  keywords: [
    'career quiz',
    'UK jobs',
    'career character',
    'sorting ceremony',
    'advance academy',
    'career advice',
  ],
  openGraph: {
    title: 'The Advance Academy Career Sorting Ceremony',
    description:
      'Which Career House are you? Take the 20-question magical quiz and discover your path in the UK job market.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
