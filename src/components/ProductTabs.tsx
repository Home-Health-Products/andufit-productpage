'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Tab = { id: string; label: string };

export default function ProductTabs({
  children,
}: {
  children: Record<string, React.ReactNode>;
}) {
  const t = useTranslations('tabs');
  const tabs = t.raw('items') as Tab[];
  const [active, setActive] = useState(tabs[0].id);

  return (
    <section className="bg-white border-t border-line">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Tab bar */}
        <div className="flex gap-1 overflow-x-auto border-b border-line -mx-5 px-5 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                active === tab.id
                  ? 'border-brand-dark text-ink'
                  : 'border-transparent text-ink-muted hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="py-10 lg:py-14 animate-fade-in">
          {children[active] ?? children[tabs[0].id]}
        </div>
      </div>
    </section>
  );
}
