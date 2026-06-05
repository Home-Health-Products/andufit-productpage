'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Item = { q: string; a: string };

export default function Faq() {
  const t = useTranslations('faq');
  const items = t.raw('items') as Item[];
  const [open, setOpen] = useState<number | null>(0);

  const half = Math.ceil(items.length / 2);
  const columns = [
    { start: 0, list: items.slice(0, half) },
    { start: half, list: items.slice(half) },
  ];

  const renderItem = (it: Item, idx: number) => {
    const isOpen = open === idx;
    return (
      <div key={idx} className="border-b border-line">
        <button
          onClick={() => setOpen(isOpen ? null : idx)}
          className="w-full text-left py-5 flex items-start justify-between gap-4 group"
        >
          <span className="font-medium text-ink group-hover:text-brand-dark transition-colors">
            {it.q}
          </span>
          <svg
            className={`shrink-0 mt-1 w-5 h-5 text-brand-dark transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {isOpen && (
          <div className="pb-5 -mt-1 text-ink-soft text-sm leading-relaxed whitespace-pre-line">
            {it.a}
          </div>
        )}
      </div>
    );
  };

  return (
    <div id={t('id')} className="scroll-mt-24 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-x-12 lg:gap-x-16">
        {columns.map((col, c) => (
          <div key={c} className="border-t border-line">
            {col.list.map((it, i) => renderItem(it, col.start + i))}
          </div>
        ))}
      </div>
    </div>
  );
}
