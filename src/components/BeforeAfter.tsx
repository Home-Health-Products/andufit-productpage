'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
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

export default function BeforeAfter() {
  const t = useTranslations('beforeAfter');
  const cases = t.raw('cases') as Case[];
  const fallbackImage = t('fallbackImage');

  const [active, setActive] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [sliderPct, setSliderPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [hinted, setHinted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cur = cases[active];

  // Reset fallback flag on person change
  useEffect(() => { setImgError(false); }, [active]);

  // Auto-advance every 2 s
  useEffect(() => {
    const total = cases.length;
    const id = setInterval(() => {
      if (!pausedRef.current) setActive(prev => (prev + 1) % total);
    }, 2000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleManualSelect = (i: number) => {
    setActive(i);
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { pausedRef.current = false; }, 6000);
  };

  const getPct = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return 50;
    const { left, width } = el.getBoundingClientRect();
    return Math.max(5, Math.min(95, ((clientX - left) / width) * 100));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setHinted(true);
    setSliderPct(getPct(e.clientX));
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setSliderPct(getPct(e.clientX));
  };

  const onPointerUp = () => {
    setDragging(false);
    resumeTimer.current = setTimeout(() => { pausedRef.current = false; }, 3000);
  };

  const imgSrc = imgError ? fallbackImage : cur.image;

  // Fade out VitaScore panels when their side gets too narrow
  const beforeOpacity = sliderPct > 20 ? 1 : 0;
  const afterOpacity = sliderPct < 80 ? 1 : 0;

  return (
    <div className="mt-6">
      <h3 className="font-display text-xl lg:text-2xl text-ink mb-1">{t('title')}</h3>
      <p className="text-sm text-ink-muted mb-4">{t('subtitle')}</p>

      {/* Slider container */}
      <div
        ref={containerRef}
        className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-line shadow-sm bg-ink select-none touch-none"
        style={{ cursor: dragging ? 'col-resize' : 'ew-resize' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* VOOR — full-width base layer */}
        <Image
          key={`b-${active}-${imgError}`}
          src={imgSrc}
          alt={t('beforeAlt')}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover animate-fade-in"
          onError={() => setImgError(true)}
          draggable={false}
        />

        {/* NA — same image, clipped to reveal right portion */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${sliderPct}%)` }}
        >
          <Image
            key={`a-${active}-${imgError}`}
            src={imgSrc}
            alt={t('afterAlt')}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* VOOR badge — top left */}
        <div className="absolute top-3 left-3 z-20 bg-bad text-white text-sm uppercase font-bold px-2.5 py-1 rounded-full shadow-sm pointer-events-none">
          {t('beforeLabel')}
        </div>

        {/* NA badge — top right */}
        <div className="absolute top-3 right-3 z-20 bg-good text-white text-sm uppercase font-bold px-2.5 py-1 rounded-full shadow-sm pointer-events-none">
          {t('afterLabel')}
        </div>

        {/* Before VitaScore — bottom left, width follows slider */}
        <div
          className="absolute left-3 bottom-3 z-20 rounded-xl bg-black/55 backdrop-blur-sm px-3 py-2.5 text-white pointer-events-none overflow-hidden"
          style={{
            maxWidth: `calc(${sliderPct}% - 20px)`,
            opacity: beforeOpacity,
            transition: 'opacity 0.2s',
          }}
        >
          <div className="flex items-center gap-1 text-xs uppercase tracking-widest font-bold whitespace-nowrap">
            <span className="text-white">Vita</span>
            <span className="text-brand-light">{t('checkLabel')}</span>
          </div>
          <div className="text-xs text-white/70 mt-0.5 truncate">{t('scoreLabel')}</div>
          <span
            className="font-display text-4xl lg:text-5xl leading-none tabular-nums mt-1 block"
            style={{ color: '#fcd34d' }}
          >
            {cur.beforeScore}
          </span>
          <div className="mt-2 h-1.5 rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${cur.beforePct}%`, backgroundColor: '#fbbf24' }}
            />
          </div>
        </div>

        {/* After VitaScore — bottom right, width follows slider */}
        <div
          className="absolute right-3 bottom-3 z-20 rounded-xl bg-black/55 backdrop-blur-sm px-3 py-2.5 text-white pointer-events-none overflow-hidden text-right"
          style={{
            maxWidth: `calc(${100 - sliderPct}% - 20px)`,
            opacity: afterOpacity,
            transition: 'opacity 0.2s',
          }}
        >
          <div className="flex items-center gap-1 text-xs uppercase tracking-widest font-bold whitespace-nowrap justify-end">
            <span className="text-white">Vita</span>
            <span className="text-brand-light">{t('checkLabel')}</span>
          </div>
          <div className="text-xs text-white/70 mt-0.5 truncate">{t('scoreLabel')}</div>
          <span
            className="font-display text-4xl lg:text-5xl leading-none tabular-nums mt-1 block"
            style={{ color: '#4ade80' }}
          >
            {cur.afterScore}
          </span>
          <div className="mt-2 h-1.5 rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${cur.afterPct}%`, backgroundColor: '#16a34a' }}
            />
          </div>
        </div>

        {/* Divider line */}
        <div
          className="absolute inset-y-0 z-30 w-px bg-white shadow-md pointer-events-none"
          style={{ left: `${sliderPct}%` }}
        />

        {/* Drag handle */}
        <div
          className="absolute top-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-ink pointer-events-none"
          style={{ left: `${sliderPct}%`, transform: 'translate(-50%, -50%)' }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
          </svg>
        </div>

        {/* Drag hint pill — fades out after first interaction */}
        <div
          className="absolute inset-x-0 top-1/2 flex justify-center z-20 pointer-events-none"
          style={{
            marginTop: '28px',
            opacity: hinted ? 0 : 1,
            transition: 'opacity 0.4s',
          }}
        >
          <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
            ← {t('slideHint')} →
          </span>
        </div>

        {/* Auto-advance progress bar */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 z-40">
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
        <p className="text-base text-ink leading-relaxed mb-2">"{cur.quote}"</p>
        <p className="text-sm text-ink-muted">
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
