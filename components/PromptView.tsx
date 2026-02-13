
import React from 'react';
import { ThaiYear, Season } from '../types';
import { NAKSHATRAS } from '../data/nakkhattas';
import { EVENTS_DB } from '../data/events';

interface PromptViewProps {
  data: ThaiYear;
  selectedIdx: number;
  onClose: () => void;
}

const PromptView: React.FC<PromptViewProps> = ({ data, selectedIdx, onClose }) => {
  const nextIdx = Math.min(data.halfMonths.length - 1, selectedIdx + 1);
  const nextPakkha = data.halfMonths[nextIdx];

  const globalTheme = "A serene, kind, quiet, and conservative forest. Spiritual serenity, ancient trees, soft morning light, and a peaceful Buddhist atmosphere.";
  
  const getSeasonalTheme = (season: Season) => {
    // Mapping Thai seasons to requested Spring/Summer/Fall/Winter concepts for the AI
    switch (season) {
      case Season.HEMANTA:
        return "Winter/Spring Transition: Misty cold forest, frost-covered leaves, morning dew, early blossoms, and a pale, clear sky representing new beginnings.";
      case Season.GIMHA:
        return "Summer: A bright, warm forest with dappled golden sunlight filtering through high canopies, vibrant life, and heat shimmer.";
      case Season.VASSANA:
        return "Fall/Rainy: A lush, vibrant monsoon forest, deep greens, rain clouds, and blooming lotuses, transitioning into a reflective harvest mood.";
      default:
        return "A balanced, seasonal forest.";
    }
  };

  const pakkhaStr = nextPakkha.seasonalPakkhaNumber.toString();
  const nextNak = NAKSHATRAS.find(n => 
    n.season === nextPakkha.season && 
    (n.pakkha === pakkhaStr || n.pakkha?.split('-').includes(pakkhaStr) || n.pakkha?.includes(pakkhaStr))
  );

  const nextEvents = EVENTS_DB.filter(evt => {
    if (evt.type === 'Lunar') {
      return evt.season === nextPakkha.season && evt.seasonalPakkha === nextPakkha.seasonalPakkhaNumber;
    }
    return false;
  });

  const seasonalPromptPart = getSeasonalTheme(nextPakkha.season);
  const nakkhattaPromptPart = nextNak ? `${nextNak.pali} (${nextNak.meaning}), associated with stars like ${nextNak.associatedStars}.` : 'Serene starlit night.';
  const eventPromptPart = nextEvents.length > 0 ? nextEvents.map(e => e.name).join(', ') : 'No major festivals.';

  const fullPrompt = `Traditional Thai mural art style integrated with a marginal calendar frame.
Global Theme: ${globalTheme}
Seasonal Concept: ${seasonalPromptPart}
Celestial Influence (Nakkhatta): ${nakkhattaPromptPart}
Sacred Events: ${eventPromptPart}
Visual Requirements: Soft gradients, elegant line work, meditative and dignified atmosphere, earth tones with subtle gold highlights. Conservative yet ethereal.`;

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-stone-200 overflow-hidden flex flex-col no-print max-w-5xl mx-auto w-full min-h-[75vh]">
      <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
        <div>
          <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tighter italic">AI marginal art prompt generator</h2>
          <p className="text-stone-500 font-bold text-xs uppercase tracking-widest mt-1">Generating guidance for Pakkha {nextPakkha.seasonalPakkhaNumber} — {nextPakkha.title.replace('Kanha', 'Kāḷa')}</p>
        </div>
        <button onClick={onClose} className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg active:scale-95">Back</button>
      </div>

      <div className="p-10 grid grid-cols-1 lg:grid-cols-3 gap-10 flex-1 overflow-y-auto">
        {/* Sub-sections */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100 shadow-sm">
            <h4 className="text-[10px] font-black uppercase text-orange-600 tracking-widest mb-3">Global Theme</h4>
            <p className="text-sm font-medium text-stone-700 leading-relaxed italic">"Serene and Kind"</p>
            <p className="text-xs text-stone-500 mt-2">{globalTheme}</p>
          </div>

          <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 shadow-sm">
            <h4 className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-3">Seasonal Theme</h4>
            <p className="text-sm font-bold text-stone-800 mb-1">{nextPakkha.season}</p>
            <p className="text-xs text-stone-600 italic leading-relaxed">{seasonalPromptPart}</p>
          </div>

          <div className="p-6 bg-stone-50 rounded-3xl border border-stone-200 shadow-sm">
            <h4 className="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-3">Nakkhatta Theme</h4>
            <p className="text-sm font-bold text-stone-800">{nextNak ? nextNak.pali : 'Natural flow'}</p>
            <p className="text-xs text-stone-600 mt-1 italic leading-relaxed">{nextNak ? nextNak.meaning : 'Standard cycle'}</p>
          </div>

          <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 shadow-sm">
            <h4 className="text-[10px] font-black uppercase text-emerald-600 tracking-widest mb-3">Event Theme</h4>
            <p className="text-sm font-bold text-stone-800">{nextEvents.length > 0 ? nextEvents[0].name : 'Contemplative period'}</p>
          </div>
        </div>

        {/* Full Prompt Output */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 flex items-center gap-2">
            <span className="w-10 h-[1px] bg-stone-200"></span>
            Composite Prompt for ChatGPT
          </h3>
          <div className="bg-stone-900 p-8 rounded-[2.5rem] relative group shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-16 translate-x-16 pointer-events-none"></div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(fullPrompt);
                alert('Prompt copied!');
              }}
              className="absolute top-6 right-6 bg-emerald-500 text-stone-950 text-[10px] font-black uppercase px-4 py-2 rounded-xl hover:bg-emerald-400 transition-all shadow-lg active:scale-95 z-10"
            >
              Copy to Clipboard
            </button>
            <p className="text-stone-300 font-medium leading-[1.8] text-sm whitespace-pre-wrap select-all pr-4">
              {fullPrompt}
            </p>
          </div>

          <div className="pt-6 border-t border-stone-100">
             <h5 className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 mb-4">Instructions</h5>
             <ul className="text-xs text-stone-500 space-y-2 italic">
               <li>1. Copy the prompt above.</li>
               <li>2. Paste it into ChatGPT or any AI image generator.</li>
               <li>3. Upload a sample of the current calendar to maintain style consistency.</li>
               <li>4. Download the resulting marginal art for the next Pakkha cycle.</li>
             </ul>
          </div>
        </div>
      </div>

      <div className="p-8 bg-stone-50 text-stone-400 text-center flex flex-col items-center gap-2 border-t border-stone-100">
         <span className="text-[10px] font-black uppercase tracking-[0.4em]">"Dhamma is the great forest of serenity"</span>
      </div>
    </div>
  );
};

export default PromptView;
