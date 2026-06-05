'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import CalcButton from './CalcButton';

type Clip = { src: string; poster: string; caption: string };

export default function InAction() {
  const t = useTranslations('inAction');
  const videos = t.raw('videos') as Clip[];
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

  return (
    <section id={t('id')} className="py-20 lg:py-28 bg-gradient-to-b from-brand-cream to-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-medium mb-3">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-ink mb-5">{t('title')}</h2>
          <p className="text-lg text-ink-soft">{t('lead')}</p>
        </div>

        <div className="relative">
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
            {videos.map((v, i) => (
              <figure
                key={i}
                data-card
                className="snap-start shrink-0 w-[72%] sm:w-[48%] md:w-[33%] lg:w-[24%] reveal"
              >
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-ink shadow-md ring-1 ring-line">
                  <video
                    src={v.src}
                    poster={v.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  {/* subtle gradient for caption */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
                  {/* LIVE-style badge */}
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur text-ink text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-dark animate-pulse-slow" />
                    Live
                  </span>
                </div>
                <figcaption className="mt-3 text-sm text-ink-soft text-center px-2 leading-snug">
                  {v.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <CalcButton variant="primary" withHint />
        </div>
      </div>
    </section>
  );
}
