
import React from 'react';
import { TithiEntry } from '../types';

const TITHI_DATA: TithiEntry[] = [
  { number: 1, paliName: 'PaṭhaMa', muṭṭhi: 'Muṭṭhi', paliGrammar1: 'paṭhama (3rd person; he, she, it, they)', paliGrammar2: 'paṭhama 3 (first consonant k, c, ṭ, t, p)', paliGrammar3: 'paṭhamā (nominative case)' },
  { number: 2, paliName: 'DuTiya', muṭṭhi: 'Dvi + Tiya', paliGrammar1: 'dutiyā (accusative case)', paliGrammar2: 'Dutiya (second consonant kh, ch, ṭh, th, ph)', paliGrammar3: '-' },
  { number: 3, paliName: 'TaTiya', muṭṭhi: 'TaTīya, Ti-Tiya', paliGrammar1: 'tatiyā (instrumental case)', paliGrammar2: 'Tatiya (third consonant g, j, ḍ, d, b)', paliGrammar3: '-' },
  { number: 4, paliName: 'CatuTtha', muṭṭhi: '-', paliGrammar1: '-', paliGrammar2: '-', paliGrammar3: '-' },
  { number: 5, paliName: 'PañcaMī', muṭṭhi: '-', paliGrammar1: 'pañcamī (imperative/benedictive mood)', paliGrammar2: 'pañcamī (ablative case)', paliGrammar3: '-' },
  { number: 6, paliName: 'chaṭṭha', muṭṭhi: 'saḷ', paliGrammar1: 'chaṭṭhī (genitive case)', paliGrammar2: '-', paliGrammar3: '-' },
  { number: 7, paliName: 'SattaMī', muṭṭhi: '-', paliGrammar1: 'sattamī (optative/potential mood)', paliGrammar2: 'sattamī (locative case)', paliGrammar3: '-' },
  { number: 8, paliName: 'AṭṭhaMī', muṭṭhi: '-', paliGrammar1: '-', paliGrammar2: '-', paliGrammar3: '-' },
  { number: 9, paliName: 'NavMmī', muṭṭhi: '-', paliGrammar1: '-', paliGrammar2: '-', paliGrammar3: '-' },
  { number: 10, paliName: 'DasaMa', muṭṭhi: '-', paliGrammar1: '-', paliGrammar2: '-', paliGrammar3: '-' },
  { number: 11, paliName: 'EkāDasama', muṭṭhi: '-', paliGrammar1: '-', paliGrammar2: '-', paliGrammar3: '-' },
  { number: 12, paliName: 'DvāDasī', muṭṭhi: '-', paliGrammar1: '-', paliGrammar2: '-', paliGrammar3: '-' },
  { number: 13, paliName: 'TeRasaMa', muṭṭhi: '-', paliGrammar1: '-', paliGrammar2: '-', paliGrammar3: '-' },
  { number: 14, paliName: 'CatuDdasaMa', muṭṭhi: 'CatuDdasa', paliGrammar1: '-', paliGrammar2: '-', paliGrammar3: '-' },
  { number: 15, paliName: 'PañcaDasaMa', muṭṭhi: 'PaṇṇaRasa, PaṇṇaRasaMa', paliGrammar1: '-', paliGrammar2: '-', paliGrammar3: '-' },
];

const TithiView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-stone-200 overflow-hidden flex flex-col no-print max-w-7xl mx-auto w-full min-h-[70vh]">
      <div className="p-8 border-b border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-stone-50/50">
        <div>
          <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tighter italic">Tithi Dictionary</h2>
          <p className="text-stone-500 font-bold text-xs uppercase tracking-widest mt-1">Linguistic & Grammatical Context</p>
        </div>
        <button onClick={onClose} className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 border border-stone-800">Back</button>
      </div>

      <div className="overflow-x-auto flex-1 p-8">
        <table className="w-full text-left border-collapse text-sm text-stone-600">
          <thead className="bg-stone-100 text-stone-500 text-[9px] uppercase tracking-widest">
            <tr>
              <th className="p-4 font-black">#</th>
              <th className="p-4 font-black">Pali Name</th>
              <th className="p-4 font-black">Muṭṭhi/Origin</th>
              <th className="p-4 font-black">Grammar / Entry 1</th>
              <th className="p-4 font-black">Grammar / Entry 2</th>
              <th className="p-4 font-black">Grammar / Entry 3</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {TITHI_DATA.map((t) => (
              <tr key={t.number} className="hover:bg-amber-50">
                <td className="p-4 font-black text-stone-400">{t.number}</td>
                <td className="p-4 font-bold text-stone-900">{t.paliName}</td>
                <td className="p-4 text-amber-600 font-medium italic">{t.muṭṭhi}</td>
                <td className="p-4 text-stone-500">{t.paliGrammar1}</td>
                <td className="p-4 text-stone-500">{t.paliGrammar2}</td>
                <td className="p-4 text-stone-500">{t.paliGrammar3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TithiView;
