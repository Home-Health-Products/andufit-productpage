'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import CalcButton from './CalcButton';

type Usp = { icon: string; label: string };
type Feature = {
  id: string;
  title: string;
  text: string;
  image: string;
  fit: 'cover' | 'contain';
  badge: string;
};

const USP_ICONS: Record<string, JSX.Element> = {
  // ruler — slechts 7 cm
  height: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="8" rx="1.5" />
      <path d="M7 8v3M11 8v4M15 8v3M19 8v4" />
    </svg>
  ),
  // moon — nachten op proef
  trial: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A8.5 8.5 0 1111.2 3a6.5 6.5 0 009.8 9.8z" />
    </svg>
  ),
  // truck — gratis levering
  shipping: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  ),
};

function FeatureCard({ f, large = false }: { f: Feature; large?: boolean }) {
  const contain = f.fit === 'contain';
  return (
    <article
      className={`reveal group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a2f33] to-[#15181b] ${
        large ? 'aspect-[16/10]' : 'aspect-[4/3]'
      }`}
    >
      <Image
        src={f.image}
        alt={f.title}
        fill
        sizes={large ? '(max-width:1024px) 100vw, 50vw' : '(max-width:640px) 100vw, 33vw'}
        className={`transition-transform duration-700 group-hover:scale-[1.04] ${
          contain ? 'object-contain p-8' : 'object-cover'
        }`}
      />
      {/* readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      {/* badge */}
      <span className="absolute top-4 right-4 inline-flex items-center text-[10px] uppercase tracking-widest font-semibold text-white bg-white/15 backdrop-blur border border-white/20 rounded-full px-3 py-1">
        {f.badge}
      </span>

      {/* copy */}
      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
        <h3 className="font-display text-xl lg:text-2xl text-white mb-1.5">{f.title}</h3>
        <p className="text-sm text-white/70 leading-relaxed max-w-md">{f.text}</p>
      </div>
    </article>
  );
}

export default function ProductOverview() {
  const t = useTranslations('productOverview');
  const usps = t.raw('usps') as Usp[];
  const features = t.raw('features') as Feature[];
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section id={t('id')} className="scroll-mt-24 py-20 lg:py-28 bg-soft">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-12 reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-medium mb-3">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-ink mb-5">{t('title')}</h2>
          <p className="text-lg text-ink-soft">{t('lead')}</p>
        </div>

        {/* Product bar — name + USPs + price/CTA */}
        <div className="reveal rounded-2xl border border-line bg-white shadow-sm px-6 py-5 lg:px-8 lg:py-6 mb-6 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
          <div className="flex-1">
            <div className="font-display text-lg lg:text-xl text-ink mb-3">{t('productName')}</div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {usps.map((u, i) => (
                <li key={i} className="inline-flex items-center gap-2 text-sm text-ink-soft">
                  <span className="text-brand-dark w-5 h-5 inline-block">{USP_ICONS[u.icon]}</span>
                  {u.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-5 lg:gap-6 lg:border-l lg:border-line lg:pl-8">
            <div className="text-left">
              <div className="font-display font-normal text-3xl text-ink leading-none tabular-nums">{t('price')}</div>
              <div className="text-xs text-ink-muted mt-1">{t('financing')}</div>
            </div>
            <a
              href={t('ctaHref')}
              className="inline-flex items-center justify-center rounded-full bg-brand text-white font-medium px-6 py-3 hover:bg-brand-dark transition-colors whitespace-nowrap"
            >
              {t('ctaLabel')}
            </a>
          </div>
        </div>

        {/* Hero image */}
        <div className="reveal relative aspect-[16/9] lg:aspect-[21/9] rounded-3xl overflow-hidden bg-ink mb-6">
          <Image
            src={t('heroImage')}
            alt={t('heroAlt')}
            fill
            sizes="(max-width:1280px) 100vw, 1280px"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Feature cards — mobile slider */}
        <div className="md:hidden">
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {features.map((f) => (
              <div key={f.id} className="shrink-0 w-[85%] snap-center">
                <FeatureCard f={f} />
              </div>
            ))}
          </div>
          {features.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-1">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label={t('prevLabel')}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-line bg-white text-ink hover:border-brand hover:text-brand-dark transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-xs text-ink-muted">{t('swipeHint')}</span>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label={t('nextLabel')}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-line bg-white text-ink hover:border-brand hover:text-brand-dark transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Feature cards — desktop grids */}
        <div className="hidden md:block">
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {features.slice(0, 2).map((f) => (
              <FeatureCard key={f.id} f={f} large />
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.slice(2).map((f) => (
              <FeatureCard key={f.id} f={f} />
            ))}
          </div>
        </div>

        <div className="reveal flex justify-center mt-10">
          <CalcButton variant="primary" withHint />
        </div>
      </div>
    </section>
  );
}
