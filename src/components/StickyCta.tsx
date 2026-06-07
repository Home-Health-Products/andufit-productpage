'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSizeContext } from '@/contexts/SizeContext';

export default function StickyCta() {
  const t = useTranslations('stickyCta');
  const { stockCount } = useSizeContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="region"
      aria-label="Bestel-balk"
    >
      <div className="bg-white border-t border-line shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-good flex items-center gap-1.5">
              <svg className="shrink-0 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
              </svg>
              {t('giftLabel')}
            </p>
            <p className="text-xs font-medium flex items-center gap-1 mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-600">Nog {stockCount} beschikbaar</span>
            </p>
          </div>
          <a
            href="#buy"
            className="shrink-0 bg-brand hover:bg-brand-dark text-white font-semibold text-sm px-5 py-3 rounded-lg transition"
          >
            {t('cta')} →
          </a>
        </div>
      </div>
    </div>
  );
}
