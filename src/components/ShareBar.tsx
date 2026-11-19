'use client';

import React, { useState } from 'react';
import { Share2, Copy, Check, MailOpen } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';
import { useLanguage } from '@/context/LanguageContext';

interface ShareBarProps {
  onReopenEnvelope: () => void;
}

export const ShareBar: React.FC<ShareBarProps> = ({ onReopenEnvelope }) => {
  const [copied, setCopied] = useState(false);
  const { t, language } = useLanguage();

  const getShareUrl = () => {
    return 'https://vallarasu-priyanka-engagement.vercel.app/';
  };

  const handleCopyLink = () => {
    const url = getShareUrl();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleShareWhatsApp = () => {
    const url = getShareUrl();
    const text = encodeURIComponent(
      `With immense joy, we invite you to celebrate the Engagement Ceremony of Vallalarasu & Priyanka.\n\n` +
      `Sunday, 13 December 2026\n` +
      `6:00 PM onwards\n` +
      `RSM Banquet Hall, Triplicane, Chennai.\n\n` +
      `Your gracious presence and blessings will make our celebration special.\n\n` +
      `View our invitation:\n${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section id="share-section" className="relative z-[2] w-full py-12 px-4 max-w-2xl mx-auto text-center">
      {/* 12. INVITATION SHARING (LUXURY STATIONERY CARD) */}
      <div className="luxury-card p-6 shadow-xl flex flex-col items-center justify-between gap-4 text-center">
        <div className="flex flex-col items-center gap-0.5 text-center">
          <h4 className="font-serif font-bold text-[#231c18] text-base">
            Share this Invitation
          </h4>
          <h4 className="font-tamil-heading font-bold text-[#231c18] text-base mb-1">
            அழைப்பிதழைப் பகிர்க
          </h4>
          <p className="text-xs text-[#5a4a42] font-serif italic">
            Spread the joy with family &amp; friends
          </p>
          <p className="text-xs text-[#5a4a42] font-tamil">
            குடும்பத்தினர் மற்றும் நண்பர்களுடன் மகிழ்ச்சியைப் பகிருங்கள்
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full">
          <button
            onClick={handleShareWhatsApp}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 font-tamil-sans cursor-pointer shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#faf8f4] hover:bg-[#c5a059]/15 border border-[#c5a059]/35 text-[#231c18] font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 font-tamil-sans cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">{language === 'ta' ? 'அழைப்பிதழ் இணைப்பு நகலெடுக்கப்பட்டது!' : 'Invitation link copied successfully!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#a88136]" />
                <span>{language === 'ta' ? 'இணைப்பை நகலெடு' : 'Copy Link'}</span>
              </>
            )}
          </button>

          <button
            onClick={onReopenEnvelope}
            title={language === 'ta' ? 'மீண்டும் பார்க்க' : 'Replay Invitation'}
            className="px-3.5 py-2.5 rounded-xl bg-[#231c18] hover:bg-[#352b24] border border-[#c5a059]/40 text-[#c5a059] transition-all flex items-center justify-center active:scale-95 cursor-pointer shadow-sm"
          >
            <MailOpen className="w-4 h-4 text-[#c5a059]" />
          </button>
        </div>
      </div>
    </section>
  );
};
