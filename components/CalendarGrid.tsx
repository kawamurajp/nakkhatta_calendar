import React, { useState } from 'react';
import { HalfLunarMonth, Season, EventDef } from '../types';
import { BUDDHIST_SYMBOLS } from '../constants';
import { NAKSHATRAS } from '../data/nakkhattas';
import { BUDDHIST_MONTH_NAMES } from '../data/months';
import { EVENTS_DB } from '../data/events';

interface CalendarGridProps {
  halfMonth: HalfLunarMonth;
  beYear: number;
  adYear: number;
  nakkhattaImages: Record<number, string | null>;
}

const WikiLink: React.FC<{ query: string; children: React.ReactNode; className?: string }> = ({ query, children, className }) => (
  <a 
    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={`hover:text-emerald-700 transition-all cursor-help ${className || ''}`}
    title={`Learn about ${query} on Wikipedia`}
  >
    {children}
  </a>
);

const DayCell: React.FC<{ day: any; isLast: boolean; isKanha: boolean; paliData: { term: string; full: string; query: string } | null; events: EventDef[] }> = ({ day, isLast, isKanha, paliData, events }) => {
  const isEightDay = day.titthi === 8;
  const isSunday = new Date(day.solarDate).getDay() === 0;
  const isMoonDay = !!paliData;
  const isSukka = !isKanha;
  
  // Lighter, softer backgrounds
  const bgColor = isMoonDay ? 'bg-emerald-50/60' : 'bg-white';
  const borderColor = isMoonDay ? 'border-emerald-100/60' : 'border-stone-100/60';

  return (
    <div className={`relative border ${borderColor} h-full flex flex-col p-1.5 transition-all rounded-xl overflow-hidden ${bgColor} hover:bg-emerald-50/30 shadow-sm`}>
      
      {/* Background Moon Image */}
      {isMoonDay && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-100">
          <div className="scale-[2.4] transform translate-y-1">
             {isEightDay && (isKanha ? BUDDHIST_SYMBOLS.halfMoonLeft : BUDDHIST_SYMBOLS.halfMoonRight)}
             {isLast && (isKanha ? BUDDHIST_SYMBOLS.newMoon : BUDDHIST_SYMBOLS.fullMoon)}
          </div>
        </div>
      )}

      {/* Background Watermark Number - Centered */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
        <span className="text-5xl md:text-6xl font-bold text-transparent opacity-5 tracking-tighter leading-none" style={{ WebkitTextStroke: '1px rgba(16, 185, 129, 0.25)' }}>
          {day.titthi}
        </span>
      </div>

      {/* Top Section */}
      <div className="relative z-30 flex flex-col gap-0.5 items-start w-full">
        <div className="flex justify-between w-full h-3">
          {day.isQuietDay && (
            <div className="text-[5px] font-bold text-emerald-800 uppercase tracking-tighter bg-emerald-50 px-1 rounded shadow-sm border border-emerald-100/50">
              ★ QUIET DAY
            </div>
          )}
        </div>
        {/* Event Labels */}
        <div className="flex flex-col gap-0.5 w-full">
          {events.map(evt => (
            <div key={evt.id} className="text-[5px] font-bold text-emerald-900 uppercase tracking-tighter bg-emerald-100/40 px-1 py-0.5 rounded shadow-sm leading-none truncate w-full" title={evt.name}>
              ● {evt.name}
            </div>
          ))}
        </div>
      </div>

      {/* Middle Section */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center pointer-events-none min-h-0 py-0.5">
        {isMoonDay && paliData && (
          <div className="flex flex-col items-center gap-0 px-2 py-1 rounded-lg pointer-events-auto transition-all bg-white/60 backdrop-blur-[1px] border border-white/40">
            <WikiLink query={paliData.query} className="text-[10px] font-bold uppercase tracking-tight text-emerald-950 text-center leading-[1.1] drop-shadow-sm serif-font">
              {paliData.term}
            </WikiLink>
            <div className="text-[5px] font-bold text-emerald-700/80 uppercase tracking-tighter leading-none whitespace-nowrap mt-0.5">
               ({paliData.full.split('(')[1]}
            </div>
            {isLast && (
              <div className="text-[6px] font-medium text-stone-400 uppercase mt-0.5 whitespace-nowrap">
                {day.solarDateString.split(' ').slice(0, 2).join(' ')} ({day.solarDate.toLocaleString('en-US', { weekday: 'short' })})
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="relative z-30 flex justify-center mt-auto pb-0.5 min-h-[14px]">
        {(isSunday && !isMoonDay) && (
          <div className="text-[7px] font-medium py-0.5 px-1.5 rounded-full border border-emerald-100/30 flex items-center gap-0.5 bg-white/80 shadow-sm text-stone-500">
            <div className="scale-[0.3] opacity-60 text-emerald-600">{BUDDHIST_SYMBOLS.sun}</div>
            <span className="tracking-tighter whitespace-nowrap">
              {day.solarDateString.split(' ').slice(0, 2).join(' ')} ({day.solarDate.toLocaleString('en-US', { weekday: 'short' })})
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const CalendarGrid: React.FC<CalendarGridProps> = ({ halfMonth, beYear, adYear }) => {
  const [imageError, setImageError] = useState(false);
  const upperRowDays = halfMonth.days.slice(0, 8);
  const lowerRowDays = halfMonth.days.slice(8);
  const isKala = halfMonth.isKanha;

  const formatDate = (date: Date) => {
    const month = date.toLocaleString('en-US', { month: 'short' });
    return `${month}. ${date.getDate()}`;
  };

  const dateRange = `${formatDate(halfMonth.startDate)} - ${formatDate(halfMonth.endDate)}`;

  const getPaliTerm = (isKala: boolean, titthi: number, isLast: boolean) => {
    if (!isKala && isLast) return { term: "Puṇṇamī", full: "Puṇṇamī (Full Moon)", query: "Purnima" };
    if (isKala && isLast) return { term: "Amāvasī", full: "Amāvasī (New Moon)", query: "Amavasya" };
    if (!isKala && titthi === 8) return { term: "Sukka Aṭṭhamī", full: "Sukka Aṭṭhamī (Waxing 8th)", query: "Uposatha" };
    if (isKala && titthi === 8) return { term: "Kāḷa Aṭṭhamī", full: "Kāḷa Aṭṭhamī (Waning 8th)", query: "Uposatha" };
    return null;
  };

  const getDayEvents = (day: any) => {
    return EVENTS_DB.filter(evt => {
      if (evt.type === 'Solar') {
        return evt.solarMonth === day.solarDate.getMonth() && evt.solarDay === day.solarDate.getDate();
      } else {
        return evt.season === halfMonth.season && 
               evt.seasonalPakkha === halfMonth.seasonalPakkhaNumber && 
               evt.tithi === day.titthi;
      }
    });
  };

  const constellations = React.useMemo(() => {
    const pakkhaStr = halfMonth.seasonalPakkhaNumber.toString();
    return NAKSHATRAS.filter(n => 
      n.season === halfMonth.season && 
      (n.pakkha === pakkhaStr || n.pakkha?.split('-').includes(pakkhaStr) || n.pakkha?.includes(pakkhaStr))
    ).sort((a, b) => a.number - b.number);
  }, [halfMonth]);

  const nak1 = constellations[0] || null;

  const monthName = BUDDHIST_MONTH_NAMES[halfMonth.monthNumber - 1]?.split(' (')[0] || `Month ${halfMonth.monthNumber}`;
  const moonPhase = isKala ? "KĀḶA" : "SUKKA";

  return (
    <div className={`calendar-grid-container flex flex-col gap-0.5 w-full p-8 bg-white relative transition-all duration-500 h-full overflow-hidden`}>
      
      {/* Header Section: Season Title + Denominator + Info Box to the right */}
      <div className="flex flex-row items-end justify-center gap-6 mb-6 pt-4 z-10 relative w-full">
        {/* Main Title */}
        <div className="flex items-baseline gap-3">
          <h2 className="text-5xl font-bold text-emerald-950 tracking-tighter uppercase italic serif-font">
            {halfMonth.season.toUpperCase()} {halfMonth.seasonalPakkhaNumber}
          </h2>
          <span className="text-3xl font-medium text-stone-300 italic serif-font">
            / {halfMonth.totalSeasonalPakkhas}
          </span>
        </div>

        {/* Info Box (Moved to right of title) */}
        <div className="border-l-2 border-emerald-100 pl-6 flex flex-col justify-center pb-1">
          <div className="text-emerald-700 font-bold text-[11px] uppercase tracking-wider serif-font leading-none mb-1">
            {halfMonth.monthNumber} {monthName.toUpperCase()} {moonPhase}
          </div>
          <div className="text-[9px] text-stone-400 font-medium tracking-tight italic">
            ({dateRange})
          </div>
        </div>
      </div>

      {/* Floating BE/AD Year (Top Right Corner) */}
      <div className="absolute top-8 right-12 text-right z-20 opacity-60">
        <div className="text-emerald-900 font-bold text-lg leading-none tracking-tighter serif-font">BE {beYear}</div>
        <div className="text-stone-400 font-medium text-[8px] uppercase mt-0.5 tracking-[0.15em]">AD {adYear}</div>
      </div>

      {/* Calendar Grid Section */}
      <div className="flex-1 flex flex-col gap-2 relative z-10 min-h-0 py-2 px-2">
        <div className="grid grid-cols-8 gap-2 flex-1 min-h-0">
          {upperRowDays.map((day) => (
            <DayCell 
              key={day.titthi} 
              day={day} 
              isLast={false} 
              isKanha={isKala} 
              paliData={getPaliTerm(isKala, day.titthi, false)} 
              events={getDayEvents(day)}
            />
          ))}
        </div>

        <div className="grid grid-cols-8 gap-2 flex-1 min-h-0">
          {lowerRowDays.map((day) => (
            <DayCell 
              key={day.titthi} 
              day={day} 
              isLast={day.titthi === halfMonth.daysCount} 
              isKanha={isKala} 
              paliData={getPaliTerm(isKala, day.titthi, day.titthi === halfMonth.daysCount)} 
              events={getDayEvents(day)}
            />
          ))}
          {Array.from({ length: 8 - lowerRowDays.length }).map((_, i) => (
             <div key={`empty-${i}`} className="border border-transparent"></div>
          ))}
        </div>
      </div>

      {/* Nakkhatta Section */}
      <div className="mt-6 flex flex-col items-center justify-center relative z-10 h-[220px]">
        {nak1 ? (
          <div className="flex items-center gap-16 w-full max-w-5xl px-8">
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="relative mb-2">
                <span className="absolute -top-3 -left-8 text-[10px] font-medium text-stone-300">#{nak1.number}</span>
                {/* Reduced font size, removed star, softer font weight */}
                <WikiLink query={nak1.pali} className="text-6xl font-bold text-emerald-950 uppercase tracking-tighter leading-none block serif-font">
                    {nak1.pali}
                </WikiLink>
              </div>
              
              <div className="text-xl font-medium text-emerald-600/80 italic leading-tight mt-1 serif-font">
                "{nak1.meaning}"
              </div>

              <div className="mt-5 w-1/3 h-[1px] bg-stone-100 mb-3"></div>

              <div className="flex flex-col items-center gap-1">
                 <span className="text-[8px] text-stone-300 font-bold uppercase tracking-[0.25em]">Celestial Mansion Alignment</span>
                 <WikiLink query={nak1.associatedStars} className="text-[11px] text-stone-400 font-medium leading-tight italic flex items-center gap-1">
                    <span>★</span> {nak1.associatedStars}
                 </WikiLink>
              </div>
            </div>

            {/* Constellation Image */}
            <div className="w-56 h-56 flex-shrink-0 flex items-center justify-center group overflow-hidden bg-transparent">
              {nak1.imageUrl && !imageError ? (
                <img 
                  src={nak1.imageUrl} 
                  alt={nak1.pali} 
                  className="max-w-full max-h-full object-contain opacity-90 transition-transform group-hover:scale-105 group-hover:opacity-100" 
                  crossOrigin="anonymous"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="text-[9px] text-stone-300 uppercase tracking-widest font-bold flex flex-col items-center gap-1">
                   No Image
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
             <span className="text-stone-300 text-[10px] uppercase font-bold tracking-[0.5em] italic serif-font">Seasonal Transit Interval</span>
          </div>
        )}

        {/* Quote section */}
        <div className="w-full mt-4 pt-4 border-t border-emerald-50/40 flex flex-col items-center justify-center gap-1 overflow-hidden">
          <div className="text-emerald-900/50 text-[10px] font-medium serif-font italic whitespace-nowrap overflow-hidden text-ellipsis w-full max-w-7xl px-8 text-center">
            {halfMonth.season === Season.GIMHA && `[Ref.G] "As the sun blazes in Giṃha, let the heart find cool refuge in the Dhamma-forest."`}
            {halfMonth.season === Season.HEMANTA && `[Ref.H] "Cold winds of Hemanta remind the wise to kindle the inner fire of Samādhi."`}
            {halfMonth.season === Season.VASSANA && `[Ref.V] "Vassāna rains nourish the earth; so does the Dhamma wash away the stains of the heart."`}
          </div>
          {nak1?.paliQuote && (
             <div className="text-stone-400/80 text-[9px] font-serif italic whitespace-nowrap overflow-hidden text-ellipsis w-full max-w-7xl px-8 text-center">
               [Ref.{nak1.number}] "{nak1.paliQuote} — {nak1.qualityQuote || 'Auspicious moment.'}"
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;