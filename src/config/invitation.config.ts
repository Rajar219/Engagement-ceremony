/**
 * INVITATION CONFIGURATION
 * 
 * Centralized content and media configuration for the Engagement & Wedding Digital Invitation.
 * All personal details, dates, venues, and media paths are configured here.
 * No personal details are hardcoded in components or page templates.
 */

export interface InvitationConfig {
  couple: {
    groom: {
      firstName: string;
      fullName: string;
      roleTitle: string; // e.g. "The Groom"
      bio?: string;
      parents?: string;
    };
    bride: {
      firstName: string;
      fullName: string;
      roleTitle: string; // e.g. "The Bride"
      bio?: string;
      parents?: string;
    };
    monogram: string; // e.g. "[G] & [B]"
  };
  engagement: {
    title: string;
    subtitle: string;
    date: string; // e.g. "[Engagement Date, e.g. November 20, 2026]"
    isoDate: string; // e.g. "2026-11-20T17:00:00" for countdown / calendar
    time: string; // e.g. "[Engagement Time, e.g. 5:00 PM onwards]"
    venue: {
      name: string;
      hallOrLawn?: string;
      address: string;
      cityState: string;
      mapUrl: string; // Google Maps navigation link
      embedMapUrl?: string;
    };
    dressCode?: string;
    itinerary: Array<{
      time: string;
      title: string;
      description: string;
    }>;
  };
  wedding: {
    title: string;
    subtitle: string;
    date: string;
    isAnnounced?: boolean;
    isoDate?: string;
    time: string;
    venue: {
      name: string;
      hallOrLawn?: string;
      address: string;
      cityState: string;
      mapUrl: string;
      embedMapUrl?: string;
    };
    dressCode?: string;
    itinerary: Array<{
      time: string;
      title: string;
      description: string;
    }>;
  };
  story: {
    sectionTitle: string;
    subtitle: string;
    narrative: string;
    chapters: Array<{
      label: string;
      title: string;
      description: string;
    }>;
  };
  closing: {
    heading: string;
    message: string;
    blessing: string;
    signature: string;
  };
  media: {
    music: {
      enabled: boolean;
      title: string;
      artist?: string;
      src: string; // e.g. "/assets/music/invitation-theme.mp3"
    };
    videos: {
      envelopeOpening?: {
        title: string;
        src: string;
        aspectRatio: '16:9' | '9:16' | 'adaptive';
        poster?: string;
      };
      heroBackground?: {
        title: string;
        src: string;
        aspectRatio: '16:9' | '9:16' | 'adaptive';
        poster?: string;
      };
      landingIntro: {
        title: string;
        src: string; // "/assets/videos/engagement-intro.mp4"
        aspectRatio: '16:9' | '9:16' | 'adaptive';
        poster?: string;
      };
      coupleIntroduction: {
        title: string;
        src: string; // "/assets/videos/couple-introduction.mp4"
        aspectRatio: '16:9' | '9:16' | 'adaptive';
        poster?: string;
      };
      weddingCinematic: {
        title: string;
        src: string; // "/assets/videos/wedding-cinematic.mp4"
        aspectRatio: '16:9' | '9:16' | 'adaptive';
        poster?: string;
      };
      finalScene: {
        title: string;
        src: string; // "/assets/videos/final-scene.mp4"
        aspectRatio: '16:9' | '9:16' | 'adaptive';
        poster?: string;
      };
    };
    gallery: Array<{
      id: string;
      title: string;
      caption?: string;
      src: string; // planned asset path e.g. "/assets/images/gallery-01.jpg"
      category: 'couple' | 'engagement' | 'moments';
    }>;
  };
  seo: {
    title: string;
    description: string;
    canonicalUrl?: string;
    ogImage?: string;
  };
}

