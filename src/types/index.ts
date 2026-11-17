export type InvitationCinematicState =
  | 'INITIAL_ENVELOPE'
  | 'SEAL_BREAKING'
  | 'ENVELOPE_PLAYING'
  | 'FLASH_TRANSITION'
  | 'HERO_PLAYING'
  | 'INVITATION_SCROLLING';

export interface RSVP {
  id: string;
  name: string;
  email?: string;
  phone: string;
  attending: 'both' | 'engagement' | 'wedding' | 'declined';
  guestsCount: number;
  message?: string;
  createdAt: string;
}

export interface Wish {
  id: string;
  name: string;
  relation?: string;
  message: string;
  likes: number;
  approved?: boolean;
  createdAt: string;
}

export interface Milestone {
  date: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
}

export interface EventScheduleItem {
  time: string;
  title: string;
  description: string;
  dressCode?: string;
  iconName?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'couple' | 'engagement' | 'moments';
  src: string;
  caption?: string;
}
