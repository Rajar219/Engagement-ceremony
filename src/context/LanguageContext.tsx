'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LanguageMode = 'bilingual' | 'ta' | 'en';

export interface Translations {
  // Navigation & Badges
  navCeremony: string;
  navBlessings: string;
  navSchedule: string;
  navFamily: string;
  navRSVP: string;
  topInvocation: string;

  // Section 0: Wax Seal Gate
  tapSealCTA: string;
  autoOpeningIn: string;
  skipIntro: string;

  // Section 1: Hero
  heroSubtitle: string;
  groomName: string;
  groomNameTamil: string;
  brideName: string;
  brideNameTamil: string;
  welcomeQuote: string;
  welcomeQuoteTamil: string;

  // Section 2: Scratch Date Card
  scratchSectionHeader: string;
  scratchRevealDate: string;
  scratchRevealDay: string;
  scratchHelperCaption: string;
  scratchStatusLabel: string;
  scratchInstantBtn: string;

  // Section 3: Main Ceremony Card
  ceremonyCardTitle: string;
  datePillLabel: string;
  datePillValue: string;
  timePillLabel: string;
  timePillValue: string;
  venuePillLabel: string;
  venuePillValue: string;
  viewMapBtn: string;
  addCalendarBtn: string;

  // Section 4: Blessings & Family Card
  blessingsSectionHeader: string;
  blessingsVerse: string;
  blessingsVerseTamil: string;
  familyBoxTitle: string;
  groomParentsTitle: string;
  groomParentsNames: string;
  brideParentsTitle: string;
  brideParentsNames: string;

  // Section 5: Celebration Highlights & Feast
  highlightsSectionHeader: string;
  itinerary1Title: string;
  itinerary1Time: string;
  itinerary1Desc: string;
  itinerary2Title: string;
  itinerary2Time: string;
  itinerary2Desc: string;
  itinerary3Title: string;
  itinerary3Time: string;
  itinerary3Desc: string;
  dressCodeNote: string;

  // Section 6: Directory ("அன்புடன் அழைக்கும்"), RSVP & Footer
  directoryCardTitle: string;
  dirGroomFamilyLabel: string;
  dirGroomFamilyValue: string;
  dirBrideFamilyLabel: string;
  dirBrideFamilyValue: string;
  dirRelativesLabel: string;
  dirRelativesValue: string;

  rsvpHeading: string;
  rsvpSubheading: string;
  rsvpPrompt: string;
  optBoth: string;
  optEngagement: string;
  optWedding: string;
  optDecline: string;
  labelName: string;
  labelPhone: string;
  labelGuests: string;
  labelWishes: string;
  rsvpSubmitBtn: string;
  rsvpSubmittingBtn: string;
  rsvpSuccessTitle: string;
  rsvpSuccessDesc: string;
  footerBlessing: string;
  footerSign: string;
}

