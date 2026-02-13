
export enum Season {
  HEMANTA = 'Hemanta',
  GIMHA = 'Giṃha',
  VASSANA = 'Vassāna'
}

export enum YearType {
  NORMAL = 'Normal',
  ADHIKAMASA = 'Adhikamasa (Extra Month)',
  ADHIKAVARA = 'Adhikavara (Extra Day)'
}

export interface LunarDay {
  titthi: number; // 1 to 15
  isUposatha: boolean;
  isQuietDay: boolean;
  solarDate: Date;
  solarDateString: string; // Format: DD MMM (DDD)
}

export interface HalfLunarMonth {
  id: string;
  cycleNumber: number; // 1 to 24+
  seasonalPakkhaNumber: number; // 1 to 8 usually
  totalSeasonalPakkhas: number; // 8 or 10
  monthNumber: number; // 1 to 12 (or 8-8)
  isKanha: boolean;
  season: Season;
  daysCount: 14 | 15;
  days: LunarDay[];
  title: string;
  startDate: Date;
  endDate: Date;
}

export interface ThaiYear {
  beYear: number;
  adYear: number;
  yearType: YearType;
  halfMonths: HalfLunarMonth[];
}

export interface Nakshatra {
  number: number;
  pali: string;
  sanskrit: string;
  meaning: string;
  associatedStar: string;
  associatedStars: string;
  gregorianPeriod: string;
  symbol: string;
  deity: string;
  lord: string;
  indianZodiac: string;
  westernZodiac: string;
  season?: Season;
  pakkha?: string;
  imageUrl?: string;
  tithi14?: string;
  paliQuote?: string;
  qualityQuote?: string;
  eventQuote?: string;
  seasonQuote?: string;
}

export interface EventDef {
  id: string;
  name: string;
  type: 'Lunar' | 'Solar';
  description: string;
  season?: Season;
  seasonalPakkha?: number;
  tithi?: number;
  solarMonth?: number;
  solarDay?: number;
  theme?: string;
  quote?: string;
  ref?: string;
  location?: string;
  people?: string;
  sutta?: string;
  note?: string;
}

export interface GlossaryTerm {
  entryWord: string;
  description: string;
  paliSynonym1?: string;
  paliSynonym2?: string;
  sanskritSynonym?: string;
  englishSynonym?: string;
  japaneseSynonym?: string;
  category: 'Others' | 'Calendar Terms' | 'Utu' | 'Masa' | 'Nakkhatta' | 'Aha';
}

export interface TithiEntry {
  number: number;
  paliName: string;
  muṭṭhi: string;
  paliGrammar1: string;
  paliGrammar2: string;
  paliGrammar3: string;
}

export interface ScaleEntry {
  unit: string;
  entryWord: string;
  vedic: string;
  pie: string;
  paliSynonyms: [string, string, string];
  sanskritSynonyms: [string, string, string];
  englishSynonyms: [string, string, string];
  japaneseSynonyms: [string, string, string];
}