export const invitationConfig: InvitationConfig = {
  couple: {
    groom: {
      firstName: "Vallalarasu",
      fullName: "G. Vallalarasu",
      roleTitle: "The Groom",
      bio: "Son of Mr. V. Gnanasekar & Mrs. G. Meena",
      parents: "Son of Mr. V. Gnanasekar & Mrs. G. Meena",
    },
    bride: {
      firstName: "Priyanka",
      fullName: "K. Priyanka",
      roleTitle: "The Bride",
      bio: "Daughter of Mr. Kabali & Mrs. K. Sumathy",
      parents: "Daughter of Mr. Kabali & Mrs. K. Sumathy",
    },
    monogram: "V & P",
  },
  engagement: {
    title: "The Engagement Ceremony",
    subtitle: "A Promise of Forever",
    date: "Sunday, 13th December 2026",
    isoDate: "2026-12-13T18:00:00",
    time: "Evening 6:00 PM to 9:00 PM",
    venue: {
      name: "RSM Banquet Hall",
      hallOrLawn: "Banquet Hall",
      address: "35/37, Dr Besant Rd, Near Hotel Viveka, Triplicane",
      cityState: "Chennai - 600005, Tamil Nadu",
      mapUrl: "https://maps.google.com/?q=RSM+Banquet+Hall+35%2F37+Dr+Besant+Rd+Triplicane+Chennai+600005",
    },
    dressCode: "Traditional / Festive Elegance",
    itinerary: [
      {
        time: "6:00 PM",
        title: "Welcome & Reception",
        description: "Welcoming guests and families to celebrate together",
      },
      {
        time: "7:00 PM",
        title: "Engagement & Ring Exchange",
        description: "Auspicious engagement ritual and ring exchange ceremony",
      },
      {
        time: "8:00 PM",
        title: "Dinner & Celebration",
        description: "Grand dinner feast and blessings with family & friends",
      },
    ],
  },
  wedding: {
    title: "The Holy Matrimony & Wedding",
    subtitle: "Two Souls, One Sacred Bond",
    date: "To Be Announced",
    isAnnounced: false,
    isoDate: "",
    time: "Timings To Be Announced",
    venue: {
      name: "To Be Announced",
      hallOrLawn: "Main Mandap Ceremony",
      address: "Chennai",
      cityState: "Tamil Nadu, India",
      mapUrl: "https://maps.google.com/?q=Chennai+Tamil+Nadu",
    },
    dressCode: "Royal Traditional Attire",
    itinerary: [
      {
        time: "Muhurtham",
        title: "Sacred Wedding Ceremony",
        description: "Sacred vows and auspicious Vedic wedding rituals",
      },
    ],
  },
  story: {
    sectionTitle: "Our Journey",
    subtitle: "Written in the Stars",
    narrative: "Two hearts uniting with love, guided by the blessings of parents and family.",
    chapters: [
      {
        label: "Chapter 01",
        title: "The Auspicious Beginning",
        description: "Two families united with love, joy, and shared traditions.",
      },
      {
        label: "Chapter 02",
        title: "The Sacred Promise",
        description: "Stepping into a lifetime of togetherness and shared dreams.",
      },
    ],
  },
  closing: {
    heading: "With Joyful Hearts",
    message: "Your gracious presence, warm blessings, and wishes will make our special day truly memorable.",
    blessing: "We warmly invite you to join us in celebrating this auspicious beginning.",
    signature: "G. Vallalarasu & K. Priyanka with families",
  },
  media: {
    music: {
      enabled: true,
      title: "Instrumental Acoustic Theme",
      artist: "Cinematic Strings",
      src: "/assets/music/invitation-theme.mp3",
    },
    videos: {
      envelopeOpening: {
        title: "Royal Wax Seal Envelope Opening",
        src: "/assets/videos/envelope-opening.mp4",
        aspectRatio: "9:16",
        poster: "/assets/images/envelope-poster.jpg",
      },
      heroBackground: {
        title: "Grand Entrance & Golden Backdrop",
        src: "/assets/videos/hero-background.mp4",
        aspectRatio: "9:16",
        poster: "/assets/images/hero-poster.jpg",
      },
      landingIntro: {
        title: "Royal Envelope Opening",
        src: "/assets/videos/envelope-opening.mp4",
        aspectRatio: "9:16",
        poster: "/assets/images/envelope-poster.jpg",
      },
      coupleIntroduction: {
        title: "Grand Ceremony Entrance",
        src: "/assets/videos/hero-background.mp4",
        aspectRatio: "9:16",
        poster: "/assets/images/hero-poster.jpg",
      },
      weddingCinematic: {
        title: "The Celebration Sequence",
        src: "/assets/videos/hero-background.mp4",
        aspectRatio: "9:16",
        poster: "/assets/images/hero-poster.jpg",
      },
      finalScene: {
        title: "The Closing Journey",
        src: "/assets/videos/hero-background.mp4",
        aspectRatio: "9:16",
        poster: "/assets/images/hero-poster.jpg",
      },
    },
    gallery: [
      {
        id: "moment-01",
        title: "Engagement Moment 1",
        caption: "Cherished moments",
        src: "/assets/images/gallery-01.jpg",
        category: "couple",
      },
      {
        id: "moment-02",
        title: "Engagement Moment 2",
        caption: "Celebrations",
        src: "/assets/images/gallery-02.jpg",
        category: "couple",
      },
      {
        id: "moment-03",
        title: "Engagement Candid",
        caption: "Smiles and joy",
        src: "/assets/images/gallery-03.jpg",
        category: "engagement",
      },
      {
        id: "moment-04",
        title: "Cherished Memory",
        caption: "Family blessings",
        src: "/assets/images/gallery-04.jpg",
        category: "moments",
      },
    ],
  },
  seo: {
    title: "V&P | Engagement & Wedding Celebration | G. Vallalarasu & K. Priyanka",
    description: "Cordially inviting you to celebrate the Engagement Ceremony of G. Vallalarasu and K. Priyanka on Sunday, 13th December 2026 at RSM Banquet Hall, Triplicane, Chennai.",
    canonicalUrl: "https://vallarasu-priyanka-engagement.vercel.app/",
    ogImage: "/assets/images/hero-poster.jpg",
  },
};
