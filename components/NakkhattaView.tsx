import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { NAKSHATRAS } from '../data/nakkhattas';
import { HalfLunarMonth } from '../types';

interface NakkhattaViewProps {
  currentPakkha?: HalfLunarMonth | null;
}

const NakkhattaView: React.FC<NakkhattaViewProps> = ({ currentPakkha }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genImages, setGenImages] = useState<Record<string, string>>({});
  const [loadErrors, setLoadErrors] = useState<Record<string, boolean>>({});
  const fetchingRefs = useRef<Set<string>>(new Set());
  const currentRef = useRef<HTMLTableRowElement>(null);

  const currentNakkhattaNum = useMemo(() => {
    if (!currentPakkha) return null;
    const pStr = currentPakkha.seasonalPakkhaNumber.toString();
    const found = NAKSHATRAS.find(n => 
      n.season === currentPakkha.season && 
      (n.pakkha === pStr || n.pakkha?.split('-').includes(pStr) || n.pakkha?.includes(pStr))
    );
    return found ? found.number : null;
  }, [currentPakkha]);

  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentNakkhattaNum]);

  const filtered = useMemo(() => NAKSHATRAS.filter(n => 
    n.pali.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.sanskrit.toLowerCase().includes(searchTerm.toLowerCase())
  ), [searchTerm]);

  const generateImageFallback = async (paliName: string, sanskritName: string) => {
    if (genImages[paliName] || fetchingRefs.current.has(paliName)) return;
    fetchingRefs.current.add(paliName);
    try {
      // Fixed: Initialize GoogleGenAI right before API calls with exact environment variable string as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Minimalist high-contrast constellation map of ${sanskritName} with black lines on solid white background.`;
      const resp = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });
      const data = resp.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
      if (data) setGenImages(prev => ({ ...prev, [paliName]: `data:image/png;base64,${data}` }));
    } catch (e) { 
      console.warn(`Gen fail`, e); 
    }
    fetchingRefs.current.delete(paliName);
  };

  useEffect(() => {
    const checkBatch = filtered.slice(0, 10);
    checkBatch.forEach(n => {
      if ((!n.imageUrl || loadErrors[n.pali]) && !genImages[n.pali]) {
        generateImageFallback(n.pali, n.sanskrit);
      }
    });
  }, [filtered, genImages, loadErrors]);

  return (
    <div className="flex flex-col gap-6 no-print max-w-7xl mx-auto w-full pb-20 px-4">
      <div className="bg-white rounded-[2rem] border border-stone-200 shadow-2xl overflow-hidden flex flex-col h-[75vh]">
        <div className="p-8 border-b border-stone-100 bg-stone-50/50 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black italic uppercase text-stone-900 tracking-tighter">Nakkhatta</h2>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-1">The 27 Lunar Mansions</p>
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            className="border border-stone-200 bg-white text-stone-900 px-4 py-2 rounded-xl focus:border-amber-500 outline-none placeholder-stone-400" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>
        
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="bg-stone-900 text-stone-400 uppercase tracking-[0.2em] text-[9px] sticky top-0 z-40">
              <tr>
                <th rowSpan={2} className="p-4 font-black text-center border-r border-stone-800">No.</th>
                <th rowSpan={2} className="p-4 font-black border-r border-stone-800">Name (Pali/Sanskrit)</th>
                <th rowSpan={2} className="p-4 font-black border-r border-stone-800">Stars</th>
                <th rowSpan={2} className="p-4 font-black border-r border-stone-800">14 Tithi</th>
                <th colSpan={4} className="p-4 font-black text-center border-b border-stone-800 bg-stone-800 text-stone-300">Quotes Group</th>
                <th rowSpan={2} className="p-4 font-black text-right border-l border-stone-800">Zodiac</th>
              </tr>
              <tr>
                <th className="p-4 font-black bg-stone-900 border-r border-stone-800">Pali Word</th>
                <th className="p-4 font-black bg-stone-900 border-r border-stone-800">Quality</th>
                <th className="p-4 font-black bg-stone-900 border-r border-stone-800">Event</th>
                <th className="p-4 font-black bg-stone-900">Season</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs text-stone-600">
              {filtered.map(n => {
                const isCurrent = n.number === currentNakkhattaNum;
                const img = (!n.imageUrl || loadErrors[n.pali]) ? genImages[n.pali] : n.imageUrl;

                return (
                  <tr key={n.number} ref={isCurrent ? currentRef : null} className={`transition-all ${isCurrent ? 'bg-amber-50' : 'hover:bg-stone-50'}`}>
                    <td className="p-4 text-center border-r border-stone-100">
                      <div className="w-10 h-10 bg-white rounded border border-stone-200 flex items-center justify-center mx-auto overflow-hidden">
                        {img && <img src={img} className="w-full h-full object-contain" onError={() => setLoadErrors(prev => ({...prev, [n.pali]: true}))} alt="" />}
                      </div>
                      <span className="text-[10px] font-bold block mt-1 text-stone-400">{n.number}</span>
                    </td>
                    <td className="p-4 border-r border-stone-100">
                      <div className="font-black text-stone-900 uppercase">{n.pali}</div>
                      <div className="text-[10px] text-stone-400 uppercase">{n.sanskrit}</div>
                    </td>
                    <td className="p-4 border-r border-stone-100 italic text-stone-500">{n.associatedStars}</td>
                    <td className="p-4 border-r border-stone-100 text-center font-bold text-stone-400">{n.tithi14 || '-'}</td>
                    
                    {/* Quotes Group */}
                    <td className="p-4 border-r border-stone-100 text-stone-500 italic max-w-xs truncate" title={n.paliQuote}>{n.paliQuote || '-'}</td>
                    <td className="p-4 border-r border-stone-100 text-stone-500 italic max-w-xs truncate" title={n.qualityQuote}>{n.qualityQuote || '-'}</td>
                    <td className="p-4 border-r border-stone-100 text-stone-500 italic max-w-xs truncate" title={n.eventQuote}>{n.eventQuote || '-'}</td>
                    <td className="p-4 border-r border-stone-100 text-stone-500 italic max-w-xs truncate" title={n.seasonQuote}>{n.seasonQuote || '-'}</td>

                    <td className="p-4 text-right">
                       <span className="font-bold text-stone-800">{n.westernZodiac}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NakkhattaView;