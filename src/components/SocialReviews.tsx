'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

type Breakdown = { stars: number; percent: number };
type Filter = { id: string; label: string };
type Review = {
  name: string;
  date: string;
  source: string;
  rating: number;
  title: string;
  text: string;
  category: string;
};

const SOURCE_STYLES: Record<string, { label: string; dot: string; icon?: string }> = {
  google:     { label: 'Google',    dot: '#4285F4' },
  trustpilot: { label: 'Trustpilot', dot: '#00B67A' },
  appstore:   { label: 'App Store', dot: '#0A84FF' },
  facebook:   { label: 'Facebook',  dot: '#1877F2' },
};

function Stars({ rating, size = 4 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-${size} h-${size} ${i < rating ? 'text-brand' : 'text-line'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 1l2.7 5.5 6.1.9-4.4 4.3 1 6.1L10 14.9 4.6 17.8l1-6.1L1.2 7.4l6.1-.9L10 1z" />
        </svg>
      ))}
    </span>
  );
}

function SourceBadge({ source }: { source: string }) {
  const s = SOURCE_STYLES[source] ?? { label: source, dot: '#6a6a6a' };
  return (
    <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-ink-muted bg-soft border border-line rounded px-2 py-1">
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.dot }} />
      {s.label}
    </span>
  );
}

export default function SocialReviews() {
  const t = useTranslations('socialReviews');
  const breakdown = t.raw('breakdown') as Breakdown[];
  const filters = t.raw('filters') as Filter[];
  const sources = t.raw('sources') as string[];
  const reviews = t.raw('reviews') as Review[];

  const [active, setActive] = useState('all');
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const shownReviews = active === 'all' ? reviews : reviews.filter((r) => r.category === active);

  return (
    <section id={t('id')} className="py-20 lg:py-28 bg-soft overflow-x-clip">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-semibold mb-3">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-ink mb-4">{t('title')}</h2>
          <p className="text-lg text-ink-soft">{t('lead')}</p>
        </div>

        {/* Summary card */}
        <div className="reveal bg-white rounded-3xl border border-line shadow-sm p-8 lg:p-10 mb-10 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">

            {/* Big score */}
            <div className="text-center sm:text-left shrink-0">
              <div className="font-display text-7xl text-ink leading-none mb-2">{t('rating')}</div>
              <Stars rating={5} size={5} />
              <p className="text-xs text-ink-muted mt-2">
                {t('basedOn', { count: t('totalReviews') })}
              </p>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px self-stretch bg-line" />

            {/* Breakdown bars */}
            <div className="flex-1 w-full space-y-2">
              {breakdown.map((b) => (
                <div key={b.stars} className="flex items-center gap-3 text-sm">
                  <span className="w-3 text-ink-muted text-right">{b.stars}</span>
                  <svg className="w-3 h-3 text-brand shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 1l2.7 5.5 6.1.9-4.4 4.3 1 6.1L10 14.9 4.6 17.8l1-6.1L1.2 7.4l6.1-.9L10 1z" />
                  </svg>
                  <div className="flex-1 h-2 bg-line rounded-full overflow-hidden">
                    <div className="h-full bg-brand rounded-full" style={{ width: `${b.percent}%` }} />
                  </div>
                  <span className="w-9 text-right text-ink-muted tabular-nums text-xs">{b.percent}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sources */}
          <div className="mt-8 pt-6 border-t border-line">
            <p className="text-[11px] uppercase tracking-widest text-ink-muted mb-3 text-center sm:text-left">
              {t('sourcesLabel')}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
              {sources.map((src) => {
                const dot = SOURCE_STYLES[src.toLowerCase().replace(/\s/g, '')]?.dot ?? '#6a6a6a';
                return (
                  <span
                    key={src}
                    className="inline-flex items-center gap-2 text-sm font-medium text-ink bg-soft border border-line rounded-full px-4 py-2"
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dot }} />
                    {src}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="reveal flex flex-wrap justify-center gap-2 mb-8">
          {filters.map((f) => {
            const on = f.id === active;
            return (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className={`text-base font-semibold rounded-full px-5 py-3 border-2 transition-all ${
                  on
                    ? 'bg-brand border-brand text-white shadow-sm'
                    : 'bg-white border-line text-ink-muted hover:border-brand hover:text-brand-dark'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Reviews grid */}
        {shownReviews.length === 0 ? (
          <p className="text-center text-ink-muted py-10">{t('emptyLabel')}</p>
        ) : (
          <>
            <div
              ref={scrollerRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:block md:columns-2 lg:columns-3 md:gap-5 md:overflow-visible md:mx-0 md:px-0 md:pb-0 md:[column-fill:_balance]"
            >
              {shownReviews.map((r, i) => (
                <article
                  key={i}
                  className="reveal shrink-0 w-[85%] snap-center bg-white rounded-2xl p-6 border border-line shadow-sm md:w-auto md:shrink md:break-inside-avoid md:mb-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <Stars rating={r.rating} />
                    <SourceBadge source={r.source} />
                  </div>
                  <h4 className="font-semibold text-ink mb-2">{r.title}</h4>
                  <p className="text-base text-ink-soft leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                  <footer className="flex items-center justify-between text-sm pt-4 border-t border-line">
                    <div>
                      <span className="font-medium text-ink">{r.name}</span>
                      <span className="text-ink-muted"> · {r.date}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-good font-medium">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {t('verifiedLabel')}
                    </span>
                  </footer>
                </article>
              ))}
            </div>

            {/* Mobile slider controls */}
            {shownReviews.length > 1 && (
              <div className="flex md:hidden items-center justify-center gap-4 mt-4">
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
          </>
        )}
      </div>
    </section>
  );
}
