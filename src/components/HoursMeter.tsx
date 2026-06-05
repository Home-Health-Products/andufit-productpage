'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function HoursMeter() {
  const t = useTranslations('hoursMeter');
  const locale = useLocale();
  const baseHours = t.raw('baseHours') as number;
  const perSec = t.raw('perSecondIncrement') as number;

  const [hours, setHours] = useState(baseHours);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      setHours(baseHours + elapsed * perSec);
    }, 1000);
    return () => clearInterval(id);
  }, [baseHours, perSec]);

  const localeMap: Record<string, string> = {
    nl: 'nl-BE',
    en: 'en-GB',
    de: 'de-DE',
    fr: 'fr-BE',
    es: 'es-ES',
  };
  const numLocale = localeMap[locale] ?? 'en-GB';
  const formattedHours = new Intl.NumberFormat(numLocale, {
    maximumFractionDigits: 0,
  }).format(Math.floor(hours));

  const stats = [
    { value: t('customersValue'), label: t('customersLabel') },
    { value: formattedHours, label: t('hoursLabel'), sub: t('hoursSub') },
    { value: t('countriesValue'), label: t('countriesLabel') },
    { value: t('studiesValue'), label: t('studiesLabel') },
  ];

  return (
    <section id={t('id')} className="py-16 lg:py-20 bg-ink relative overflow-hidden">
      {/* Decorative background pulse */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/15 via-transparent to-brand/5 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 lg:px-8 text-center text-white">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-brand-light font-bold mb-4 reveal">
          <span className="relative inline-flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-good animate-ping opacity-60" />
            <span className="relative inline-block w-2 h-2 rounded-full bg-good" />
          </span>
          {t('eyebrow')}
        </div>

        <h2 className="font-display text-3xl lg:text-4xl mb-10 lg:mb-14 reveal">{t('title')}</h2>

        {/* Figures */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 reveal">
          {stats.map((s, i) => (
            <div
              key={i}
              className="px-4 py-7 lg:px-6 lg:py-9 rounded-2xl bg-white/5 border border-white/10 backdrop-blur flex flex-col items-center"
            >
              <div className="font-display text-4xl lg:text-5xl leading-none bg-gradient-to-br from-white via-brand-light to-brand bg-clip-text text-transparent tabular-nums">
                {s.value}
              </div>
              <div className="text-xs lg:text-sm text-white/70 mt-3 leading-snug">{s.label}</div>
              {s.sub && (
                <div className="text-[11px] text-brand-light mt-1.5 inline-flex items-center gap-1.5">
                  <svg className="w-3 h-3 animate-pulse-slow" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 1l2.7 5.5 6.1.9-4.4 4.3 1 6.1L10 14.9 4.6 17.8l1-6.1L1.2 7.4l6.1-.9L10 1z" />
                  </svg>
                  {s.sub}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
