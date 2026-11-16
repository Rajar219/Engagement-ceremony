'use client';

import React, { useState } from 'react';
import { Share2, Copy, Check, MailOpen } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

interface ShareBarProps {
  onReopenEnvelope: () => void;
}

export const ShareBar: React.FC<ShareBarProps> = ({ onReopenEnvelope }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    const text = encodeURIComponent(
      `💍 *You are cordially invited!*\n\n` +
      `Celebrate the Engagement Ceremony of *${invitationConfig.couple.groom.fullName} & ${invitationConfig.couple.bride.fullName}*\n\n` +
      `📅 *Date:* Sunday, 13th December 2026\n` +
      `⏰ *Time:* Evening 6:00 PM to 9:00 PM\n` +
      `📍 *Venue:* RSM Banquet Hall, Triplicane, Chennai\n\n` +
      `Kindly view the digital invitation & RSVP here:\n${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="w-full py-12 px-4 max-w-2xl mx-auto text-center">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-black/60 via-burgundy-950/40 to-black/60 border border-gold-500/30 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h4 className="font-serif font-bold text-white text-base">
            Share this Invitation
          </h4>
          <p className="text-xs text-gold-300/80 mt-0.5">
            Share the celebration with your loved ones
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={handleShareWhatsApp}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-black/60 hover:bg-gold-500/10 border border-gold-400/30 text-gold-200 font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-gold-400" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <button
            onClick={onReopenEnvelope}
            title="Replay Envelope Video"
            className="px-3.5 py-2.5 rounded-xl bg-gold-500/20 hover:bg-gold-500/30 border border-gold-400/40 text-gold-300 transition-all flex items-center justify-center"
          >
            <MailOpen className="w-4 h-4 text-gold-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
