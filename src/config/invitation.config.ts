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
    date: string; // e.g. "[Wedding Date, e.g. December 15, 2026]"
    isoDate: string; // e.g. "2026-12-15T09:00:00" for countdown / calendar
    time: string; // e.g. "[Wedding Time, e.g. 9:00 AM onwards]"
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
      firstName: "[Groom First Name]",
      fullName: "[Groom Full Name]",
      roleTitle: "The Groom",
      bio: "[Brief personal note or quote from the groom]",
      parents: "[Parents of the Groom]",
    },
    bride: {
      firstName: "[Bride First Name]",
      fullName: "[Bride Full Name]",
      roleTitle: "The Bride",
      bio: "[Brief personal note or quote from the bride]",
      parents: "[Parents of the Bride]",
    },
    monogram: "[G] & [B]",
  },
  engagement: {
    title: "The Engagement Ceremony",
    subtitle: "A Promise of Forever",
    date: "[Engagement Date, e.g. Saturday, 21st November 2026]",
    isoDate: "2026-11-21T18:00:00",
    time: "[Engagement Time, e.g. 6:30 PM onwards]",
    venue: {
      name: "[Engagement Venue Name]",
      hallOrLawn: "[Grand Ballroom / Banquet Lawn]",
      address: "[Venue Street Address, Area]",
      cityState: "[City, State, Zip Code]",
      mapUrl: "https://maps.google.com/?q=[Engagement+Venue+Location]",
    },
    dressCode: "[Dress Code, e.g. Festive Glam / Traditional Elegance]",
    itinerary: [
      {
        time: "[Time 1, e.g. 6:30 PM]",
        title: "[Milestone 1, e.g. Welcome & Refreshments]",
        description: "[Brief event description]",
      },
      {
        time: "[Time 2, e.g. 7:30 PM]",
        title: "[Milestone 2, e.g. Ring Exchange & Blessings]",
        description: "[Brief event description]",
      },
      {
        time: "[Time 3, e.g. 8:30 PM]",
        title: "[Milestone 3, e.g. Dinner & Musical Celebration]",
        description: "[Brief event description]",
      },
    ],
  },
  wedding: {
    title: "The Holy Matrimony & Wedding",
    subtitle: "Two Souls, One Sacred Bond",
    date: "[Wedding Date, e.g. Sunday, 20th December 2026]",
    isoDate: "2026-12-20T10:00:00",
    time: "[Wedding Time, e.g. 10:00 AM onwards (Auspicious Muhurtham)]",
    venue: {
      name: "[Wedding Venue Name]",
      hallOrLawn: "[Main Mandap / Courtyard]",
      address: "[Wedding Venue Address, Area]",
      cityState: "[City, State, Zip Code]",
      mapUrl: "https://maps.google.com/?q=[Wedding+Venue+Location]",
    },
    dressCode: "[Dress Code, e.g. Royal Traditional Attire]",
    itinerary: [
      {
        time: "[Time 1, e.g. 9:00 AM]",
        title: "[Ceremony 1, e.g. Baraat & Welcome]",
        description: "[Brief event description]",
      },
      {
        time: "[Time 2, e.g. 10:30 AM]",
        title: "[Ceremony 2, e.g. Sacred Vows & Pheras]",
        description: "[Brief event description]",
      },
      {
        time: "[Time 3, e.g. 1:00 PM]",
        title: "[Ceremony 3, e.g. Royal Feast & Reception]",
        description: "[Brief event description]",
      },
    ],
  },
  story: {
    sectionTitle: "Our Journey",
    subtitle: "Written in the Stars",
    narrative: "[A delicate poetic description of the couple's bond and journey together]",
    chapters: [
      {
        label: "[Chapter 01]",
        title: "[The First Hello]",
        description: "[A short reflection on how paths crossed]",
      },
      {
        label: "[Chapter 02]",
        title: "[Growing Together]",
        description: "[Cherished memories, shared laughter, and understanding]",
      },
      {
        label: "[Chapter 03]",
        title: "[The Proposal]",
        description: "[The moment two lives chose forever]",
      },
    ],
  },
  closing: {
    heading: "With Joyful Hearts",
    message: "Your presence, love, and warm blessings will make our special day truly unforgettable.",
    blessing: "We cannot wait to celebrate this sacred milestone with our dearest family and friends.",
    signature: "[Groom Name] & [Bride Name] with their families",
  },
  media: {
    music: {
      enabled: true,
      title: "Instrumental Acoustic Theme",
      artist: "Cinematic Strings",
      src: "/assets/music/invitation-theme.mp3",
    },
    videos: {
      landingIntro: {
        title: "Invitation Cinematic Opening",
        src: "/assets/videos/engagement-intro.mp4",
        aspectRatio: "adaptive",
        poster: "/assets/images/poster-intro.jpg",
      },
      coupleIntroduction: {
        title: "The Couple Portrait Sequence",
        src: "/assets/videos/couple-introduction.mp4",
        aspectRatio: "adaptive",
        poster: "/assets/images/poster-couple.jpg",
      },
      weddingCinematic: {
        title: "The Wedding Celebration Sequence",
        src: "/assets/videos/wedding-cinematic.mp4",
        aspectRatio: "adaptive",
        poster: "/assets/images/poster-wedding.jpg",
      },
      finalScene: {
        title: "The Closing Journey",
        src: "/assets/videos/final-scene.mp4",
        aspectRatio: "adaptive",
        poster: "/assets/images/poster-final.jpg",
      },
    },
    gallery: [
      {
        id: "moment-01",
        title: "[Portrait Moment 1]",
        caption: "[Optional caption]",
        src: "/assets/images/gallery-01.jpg",
        category: "couple",
      },
      {
        id: "moment-02",
        title: "[Portrait Moment 2]",
        caption: "[Optional caption]",
        src: "/assets/images/gallery-02.jpg",
        category: "couple",
      },
      {
        id: "moment-03",
        title: "[Engagement Candid]",
        caption: "[Optional caption]",
        src: "/assets/images/gallery-03.jpg",
        category: "engagement",
      },
      {
        id: "moment-04",
        title: "[Cherished Memory]",
        caption: "[Optional caption]",
        src: "/assets/images/gallery-04.jpg",
        category: "moments",
      },
    ],
  },
  seo: {
    title: "Engagement & Wedding Invitation | [Couple Names]",
    description: "You are cordially invited to celebrate the engagement and wedding of [Groom Name] & [Bride Name]. View event details, schedule, and venue.",
    canonicalUrl: "https://[your-domain.com]/",
    ogImage: "/assets/images/og-invitation.jpg",
  },
};
