'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Case = {
  name: string;
  meta: string;
  image: string;
  beforeScore: string;
  afterScore: string;
  beforePct: number;
  afterPct: number;
  quote: string;
};

function VitaScore({
  brand,
  label,
  score,
  pct,
  tone,
}: {
  brand: string;
  label: string;
  score: string;
  pct: number;
  tone: 'low' | 'high';
}) {
  const barColor = tone === 'high' ? '#16a34a' : '#fbbf24';
  return (
    <div className="absolute inset-x-3 bottom-3 z-10 rounded-xl bg-black/55 backdrop-blur-sm px-3 py-2.5 text-white">
      <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-brand-light font-bold">
        <span className="text-white">Vita</span>
        <span>{brand}</span>
      </div>
      <div className="text-[10px] text-white/70 mt-0.5 leading-tight">{label}</div>
      <div className="flex items-end gap-2 mt-1">
        <span
          className="font-display text-3xl lg:text-4xl leading-none tabular-nums"
          style={{ color: tone === 'high' ? '#4ade80' : '#fcd34d' }}
        >
          {score}
        </span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-white/15 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const t = useTranslations('beforeAfter');
  const cases = t.raw('cases') as Case[];
  const fallbackImage = t('fallbackImage');

  const [active, setActive] = useState(0);
  const [imgError, setImgError] = useState(false);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cur = cases[active];

  // Reset the fallback flag whenever the visitor switches person.
  useEffect(() => {
    setImgError(false);
  }, [active]);

  // Auto-advance every 2 s using a ref so the interval never goes stale.
  useEffect(() => {
    const total = cases.length;
    const id = setInterval(() => {
      if (!pausedRef.current) {
        setActive((prev) => (prev + 1) % total);
      }
    }, 2000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manual selection: pause for 6 s then resume.
  const handleManualSelect = (i: number) => {
    setActive(i);
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { pausedRef.current = false; }, 6000);
  };

  const imgSrc = imgError ? fallbackImage : cur.image;

  return (
    <div className="mt-6">
      <h3 className="font-display text-xl lg:text-2xl text-ink mb-1">{t('title')}</h3>
      <p className="text-sm text-ink-muted mb-4">{t('subtitle')}</p>

      {/* Combined before/after VitaCheck frame */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-line shadow-sm bg-ink">
        <div className="absolute inset-0 grid grid-cols-2">
          {/* Before half */}
          <div className="relative overflow-hidden">
            <Image
              key={`b-${active}-${imgError ? 'fb' : 'src'}`}
              src={imgSrc}
              alt={t('beforeAlt')}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover animate-fade-in"
              onError={() => setImgError(true)}
            />
            <div className="absolute top-3 left-3 z-10 bg-bad text-white text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full shadow-sm">
              {t('beforeLabel')}
            </div>
            <VitaScore
              brand={t('checkLabel')}
              label={t('scoreLabel')}
              score={cur.beforeScore}
              pct={cur.beforePct}
              tone="low"
            />
          </div>

          {/* After half */}
          <div className="relative overflow-hidden border-l-[3px] border-white">
            <Image
              key={`a-${active}-${imgError ? 'fb' : 'src'}`}
              src={imgSrc}
              alt={t('afterAlt')}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover animate-fade-in"
              onError={() => setImgError(true)}
            />
            <div className="absolute top-3 right-3 z-10 bg-good text-white text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full shadow-sm">
              {t('afterLabel')}
            </div>
            <VitaScore
              brand={t('checkLabel')}
              label={t('scoreLabel')}
              score={cur.afterScore}
              pct={cur.afterPct}
              tone="high"
            />
          </div>
        </div>

        {/* Center divider with arrow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-ink">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
          </svg>
        </div>

        {/* Auto-advance progress bar */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 z-30">
          <div
            key={active}
            className="h-full bg-brand-light"
            style={{ animation: 'ba-progress 2s linear forwards' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes ba-progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>

      {/* Quote */}
      <div className="mt-4 p-4 bg-brand-cream rounded-xl border border-line">
        <p className="text-sm text-ink leading-relaxed mb-2">"{cur.quote}"</p>
        <p className="text-xs text-ink-muted">
          <span className="font-medium text-ink">{cur.name}</span> · {cur.meta}
        </p>
      </div>

      {/* Person switcher */}
      <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
        {cases.map((c, i) => (
          <button
            key={i}
            onClick={() => handleManualSelect(i)}
            aria-label={`Toon ${c.name}`}
            aria-current={i === active}
            className={`group flex flex-col items-center gap-1 transition ${
              i === active ? '' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <span
              className={`h-2.5 rounded-full transition ${
                i === active ? 'bg-brand-dark w-8' : 'bg-line w-2.5 group-hover:bg-brand'
              }`}
            />
            <span
              className={`text-[11px] font-medium transition ${
                i === active ? 'text-ink' : 'text-ink-muted'
              }`}
            >
              {c.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
