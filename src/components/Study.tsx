'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

type Design = { label: string; value: string };
type ChartFinding = { value: string; label: string; percent: number; hint?: string };
type ExtraStat = { value: string; unit: string; label: string };

const MAX_SCALE = 55; // % axis upper bound for the bar chart

function PubMedBadge({ label, pmid }: { label: string; pmid: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 shadow-sm">
      <span className="inline-flex items-center gap-1 font-semibold text-[15px] leading-none">
        <span className="text-[#326599]">Pub</span>
        <span className="text-[#0b6e4f]">Med</span>
        <span className="sr-only">{label}</span>
      </span>
      <span className="text-[10px] uppercase tracking-widest text-ink-muted tabular-nums">{pmid}</span>
    </span>
  );
}

export default function Study() {
  const t = useTranslations('study');
  const design = t.raw('design') as Design[];
  const chartFindings = t.raw('chartFindings') as ChartFinding[];
  const extraStats = t.raw('extraStats') as ExtraStat[];

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
    <section id={t('id')} className="py-20 lg:py-28 bg-gradient-to-b from-soft to-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 reveal">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-dark font-medium mb-4">
            <span className="relative inline-flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-brand animate-ping opacity-60" />
              <span className="relative inline-block w-2 h-2 rounded-full bg-brand" />
            </span>
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-ink mb-5">{t('title')}</h2>
          <p className="text-lg text-ink-soft">{t('lead')}</p>
        </div>

        <div
          ref={ref}
          className="reveal rounded-3xl border border-line bg-white shadow-lg overflow-hidden grid lg:grid-cols-2"
        >
          {/* Study identity */}
          <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-line">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <PubMedBadge label={t('pubmedBadge')} pmid={t('pmid')} />
              <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-good bg-good/10 rounded-full px-3 py-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {t('journalBadge')}
              </span>
            </div>

            <h3 className="font-display text-xl lg:text-2xl text-ink leading-snug mb-2">
              {t('studyTitle')}
            </h3>
            <p className="text-sm text-ink-soft italic mb-4">{t('studyTitlePlain')}</p>
            <p className="text-sm text-ink-soft">{t('authors')}</p>
            <p className="text-sm text-ink-muted mb-7">{t('source')}</p>

            <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-3">
              {t('designTitle')}
            </div>
            <dl className="grid grid-cols-2 gap-3 mb-8">
              {design.map((d, i) => (
                <div key={i} className="rounded-xl bg-soft border border-line px-4 py-3">
                  <dt className="text-[11px] text-ink-muted">{d.label}</dt>
                  <dd className="text-base font-medium text-brand-dark tabular-nums">{d.value}</dd>
                </div>
              ))}
            </dl>

            <a
              href={t('linkUrl')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-dark hover:text-brand transition-colors"
            >
              {t('linkLabel')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-9 9M11 5H6a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1v-5" />
              </svg>
            </a>
          </div>

          {/* Chart */}
          <div className="p-8 lg:p-10 bg-gradient-to-br from-brand-cream/60 to-white">
            <div className="text-[11px] uppercase tracking-widest text-brand-dark font-medium mb-1">
              {t('chartTitle')}
            </div>
            <div className="text-xs text-ink-muted mb-7">{t('chartCaption')}</div>

            {/* Column chart */}
            <div>
              {/* plot area */}
              <div className="relative h-56">
                {/* horizontal gridlines + y-axis labels */}
                {[0, 25, 50].map((g) => (
                  <div
                    key={g}
                    className="absolute inset-x-0 flex items-center gap-2"
                    style={{ bottom: `${(g / MAX_SCALE) * 100}%` }}
                  >
                    <span className="w-8 shrink-0 text-right text-[10px] text-ink-muted tabular-nums">
                      {g}%
                    </span>
                    <span className="flex-1 border-t border-dashed border-line/80" />
                  </div>
                ))}

                {/* columns */}
                <div className="absolute inset-0 pl-10 flex items-end justify-around gap-3">
                  {chartFindings.map((f, i) => {
                    const h = inView ? Math.min(100, (f.percent / MAX_SCALE) * 100) : 0;
                    return (
                      <div
                        key={i}
                        className="relative flex h-full max-w-[84px] flex-1 flex-col items-center justify-end"
                      >
                        <span
                          className="mb-1.5 font-display text-lg text-brand-dark tabular-nums"
                          style={{
                            opacity: inView ? 1 : 0,
                            transition: `opacity .5s ease ${0.5 + i * 0.12}s`,
                          }}
                        >
                          {f.value}
                        </span>
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-brand-dark to-brand shadow-sm"
                          style={{
                            height: `${h}%`,
                            transition: `height 1.1s cubic-bezier(.22,1,.36,1) ${i * 0.12}s`,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* x-axis labels + hints */}
              <div className="mt-3 flex justify-around gap-3 pl-10">
                {chartFindings.map((f, i) => (
                  <div key={i} className="max-w-[84px] flex-1 text-center">
                    <div className="text-[13px] font-medium leading-tight text-ink">{f.label}</div>
                    {f.hint && (
                      <p className="mt-1 text-[10px] leading-snug text-ink-muted">{f.hint}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Extra absolute stats */}
            <div className="grid grid-cols-2 gap-3 mt-7 pt-6 border-t border-line">
              {extraStats.map((s, i) => (
                <div key={i}>
                  <div className="font-display text-2xl text-brand-dark leading-none tabular-nums">
                    {s.value}
                    {s.unit && <span className="text-sm font-sans text-ink-muted ml-1">{s.unit}</span>}
                  </div>
                  <div className="text-[11px] text-ink-soft mt-1.5 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="reveal text-center text-[11px] text-ink-muted max-w-2xl mx-auto mt-8 leading-relaxed">
          {t('note')}
        </p>
      </div>
    </section>
  );
}
