import React, { useState, useMemo } from 'react';
import { GlossaryTerm } from '../types';

const RAW_GLOSSARY: GlossaryTerm[] = [
  // Calendar Terms
  { category: 'Calendar Terms', entryWord: 'Pakkha', description: 'A half-month or lunar fortnight.', paliSynonym1: 'Pakkha', englishSynonym: 'Fortnight' },
  { category: 'Calendar Terms', entryWord: 'Tithi', description: 'A lunar day. 1/30th of a lunar month.', paliSynonym1: 'Titthi', sanskritSynonym: 'Tithi', englishSynonym: 'Lunar Day' },
  { category: 'Calendar Terms', entryWord: 'Uposatha', description: 'Observance day.', paliSynonym1: 'Uposatha', englishSynonym: 'Sabbath' },
  { category: 'Calendar Terms', entryWord: 'Pakkhakhana', description: 'Half-month calculation system.', paliSynonym1: 'Pakkhagaṇanā' },
  { category: 'Calendar Terms', entryWord: 'Adhikamāsa', description: 'Intercalary month (extra month).', englishSynonym: 'Leap Month' },
  { category: 'Calendar Terms', entryWord: 'Adhikavāra', description: 'Intercalary day (extra day).', englishSynonym: 'Leap Day' },

  // Utu (Seasons)
  { category: 'Utu', entryWord: 'Hemanta', description: 'Winter Season.', paliSynonym1: 'Hemanta', englishSynonym: 'Winter' },
  { category: 'Utu', entryWord: 'Giṃha', description: 'Summer/Hot Season.', paliSynonym1: 'Giṃha', englishSynonym: 'Summer' },
  { category: 'Utu', entryWord: 'Vassāna', description: 'Rainy Season.', paliSynonym1: 'Vassāna', englishSynonym: 'Rains' },

  // Masa (Months)
  { category: 'Masa', entryWord: 'Māgasira', description: 'Month 1', paliSynonym1: 'Māgasira' },
  { category: 'Masa', entryWord: 'Phussa', description: 'Month 2', paliSynonym1: 'Phussa' },
  { category: 'Masa', entryWord: 'Māgha', description: 'Month 3', paliSynonym1: 'Māgha' },
  { category: 'Masa', entryWord: 'Phagguṇa', description: 'Month 4', paliSynonym1: 'Phagguṇa' },
  { category: 'Masa', entryWord: 'Citta', description: 'Month 5', paliSynonym1: 'Citta' },
  { category: 'Masa', entryWord: 'Vesākha', description: 'Month 6', paliSynonym1: 'Vesākha' },
  { category: 'Masa', entryWord: 'Jeṭṭha', description: 'Month 7', paliSynonym1: 'Jeṭṭha' },
  { category: 'Masa', entryWord: 'Āsāḷha', description: 'Month 8', paliSynonym1: 'Āsāḷha' },
  { category: 'Masa', entryWord: 'Sāvaṇa', description: 'Month 9', paliSynonym1: 'Sāvaṇa' },
  { category: 'Masa', entryWord: 'Poṭṭhapāda', description: 'Month 10', paliSynonym1: 'Poṭṭhapāda' },
  { category: 'Masa', entryWord: 'Assayuja', description: 'Month 11', paliSynonym1: 'Assayuja' },
  { category: 'Masa', entryWord: 'Kattika', description: 'Month 12', paliSynonym1: 'Kattika' },

  // Aha (Days)
  { category: 'Aha', entryWord: 'Ravivāra', description: 'Sunday', englishSynonym: 'Sunday' },
  { category: 'Aha', entryWord: 'Candavāra', description: 'Monday', englishSynonym: 'Monday' },
  { category: 'Aha', entryWord: 'Bhumavāra', description: 'Tuesday', englishSynonym: 'Tuesday' },
  { category: 'Aha', entryWord: 'Budhavāra', description: 'Wednesday', englishSynonym: 'Wednesday' },
  { category: 'Aha', entryWord: 'Guruvāra', description: 'Thursday', englishSynonym: 'Thursday' },
  { category: 'Aha', entryWord: 'Sukkavāra', description: 'Friday', englishSynonym: 'Friday' },
  { category: 'Aha', entryWord: 'Soravāra', description: 'Saturday', englishSynonym: 'Saturday' },

  // Nakkhatta
  { category: 'Nakkhatta', entryWord: 'Nakkhatta', description: 'Star/Constellation', paliSynonym1: 'Nakkhatta', sanskritSynonym: 'Nakshatra' },
  
  // Others
  { category: 'Others', entryWord: 'Anusāvana', description: 'Announcement day', englishSynonym: 'Announcement' },
];

const GlossaryView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => RAW_GLOSSARY.filter(t => 
    t.entryWord.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  ), [searchTerm]);

  const grouped = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filtered.forEach(t => {
      if (!groups[t.category]) groups[t.category] = [];
      groups[t.category].push(t);
    });
    return groups;
  }, [filtered]);

  const sections = ['Calendar Terms', 'Utu', 'Masa', 'Nakkhatta', 'Aha', 'Others'];

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-stone-200 overflow-hidden flex flex-col no-print max-w-7xl mx-auto w-full min-h-[70vh]">
      <div className="p-8 border-b border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-stone-50/50">
        <div>
          <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tighter italic">Glossary</h2>
          <p className="text-stone-500 font-bold text-xs uppercase tracking-widest mt-1">Technical Vocabulary</p>
        </div>
        <div className="flex gap-4">
           <input type="text" placeholder="Search terms..." className="bg-white border border-stone-200 px-4 py-2 rounded-xl focus:border-amber-500 outline-none placeholder-stone-400" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
           <button onClick={onClose} className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 border border-stone-800">Back</button>
        </div>
      </div>

      <div className="overflow-x-auto flex-1 p-8">
        <table className="w-full text-left border-collapse text-sm text-stone-600">
          <thead className="bg-stone-100 text-stone-500 text-[9px] uppercase tracking-widest">
            <tr>
              <th className="p-4 font-black">Entry Word (Pali)</th>
              <th className="p-4 font-black">Description</th>
              <th className="p-4 font-black">Pali Synonym 1</th>
              <th className="p-4 font-black">Pali Synonym 2</th>
              <th className="p-4 font-black">Sanskrit</th>
              <th className="p-4 font-black">English</th>
              <th className="p-4 font-black">Japanese</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
             {sections.map(section => (
                <React.Fragment key={section}>
                   {grouped[section] && grouped[section].length > 0 && (
                      <>
                        <tr className="bg-stone-50">
                           <td colSpan={7} className="p-4 font-black text-amber-600 uppercase tracking-widest text-xs border-t border-b border-stone-200">{section}</td>
                        </tr>
                        {grouped[section].map((term, i) => (
                          <tr key={i} className="hover:bg-amber-50">
                             <td className="p-4 font-bold text-stone-900">{term.entryWord}</td>
                             <td className="p-4 text-stone-600 italic">{term.description}</td>
                             <td className="p-4 text-stone-500">{term.paliSynonym1 || '-'}</td>
                             <td className="p-4 text-stone-500">{term.paliSynonym2 || '-'}</td>
                             <td className="p-4 text-stone-500">{term.sanskritSynonym || '-'}</td>
                             <td className="p-4 text-stone-500">{term.englishSynonym || '-'}</td>
                             <td className="p-4 text-stone-500">{term.japaneseSynonym || '-'}</td>
                          </tr>
                        ))}
                      </>
                   )}
                </React.Fragment>
             ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GlossaryView;