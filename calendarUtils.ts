
import { HalfLunarMonth, Season, ThaiYear, LunarDay, YearType } from './types';
import { YEAR_CONFIG } from './data/config';

export const generateThaiYear = (adYear: number): ThaiYear => {
  const beYear = adYear + 543;
  const config = YEAR_CONFIG[beYear] || { 
    type: YearType.NORMAL, 
    startDate: new Date(adYear - 1, 10, 15) 
  };

  const halfMonths: HalfLunarMonth[] = [];
  let currentSolarDate = new Date(config.startDate);

  const sequence: { m: number; k: boolean; isSecond8?: boolean }[] = [];
  sequence.push({ m: 12, k: true });

  for (let m = 1; m <= 12; m++) {
    sequence.push({ m, k: false });
    if (m === 8 && config.type === YearType.ADHIKAMASA) {
      sequence.push({ m, k: true });
      sequence.push({ m, k: false, isSecond8: true });
      sequence.push({ m, k: true, isSecond8: true });
      continue; 
    }
    if (m < 12) {
      sequence.push({ m, k: true });
    }
  }

  // Calculate totals per season
  const hemantaTotal = sequence.filter((_, i) => i + 1 <= 8).length;
  const gimhaTotal = sequence.filter((_, i) => i + 1 > 8 && i + 1 <= 16).length;
  const vassanaTotal = sequence.filter((_, i) => i + 1 > 16).length;

  sequence.forEach((item, index) => {
    const cycleNum = index + 1;
    const isKanha = item.k;
    const monthNum = item.m;
    
    let length: 14 | 15 = 15;
    if (isKanha) {
      if (monthNum === 7 && config.type === YearType.ADHIKAVARA) {
        length = 15;
      } else if (monthNum % 2 !== 0) {
        length = 14;
      } else {
        length = 15;
      }
    } else {
      length = 15;
    }

    const pakkha = generatePakkha(
      beYear,
      cycleNum,
      monthNum,
      isKanha,
      length,
      currentSolarDate,
      !!item.isSecond8,
      hemantaTotal,
      gimhaTotal,
      vassanaTotal
    );
    
    halfMonths.push(pakkha);
    currentSolarDate = new Date(currentSolarDate);
    currentSolarDate.setDate(currentSolarDate.getDate() + length);
  });

  return {
    beYear,
    adYear,
    yearType: config.type,
    halfMonths
  };
};

const generatePakkha = (
  beYear: number, 
  cycleNum: number, 
  monthNum: number, 
  isKanha: boolean, 
  length: number, 
  startDate: Date,
  isSecond8: boolean,
  hTotal: number,
  gTotal: number,
  vTotal: number
): HalfLunarMonth => {
  let season = Season.HEMANTA;
  let seasonalNum = cycleNum;
  let totalSeasonal = hTotal;

  if (cycleNum <= hTotal) {
    season = Season.HEMANTA;
    seasonalNum = cycleNum;
    totalSeasonal = hTotal;
  } else if (cycleNum <= (hTotal + gTotal)) {
    season = Season.GIMHA;
    seasonalNum = cycleNum - hTotal;
    totalSeasonal = gTotal;
  } else {
    season = Season.VASSANA;
    seasonalNum = cycleNum - (hTotal + gTotal);
    totalSeasonal = vTotal;
  }

  const days: LunarDay[] = [];
  const runningDate = new Date(startDate);

  for (let i = 1; i <= length; i++) {
    const isUposatha = (i === 8) || (i === length);
    const isQuietDay = (i === 1) || (i === 9);
    
    days.push({
      titthi: i,
      isUposatha,
      isQuietDay,
      solarDate: new Date(runningDate),
      solarDateString: `${runningDate.getDate().toString().padStart(2, '0')} ${runningDate.toLocaleString('en-US', { month: 'short' })} (${runningDate.toLocaleString('en-US', { weekday: 'short' })})`
    });
    runningDate.setDate(runningDate.getDate() + 1);
  }

  const endDate = new Date(runningDate);
  endDate.setDate(endDate.getDate() - 1);

  const monthLabel = isSecond8 ? "Month 8-8" : `Month ${monthNum}`;

  return {
    id: `pakkha-${beYear}-${cycleNum}`,
    cycleNumber: cycleNum,
    seasonalPakkhaNumber: seasonalNum,
    totalSeasonalPakkhas: totalSeasonal,
    monthNumber: monthNum,
    isKanha,
    season,
    daysCount: length as 14 | 15,
    days,
    title: `${season} ${monthLabel} ${isKanha ? 'Kāḷa' : 'Sukka'}`,
    startDate: new Date(startDate),
    endDate
  };
};
