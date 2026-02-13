
import React from 'react';
import { ScaleEntry } from '../types';

const SCALE_DATA: ScaleEntry[] = [
  { 
    unit: 'Period (of a day)', 
    entryWord: 'Yāma', 
    vedic: 'Yāma', 
    pie: '?', 
    paliSynonyms: ['Pubbaṇha', 'Majjhantika', 'Sāyaṇha'], 
    sanskritSynonyms: ['Prārahara', 'Madhyāhna', 'Aparāhna'], 
    englishSynonyms: ['Morning', 'Noon', 'Evening'], 
    japaneseSynonyms: ['朝', '昼', '夕'] 
  },
  { 
    unit: 'Aha (Day)', 
    entryWord: 'Aha', 
    vedic: 'Ahar', 
    pie: '*h₂éger-', 
    paliSynonyms: ['Divasa', 'Vāra', 'Dina'], 
    sanskritSynonyms: ['Vāsara', 'Divasa', 'Ahan'], 
    englishSynonyms: ['Day', 'Solar Day', 'Date'], 
    japaneseSynonyms: ['日', '曜日', '月日'] 
  },
  { 
    unit: 'Aḍḍha-pakkha', 
    entryWord: 'Pakkha', 
    vedic: 'Pakṣá', 
    pie: '*pónk-s-', 
    paliSynonyms: ['Sukkapakkha', 'Kaṇhapakkha', 'Fortnight'], 
    sanskritSynonyms: ['Pakṣa', 'Śuklapakṣa', 'Kṛṣṇapakṣa'], 
    englishSynonyms: ['Half-Fortnight', 'Waxing', 'Waning'], 
    japaneseSynonyms: ['半月', '上弦', '下弦'] 
  },
  { 
    unit: 'Māsa', 
    entryWord: 'Māsa', 
    vedic: 'Māsa', 
    pie: '*mḗh₁ns-', 
    paliSynonyms: ['Māsa', 'Candamāsa', 'Month'], 
    sanskritSynonyms: ['Māsa', 'Cāndramāsa', 'Māsam'], 
    englishSynonyms: ['Lunar Month', 'Moon Cycle', 'Period'], 
    japaneseSynonyms: ['月', '太陰月', '月周期'] 
  },
  { 
    unit: 'Utu', 
    entryWord: 'Utu', 
    vedic: 'Ṛtú', 
    pie: '*h₂r-tu-', 
    paliSynonyms: ['Hemanta', 'Gimha', 'Vassāna'], 
    sanskritSynonyms: ['Ṛtu', 'Kāla', 'Samaya'], 
    englishSynonyms: ['Season', 'Climatic Phase', 'Rhythm'], 
    japaneseSynonyms: ['季節', '季', '時期'] 
  },
  { 
    unit: 'Year', 
    entryWord: 'Saṃvacchara', 
    vedic: 'Saṃvatsará', 
    pie: '*sem- (one) + *wet- (year)', 
    paliSynonyms: ['Vassa', 'Hāyana', 'Abda'], 
    sanskritSynonyms: ['Varṣa', 'Vatsara', 'Abda'], 
    englishSynonyms: ['Year', 'Rainy Cycle', 'Annual'], 
    japaneseSynonyms: ['年', '歳', '年度'] 
  },
];

const ScaleView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-stone-200 overflow-hidden flex flex-col no-print max-w-7xl mx-auto w-full min-h-[75vh]">
      <div className="p-8 border-b border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-stone-50/50">
        <div>
          <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tighter italic">Temporal Scale</h2>
          <p className="text-stone-500 font-bold text-xs uppercase tracking-widest mt-1">Hierarchical Units of Time</p>
        </div>
        <button onClick={onClose} className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 border border-stone-800">Back</button>
      </div>

      <div className="overflow-x-auto flex-1 p-8">
        <table className="w-full text-left border-collapse text-[11px] text-stone-600 min-w-[1600px]">
          <thead className="bg-stone-100 text-stone-500 text-[9px] uppercase tracking-widest">
            <tr>
              <th className="p-4 font-black sticky left-0 bg-stone-100 z-10 border-r">Unit</th>
              <th className="p-4 font-black border-r">Entry Word</th>
              <th className="p-4 font-black border-r">Vedic</th>
              <th className="p-4 font-black border-r">PIE Root</th>
              <th className="p-4 font-black border-r text-center bg-stone-200/50" colSpan={3}>Pāḷi Synonyms</th>
              <th className="p-4 font-black border-r text-center bg-stone-200/30" colSpan={3}>Sanskrit Synonyms</th>
              <th className="p-4 font-black border-r text-center bg-amber-50" colSpan={3}>English Synonyms</th>
              <th className="p-4 font-black text-center bg-stone-50" colSpan={3}>Japanese Synonyms</th>
            </tr>
            <tr className="bg-stone-50/50 border-b">
              <th className="p-2 border-r sticky left-0 bg-stone-50"></th>
              <th className="p-2 border-r"></th>
              <th className="p-2 border-r"></th>
              <th className="p-2 border-r"></th>
              <th className="p-2 border-r text-center text-[7px]">1</th><th className="p-2 border-r text-center text-[7px]">2</th><th className="p-2 border-r text-center text-[7px]">3</th>
              <th className="p-2 border-r text-center text-[7px]">1</th><th className="p-2 border-r text-center text-[7px]">2</th><th className="p-2 border-r text-center text-[7px]">3</th>
              <th className="p-2 border-r text-center text-[7px]">1</th><th className="p-2 border-r text-center text-[7px]">2</th><th className="p-2 border-r text-center text-[7px]">3</th>
              <th className="p-2 border-r text-center text-[7px]">1</th><th className="p-2 border-r text-center text-[7px]">2</th><th className="p-2 text-center text-[7px]">3</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {SCALE_DATA.map((s) => (
              <tr key={s.unit} className="hover:bg-amber-50/30 transition-colors">
                <td className="p-4 font-black text-stone-900 border-r bg-white sticky left-0 z-10">{s.unit}</td>
                <td className="p-4 font-bold text-amber-600 border-r italic">{s.entryWord}</td>
                <td className="p-4 text-stone-500 border-r">{s.vedic}</td>
                <td className="p-4 text-stone-400 border-r font-serif">{s.pie}</td>
                
                <td className="p-4 text-stone-600 border-r bg-stone-50/20">{s.paliSynonyms[0]}</td>
                <td className="p-4 text-stone-600 border-r bg-stone-50/20">{s.paliSynonyms[1]}</td>
                <td className="p-4 text-stone-600 border-r bg-stone-50/20">{s.paliSynonyms[2]}</td>
                
                <td className="p-4 text-stone-500 border-r">{s.sanskritSynonyms[0]}</td>
                <td className="p-4 text-stone-500 border-r">{s.sanskritSynonyms[1]}</td>
                <td className="p-4 text-stone-500 border-r">{s.sanskritSynonyms[2]}</td>
                
                <td className="p-4 text-stone-600 border-r font-medium">{s.englishSynonyms[0]}</td>
                <td className="p-4 text-stone-600 border-r font-medium">{s.englishSynonyms[1]}</td>
                <td className="p-4 text-stone-600 border-r font-medium">{s.englishSynonyms[2]}</td>
                
                <td className="p-4 text-stone-500 border-r">{s.japaneseSynonyms[0]}</td>
                <td className="p-4 text-stone-500 border-r">{s.japaneseSynonyms[1]}</td>
                <td className="p-4 text-stone-500">{s.japaneseSynonyms[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScaleView;
