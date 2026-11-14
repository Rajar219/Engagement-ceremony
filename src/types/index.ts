export interface RSVP {
  id: string;
  name: string;
  email: string;
  phone: string;
  attending: 'yes' | 'no';
  guestsCount: number;
  dietaryPreference?: string;
  songRequest?: string;
  message?: string;
  createdAt: string;
}

export interface Wish {
  id: string;
  name: string;
  relation: string;
  message: string;
  likes: number;
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
  iconName: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'candid' | 'portrait' | 'celebration' | 'travel';
  src: string;
  caption?: string;
}
