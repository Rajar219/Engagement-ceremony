declare module 'lucide-react' {
  import * as React from 'react';
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }
  export type LucideIcon = React.FC<LucideProps>;

  export const MailOpen: LucideIcon;
  export const Play: LucideIcon;
  export const Volume2: LucideIcon;
  export const VolumeX: LucideIcon;
  export const Sparkles: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const Calendar: LucideIcon;
  export const CalendarCheck: LucideIcon;
  export const Clock: LucideIcon;
  export const MapPin: LucideIcon;
  export const Heart: LucideIcon;
  export const Bell: LucideIcon;
  export const Check: LucideIcon;
  export const Gift: LucideIcon;
  export const HeartHandshake: LucideIcon;
  export const Navigation: LucideIcon;
  export const Copy: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Building: LucideIcon;
  export const Info: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const XCircle: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const Send: LucideIcon;
  export const User: LucideIcon;
  export const Phone: LucideIcon;
  export const Mail: LucideIcon;
  export const Users: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const Edit3: LucideIcon;
  export const Share2: LucideIcon;
  export const Music: LucideIcon;
  export const Award: LucideIcon;
  export const Lock: LucideIcon;
  export const Search: LucideIcon;
  export const Download: LucideIcon;
  export const LogOut: LucideIcon;
  export const RefreshCw: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Eye: LucideIcon;

  const icons: Record<string, LucideIcon>;
  export default icons;
}
