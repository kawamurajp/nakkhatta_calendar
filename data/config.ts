
import { YearType } from '../types';

/**
 * Configuration for specific years matching the Splendid Moons (Mahānikāya Pakkhakhana) logic.
 * The startDate refers to Pakkha 1 of the cycle, which is always Month 12 Kanha.
 * Source: https://splendidmoons.github.io/
 */
export const YEAR_CONFIG: Record<number, { type: YearType; startDate: Date }> = {
  2566: { type: YearType.ADHIKAMASA, startDate: new Date(2022, 10, 24) }, // Nov 24, 2022 (12-K starts)
  2567: { type: YearType.NORMAL, startDate: new Date(2023, 10, 14) },     // Nov 14, 2023 (12-K starts)
  2568: { type: YearType.ADHIKAVARA, startDate: new Date(2024, 10, 16) }, // Nov 16, 2024 (12-K starts)
  2569: { type: YearType.ADHIKAMASA, startDate: new Date(2025, 10, 6) },  // Nov 6, 2025  (12-K starts)
  2570: { type: YearType.NORMAL, startDate: new Date(2026, 10, 26) },     // Nov 26, 2026 (12-K starts)
};
