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
    if (typeof window !== 'undefined' && window.location.origin) {
      return window.location.origin;
    }
    return 'https://vallarasu-priyanka-engagement.vercel.app';
  };

  const handleCopyLink = () => {
    const url = getShareUrl();
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    const url = getShareUrl();
    const text = encodeURIComponent(
      `💍 *${invitationConfig.couple.groom.fullName} & ${invitationConfig.couple.bride.fullName} திருமண நிச்சயதார்த்த அழைப்பிதழ்!*\n\n` +
      `📅 *நாள்:* 13th December 2026 • ஞாயிறு\n` +
      `⏰ *நேரம்:* மாலை 6:00 PM to 9:00 PM IST\n` +
      `📍 *இடம்:* RSM திருமண அரங்கம், திருவல்லிக்கேணி, சென்னை\n\n` +
      `அழைப்பிதழைப் பார்வையிட்டு தங்கள் வருகையை உறுதி செய்ய:\n${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section id="share-section" className="w-full py-12 px-4 max-w-2xl mx-auto text-center">
      {/* 12. INVITATION SHARING (LUXURY STATIONERY CARD) */}
      <div className="luxury-card p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h4 className="font-serif font-bold text-[#231c18] text-base">
            {language === 'ta' ? 'அழைப்பிதழைப் பகிர்க' : 'Share this Invitation'}
          </h4>
          <p className="text-xs text-[#5a4a42] mt-0.5 font-tamil">
            {language === 'ta'
              ? 'குடும்பத்தினர் மற்றும் நண்பர்களுடன் மகிழ்ச்சியைப் பகிருங்கள்'
              : 'Spread the joy with family & friends'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
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
                <span className="text-emerald-700 font-bold">{language === 'ta' ? 'நகலெடுக்கப்பட்டது!' : 'Copied!'}</span>
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
