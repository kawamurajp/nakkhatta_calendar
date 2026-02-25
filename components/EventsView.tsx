import React, { useMemo } from 'react';
import { ThaiYear } from '../types';
import { EVENTS_DB } from '../data/events';

interface EventsViewProps {
  data: ThaiYear;
  onClose: () => void;
}

const EventsView: React.FC<EventsViewProps> = ({ data, onClose }) => {
  const processedEvents = useMemo(() => {
    return EVENTS_DB.map(evt => {
      let date: Date | null = null;
      if (evt.type === 'Solar' && evt.solarMonth !== undefined && evt.solarDay !== undefined) {
        date = new Date(data.adYear, evt.solarMonth, evt.solarDay);
      } else if (evt.type === 'Lunar' && evt.season && evt.seasonalPakkha && evt.tithi) {
        const pakkha = data.halfMonths.find(hm => hm.season === evt.season && hm.seasonalPakkhaNumber === evt.seasonalPakkha);
        if (pakkha) {
          const day = pakkha.days.find(d => d.titthi === evt.tithi);
          if (day) date = day.solarDate;
        }
      }
      return { ...evt, date, isFound: !!date };
    }).sort((a, b) => (a.date?.getTime() || 0) - (b.date?.getTime() || 0));
  }, [data]);

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-stone-200 overflow-hidden flex flex-col no-print max-w-7xl mx-auto w-full min-h-[60vh]">
      <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
        <div>
          <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tighter italic">Annual Events</h2>
          <p className="text-stone-500 font-bold text-xs uppercase tracking-widest mt-1">Significance & Quotes</p>
        </div>
        <button onClick={onClose} className="bg-stone-900 hover:bg-stone-800 border border-stone-800 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95">Back</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1200px] text-xs">
          <thead>
            <tr className="bg-stone-900 text-stone-400 text-[9px] uppercase tracking-[0.2em]">
              <th className="p-4 font-black border-r border-stone-800">Date</th>
              <th className="p-4 font-black border-r border-stone-800">Event</th>
              <th className="p-4 font-black border-r border-stone-800">Theme</th>
              <th className="p-4 font-black border-r border-stone-800 w-64">Quote</th>
              <th className="p-4 font-black border-r border-stone-800">Ref</th>
              <th className="p-4 font-black border-r border-stone-800">Location</th>
              <th className="p-4 font-black border-r border-stone-800">People</th>
              <th className="p-4 font-black border-r border-stone-800">Sutta</th>
              <th className="p-4 font-black">Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-stone-600">
            {processedEvents.map((evt) => (
              <tr key={evt.id} className="hover:bg-amber-50 transition-colors">
                <td className="p-4 border-r border-stone-100 whitespace-nowrap font-bold text-stone-900">
                   {evt.date ? evt.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', weekday: 'short'}) : '-'}
                </td>
                <td className="p-4 border-r border-stone-100">
                  <div className="font-black text-stone-900">{evt.name}</div>
                  <div className="text-[10px] text-stone-500">{evt.description}</div>
                </td>
                <td className="p-4 border-r border-stone-100 text-amber-600 font-bold">{evt.theme || '-'}</td>
                <td className="p-4 border-r border-stone-100 italic text-stone-500">"{evt.quote || '-'}"</td>
                <td className="p-4 border-r border-stone-100 text-stone-500">{evt.ref || '-'}</td>
                <td className="p-4 border-r border-stone-100 text-stone-500">{evt.location || '-'}</td>
                <td className="p-4 border-r border-stone-100 text-stone-500">{evt.people || '-'}</td>
                <td className="p-4 border-r border-stone-100 text-stone-500">{evt.sutta || '-'}</td>
                <td className={`p-4 text-stone-500 ${evt.note?.includes('Sunrise') ? 'bg-amber-50/50 font-medium text-stone-700' : ''}`}>
                  {evt.note || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsView;