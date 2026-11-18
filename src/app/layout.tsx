import type { Metadata, Viewport } from 'next';
import './globals.css';
import { invitationConfig } from '@/config/invitation.config';

export const metadata: Metadata = {
  title: invitationConfig.seo.title,
  description: invitationConfig.seo.description,
  metadataBase: new URL('https://vallarasu-priyanka-engagement.vercel.app'),
  alternates: {
    canonical: 'https://vallarasu-priyanka-engagement.vercel.app',
  },
  openGraph: {
    title: invitationConfig.seo.title,
    description: invitationConfig.seo.description,
    url: 'https://vallarasu-priyanka-engagement.vercel.app',
    siteName: 'Vallarasu & Priyanka Engagement & Wedding Invitation',
    type: 'website',
    images: [
      {
        url: invitationConfig.seo.ogImage || '/assets/images/hero-poster.jpg',
        width: 1080,
        height: 1920,
        alt: 'Engagement Ceremony - G. Vallarasu & K. Priyanka',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: invitationConfig.seo.title,
    description: invitationConfig.seo.description,
    images: [invitationConfig.seo.ogImage || '/assets/images/hero-poster.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#faf8f4',
};

const jsonLdEvent = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Engagement Ceremony: G. Vallarasu & K. Priyanka',
  startDate: '2026-12-13T18:00:00+05:30',
  endDate: '2026-12-13T21:00:00+05:30',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'RSM Banquet Hall',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '35/37, Dr Besant Road, Near Hotel Viveka, Triplicane',
      addressLocality: 'Chennai',
      postalCode: '600005',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
  },
  image: ['https://vallarasu-priyanka-engagement.vercel.app/assets/images/hero-poster.jpg'],
  description:
    'Cordially inviting you to celebrate the Engagement Ceremony of G. Vallarasu and K. Priyanka on Sunday, 13th December 2026 at RSM Banquet Hall, Triplicane, Chennai.',
  organizer: {
    '@type': 'Person',
    name: 'G. Vallarasu & K. Priyanka with families',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ta" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@500;600;700;900&family=Noto+Serif+Tamil:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💍</text></svg>"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvent) }}
        />
      </head>
      <body className="min-h-[100dvh] bg-[#f0eae1] text-[#231c18] antialiased selection:bg-[#c5a059]/30 selection:text-[#231c18] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
