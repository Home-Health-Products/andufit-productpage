'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function StickyCta() {
  const t = useTranslations('stickyCta');
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
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink truncate">{t('label')}</p>
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
