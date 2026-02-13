import React from 'react';

interface PeriodEntry {
  category: 'Day' | 'Night';
  pali: string;
  english: string;
  japanese: string;
  approxTime: string;
  description: string;
}

const PERIODS_DATA: PeriodEntry[] = [
  // Daytime (approx 6 AM to 6 PM)
  { category: 'Day', pali: 'Pubbaṇha', english: 'Forenoon / Morning', japanese: '午前 / 朝', approxTime: '06:00 – 10:00', description: 'The early part of the day, auspicious for alms round.' },
  { category: 'Day', pali: 'Majjhantika', english: 'Midday / Noon', japanese: '真昼 / 正午', approxTime: '10:00 – 14:00', description: 'The time when the sun is at its zenith. Boundary for solid food consumption.' },
  { category: 'Day', pali: 'Sāyaṇha', english: 'Evening / Late Afternoon', japanese: '午後 / 夕方', approxTime: '14:00 – 18:00', description: 'The cooling part of the day, suitable for chores and teaching.' },
  
  // Nighttime (approx 6 PM to 6 AM)
  { category: 'Night', pali: 'Paṭhama-yāma', english: 'First Watch', japanese: '初夜', approxTime: '18:00 – 22:00', description: 'The early night. Time for chanting and meditation.' },
  { category: 'Night', pali: 'Majjhima-yāma', english: 'Middle Watch', japanese: '中夜', approxTime: '22:00 – 02:00', description: 'The deep night. Time for rest (siha-seyyā).' },
  { category: 'Night', pali: 'Pacchima-yāma', english: 'Last Watch', japanese: '後夜', approxTime: '02:00 – 06:00', description: 'The final watch. Time for early rising, meditation, and preparation for dawn.' },
  
  // Specific Points
  { category: 'Day', pali: 'Aruṇuggamana', english: 'Dawn / Rising of Sun', japanese: '日の出 / 暁', approxTime: 'Approx 05:45 – 06:15', description: 'The moment lines on the palm can be seen. End of the lunar day calculation.' },
  { category: 'Night', pali: 'Atthaṅgamana', english: 'Sunset', japanese: '日没', approxTime: 'Approx 17:45 – 18:15', description: 'The end of the day periods and start of the night watches.' },
];

const PeriodsView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-stone-200 overflow-hidden flex flex-col no-print max-w-7xl mx-auto w-full min-h-[70vh]">
      <div className="p-8 border-b border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-stone-50/50">
        <div>
          <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tighter italic">Aṭṭha-yāma</h2>
          <p className="text-stone-500 font-bold text-xs uppercase tracking-widest mt-1">Watches of the Day & Night</p>
        </div>
        <button onClick={onClose} className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 border border-stone-800 shadow-lg">Back</button>
      </div>

      <div className="overflow-x-auto flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-black text-orange-600 uppercase tracking-widest border-b pb-2">Divasa-Yāma (Day Watches)</h3>
            <div className="space-y-4">
              {PERIODS_DATA.filter(p => p.category === 'Day').map((p, i) => (
                <div key={i} className="bg-orange-50/50 border border-orange-100 p-6 rounded-3xl hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-black text-stone-900 italic">{p.pali}</h4>
                    <span className="text-[10px] font-black text-orange-600 bg-white px-2 py-1 rounded-full border border-orange-200">{p.approxTime}</span>
                  </div>
                  <div className="mt-2 text-xs font-bold text-stone-500 uppercase flex gap-2">
                    <span>{p.english}</span>
                    <span className="text-stone-300">•</span>
                    <span>{p.japanese}</span>
                  </div>
                  <p className="mt-3 text-sm text-stone-600 leading-relaxed font-medium italic">"{p.description}"</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black text-stone-700 uppercase tracking-widest border-b pb-2">Ratti-Yāma (Night Watches)</h3>
            <div className="space-y-4">
              {PERIODS_DATA.filter(p => p.category === 'Night').map((p, i) => (
                <div key={i} className="bg-stone-50 border border-stone-100 p-6 rounded-3xl hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-black text-stone-900 italic">{p.pali}</h4>
                    <span className="text-[10px] font-black text-stone-500 bg-white px-2 py-1 rounded-full border border-orange-200">{p.approxTime}</span>
                  </div>
                  <div className="mt-2 text-xs font-bold text-stone-500 uppercase flex gap-2">
                    <span>{p.english}</span>
                    <span className="text-stone-300">•</span>
                    <span>{p.japanese}</span>
                  </div>
                  <p className="mt-3 text-sm text-stone-600 leading-relaxed font-medium italic">"{p.description}"</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-8 bg-stone-900 rounded-[2.5rem] text-stone-400">
               <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-4">Note on Observation</h5>
               <p className="text-xs leading-relaxed italic">
                 Traditional Buddhist watches are fluid, often adjusted by the visible rising of the sun (Aruṇa) rather than strict mechanical clock time. The "Last Watch" is particularly emphasized in forest monasteries for early meditation before the alms round.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodsView;