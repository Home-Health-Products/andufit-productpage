'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import CalcButton from './CalcButton';

type Clip = { src?: string; poster?: string; caption: string; youtube?: string };

export default function InAction() {
  const t = useTranslations('inAction');
  const videos = t.raw('videos') as Clip[];
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [playing, setPlaying] = useState<Record<number, boolean>>({});

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
    <section id={t('id')} className="py-20 lg:py-28 bg-gradient-to-b from-brand-cream to-white overflow-x-clip">
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
                  {v.youtube ? (
                    playing[i] ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${v.youtube}?autoplay=1&mute=1&loop=1&playlist=${v.youtube}&playsinline=1&rel=0&modestbranding=1`}
                        title={v.caption}
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPlaying((p) => ({ ...p, [i]: true }))}
                        aria-label={v.caption}
                        className="group absolute inset-0 w-full h-full"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://i.ytimg.com/vi/${v.youtube}/hqdefault.jpg`}
                          alt={v.caption}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        {/* play button */}
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/90 backdrop-blur shadow-lg group-hover:scale-105 transition-transform">
                            <svg className="w-6 h-6 translate-x-0.5 text-brand-dark" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </span>
                      </button>
                    )
                  ) : (
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
                  )}
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
