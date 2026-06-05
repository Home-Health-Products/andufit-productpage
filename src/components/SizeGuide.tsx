'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

type Preset = {
  code: string;
  label: string;
  widthCm: number;
  lengthCm: number;
  note: string;
};

// Top-view mattress / bed silhouette with the ANDUFIT module underneath
const MattressSilhouette = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 200 130" className={className} aria-hidden="true">
    {/* Module under the mattress (peeking out, dashed) */}
    <rect
      x="22"
      y="30"
      width="156"
      height="78"
      rx="8"
      fill="currentColor"
      opacity="0.18"
    />
    {/* Mattress */}
    <rect
      x="14"
      y="18"
      width="172"
      height="84"
      rx="12"
      fill="currentColor"
      opacity="0.9"
    />
    {/* Quilting seams */}
    <line x1="14" y1="46" x2="186" y2="46" stroke="white" strokeWidth="1.5" opacity="0.5" />
    <line x1="14" y1="74" x2="186" y2="74" stroke="white" strokeWidth="1.5" opacity="0.5" />
    {/* Pillow */}
    <rect x="26" y="26" width="148" height="18" rx="6" fill="white" opacity="0.55" />
  </svg>
);

export default function SizeGuide() {
  const t = useTranslations('sizeGuide');
  const presets = t.raw('presets') as Preset[];
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]') as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const minWidth = Math.min(...presets.map((p) => p.widthCm));
  const maxWidth = Math.max(...presets.map((p) => p.widthCm));
  // Scale mattress silhouette visually by relative width
  const scaleFor = (p: Preset) => {
    const pct = (p.widthCm - minWidth) / Math.max(1, maxWidth - minWidth);
    return 0.6 + pct * 0.4; // 0.6 → 1.0
  };

  return (
    <section id={t('id')} className="scroll-mt-24 py-20 lg:py-28 bg-soft">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-medium mb-3">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-ink mb-5">{t('title')}</h2>
          <p className="text-lg text-ink-soft">{t('lead')}</p>
        </div>

        {/* How to measure block */}
        <div className="max-w-4xl mx-auto mb-12 lg:mb-14 reveal">
          <div className="bg-white border border-line rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row gap-6 md:items-center">
            <div className="shrink-0 relative w-full md:w-64 aspect-[5/3] bg-brand-cream rounded-xl flex items-center justify-center">
              <div className="relative w-[82%] text-brand-dark">
                <MattressSilhouette className="w-full" />
                {/* Width bracket (top) */}
                <svg viewBox="0 0 200 24" className="absolute -top-1 left-0 w-full" aria-hidden="true">
                  <line x1="14" y1="14" x2="186" y2="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="14" y1="8" x2="14" y2="20" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="186" y1="8" x2="186" y2="20" stroke="currentColor" strokeWidth="1.5" />
                  <text x="100" y="9" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="600">
                    {t('widthLabel')}
                  </text>
                </svg>
                {/* Length bracket (side) */}
                <svg viewBox="0 0 24 130" className="absolute top-0 -right-2 h-full" aria-hidden="true">
                  <line x1="12" y1="18" x2="12" y2="102" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="6" y1="18" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="6" y1="102" x2="18" y2="102" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl lg:text-2xl text-ink mb-2">{t('howToTitle')}</h3>
              <p className="text-sm lg:text-base text-ink-soft leading-relaxed">{t('howToText')}</p>
            </div>
          </div>
        </div>

        {/* Preset cards — horizontal carousel */}
        <div className="relative">
          <div className="mb-4 text-xs uppercase tracking-wider text-ink-muted font-medium text-center">
            {t('presetsLabel')}
          </div>

          {/* Prev */}
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Vorige"
            disabled={!canPrev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-line items-center justify-center text-ink hover:bg-brand-cream hover:text-brand-dark transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={() => scrollBy(1)}
            aria-label="Volgende"
            disabled={!canNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-line items-center justify-center text-ink hover:bg-brand-cream hover:text-brand-dark transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
            </svg>
          </button>

          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 lg:mx-0 lg:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {presets.map((p) => {
              const scale = scaleFor(p);
              return (
                <div
                  key={p.code}
                  data-card
                  className="snap-start shrink-0 w-[72%] sm:w-[48%] md:w-[33%] lg:w-[24%] reveal group relative bg-white border border-line rounded-2xl overflow-hidden hover:border-brand hover:shadow-md transition"
                >
                  {/* Top: size + mattress */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-cream to-soft flex items-center justify-center overflow-hidden">
                    <span className="absolute top-3 left-4 font-display text-xl lg:text-2xl text-ink">
                      {p.code}
                    </span>
                    <span className="absolute top-3 right-4 text-[11px] font-medium text-brand-dark bg-white/70 backdrop-blur px-2 py-1 rounded-full">
                      cm
                    </span>
                    <div
                      className="text-brand-dark transition group-hover:scale-105"
                      style={{ width: `${scale * 78}%` }}
                    >
                      <MattressSilhouette className="w-full" />
                    </div>
                  </div>

                  {/* Bottom: label + note */}
                  <div className="p-4">
                    <div className="text-sm font-medium text-ink mb-1">{p.label}</div>
                    <div className="text-[11px] uppercase tracking-wider text-ink-muted mb-1">
                      {t('widthLabel')} {p.widthCm} · {t('lengthLabel')} {p.lengthCm}
                    </div>
                    <p className="text-xs text-ink-soft leading-relaxed">{p.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Help footer */}
        <div className="mt-10 max-w-2xl mx-auto text-center reveal">
          <div className="inline-flex items-start gap-3 bg-white border border-line rounded-xl px-5 py-4 text-left">
            <svg className="shrink-0 w-5 h-5 text-brand-dark mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4M12 16h.01" />
            </svg>
            <div>
              <p className="text-sm font-medium text-ink">{t('helpText')}</p>
              <p className="text-sm text-ink-soft">{t('helpCta')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
