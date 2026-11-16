import type { Metadata, Viewport } from 'next';
import './globals.css';
import { invitationConfig } from '@/config/invitation.config';

export const metadata: Metadata = {
  title: invitationConfig.seo.title,
  description: invitationConfig.seo.description,
  metadataBase: new URL('https://engagement-ceremony.vercel.app'),
  openGraph: {
    title: invitationConfig.seo.title,
    description: invitationConfig.seo.description,
    type: 'website',
    images: [
      {
        url: invitationConfig.seo.ogImage || '/assets/images/hero-poster.jpg',
        width: 1080,
        height: 1920,
        alt: 'Engagement Ceremony Invitation - G. Vallalarasu & K. Priyanka',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: invitationConfig.seo.title,
    description: invitationConfig.seo.description,
    images: [invitationConfig.seo.ogImage || '/assets/images/hero-poster.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3a121b',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💍</text></svg>" />
      </head>
      <body className="min-h-screen bg-[#0e0306] text-[#fbf7ee] antialiased selection:bg-gold-500/30 selection:text-gold-200">
        {children}
      </body>
    </html>
  );
}
