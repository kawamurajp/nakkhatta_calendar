
import { EventDef, Season } from '../types';

export const EVENTS_DB: EventDef[] = [
  {
    id: 'lpc-memorial',
    name: "Luang Por Chah's Memorial Day",
    type: 'Solar',
    description: "Commemoration of the passing of Ajahn Chah (Phra Bodhinyana Thera), the founder of the forest lineage tradition.",
    solarMonth: 0, // January
    solarDay: 16,
    theme: "Gratitude",
    quote: "If you let go a little, you will have a little peace.",
    ref: "Food for the Heart",
    location: "Wat Pah Pong",
    people: "Ajahn Chah",
    note: "Gathering of Sangha"
  },
  {
    id: 'magha-puja',
    name: "Māgha Pūjā",
    type: 'Lunar',
    description: "The 'Fourfold Assembly' where 1,250 Arahants gathered spontaneously to hear the Ovāda-pāṭimokkha.",
    season: Season.HEMANTA,
    seasonalPakkha: 8,
    tithi: 15,
    theme: "Discipline",
    quote: "Cease from evil, do good, cleanse the mind.",
    ref: "Ovāda-pāṭimokkha Gatha",
    sutta: "Digha Nikaya 16"
  }
];
