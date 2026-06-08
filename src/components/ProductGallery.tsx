'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type GalleryImage = { src: string; alt: string };
type Feature = {
  id: string;
  title: string;
  text: string;
  image: string;
  fit: 'cover' | 'contain';
  badge: string;
};

type Slide = {
  src: string;
  alt: string;
  fit: 'cover' | 'contain';
  overlay: boolean;
  title?: string;
  text?: string;
  badge?: string;
};

export default function ProductGallery() {
  const t = useTranslations('gallery');
  const to = useTranslations('productOverview');
  const images = t.raw('images') as GalleryImage[];
  const features = to.raw('features') as Feature[];

  // First slide = original first photo (no text). From the 2nd slide on =
  // the feature visuals with their text overlay.
  const slides: Slide[] = [
    { src: images[0].src, alt: images[0].alt, fit: 'cover', overlay: false },
    ...features.map((f) => ({
      src: f.image,
      alt: f.title,
      fit: f.fit,
      overlay: true,
      title: f.title,
      text: f.text,
      badge: f.badge,
    })),
  ];

  const [active, setActive] = useState(0);
  const cur = slides[active];

  return (
    <div>
      {/* Main image */}
      <div
        className={`relative aspect-square rounded-2xl overflow-hidden border border-line ${
          cur.overlay ? 'bg-gradient-to-br from-[#2a2f33] to-[#15181b]' : 'bg-brand-cream'
        }`}
      >
        <Image
          key={cur.src}
          src={cur.src}
          alt={cur.alt}
          fill
          priority={active === 0}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`animate-fade-in ${cur.fit === 'contain' ? 'object-contain p-8' : 'object-cover'}`}
        />

        {cur.overlay && (
          <>
            {/* readability gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            {/* badge */}
            <span className="absolute top-4 right-4 inline-flex items-center text-[10px] uppercase tracking-widest font-semibold text-white bg-white/15 backdrop-blur border border-white/20 rounded-full px-3 py-1">
              {cur.badge}
            </span>
            {/* copy */}
            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
              <h3 className="font-display text-xl lg:text-2xl text-white mb-1.5">{cur.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed max-w-md">{cur.text}</p>
            </div>
          </>
        )}
      </div>

      {/* Thumbnails — horizontal under main image */}
      <div
        className="mt-4 hidden lg:grid grid-cols-6 gap-3"
        role="listbox"
        aria-label={t('thumbsLabel')}
      >
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            role="option"
            aria-selected={i === active}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
              s.overlay ? 'bg-gradient-to-br from-[#2a2f33] to-[#15181b]' : 'bg-brand-cream'
            } ${i === active ? 'border-brand-dark' : 'border-line hover:border-brand'}`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="80px"
              className={s.fit === 'contain' ? 'object-contain p-1.5' : 'object-cover'}
            />
          </button>
        ))}
      </div>

      {/* Mobile: scrollable horizontal thumbnails */}
      <div
        className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden snap-x"
        role="listbox"
        aria-label={t('thumbsLabel')}
      >
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            role="option"
            aria-selected={i === active}
            className={`relative w-20 aspect-square shrink-0 rounded-lg overflow-hidden border-2 snap-start transition ${
              s.overlay ? 'bg-gradient-to-br from-[#2a2f33] to-[#15181b]' : 'bg-brand-cream'
            } ${i === active ? 'border-brand-dark' : 'border-line'}`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="64px"
              className={s.fit === 'contain' ? 'object-contain p-1' : 'object-cover'}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
