'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type GalleryImage = { src: string; alt: string };

export default function ProductGallery() {
  const t = useTranslations('gallery');
  const images = t.raw('images') as GalleryImage[];
  const [active, setActive] = useState(0);
  const cur = images[active];

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-brand-cream border border-line">
        <Image
          key={cur.src}
          src={cur.src}
          alt={cur.alt}
          fill
          priority={active === 0}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover animate-fade-in"
        />
      </div>

      {/* Thumbnails — horizontal under main image */}
      <div
        className="mt-4 hidden lg:grid grid-cols-8 gap-2"
        role="listbox"
        aria-label={t('thumbsLabel')}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            role="option"
            aria-selected={i === active}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
              i === active ? 'border-brand-dark' : 'border-line hover:border-brand'
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="80px"
              className="object-cover"
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
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            role="option"
            aria-selected={i === active}
            className={`relative w-16 aspect-square shrink-0 rounded-lg overflow-hidden border-2 snap-start transition ${
              i === active ? 'border-brand-dark' : 'border-line'
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="64px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
