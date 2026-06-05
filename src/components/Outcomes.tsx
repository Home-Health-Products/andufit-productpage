'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import CalcButton from './CalcButton';

type Item = {
  id: string;
  title: string;
  text: string;
  unit: string;
  before: string;
  after: string;
  beforeRatio: number;
  afterRatio: number;
  lowerIsBetter: boolean;
  delta: string;
  deltaLabel: string;
};

const ACCENTS: Record<string, string> = {
  back: '#3db7b0',
  stress: '#fb7185',
  sleep: '#818cf8',
  recovery: '#fbbf24',
};

const GLYPHS: Record<string, JSX.Element> = {
  // spine — rugontspanning
  back: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <path d="M12 3v18" />
      <path d="M9 5h6M8.5 8.5h7M8 12h8M8.5 15.5h7M9 19h6" />
    </svg>
  ),
  // heart — stress / HRV
  stress: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-4.5-9.5-9A5 5 0 0112 6a5 5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z" />
      <path d="M3 12h4l1.5-3 2.5 6 2-4 1.5 1H21" />
    </svg>
  ),
  // moon — REM-slaap
  sleep: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A8.5 8.5 0 1111.2 3a6.5 6.5 0 009.8 9.8z" />
    </svg>
  ),
  // bolt + face — recuperatie / energie
  recovery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />
    </svg>
  ),
};

function Gauge({
  item,
  inView,
}: {
  item: Item;
  inView: boolean;
}) {
  const accent = ACCENTS[item.id] ?? '#3db7b0';
  // "Fill" = how good it is; for lower-is-better metrics we invert so more arc = better.
  const afterFill = item.lowerIsBetter ? 1 - item.afterRatio : item.afterRatio;
  const beforeFill = item.lowerIsBetter ? 1 - item.beforeRatio : item.beforeRatio;

  const R = 52;
  const C = 2 * Math.PI * R;
  const offset = inView ? C * (1 - afterFill) : C;

  const beforeAngle = (-90 + beforeFill * 360) * (Math.PI / 180);
  const bx = 60 + R * Math.cos(beforeAngle);
  const by = 60 + R * Math.sin(beforeAngle);

  return (
    <div className="relative w-28 h-28 sm:w-40 sm:h-40 mx-auto">
      <svg viewBox="0 0 120 120" className="w-28 h-28 sm:w-40 sm:h-40 -rotate-90">
        <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r={R}
          fill="none"
          stroke={accent}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 1.3s cubic-bezier(.22,1,.36,1)',
            filter: `drop-shadow(0 0 6px ${accent}88)`,
          }}
        />
        {/* before marker */}
        <circle cx={bx} cy={by} r="4" fill="#fff" opacity="0.45" />
        <circle cx={bx} cy={by} r="7" fill="none" stroke="#fff" strokeWidth="1" opacity="0.25" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="mb-1" style={{ color: accent, width: 22, height: 22 }}>
          {GLYPHS[item.id]}
        </span>
        <span className="font-display text-3xl leading-none text-white tabular-nums">
          {item.after}
        </span>
        <span className="mt-1 text-[11px] text-white/45 tabular-nums">
          voor {item.before}
        </span>
      </div>
    </div>
  );
}

export default function Outcomes() {
  const t = useTranslations('results');
  const items = t.raw('items') as Item[];
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id={t('id')} className="py-20 lg:py-28 bg-ink relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/20 via-transparent to-brand/5 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 lg:px-8" ref={ref}>
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16 reveal">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-brand-light font-bold mb-4">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 1l2.7 5.5 6.1.9-4.4 4.3 1 6.1L10 14.9 4.6 17.8l1-6.1L1.2 7.4l6.1-.9L10 1z" />
            </svg>
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-4">{t('title')}</h2>
          <p className="text-lg lg:text-xl text-white/70">{t('lead')}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {items.map((item) => {
            const accent = ACCENTS[item.id] ?? '#3db7b0';
            return (
              <article
                key={item.id}
                className="reveal rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur p-6 lg:p-8 flex flex-col items-center text-center"
              >
                <Gauge item={item} inView={inView} />

                <div className="mt-2 text-[11px] uppercase tracking-widest text-white/45">
                  {item.unit}
                </div>

                <h3 className="font-display text-2xl lg:text-2xl text-white mt-4 mb-2">
                  {item.title}
                </h3>
                <p className="text-base text-white/65 leading-relaxed max-w-sm">{item.text}</p>

                <div className="mt-5 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/55 bg-white/5 rounded-full px-3 py-1.5">
                    <span className="tabular-nums">{t('beforeLabel')} {item.before}</span>
                    <svg className="w-3 h-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                    <span className="tabular-nums text-white/85 font-medium">{t('afterLabel')} {item.after}</span>
                  </span>
                  <span
                    className="inline-flex items-center text-xs font-bold rounded-full px-3 py-1.5 tabular-nums"
                    style={{ color: accent, backgroundColor: `${accent}1f` }}
                  >
                    {item.delta}
                  </span>
                </div>
                <div className="mt-1.5 text-[11px] text-white/40">{item.deltaLabel}</div>
              </article>
            );
          })}
        </div>

        <div className="reveal flex justify-center mt-10">
          <CalcButton variant="light" withHint />
        </div>

        <p className="reveal text-center text-[11px] text-white/35 max-w-2xl mx-auto mt-8 leading-relaxed">
          {t('disclaimer')}
        </p>
      </div>
    </section>
  );
}
