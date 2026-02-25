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
  imageUrl?: string;
  nakkhattaImages: Record<number, string | null>;
  isCurrent?: boolean;
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

const CommonsLink: React.FC<{ imageUrl: string; children: React.ReactNode; className?: string }> = ({ imageUrl, children, className }) => (
  <a 
    href={imageUrl} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={`block ${className || ''}`}
  >
    {children}
  </a>
);

const DayCell: React.FC<{ day: any; isLast: boolean; isKanha: boolean; paliData: { term: string; full: string; query: string } | null; events: EventDef[] }> = ({ day, isLast, isKanha, paliData, events }) => {
  const isEightDay = day.titthi === 8;
  const isSunday = new Date(day.solarDate).getDay() === 0;
  const isMoonDay = !!paliData;
  const isSukka = !isKanha;
  
  const bgColor = 'bg-transparent';

  return (
    <div className={`relative border border-stone-300 h-full flex flex-col p-1 transition-all rounded-lg overflow-hidden ${bgColor} hover:bg-stone-50 shadow-sm`}>
      
      {/* Background Moon Image */}
      {isMoonDay && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-100">
          <div className="scale-[2.4] transform translate-y-1">
             {isEightDay && (isKanha ? BUDDHIST_SYMBOLS.halfMoonLeft : BUDDHIST_SYMBOLS.halfMoonRight)}
             {isLast && (isKanha ? BUDDHIST_SYMBOLS.newMoon : BUDDHIST_SYMBOLS.fullMoon)}
          </div>
        </div>
      )}

      {/* Background Watermark Number */}
      <div className="absolute bottom-1 right-1 select-none pointer-events-none z-10">
        <span className="text-4xl md:text-5xl font-black text-transparent opacity-10 tracking-tighter leading-none" style={{ WebkitTextStroke: '1px rgba(16, 185, 129, 0.2)' }}>
          {day.titthi}
        </span>
      </div>

      {/* Top Section */}
      <div className="relative z-30 flex flex-col gap-0.5 items-start w-full">
        <div className="flex justify-between w-full h-3">
          {day.isQuietDay && (
            <div className="text-[5px] font-black text-emerald-800 uppercase tracking-tighter bg-emerald-100/50 px-1 rounded shadow-sm border border-emerald-200/30">
              ★ QUIET DAY
            </div>
          )}
        </div>
        {/* Event Labels */}
        <div className="flex flex-col gap-0.5 w-full">
          {events.map(evt => (
            <div key={evt.id} className="text-[5px] font-black text-emerald-950 uppercase tracking-tighter bg-emerald-300/60 px-1 py-0.5 rounded shadow-sm leading-none truncate w-full" title={evt.name}>
              ● {evt.name}
            </div>
          ))}
        </div>
      </div>

      {/* Middle Section */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center pointer-events-none min-h-0 py-0.5">
        {isMoonDay && paliData && (
          <div className="flex flex-col items-center gap-0 px-1 py-1 rounded-sm pointer-events-auto transition-all">
            <WikiLink query={paliData.query} className="text-[10px] font-bold uppercase tracking-tight text-emerald-950 text-center leading-[1.1] drop-shadow-sm serif-font">
              {paliData.term}
            </WikiLink>
            <div className="text-[5px] font-bold text-emerald-700 uppercase tracking-tighter leading-none whitespace-nowrap mt-0.5">
               ({paliData.full.split('(')[1]}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="relative z-30 flex justify-center mt-auto pb-0.5 min-h-[14px]">
        {(isSunday || isMoonDay) && (
          <div className={`text-[7px] font-bold py-0.5 px-1.5 rounded-full border border-emerald-100/30 flex items-center gap-0.5 bg-white/60 shadow-sm text-stone-500 ${isSunday ? 'text-emerald-700' : ''}`}>
            {isSunday && <div className="scale-[0.3] opacity-80 text-emerald-600">{BUDDHIST_SYMBOLS.sun}</div>}
            <span className="tracking-tighter whitespace-nowrap">
              {day.solarDateString.split(' ').slice(0, 2).join(' ')} ({day.solarDate.toLocaleString('en-US', { weekday: 'short' })})
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const CalendarGrid: React.FC<CalendarGridProps> = ({ halfMonth, beYear, adYear, imageUrl, nakkhattaImages, isCurrent }) => {
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
    if (titthi === 8) return { term: "Aṭṭhamī", full: "Aṭṭhamī (8th)", query: "Uposatha" };
    if (isLast) {
      if (titthi === 14) return { term: "Cātuddasī", full: "Cātuddasī (14th)", query: "Uposatha" };
      if (titthi === 15) return { term: "Pañcadasī", full: "Pañcadasī (15th)", query: "Purnima" };
    }
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
  const moonPhase = isKala ? "Kāḷa" : "Sukka";

  return (
    <div className={`calendar-grid-container flex flex-col gap-0.5 w-full p-6 bg-white relative transition-all duration-500 h-full overflow-hidden`}>
      
      {/* Header Section: Adjusted layout to move info adjacent to title */}
      <div className="flex flex-row items-end justify-center gap-6 mb-2 pt-1 z-10 relative w-full pl-12">
        {/* Center Title Section - Reduced size slightly */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-black text-emerald-950 tracking-tighter uppercase italic serif-font">
            {halfMonth.season} {halfMonth.seasonalPakkhaNumber}
          </h2>
          <div className="h-0.5 w-full bg-emerald-700 mt-0.5 opacity-20 rounded-full"></div>
        </div>

        {/* Shifted Info Box: Moved from top-right to adjacent to title */}
        <div className="flex flex-col justify-end pb-0.5 h-full pl-3 border-l border-emerald-100">
          <div className="text-emerald-700 font-black text-[7px] uppercase tracking-wider serif-font leading-none">
            {halfMonth.monthNumber} {monthName} {moonPhase}
          </div>
          <div className="text-[6px] text-stone-400 font-bold tracking-tighter italic leading-none mt-1">
            ({dateRange})
          </div>
        </div>
      </div>

      {/* Floating BE/AD Year Info (Top Right) */}
      <div className="absolute top-4 right-8 text-right z-20">
        <div className="text-emerald-950 font-black text-base leading-none tracking-tighter serif-font">BE {beYear}</div>
        <div className="text-stone-400 font-bold text-[6px] uppercase mt-0.5 tracking-widest">AD {adYear}</div>
      </div>

      {/* Calendar Grid Section */}
      <div className="flex-1 flex flex-col gap-1.5 relative z-10 min-h-0 py-1.5 px-2">
        <div className="grid grid-cols-8 gap-1.5 flex-1 min-h-0">
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

        <div className="grid grid-cols-8 gap-1.5 flex-1 min-h-0">
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

      {/* Refined Footer Area */}
      <div className="mt-2 flex flex-row justify-between items-start relative z-10 px-4 h-[180px] gap-8">
        
        {/* Left Side: Quotes Section - Spiritual reflections */}
        <div className="flex-1 flex flex-col gap-3 pt-4 border-t border-emerald-100/30">
          <div className="text-emerald-900/80 text-[12px] font-bold serif-font italic text-left leading-relaxed">
            {halfMonth.season === Season.HEMANTA && `[Ref.H] "Cold winds of Hemanta remind the wise to kindle the inner fire of Samādhi."`}
            {halfMonth.season === Season.GIMHA && `[Ref.G] "As the sun blazes in Giṃha, let the heart find cool refuge in the Dhamma-forest."`}
            {halfMonth.season === Season.VASSANA && `[Ref.V] "Vassāna rains nourish the earth; so does the Dhamma wash away the stains of the heart."`}
          </div>
          {nak1?.paliQuote && (
             <div className="text-stone-500 text-[11px] font-serif italic text-left max-w-md">
               [Ref.{nak1.number}] "{nak1.paliQuote} {nak1.qualityQuote ? `— ${nak1.qualityQuote}` : ''}"
             </div>
          )}
        </div>

        {/* Right Side: Nakkhatta Details */}
        <div className="flex-shrink-0 flex flex-row-reverse items-center gap-6 h-full">
          {nak1 ? (
            <div className="flex flex-row-reverse gap-6 items-center h-full">
              {/* Constellation Image: Prioritize generated AI images */}
              <div className="w-44 h-44 flex-shrink-0 flex items-center justify-center group overflow-hidden">
                {(nakkhattaImages[nak1.number] || nak1.imageUrl) ? (
                  <CommonsLink imageUrl={nakkhattaImages[nak1.number] || nak1.imageUrl || '#'}>
                    <img 
                      src={nakkhattaImages[nak1.number] || nak1.imageUrl || ''} 
                      alt={nak1.pali} 
                      className="max-w-full max-h-full object-contain transition-transform group-hover:scale-105" 
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </CommonsLink>
                ) : (
                  <div className="text-[8px] text-stone-300 uppercase tracking-widest font-bold">No Reference Image</div>
                )}
              </div>
              
              <div className="flex flex-col text-right justify-center">
                <div className="flex items-center gap-1 justify-end mb-0.5 opacity-40">
                  <span className="text-[8px] text-emerald-500">★</span>
                </div>
                <div className="relative inline-block">
                  <span className="absolute -top-1 -left-4 text-[7px] font-black text-stone-300">#{nak1.number}</span>
                  {/* Reduced Nakkhatta Title size */}
                  <WikiLink query={nak1.pali} className="text-xl font-black text-emerald-950 uppercase tracking-tighter leading-none block serif-font">
                      {nak1.pali}
                  </WikiLink>
                </div>
                <div className="text-[9px] font-bold text-emerald-600 italic leading-tight mt-0.5 serif-font">
                  "{nak1.meaning}"
                </div>
                <div className="mt-2 pt-1 border-t border-emerald-50/50">
                  <span className="text-[6px] text-stone-400 font-bold uppercase tracking-tighter block mb-0.5 opacity-60">Celestial Mansion Alignment</span>
                  <WikiLink query={nak1.associatedStars} className="text-[9px] text-stone-500 font-bold leading-tight italic block truncate flex items-center justify-end gap-1">
                    <span>★</span> {nak1.associatedStars}
                  </WikiLink>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-right text-stone-300 text-[8px] uppercase font-bold tracking-[0.4em] italic serif-font self-center">
               Seasonal Transit Interval
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