const translationsData: Record<LanguageMode, Translations> = {
  bilingual: {
    navCeremony: 'Ceremony • நிகழ்வு',
    navBlessings: 'Blessings • ஆசிகள்',
    navSchedule: 'Schedule • நிரல்',
    navFamily: 'Family • இல்லத்தார்',
    navRSVP: 'RSVP • பதிவு',
    topInvocation: 'அன்புடன் அழைக்கின்றோம் • Cordially Welcoming You',

    tapSealCTA: 'Tap Seal to Open • முத்திரையைத் தட்டித் திறக்கவும்',
    autoOpeningIn: 'தானாக திறக்கப்படும் • Auto-opening in',
    skipIntro: 'Skip • தவிர் ➔',

    heroSubtitle: 'WITH DIVINE BLESSINGS OF OUR ELDERS & FAMILY / பெரியோர்கள் மற்றும் குடும்பத்தினரின் நல்லாசியுடன்',
    groomName: 'G. Vallarasu',
    groomNameTamil: 'ஞா. வல்லரசு',
    brideName: 'K. Priyanka',
    brideNameTamil: 'க. பிரியங்கா',
    welcomeQuote: '"Together with their families, cordially invite you to celebrate our Engagement & Wedding Celebration"',
    welcomeQuoteTamil: '"இருவீட்டாரும் இணைந்து தங்கள் இல்லத் திருமண நிச்சயதார்த்த விழாவிற்கு தங்களை அன்புடன் அழைக்கிறோம்"',

    scratchSectionHeader: 'Save the Date • தேதியைச் சுரண்டிப் பார்க்கவும்',
    scratchRevealDate: '13 • 12 • 2026',
    scratchRevealDay: 'ஞாயிறு (Sunday)',
    scratchHelperCaption: 'Scratch the gold seal to reveal our special day • பொன் முத்திரையைத் தேய்த்து நன்னாளை அறியவும்',
    scratchStatusLabel: '🪙 தேய்த்த நிலை • Scratched',
    scratchInstantBtn: 'தேதியை உடனே திறக்க தட்டவும் • Tap to Reveal Instantly',

    ceremonyCardTitle: 'Engagement & Wedding Celebration / திருமண நிச்சயதார்த்த விழா',
    datePillLabel: 'சுபமுகூர்த்த தேதி • Date',
    datePillValue: '13th December 2026 • ஞாயிறு (Sunday)',
    timePillLabel: 'நேரம் • Timings',
    timePillValue: '6:00 PM – 9:00 PM IST (மாலை 6:00 – இரவு 9:00 மணி)',
    venuePillLabel: 'இடம் • Venue',
    venuePillValue: 'RSM Banquet Hall, Chennai / ஆர்.எஸ்.எம் திருமண அரங்கம், சென்னை',
    viewMapBtn: 'View Location on Google Maps • வழித்தடம் காண்க',
    addCalendarBtn: 'Add to Calendar • நாட்காட்டியில் சேர்க்க',

    blessingsSectionHeader: 'Blessings & Family Invitation • குடும்பத்தினரின் நல்வரவேற்பு',
    blessingsVerse: 'With hearts full of gratitude and love, we invite you to grace the sacred union of G. Vallarasu and K. Priyanka with your warm presence and heartfelt prayers.',
    blessingsVerseTamil: 'அன்பும் பண்பும் நிறைந்த எங்கள் இல்லத்து மணமக்கள் ஞா. வல்லரசு & க. பிரியங்கா ஆகியோரின் திருமண நிச்சயதார்த்த நன்னாளில் தாங்கள் தங்கள் குடும்ப சகிதமாக வருகை தந்து வாழ்த்தி அருள அன்புடன் அழைக்கின்றோம்.',
    familyBoxTitle: 'Parents of Groom & Bride / மணமகன் & மணமகள் வீட்டார்',
    groomParentsTitle: "Groom's Parents • மணமகன் பெற்றோர்",
    groomParentsNames: 'Mr. V. Gnanasekar & Mrs. G. Meena (திரு. V. ஞானசேகர் & திருமதி G. மீனா)',
    brideParentsTitle: "Bride's Parents • மணமகள் பெற்றோர்",
    brideParentsNames: 'Mr. Kabali & Mrs. K. Sumathy (திரு. கபாலி & திருமதி K. சுமதி)',

    highlightsSectionHeader: 'நிகழ்வுகள் & விருந்து • Celebration & Dinner',
    itinerary1Title: 'Engagement Muhurtham • நிச்சயதார்த்தம்',
    itinerary1Time: '6:00 PM – 7:30 PM',
    itinerary1Desc: 'Sacred Ring Exchange & Traditional Muhurtham Rituals (சுபமுகூர்த்த மோதிரம் மாற்றுதல் மற்றும் வேத சடங்குகள்)',
    itinerary2Title: 'Reception & Music • வரவேற்பு நிகழ்ச்சி',
    itinerary2Time: '7:30 PM – 8:30 PM',
    itinerary2Desc: 'Joyous Felicitation, Photo Sessions & Classical Melodies (வாழ்த்துகள், புகைப்பட பதிவு மற்றும் இசை விருந்து)',
    itinerary3Title: 'Grand Dinner • இரவு விருந்து',
    itinerary3Time: '7:30 PM Onwards',
    itinerary3Desc: 'Royal Traditional South Indian Vegetarian Feast (அறுசுவை பாரம்பரிய சைவ விருந்து உபசரிப்பு)',
    dressCodeNote: 'Traditional / Festive Elegance • பாரம்பரிய பண்டிகை ஆடைகள்',

    directoryCardTitle: 'With Best Compliments From • அன்புடன் அழைக்கும்',
    dirGroomFamilyLabel: "Groom's Family / மணமகன் வீட்டார்",
    dirGroomFamilyValue: 'Mr. V. Gnanasekar, Mrs. G. Meena & Family (திரு. V. ஞானசேகர் & திருமதி G. மீனா குடும்பத்தினர்)',
    dirBrideFamilyLabel: "Bride's Family / மணமகள் வீட்டார்",
    dirBrideFamilyValue: 'Mr. Kabali, Mrs. K. Sumathy & Family (திரு. கபாலி & திருமதி K. சுமதி குடும்பத்தினர்)',
    dirRelativesLabel: 'Relatives & Friends / உற்றார் உறவினர் & நண்பர்கள்',
    dirRelativesValue: 'உற்றார், உறவினர்கள் மற்றும் நண்பர்கள் (Extended Family, Relatives & Friends)',

    rsvpHeading: 'Kindly RSVP • வருகைப் பதிவு',
    rsvpSubheading: 'Please confirm your attendance to help us arrange your gracious hospitality.',
    rsvpPrompt: 'Will you be joining us? • தங்கள் வருகையை உறுதிப்படுத்தவும்',
    optBoth: 'Both Events – Engagement & Wedding / இரண்டு நிகழ்வுகளும்',
    optEngagement: 'Engagement Only – 13 Dec 2026 / நிச்சயதார்த்தம் மட்டும்',
    optWedding: 'Wedding Only – Holy Matrimony / திருமணம் மட்டும்',
    optDecline: 'Unable to Attend – Warm Blessings / வருகை தர இயலவில்லை',
    labelName: 'Full Name • தங்கள் பெயர் *',
    labelPhone: 'Mobile / WhatsApp Number • வாட்ஸ்அப் எண் *',
    labelGuests: 'Number of Guests • வருகை தரும் நபர்கள்',
    labelWishes: 'Your Blessings / Message • நல்வாழ்த்துக்கள்',
    rsvpSubmitBtn: 'Confirm My RSVP • வருகையை உறுதி செய்க',
    rsvpSubmittingBtn: 'Recording Response • பதிவு செய்யப்படுகிறது...',
    rsvpSuccessTitle: 'Thank You for Being Part of Our Celebration',
    rsvpSuccessDesc: 'Your RSVP response has been safely recorded. We look forward to welcoming you!',
    footerBlessing: 'May divine grace, peace, and eternal love bless this sacred union.',
    footerSign: 'Gnanasekar & Kabali Families • ஞானசேகர் & கபாலி இல்லத்தார்',
  },

  ta: {
    navCeremony: 'நிகழ்வு',
    navBlessings: 'ஆசிகள்',
    navSchedule: 'நிரல்',
    navFamily: 'இல்லத்தார்',
    navRSVP: 'வருகைப் பதிவு',
    topInvocation: 'அன்புடன் அழைக்கின்றோம் • Cordially Welcoming You',

    tapSealCTA: 'முத்திரையைத் தட்டித் திறக்கவும்',
    autoOpeningIn: 'தானாக திறக்கப்படும் • மீதமுள்ள நேரம்',
    skipIntro: 'தவிர் ➔',

    heroSubtitle: 'பெரியோர்கள் மற்றும் குடும்பத்தினரின் நல்லாசியுடன்',
    groomName: 'ஞா. வல்லரசு',
    groomNameTamil: 'ஞா. வல்லரசு',
    brideName: 'க. பிரியங்கா',
    brideNameTamil: 'க. பிரியங்கா',
    welcomeQuote: '"இருவீட்டாரும் இணைந்து தங்கள் இல்லத் திருமண நிச்சயதார்த்த விழாவிற்கு தங்களை அன்புடன் அழைக்கிறோம்"',
    welcomeQuoteTamil: '"இருவீட்டாரும் இணைந்து தங்கள் இல்லத் திருமண நிச்சயதார்த்த விழாவிற்கு தங்களை அன்புடன் அழைக்கிறோம்"',

    scratchSectionHeader: 'தேதியைச் சுரண்டிப் பார்க்கவும்',
    scratchRevealDate: '13 • 12 • 2026',
    scratchRevealDay: 'ஞாயிற்றுக்கிழமை',
    scratchHelperCaption: 'பொன் முத்திரையைத் தேய்த்து சுபமுகூர்த்த நன்னாளை அறியவும்',
    scratchStatusLabel: 'சுரண்டிய நிலை',
    scratchInstantBtn: 'தேதியை உடனே திறக்க தட்டவும்',

    ceremonyCardTitle: 'திருமண நிச்சயதார்த்த பெருவிழா',
    datePillLabel: 'சுபமுகூர்த்த தேதி',
    datePillValue: '13 டிசம்பர் 2026 • ஞாயிற்றுக்கிழமை',
    timePillLabel: 'சுப நேரம்',
    timePillValue: 'மாலை 6:00 – இரவு 9:00 மணி வரை',
    venuePillLabel: 'விழா மண்டபம்',
    venuePillValue: 'ஆர்.எஸ்.எம் பேங்க்வெட் ஹால், திருவல்லிக்கேணி, சென்னை',
    viewMapBtn: 'வழித்தடம் காண்க (Google Maps)',
    addCalendarBtn: 'நாட்காட்டியில் சேர்க்க (Calendar)',

    blessingsSectionHeader: 'குடும்பத்தினரின் நல்வரவேற்பு',
    blessingsVerse: 'அன்பும் பண்பும் நிறைந்த எங்கள் இல்லத்து மணமக்கள் ஞா. வல்லரசு & க. பிரியங்கா ஆகியோரின் திருமண நிச்சயதார்த்த நன்னாளில் தாங்கள் தங்கள் குடும்ப சகிதமாக வருகை தந்து வாழ்த்தி அருள அன்புடன் அழைக்கின்றோம்.',
    blessingsVerseTamil: 'அன்பும் பண்பும் நிறைந்த எங்கள் இல்லத்து மணமக்கள் ஞா. வல்லரசு & க. பிரியங்கா ஆகியோரின் திருமண நிச்சயதார்த்த நன்னாளில் தாங்கள் தங்கள் குடும்ப சகிதமாக வருகை தந்து வாழ்த்தி அருள அன்புடன் அழைக்கின்றோம்.',
    familyBoxTitle: 'மணமகன் & மணமகள் வீட்டார்',
    groomParentsTitle: 'மணமகன் பெற்றோர்',
    groomParentsNames: 'திரு. V. ஞானசேகர் & திருமதி G. மீனா',
    brideParentsTitle: 'மணமகள் பெற்றோர்',
    brideParentsNames: 'திரு. கபாலி & திருமதி K. சுமதி',

    highlightsSectionHeader: 'நிகழ்வுகள் & விருந்து உபசரிப்பு',
    itinerary1Title: 'நிச்சயதார்த்த சுபமுகூர்த்தம்',
    itinerary1Time: 'மாலை 6:00 – 7:30 மணி',
    itinerary1Desc: 'சுபமுகூர்த்த மோதிரம் மாற்றுதல் மற்றும் வேத முறைப்படியான சடங்குகள்',
    itinerary2Title: 'வரவேற்பு & வாழ்த்து நிகழ்ச்சி',
    itinerary2Time: 'மாலை 7:30 – 8:30 மணி',
    itinerary2Desc: 'மணமக்களுக்கான வாழ்த்துகள் மற்றும் மெல்லிசை விருந்து',
    itinerary3Title: 'இரவு விருந்து',
    itinerary3Time: 'இரவு 7:30 மணி முதல்',
    itinerary3Desc: 'அறுசுவை பாரம்பரிய சைவ விருந்து உபசரிப்பு',
    dressCodeNote: 'பாரம்பரிய பட்டு ஆடைகள்',

    directoryCardTitle: 'அன்புடன் அழைக்கும் இல்லத்தார்',
    dirGroomFamilyLabel: 'மணமகன் வீட்டார்',
    dirGroomFamilyValue: 'திரு. V. ஞானசேகர், திருமதி G. மீனா மற்றும் குடும்பத்தினர்',
    dirBrideFamilyLabel: 'மணமகள் வீட்டார்',
    dirBrideFamilyValue: 'திரு. கபாலி, திருமதி K. சுமதி மற்றும் குடும்பத்தினர்',
    dirRelativesLabel: 'உற்றார் உறவினர் & நண்பர்கள்',
    dirRelativesValue: 'உற்றார், உறவினர்கள் மற்றும் நண்பர்கள் அனைவரும்',

    rsvpHeading: 'வருகைப் பதிவு (RSVP)',
    rsvpSubheading: 'தங்களுக்குத் தேவையான வசதிகளைச் சிறந்த முறையில் ஏற்பாடு செய்ய வருகையை உறுதிப்படுத்தவும்.',
    rsvpPrompt: 'தங்கள் வருகையை உறுதிப்படுத்தவும்',
    optBoth: 'இரண்டு நிகழ்வுகளும் – நிச்சயதார்த்தம் & திருமணம்',
    optEngagement: 'நிச்சயதார்த்தம் மட்டும் – 13 டிசம்பர் 2026',
    optWedding: 'திருமணம் மட்டும் – சுபமுகூர்த்த நன்னாள்',
    optDecline: 'வருகை தர இயலவில்லை – நல்வாழ்த்துகள்',
    labelName: 'தங்கள் முழுப் பெயர் *',
    labelPhone: 'வாட்ஸ்அப் அலைபேசி எண் *',
    labelGuests: 'வருகை தரும் நபர்களின் எண்ணிக்கை',
    labelWishes: 'தங்களின் நல்வாழ்த்துச் செய்தி',
    rsvpSubmitBtn: 'வருகையை உறுதி செய்க',
    rsvpSubmittingBtn: 'பதிவு செய்யப்படுகிறது...',
    rsvpSuccessTitle: 'தங்களின் வருகைப் பதிவிற்கு மனமார்ந்த நன்றி',
    rsvpSuccessDesc: 'தங்களின் பதிவு வெற்றிகரமாகப் பெறப்பட்டது. தங்களை அன்புடன் வரவேற்கக் காத்திருக்கிறோம்!',
    footerBlessing: 'எல்லாம் வல்ல இறைவன் அருளால் அன்பு, அமைதி மற்றும் மகிழ்ச்சி தழைத்தோங்கட்டும்.',
    footerSign: 'ஞானசேகர் & கபாலி குடும்பத்தினர்',
  },

  en: {
    navCeremony: 'Ceremony',
    navBlessings: 'Blessings',
    navSchedule: 'Schedule',
    navFamily: 'Family',
    navRSVP: 'RSVP',
    topInvocation: 'Cordially Welcoming You',

    tapSealCTA: 'Tap Seal to Open',
    autoOpeningIn: 'Auto-opening in',
    skipIntro: 'Skip ➔',

    heroSubtitle: 'WITH DIVINE BLESSINGS OF OUR ELDERS & FAMILY',
    groomName: 'G. Vallarasu',
    groomNameTamil: 'ஞா. வல்லரசு',
    brideName: 'K. Priyanka',
    brideNameTamil: 'க. பிரியங்கா',
    welcomeQuote: '"Together with their families, cordially invite you to celebrate our Engagement & Wedding Celebration"',
    welcomeQuoteTamil: '"இருவீட்டாரும் இணைந்து தங்கள் இல்லத் திருமண நிச்சயதார்த்த விழாவிற்கு தங்களை அன்புடன் அழைக்கிறோம்"',

    scratchSectionHeader: 'Save the Date',
    scratchRevealDate: '13 • 12 • 2026',
    scratchRevealDay: 'Sunday',
    scratchHelperCaption: 'Scratch the gold seal to reveal our special day',
    scratchStatusLabel: 'Scratched',
    scratchInstantBtn: 'Tap to Reveal Instantly',

    ceremonyCardTitle: 'Engagement & Wedding Celebration',
    datePillLabel: 'Auspicious Date',
    datePillValue: 'Sunday, 13th December 2026',
    timePillLabel: 'Ceremony Timings',
    timePillValue: '6:00 PM – 9:00 PM IST',
    venuePillLabel: 'Venue',
    venuePillValue: 'RSM Banquet Hall, Triplicane, Chennai',
    viewMapBtn: 'View Location on Google Maps',
    addCalendarBtn: 'Add to Calendar',

    blessingsSectionHeader: 'Blessings & Family Invitation',
    blessingsVerse: 'With hearts full of gratitude and love, we invite you to grace the sacred union of G. Vallarasu and K. Priyanka with your warm presence and heartfelt prayers.',
    blessingsVerseTamil: 'அன்பும் பண்பும் நிறைந்த எங்கள் இல்லத்து மணமக்கள் ஞா. வல்லரசு & க. பிரியங்கா ஆகியோரின் திருமண நிச்சயதார்த்த நன்னாளில் தாங்கள் தங்கள் குடும்ப சகிதமாக வருகை தந்து வாழ்த்தி அருள அன்புடன் அழைக்கின்றோம்.',
    familyBoxTitle: 'Parents of Groom & Bride',
    groomParentsTitle: "Groom's Parents",
    groomParentsNames: 'Mr. V. Gnanasekar & Mrs. G. Meena',
    brideParentsTitle: "Bride's Parents",
    brideParentsNames: 'Mr. Kabali & Mrs. K. Sumathy',

    highlightsSectionHeader: 'Celebration Highlights & Dinner',
    itinerary1Title: 'Engagement Muhurtham',
    itinerary1Time: '6:00 PM – 7:30 PM',
    itinerary1Desc: 'Sacred Ring Exchange & Traditional Muhurtham Rituals',
    itinerary2Title: 'Reception & Music',
    itinerary2Time: '7:30 PM – 8:30 PM',
    itinerary2Desc: 'Joyous Felicitation, Photo Sessions & Music',
    itinerary3Title: 'Grand Dinner Feast',
    itinerary3Time: '7:30 PM Onwards',
    itinerary3Desc: 'Royal Traditional South Indian Vegetarian Dinner',
    dressCodeNote: 'Traditional / Festive Elegance',

    directoryCardTitle: 'With Best Compliments From',
    dirGroomFamilyLabel: "Groom's Family",
    dirGroomFamilyValue: 'Mr. V. Gnanasekar, Mrs. G. Meena & Family',
    dirBrideFamilyLabel: "Bride's Family",
    dirBrideFamilyValue: 'Mr. Kabali, Mrs. K. Sumathy & Family',
    dirRelativesLabel: 'Relatives & Friends',
    dirRelativesValue: 'Extended Family, Relatives & Friends',

    rsvpHeading: 'Kindly RSVP',
    rsvpSubheading: 'Please let us know your attendance to help us make comfortable arrangements for you.',
    rsvpPrompt: 'Will you be joining us?',
    optBoth: 'Both Events – Engagement & Wedding',
    optEngagement: 'Engagement Only – 13 December 2026',
    optWedding: 'Wedding Only – Holy Matrimony',
    optDecline: 'Unable to Attend – Warm Blessings',
    labelName: 'Full Name *',
    labelPhone: 'Mobile / WhatsApp Number *',
    labelGuests: 'Number of Guests',
    labelWishes: 'Your Blessings / Message',
    rsvpSubmitBtn: 'Confirm My RSVP',
    rsvpSubmittingBtn: 'Recording Response...',
    rsvpSuccessTitle: 'Thank You for Being Part of Our Celebration',
    rsvpSuccessDesc: 'Your RSVP response has been safely recorded. We look forward to celebrating with you!',
    footerBlessing: 'May divine grace, peace, and eternal love bless this sacred union.',
    footerSign: 'Gnanasekar & Kabali Families',
  },
};

interface LanguageContextType {
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'bilingual',
  setLanguage: () => { },
  t: translationsData.bilingual,
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageMode>('bilingual');

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translationsData[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
