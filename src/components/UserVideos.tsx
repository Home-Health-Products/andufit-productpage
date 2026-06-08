'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Video = {
  thumbnail: string;
  name: string;
  dog: string;
  title: string;
  duration: string;
  youtubeId: string;
};

export default function UserVideos() {
  const t = useTranslations('userVideos');
  const items = t.raw('items') as Video[];
  const [open, setOpen] = useState<number | null>(null);
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
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <section id={t('id')} className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-medium mb-3">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-ink mb-5">{t('title')}</h2>
          <p className="text-lg text-ink-soft">{t('lead')}</p>
        </div>

        {/* Horizontal carousel */}
        <div className="relative">
          {/* Prev arrow */}
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Vorige"
            disabled={!canPrev}
            className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-line items-center justify-center text-ink hover:bg-brand-cream hover:text-brand-dark transition disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={() => scrollBy(1)}
            aria-label="Volgende"
            disabled={!canNext}
            className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-line items-center justify-center text-ink hover:bg-brand-cream hover:text-brand-dark transition disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
            </svg>
          </button>

          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 lg:mx-0 lg:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((v, i) => (
              <button
                key={i}
                data-card
                onClick={() => setOpen(i)}
                className="snap-start group relative shrink-0 w-[72%] sm:w-[48%] md:w-[34%] lg:w-[26%] aspect-[9/16] rounded-2xl overflow-hidden bg-ink shadow-md hover:shadow-xl transition"
                aria-label={`${t('playLabel')}: ${v.name} & ${v.dog}`}
              >
                <Image
                  src={v.thumbnail}
                  alt={`${v.name} en ${v.dog}`}
                  fill
                  sizes="(max-width: 768px) 70vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

                {/* Duration badge */}
                <span className="absolute top-3 right-3 bg-black/70 backdrop-blur text-white text-[11px] font-medium px-2 py-1 rounded-full">
                  {v.duration}
                </span>

                {/* Play button */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl transition group-hover:scale-110 group-hover:bg-white">
                  <svg className="w-7 h-7 lg:w-8 lg:h-8 text-ink translate-x-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 4l10 6-10 6V4z" />
                  </svg>
                </span>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left text-white">
                  <p className="font-medium text-sm leading-snug line-clamp-2 mb-1">{v.title}</p>
                  <p className="text-[11px] text-white/80">
                    <span className="font-medium">{v.name}</span> · {v.dog}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setOpen(null)}
            className="absolute top-4 right-4 lg:top-6 lg:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            aria-label="Sluiten"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-[380px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${items[open].youtubeId}?autoplay=1&rel=0`}
              title={`${items[open].name}, ${items[open].dog}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            <span className="font-medium text-white">{items[open].name}</span> · {items[open].dog}
          </p>
        </div>
      )}
    </section>
  );
}
