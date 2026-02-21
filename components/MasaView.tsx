import React from 'react';
import { BUDDHIST_MONTH_NAMES } from '../data/months';

const MASA_DETAILS = [
  { name: 'Māgasira', number: 1, season: 'Hemanta', pakkhas: '1-2', description: 'The first month of the cold season.' },
  { name: 'Phussa', number: 2, season: 'Hemanta', pakkhas: '3-4', description: 'The second month of the cold season.' },
  { name: 'Māgha', number: 3, season: 'Hemanta', pakkhas: '5-6', description: 'The third month of the cold season.' },
  { name: 'Phagguṇa', number: 4, season: 'Hemanta', pakkhas: '7-8', description: 'The fourth month of the cold season.' },
  { name: 'Citta', number: 5, season: 'Giṃha', pakkhas: '1-2', description: 'The first month of the hot season.' },
  { name: 'Vesākha', number: 6, season: 'Giṃha', pakkhas: '3-4', description: 'The second month of the hot season.' },
  { name: 'Jeṭṭha', number: 7, season: 'Giṃha', pakkhas: '5-6', description: 'The third month of the hot season.' },
  { name: 'Āsāḷha', number: 8, season: 'Giṃha', pakkhas: '7-8', description: 'The fourth month of the hot season.' },
  { name: 'Sāvaṇa', number: 9, season: 'Vassāna', pakkhas: '1-2', description: 'The first month of the rainy season.' },
  { name: 'Poṭṭhapāda', number: 10, season: 'Vassāna', pakkhas: '3-4', description: 'The second month of the rainy season.' },
  { name: 'Assayuja', number: 11, season: 'Vassāna', pakkhas: '5-6', description: 'The third month of the rainy season.' },
  { name: 'Kattika', number: 12, season: 'Vassāna', pakkhas: '7-8', description: 'The fourth month of the rainy season.' },
];

const MasaView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-stone-200 overflow-hidden flex flex-col no-print max-w-7xl mx-auto w-full min-h-[70vh]">
      <div className="p-8 border-b border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-stone-50/50">
        <div>
          <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tighter italic">Māsa (Months)</h2>
          <p className="text-stone-500 font-bold text-xs uppercase tracking-widest mt-1">The Twelve Lunar Months of the Buddhist Calendar</p>
        </div>
        <button onClick={onClose} className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 border border-stone-800">Back</button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-stone-100 text-stone-500 text-[10px] uppercase tracking-[0.2em] sticky top-0 z-30">
            <tr>
              <th className="p-6 font-black border-r border-stone-200 w-20">#</th>
              <th className="p-6 font-black border-r border-stone-200">Māsa Name</th>
              <th className="p-6 font-black border-r border-stone-200">Season</th>
              <th className="p-6 font-black border-r border-stone-200">Pakkhas</th>
              <th className="p-6 font-black">Description</th>
            </tr>
          </thead>
          <tbody className="text-sm text-stone-600">
            {MASA_DETAILS.map((masa, idx) => (
              <tr key={masa.number} className={`border-b border-stone-100 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'} hover:bg-amber-50`}>
                <td className="p-6 font-black text-stone-300 border-r border-stone-100">{masa.number.toString().padStart(2, '0')}</td>
                <td className="p-6 font-black text-stone-900 serif-font text-lg border-r border-stone-100">{masa.name}</td>
                <td className="p-6 border-r border-stone-100">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                    masa.season === 'Hemanta' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    masa.season === 'Giṃha' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                    'bg-emerald-50 text-emerald-600 border-emerald-100'
                  }`}>
                    {masa.season}
                  </span>
                </td>
                <td className="p-6 font-bold text-stone-700 border-r border-stone-100">
                  Pakkha {masa.pakkhas}
                </td>
                <td className="p-6 text-stone-500 italic">
                  {masa.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-8 bg-stone-50 border-t border-stone-100">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-4">Full Month List (Pali)</h4>
        <div className="flex flex-wrap gap-2">
          {BUDDHIST_MONTH_NAMES.map((name, i) => (
            <span key={i} className="px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-700 shadow-sm">
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MasaView;
