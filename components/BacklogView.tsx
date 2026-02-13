import React, { useState, useEffect } from 'react';

interface BacklogItem {
  id: string;
  title: string;
  category: 'Feature' | 'Research' | 'UX' | 'Religious';
  status: 'Planned' | 'In Progress' | 'Discovery';
  description: string;
  isHighPriority?: boolean;
}

interface BacklogSection {
  title: string;
  subtitle: string;
  items: BacklogItem[];
  type: 'Sprint' | 'Product' | 'Seasonal';
}

const BacklogView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [sections, setSections] = useState<BacklogSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBacklog = async () => {
      try {
        const response = await fetch('/gemini.md');
        const text = await response.text();
        const parsed = parseMarkdown(text);
        setSections(parsed);
      } catch (error) {
        console.error('Failed to load backlog from gemini.md', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBacklog();
  }, []);

  // Simple Markdown parser for our specific gemini.md format
  const parseMarkdown = (text: string): BacklogSection[] => {
    const lines = text.split('\n');
    const sections: BacklogSection[] = [];
    let currentSection: BacklogSection | null = null;
    let currentItem: Partial<BacklogItem> | null = null;

    lines.forEach((line) => {
      const trimmed = line.trim();

      // Parse Section Header (## 1. Sprint Backlog)
      if (trimmed.startsWith('## ')) {
        if (currentSection) sections.push(currentSection);
        const title = trimmed.replace('## ', '');
        currentSection = {
          title: title.includes('.') ? title.split('. ')[1] : title,
          subtitle: title.includes('(') ? title.match(/\(([^)]+)\)/)?.[1] || '' : '',
          items: [],
          type: title.toLowerCase().includes('sprint') ? 'Sprint' : 'Product'
        };
        // Clean subtitle from title
        currentSection.title = currentSection.title.split(' (')[0];
      } 
      // Parse Subsection Header (### Hemanta 8)
      else if (trimmed.startsWith('### ')) {
        if (currentSection) sections.push(currentSection);
        const title = trimmed.replace('### ', '');
        currentSection = {
          title: title.split(' (')[0],
          subtitle: title.match(/\(([^)]+)\)/)?.[1] || 'Upcoming Milestone',
          items: [],
          type: 'Seasonal'
        };
      }
      // Parse Item Header (- [ ] **Title** (Category))
      else if (trimmed.startsWith('- [ ] ') || trimmed.startsWith('- [x] ')) {
        if (currentItem && currentSection) {
          currentSection.items.push(currentItem as BacklogItem);
        }
        
        const content = trimmed.substring(6);
        const titleMatch = content.match(/\*\*(.*?)\*\*/);
        const categoryMatch = content.match(/\((.*?)\)/);
        
        currentItem = {
          id: Math.random().toString(36).substr(2, 9),
          title: titleMatch ? titleMatch[1] : 'Untitled',
          category: (categoryMatch ? categoryMatch[1] : 'Feature') as any,
          description: '',
          status: 'Planned'
        };
      }
      // Parse Metadata ( - **Status:** ...)
      else if (trimmed.startsWith('- **Status:**')) {
        const statusStr = trimmed.split('**Status:**')[1].split('|')[0].trim();
        const priorityStr = trimmed.includes('**Priority:**') ? trimmed.split('**Priority:**')[1].trim() : '';
        
        if (currentItem) {
          currentItem.status = statusStr as any;
          if (priorityStr.toLowerCase().includes('highest')) {
            currentItem.isHighPriority = true;
          }
        }
      }
      // Parse Description ( - **Description:** ...)
      else if (trimmed.startsWith('- **Description:**')) {
        if (currentItem) {
          currentItem.description = trimmed.split('**Description:**')[1].trim();
        }
      }
    });

    // Push final item and section
    if (currentItem && currentSection) currentSection.items.push(currentItem as BacklogItem);
    if (currentSection) sections.push(currentSection);

    return sections;
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-stone-200 overflow-hidden flex flex-col no-print max-w-6xl mx-auto w-full min-h-[85vh]">
      {/* Header */}
      <div className="p-8 border-b border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-stone-50/50">
        <div>
          <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tighter italic">Roadmap & Backlog</h2>
          <p className="text-stone-500 font-bold text-xs uppercase tracking-widest mt-1">Source: gemini.md</p>
        </div>
        <button onClick={onClose} className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 shadow-lg">Back to Calendar</button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-16">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          sections.map((section, idx) => (
            <section key={idx} className="space-y-8">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tight border-b-2 border-stone-200 pb-1">
                  {idx + 1}. {section.title}
                </h3>
                {section.subtitle && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                    section.type === 'Sprint' ? 'bg-amber-500 text-stone-950' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {section.subtitle}
                  </span>
                )}
              </div>
              
              <div className={`grid grid-cols-1 gap-6 ${
                section.items.length >= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'
              }`}>
                {section.items.map((item) => (
                  <BacklogCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
      
      <div className="p-8 bg-stone-50 text-stone-400 text-center flex flex-col items-center gap-2 border-t border-stone-100">
      </div>
    </div>
  );
};

const BacklogCard: React.FC<{ item: BacklogItem }> = ({ item }) => (
  <div className={`bg-white border p-6 rounded-2xl hover:border-amber-300 hover:shadow-xl transition-all group flex flex-col h-full ${item.isHighPriority ? 'ring-2 ring-amber-500/20 border-amber-200 shadow-lg' : 'border-stone-100'}`}>
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-2">
        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded border ${
          item.category === 'Religious' ? 'bg-amber-100 text-amber-700 border-amber-200' :
          item.category === 'Feature' ? 'bg-blue-100 text-blue-700 border-blue-200' :
          item.category === 'UX' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
          'bg-stone-200 text-stone-600 border-stone-300'
        }`}>
          {item.category}
        </span>
        {item.isHighPriority && (
          <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded bg-red-600 text-white border-red-700 animate-pulse">
            Highest
          </span>
        )}
      </div>
      <span className="text-[8px] font-black uppercase text-stone-400 italic">
        {item.status}
      </span>
    </div>
    <h3 className="text-lg font-black text-stone-900 group-hover:text-amber-600 transition-colors uppercase tracking-tight leading-tight">
      {item.title}
    </h3>
    <p className="mt-3 text-[12px] text-stone-500 leading-relaxed font-medium flex-1">
      {item.description}
    </p>
    <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
       <div className="flex gap-1">
          {[1, 2, 3].map(i => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= (item.status === 'In Progress' ? 3 : item.status === 'Discovery' ? 1 : 0) ? 'bg-amber-500' : 'bg-stone-200'}`}></div>
          ))}
       </div>
       <span className="text-[7px] font-black text-stone-300 uppercase tracking-tighter">
         {item.status === 'In Progress' ? (item.isHighPriority ? 'Immediate' : 'Active') : 'Backlog'}
       </span>
    </div>
  </div>
);

export default BacklogView;