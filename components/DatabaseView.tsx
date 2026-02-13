import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ThaiYear } from '../types';
import { BUDDHIST_SYMBOLS } from '../constants';
import { NAKSHATRAS } from '../data/nakkhattas';

interface DatabaseViewProps {
  data: ThaiYear;
  onClose: () => void;
}

const DatabaseView: React.FC<DatabaseViewProps> = ({ data, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const todayRef = useRef<HTMLTableRowElement>(null);

  const allDays = useMemo(() => data.halfMonths.flatMap(pakkha => 
    pakkha.days.map(day => ({
      ...day,
      pakkha
    }))
  ), [data]);

  const filteredDays = useMemo(() => allDays.filter(item => 
    item.solarDateString.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.pakkha.season.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `month ${item.pakkha.monthNumber}`.includes(searchTerm.toLowerCase()) ||
    (item.isUposatha ? 'uposatha' : '').includes(searchTerm.toLowerCase()) ||
    (item.isQuietDay ? 'quiet day' : '').includes(searchTerm.toLowerCase())
  ), [allDays, searchTerm]);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (todayRef.current) {
        todayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const getPaliPhase = (isKanha: boolean, titthi: number, daysCount: number) => {
    if (!isKanha && titthi === 15) return "Puṇṇamī (Full Moon)";
    if (isKanha && titthi === daysCount) return "Amāvasī (New Moon)";
    if (!isKanha && titthi === 8) return "Sukka Aṭṭhamī (Waxing 8th)";
    if (isKanha && titthi === 8) return "Kaṇha Aṭṭhamī (Waning 8th)";
    return null;
  };

  const getConstellationForPakkha = (season: string, seasonalPakkhaNumber: number) => {
    const pakkhaStr = seasonalPakkhaNumber.toString();
    const found = NAKSHATRAS.find(n => 
      n.season === season && 
      (n.pakkha === pakkhaStr || n.pakkha?.split('-')?.includes(pakkhaStr))
    );
    return found ? found.pali : '—';
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col no-print h-[80vh] max-w-7xl mx-auto w-full text-stone-900">
      <div className="p-8 border-b border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-stone-50/50">
        <div>
          <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tighter italic">Repository</h2>
          <p className="text-stone-500 font-bold text-xs uppercase tracking-widest mt-1">Daily BE {data.beYear} Tracking</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Search dates, seasons..." 
            className="w-full md:w-80 bg-white border border-stone-200 px-5 py-3 rounded-2xl font-bold text-stone-900 outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-sm placeholder-stone-400"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button onClick={onClose} className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 border border-stone-800">Back</button>
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-stone-100 text-stone-500 text-[10px] uppercase tracking-[0.2em] sticky top-0 z-30">
            <tr>
              <th className="p-6 font-black border-r border-stone-200">Solar Date</th>
              <th className="p-6 font-black border-r border-stone-200">Constellation</th>
              <th className="p-6 font-black">Season & Pakkha</th>
              <th className="p-6 font-black text-center">Tithi</th>
              <th className="p-6 font-black">Moon Phase</th>
              <th className="p-6 font-black">Observance</th>
            </tr>
          </thead>
          <tbody className="text-sm text-stone-600">
            {filteredDays.map((item, idx) => {
              const paliPhase = getPaliPhase(item.pakkha.isKanha, item.titthi, item.pakkha.daysCount);
              const isFullMoon = !item.pakkha.isKanha && item.titthi === 15;
              const isNewMoon = item.pakkha.isKanha && item.titthi === item.pakkha.daysCount;
              const isEightDay = item.titthi === 8;
              
              const itemDate = new Date(item.solarDate);
              itemDate.setHours(0, 0, 0, 0);
              const isToday = itemDate.getTime() === today.getTime();
              const constellation = getConstellationForPakkha(item.pakkha.season, item.pakkha.seasonalPakkhaNumber);

              return (
                <tr 
                  key={`${item.pakkha.id}-${item.titthi}`} 
                  ref={isToday ? todayRef : null}
                  className={`border-b border-stone-100 transition-colors ${isToday ? 'bg-amber-50 shadow-inner' : (idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50')} hover:bg-stone-50`}
                >
                  <td className="p-6 font-black whitespace-nowrap border-r border-stone-100">
                    <div className="flex items-center gap-2">
                      {item.solarDateString}
                      {isToday && <span className="text-[8px] bg-amber-500 text-stone-950 px-2 py-0.5 rounded-full font-black animate-pulse">TODAY</span>}
                    </div>
                  </td>
                  <td className="p-6 border-r border-stone-100">
                    <span className="text-amber-600 font-black italic tracking-tight">{constellation}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-stone-400 uppercase text-[9px] font-black tracking-widest leading-none">{item.pakkha.season}</span>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="font-black text-stone-800">Pakkha {item.pakkha.seasonalPakkhaNumber}</span>
                        <span className="text-stone-400 text-[10px] font-black">/ 8</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-xl font-black leading-none text-stone-300">{item.titthi}</span>
                      <span className="text-stone-400 text-[9px] font-black uppercase mt-1">Tithi</span>
                    </div>
                  </td>
                  <td className="p-6">
                    {paliPhase ? (
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 flex-shrink-0 text-stone-800">
                          {isFullMoon && BUDDHIST_SYMBOLS.fullMoon}
                          {isNewMoon && BUDDHIST_SYMBOLS.newMoon}
                          {isEightDay && (item.pakkha.isKanha ? BUDDHIST_SYMBOLS.halfMoonLeft : BUDDHIST_SYMBOLS.halfMoonRight)}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-stone-700 leading-tight w-24">{paliPhase}</span>
                      </div>
                    ) : <span className="text-stone-300 ml-4">•</span>}
                  </td>
                  <td className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {item.isUposatha && <span className="text-amber-600 font-black text-[9px] uppercase bg-amber-100 border border-amber-200 px-3 py-1 rounded-full">Uposatha</span>}
                      {item.isQuietDay && !item.isUposatha && <span className="text-blue-500 font-black text-[8px] uppercase tracking-widest border border-blue-100 px-2 py-1 rounded-full bg-blue-50">★ Quiet Day</span>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DatabaseView;