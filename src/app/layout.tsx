import type { Metadata, Viewport } from 'next';
import './globals.css';
import { invitationConfig } from '@/config/invitation.config';

export const metadata: Metadata = {
  title: 'Vallalarasu & Priyanka | Engagement Invitation',
  description: 'With the blessings of our families, we warmly invite you to celebrate the engagement ceremony on 13 December 2026.',
  metadataBase: new URL('https://vallarasu-priyanka-engagement.vercel.app'),
  alternates: {
    canonical: 'https://vallarasu-priyanka-engagement.vercel.app/',
  },
  openGraph: {
    title: 'Vallalarasu & Priyanka | Engagement Invitation',
    description: 'With the blessings of our families, we warmly invite you to celebrate the engagement ceremony on 13 December 2026.',
    url: 'https://vallarasu-priyanka-engagement.vercel.app/',
    siteName: 'Vallalarasu & Priyanka Engagement Invitation',
    type: 'website',
    images: [
      {
        url: 'https://vallarasu-priyanka-engagement.vercel.app/assets/images/og-whatsapp-preview.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Vallalarasu and Priyanka Engagement Invitation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vallalarasu & Priyanka | Engagement Invitation',
    description: 'With the blessings of our families, we warmly invite you to celebrate the engagement ceremony on 13 December 2026.',
    images: ['https://vallarasu-priyanka-engagement.vercel.app/assets/images/og-whatsapp-preview.jpg?v=2'],
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
  name: 'Engagement Ceremony: G. Vallalarasu & K. Priyanka',
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
    'Cordially inviting you to celebrate the Engagement Ceremony of G. Vallalarasu and K. Priyanka on Sunday, 13th December 2026 at RSM Banquet Hall, Triplicane, Chennai.',
  organizer: {
    '@type': 'Person',
    name: 'G. Vallalarasu & K. Priyanka with families',
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
        {/* Single Universal Background Music Element (Persistent across whole lifecycle) */}
        <audio
          id="vp-global-audio"
          src="/assets/music/invitation-theme.mp3"
          preload="auto"
          loop
          // @ts-ignore
          playsInline
          className="hidden pointer-events-none"
          aria-hidden="true"
        />
        {children}
      </body>
    </html>
  );
}
