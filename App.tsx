import React, { useState, useMemo, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { toPng } from 'https://esm.sh/html-to-image';
import { generateThaiYear } from './calendarUtils';
import CalendarGrid from './components/CalendarGrid';
import DatabaseView from './components/DatabaseView';
import NakkhattaView from './components/NakkhattaView';
import EventsView from './components/EventsView';
import GlossaryView from './components/GlossaryView';
import RequirementsView from './components/RequirementsView';
import TithiView from './components/TithiView';
import ScaleView from './components/ScaleView';
import PeriodsView from './components/PeriodsView';
import PromptView from './components/PromptView';
import { Season } from './types';
import { NAKSHATRAS } from './data/nakkhattas';

const App: React.FC = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const thaiYearData = useMemo(() => generateThaiYear(year), [year]);
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(0);
  const [currentPakkhaId, setCurrentPakkhaId] = useState<string | null>(null);
  const [pakkhaImages, setPakkhaImages] = useState<Record<string, string | null>>({});
  const [nakkhattaImages, setNakkhattaImages] = useState<Record<number, string | null>>({});
  const [view, setView] = useState<'calendar' | 'dates' | 'nakkhatta' | 'events' | 'glossary' | 'requirements' | 'tithi' | 'scale' | 'periods' | 'prompt'>('calendar');
  const [isExporting, setIsExporting] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const todayActualPakkha = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return thaiYearData.halfMonths.find(hm => {
      const start = new Date(hm.startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(hm.endDate);
      end.setHours(23, 59, 59, 999);
      return today >= start && today <= end;
    });
  }, [thaiYearData]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayIdx = thaiYearData.halfMonths.findIndex(hm => {
      const start = new Date(hm.startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(hm.endDate);
      end.setHours(23, 59, 59, 999);
      return today >= start && today <= end;
    });
    if (todayIdx !== -1) {
      setSelectedMonthIdx(todayIdx);
      setCurrentPakkhaId(thaiYearData.halfMonths[todayIdx].id);
    } else {
      setSelectedMonthIdx(0);
    }
  }, [thaiYearData]);

  const currentHalfMonth = thaiYearData.halfMonths[selectedMonthIdx];
  
  const currentNakshatras = useMemo(() => {
    if (!currentHalfMonth) return [];
    const pakkhaStr = currentHalfMonth.seasonalPakkhaNumber.toString();
    return NAKSHATRAS.filter(n => 
      n.season === currentHalfMonth.season && 
      (n.pakkha === pakkhaStr || n.pakkha?.split('-').includes(pakkhaStr) || n.pakkha?.includes(pakkhaStr))
    ).sort((a, b) => a.number - b.number);
  }, [currentHalfMonth]);

  useEffect(() => {
    const generateImages = async () => {
      if (!currentHalfMonth) return;
      // Fixed: Initialize GoogleGenAI right before API calls with exact environment variable string as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      if (!pakkhaImages[currentHalfMonth.id]) {
        try {
          const seasonDesc = { [Season.HEMANTA]: "misty temple", [Season.GIMHA]: "sunny temple", [Season.VASSANA]: "rainy temple" }[currentHalfMonth.season];
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: `Thai mural art style, ${seasonDesc}, serene Buddhist atmosphere. High resolution, elegant.` }] },
            config: { imageConfig: { aspectRatio: "16:9" } }
          });
          for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
              setPakkhaImages(prev => ({ ...prev, [currentHalfMonth.id]: `data:image/png;base64,${part.inlineData.data}` }));
              break;
            }
          }
        } catch (e) { console.warn("Pakkha image failed", e); }
      }

      for (const nak of currentNakshatras) {
        if (!nakkhattaImages[nak.number]) {
          try {
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash-image',
              contents: { parts: [{ text: `Minimalist high-contrast constellation map of ${nak.sanskrit} with black lines on solid white background.` }] },
              config: { imageConfig: { aspectRatio: "1:1" } }
            });
            for (const part of response.candidates?.[0]?.content?.parts || []) {
              if (part.inlineData) {
                setNakkhattaImages(prev => ({ ...prev, [nak.number]: `data:image/png;base64,${part.inlineData.data}` }));
                break;
              }
            }
          } catch (e) { console.warn("Nakkhatta image failed", e); }
        }
      }
    };
    const timer = setTimeout(generateImages, 1000);
    return () => clearTimeout(timer);
  }, [selectedMonthIdx, currentHalfMonth, currentNakshatras, pakkhaImages, nakkhattaImages]);

  const handleExportImage = async () => {
    if (calendarRef.current === null) return;
    setIsExporting(true);
    try {
      // Small delay to ensure all assets are fully rendered in the DOM
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const filter = (node: HTMLElement) => {
        const exclusionClasses = ['no-print'];
        if (node.classList && typeof node.classList.contains === 'function') {
           return !exclusionClasses.some(cls => node.classList.contains(cls));
        }
        return true;
      };

      // Force fixed dimensions for the export to match A4 Landscape ratio and ensure desktop layout
      // A4 Landscape at 96 DPI is approx 1123px x 794px
      // We set width and height explicitly to override mobile viewports
      const dataUrl = await toPng(calendarRef.current, { 
        backgroundColor: '#ffffff', 
        width: 1123,
        height: 794,
        pixelRatio: 4, // High quality for professional printing
        filter: filter,
        cacheBust: true,
        style: {
          width: '1123px',
          height: '794px',
          margin: '0',
          padding: '0',
          borderRadius: '0',
          boxShadow: 'none',
          transform: 'none',
          // Force layout to behave like desktop
          display: 'flex',
          flexDirection: 'column'
        }
      });

      const link = document.createElement('a');
      link.download = `Mahanikaya-BE${thaiYearData.beYear}-${currentHalfMonth?.title.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
      alert('Resolution is too high for the current browser memory. Try resizing the window or refreshing.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const goToPrevPakkha = () => setSelectedMonthIdx(prev => Math.max(0, prev - 1));
  const goToNextPakkha = () => setSelectedMonthIdx(prev => Math.min(thaiYearData.halfMonths.length - 1, prev + 1));

  return (
    <div className="min-h-screen bg-gray-400 flex flex-col print:bg-white print:block overflow-x-hidden text-stone-900 transition-colors duration-500">
      <header className="bg-stone-900 text-stone-50 py-4 px-4 md:px-8 shadow-2xl no-print flex-shrink-0 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-black tracking-tighter uppercase italic text-emerald-500 serif-font">Mahānikāya</h1>
              <div className="h-4 w-[1px] bg-stone-700 hidden sm:block"></div>
              <p className="text-stone-400 text-[8px] font-black uppercase tracking-[0.3em] mt-0.5 hidden sm:block">Splendid Moons (Pakkhakhana)</p>
            </div>
            <div className="text-right">
              <div className="text-emerald-400 font-black text-sm leading-none serif-font">BE {thaiYearData.beYear}</div>
              <div className="text-stone-500 font-bold text-[8px] uppercase">AD {year}</div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between border-t border-stone-800 pt-3 gap-3">
            <nav className="flex gap-4 md:gap-6 items-center overflow-x-auto pb-1 no-scrollbar">
              {[
                {id: 'calendar', label: 'Calendar'},
                {id: 'dates', label: 'Dates'},
                {id: 'nakkhatta', label: 'Nakkhatta'},
                {id: 'tithi', label: 'Tithi'},
                {id: 'scale', label: 'Scale'},
                {id: 'periods', label: 'Yāma'},
                {id: 'events', label: 'Events'},
                {id: 'glossary', label: 'Glossary'},
                {id: 'prompt', label: 'Prompt'},
                {id: 'requirements', label: 'Reqs'}
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setView(item.id as any)} 
                  className={`text-[10px] font-black uppercase tracking-widest py-1 border-b-2 transition-all whitespace-nowrap ${view === item.id ? 'border-emerald-500 text-emerald-500' : 'border-transparent text-stone-500 hover:text-stone-300'}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="h-4 w-[1px] bg-stone-800 mx-1"></div>
              <button 
                onClick={handlePrint}
                className="text-[10px] font-black uppercase tracking-widest py-1 border-b-2 border-transparent text-stone-400 hover:text-emerald-400 transition-all flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>
                Print
              </button>
            </nav>

            <div className="flex items-center gap-2 bg-stone-800/60 p-1.5 rounded-lg border border-stone-800">
               <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={year} 
                    onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())} 
                    className="bg-stone-900 border border-stone-700 text-emerald-500 px-2 py-1 rounded font-black w-20 text-center text-[10px] outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  />
                  <div className="h-4 w-[1px] bg-stone-700"></div>
                  <select 
                    value={selectedMonthIdx} 
                    onChange={(e) => setSelectedMonthIdx(Number(e.target.value))} 
                    className="bg-stone-900 border border-stone-700 text-stone-100 px-2 py-1 rounded font-bold text-[10px] outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all min-w-[200px]"
                  >
                    {[Season.HEMANTA, Season.GIMHA, Season.VASSANA].map((season) => (
                      <optgroup key={season} label={season} className="bg-stone-900">
                        {thaiYearData.halfMonths.map((hm, index) => ({ hm, index })).filter(({ hm }) => hm.season === season).map(({ hm, index }) => (
                          <option key={hm.id} value={index}>P{hm.seasonalPakkhaNumber} — {hm.title.split(' ').slice(1).join(' ')}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
               </div>
               <button 
                 onClick={handleExportImage} 
                 disabled={isExporting}
                 className={`bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-black px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 ${isExporting ? 'opacity-50 cursor-wait' : ''}`}
               >
                 {isExporting ? 'Capturing Hi-Res...' : 'Export High-Res PNG'}
               </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-12 print:p-0 print:m-0 print:max-w-none print:block">
        {view === 'calendar' && (
          <div className="flex items-center justify-center gap-6 lg:gap-16 w-full print:block">
            <button 
              onClick={goToPrevPakkha} 
              disabled={selectedMonthIdx === 0} 
              className={`no-print p-4 glass-nav text-stone-900 rounded-full shadow-xl transition-all flex-shrink-0 ${selectedMonthIdx === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110 active:scale-95'}`}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
            </button>

            <div id="calendar-print-area" ref={calendarRef} className="a4-landscape-container rounded-[2rem] shadow-2xl overflow-hidden bg-white text-stone-900">
              {currentHalfMonth && (
                <CalendarGrid 
                  halfMonth={currentHalfMonth} 
                  beYear={thaiYearData.beYear}
                  adYear={year}
                  imageUrl={pakkhaImages[currentHalfMonth.id] || undefined}
                  nakkhattaImages={nakkhattaImages}
                  isCurrent={currentPakkhaId === currentHalfMonth.id}
                />
              )}
            </div>

            <button 
              onClick={goToNextPakkha} 
              disabled={selectedMonthIdx === thaiYearData.halfMonths.length - 1} 
              className={`no-print p-4 glass-nav text-stone-900 rounded-full shadow-xl transition-all flex-shrink-0 ${selectedMonthIdx === thaiYearData.halfMonths.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110 active:scale-95'}`}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
            </button>
          </div>
        )}
        {view === 'dates' && <DatabaseView data={thaiYearData} onClose={() => setView('calendar')} />}
        {view === 'nakkhatta' && <NakkhattaView currentPakkha={todayActualPakkha} />}
        {view === 'tithi' && <TithiView onClose={() => setView('calendar')} />}
        {view === 'scale' && <ScaleView onClose={() => setView('calendar')} />}
        {view === 'periods' && <PeriodsView onClose={() => setView('calendar')} />}
        {view === 'events' && <EventsView data={thaiYearData} onClose={() => setView('calendar')} />}
        {view === 'glossary' && <GlossaryView onClose={() => setView('calendar')} />}
        {view === 'requirements' && <RequirementsView onClose={() => setView('calendar')} />}
        {view === 'prompt' && <PromptView data={thaiYearData} selectedIdx={selectedMonthIdx} onClose={() => setView('calendar')} />}
      </main>

      <footer className="py-8 text-center text-stone-400 text-[10px] font-black uppercase tracking-[0.4em] no-print">
      </footer>
    </div>
  );
};

export default App;