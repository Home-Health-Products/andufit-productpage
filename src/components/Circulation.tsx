'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import CalcButton from './CalcButton';

type Benefit = { icon: string; title: string; text: string };

const BENEFIT_ICONS: Record<string, JSX.Element> = {
  heart: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-4.5-9.5-9A5 5 0 0112 6a5 5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z" />
    </svg>
  ),
  muscle: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12c0-3 2-5 5-5s4 1 5 3M6 12c0 3 2 5 5 5h5a3 3 0 003-3v-3M6 12H4M19 9V7" />
    </svg>
  ),
  recovery: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3M14 4l3 2.7-3 2.3M10 20l-3-2.7 3-2.3" />
    </svg>
  ),
  energy: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />
    </svg>
  ),
};

export default function Circulation() {
  const t = useTranslations('circulation');
  const c = t.raw('comparison') as {
    beforeImage: string;
    afterImage: string;
    beforeLabel: string;
    afterLabel: string;
    beforeCaption: string;
    afterCaption: string;
    beforeAlt: string;
    afterAlt: string;
    sliderAria: string;
    hint: string;
  };
  const benefits = t.raw('benefits') as Benefit[];
  const stat = t.raw('stat') as { value: string; label: string; source: string };
  const [pos, setPos] = useState(50);

  return (
    <section id={t('id')} className="py-20 lg:py-28 bg-gradient-to-b from-white to-brand-cream">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-medium mb-3">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-ink mb-5">{t('title')}</h2>
          <p className="text-lg text-ink-soft">{t('lead')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Slider */}
          <div className="reveal">
            <div className="compare-slider relative aspect-square rounded-2xl overflow-hidden border border-line shadow-lg bg-white">
              {/* After (full) */}
              <Image
                src={c.afterImage}
                alt={c.afterAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-4 right-4 z-10 bg-good text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-sm">
                {c.afterLabel}
              </div>

              {/* Before (clipped) */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              >
                <Image
                  src={c.beforeImage}
                  alt={c.beforeAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 z-10 bg-bad text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-sm">
                  {c.beforeLabel}
                </div>
              </div>

              {/* Divider line + handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none z-10"
                style={{ left: `${pos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center text-brand-dark border-2 border-brand-dark">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
                  </svg>
                </div>
              </div>

              <input
                type="range"
                min={0}
                max={100}
                value={pos}
                onChange={(e) => setPos(parseInt(e.target.value))}
                aria-label={c.sliderAria}
              />
            </div>
            <p className="text-center text-xs text-ink-muted mt-3">{c.hint}</p>
          </div>

          {/* Benefits + stat */}
          <div className="space-y-5 reveal">
            <div className="bg-gradient-to-br from-brand-dark to-brand text-white rounded-2xl p-6 lg:p-7 shadow-md">
              <div className="text-[11px] uppercase tracking-widest mb-2 text-brand-light">
                Klinische meting
              </div>
              <div className="flex items-end gap-3">
                <div className="font-display text-4xl sm:text-5xl lg:text-6xl leading-none">{stat.value}</div>
                <p className="text-sm text-white/90 pb-1">{stat.label}</p>
              </div>
              <div className="text-[11px] text-white/65 border-t border-white/20 pt-3 mt-4">
                {stat.source}
              </div>
            </div>

            <div className="flex justify-center lg:justify-start">
              <CalcButton variant="light" withHint />
            </div>

            <ul className="space-y-3">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-line">
                  <span className="shrink-0 w-11 h-11 rounded-lg bg-brand-cream text-brand-dark flex items-center justify-center">
                    {BENEFIT_ICONS[b.icon] ?? null}
                  </span>
                  <div>
                    <h3 className="text-sm font-medium text-ink mb-0.5">{b.title}</h3>
                    <p className="text-sm text-ink-soft leading-relaxed">{b.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
