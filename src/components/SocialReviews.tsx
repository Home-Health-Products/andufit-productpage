'use client';

import { useState, useRef, useEffect } from 'react';
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
  country?: string;
};

const SOURCE_STYLES: Record<string, { label: string; dot: string }> = {
  google:     { label: 'Google',    dot: '#4285F4' },
  trustpilot: { label: 'Trustpilot', dot: '#00B67A' },
  appstore:   { label: 'App Store', dot: '#0A84FF' },
  facebook:   { label: 'Facebook',  dot: '#1877F2' },
};

const PER_PAGE = 10;

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

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="inline-flex gap-1" onMouseLeave={() => setHover(0)}>
      {Array.from({ length: 5 }).map((_, i) => {
        const on = (hover || value) > i;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i + 1)}
            onMouseEnter={() => setHover(i + 1)}
            aria-label={`${i + 1} sterren`}
            className="p-0.5"
          >
            <svg
              className={`w-8 h-8 transition-colors ${on ? 'text-brand' : 'text-line'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 1l2.7 5.5 6.1.9-4.4 4.3 1 6.1L10 14.9 4.6 17.8l1-6.1L1.2 7.4l6.1-.9L10 1z" />
            </svg>
          </button>
        );
      })}
    </div>
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

function CountryFlag({ country }: { country?: string }) {
  if (!country) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
      <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-9.5 11.25S.5 17.642.5 10.5a9.5 9.5 0 0119 0z" />
      </svg>
      {country}
    </span>
  );
}

const STORAGE_KEY = 'andufit_user_reviews';

export default function SocialReviews() {
  const t = useTranslations('socialReviews');
  const breakdown = t.raw('breakdown') as Breakdown[];
  const filters = t.raw('filters') as Filter[];
  const sources = t.raw('sources') as string[];
  const baseReviews = t.raw('reviews') as Review[];

  const [active, setActive] = useState('all');
  const [page, setPage] = useState(0);

  // user-submitted reviews (persisted in localStorage)
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [form, setForm] = useState({
    rating: 5,
    title: '',
    text: '',
    name: '',
    country: '',
    category: filters[1]?.id ?? 'back',
  });

  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUserReviews(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const reviews = [...userReviews, ...baseReviews];
  const filteredReviews = active === 'all' ? reviews : reviews.filter((r) => r.category === active);
  const totalPages = Math.ceil(filteredReviews.length / PER_PAGE);
  const pageReviews = filteredReviews.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  function handleFilter(id: string) {
    setActive(id);
    setPage(0);
    scrollerRef.current?.scrollTo({ left: 0 });
  }

  function goTo(p: number) {
    setPage(Math.max(0, Math.min(totalPages - 1, p)));
    scrollerRef.current?.scrollTo({ left: 0 });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.name.trim()) return;
    const newReview: Review = {
      name: form.name.trim(),
      date: t('form.todayLabel'),
      source: 'google',
      rating: form.rating,
      title: form.title.trim(),
      text: form.text.trim(),
      category: form.category,
      country: form.country.trim() || undefined,
    };
    const next = [newReview, ...userReviews];
    setUserReviews(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    setForm({ rating: 5, title: '', text: '', name: '', country: '', category: filters[1]?.id ?? 'back' });
    setFormOpen(false);
    setThanks(true);
    setActive('all');
    setPage(0);
    scrollerRef.current?.scrollTo({ left: 0 });
    setTimeout(() => setThanks(false), 4000);
  }

  return (
    <section id={t('id')} className="py-20 lg:py-28 bg-soft overflow-x-clip scroll-mt-20">
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

        {/* Filters + write button */}
        <div className="reveal flex flex-wrap items-center justify-center gap-2 mb-6">
          {filters.map((f) => {
            const on = f.id === active;
            return (
              <button
                key={f.id}
                onClick={() => handleFilter(f.id)}
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

        {/* Write-a-review CTA */}
        <div className="reveal flex justify-center mb-8">
          <button
            type="button"
            onClick={() => { setFormOpen((o) => !o); setThanks(false); }}
            className="group inline-flex items-center gap-2.5 text-base font-bold text-white bg-brand hover:bg-brand-dark rounded-full px-8 py-4 shadow-lg shadow-brand/30 ring-2 ring-brand/20 hover:ring-brand/40 hover:shadow-xl hover:shadow-brand/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
            </svg>
            {t('form.writeLabel')}
          </button>
        </div>

        {/* Thank-you toast */}
        {thanks && (
          <div className="max-w-2xl mx-auto mb-8 flex items-center gap-3 bg-good/10 border border-good/30 text-good rounded-2xl px-5 py-4">
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{t('form.thanksLabel')}</span>
          </div>
        )}

        {/* Review form */}
        {formOpen && (
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto mb-10 bg-white rounded-3xl border border-line shadow-sm p-6 lg:p-8"
          >
            <h3 className="font-display text-2xl text-ink mb-5">{t('form.title')}</h3>

            {/* Rating */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-ink mb-2">{t('form.ratingLabel')}</label>
              <StarPicker value={form.rating} onChange={(v) => setForm((s) => ({ ...s, rating: v }))} />
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-ink mb-1.5">{t('form.reviewTitleLabel')}</label>
              <input
                type="text"
                required
                maxLength={40}
                value={form.title}
                onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                placeholder={t('form.reviewTitlePlaceholder')}
                className="w-full rounded-xl border border-line bg-soft px-4 py-3 text-ink placeholder:text-ink-muted focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>

            {/* Text */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-ink mb-1.5">{t('form.textLabel')}</label>
              <textarea
                rows={3}
                maxLength={280}
                value={form.text}
                onChange={(e) => setForm((s) => ({ ...s, text: e.target.value }))}
                placeholder={t('form.textPlaceholder')}
                className="w-full rounded-xl border border-line bg-soft px-4 py-3 text-ink placeholder:text-ink-muted focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 resize-none"
              />
            </div>

            {/* Name + Country */}
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">{t('form.nameLabel')}</label>
                <input
                  type="text"
                  required
                  maxLength={30}
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  placeholder={t('form.namePlaceholder')}
                  className="w-full rounded-xl border border-line bg-soft px-4 py-3 text-ink placeholder:text-ink-muted focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">{t('form.countryLabel')}</label>
                <input
                  type="text"
                  maxLength={30}
                  value={form.country}
                  onChange={(e) => setForm((s) => ({ ...s, country: e.target.value }))}
                  placeholder="België"
                  className="w-full rounded-xl border border-line bg-soft px-4 py-3 text-ink placeholder:text-ink-muted focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </div>
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-ink mb-1.5">{t('form.categoryLabel')}</label>
              <select
                value={form.category}
                onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
                className="w-full rounded-xl border border-line bg-soft px-4 py-3 text-ink focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              >
                {filters.filter((f) => f.id !== 'all').map((f) => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
            </div>

            <p className="text-xs text-ink-muted mb-5">{t('form.sourceNote')}</p>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-brand hover:bg-brand-dark text-white font-semibold rounded-full px-6 py-3 transition-colors"
              >
                {t('form.submitLabel')}
              </button>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="px-6 py-3 rounded-full border border-line text-ink-muted font-semibold hover:border-brand hover:text-brand-dark transition-colors"
              >
                {t('form.cancelLabel')}
              </button>
            </div>
          </form>
        )}

        {/* Reviews */}
        {filteredReviews.length === 0 ? (
          <p className="text-center text-ink-muted py-10">{t('emptyLabel')}</p>
        ) : (
          <>
            {/* Slider op mobiel, grid op desktop */}
            <div
              ref={scrollerRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0"
            >
              {pageReviews.map((r, i) => (
                <article
                  key={`${active}-${page}-${i}`}
                  className="shrink-0 w-[85%] snap-center sm:w-auto bg-white rounded-2xl p-6 border border-line shadow-sm flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <Stars rating={r.rating} />
                    <SourceBadge source={r.source} />
                  </div>
                  <h4 className="font-semibold text-ink mb-2">{r.title}</h4>
                  {r.text ? (
                    <p className="text-base text-ink-soft leading-relaxed mb-4 flex-1">{r.text}</p>
                  ) : (
                    <div className="flex-1" />
                  )}
                  <footer className="flex flex-col gap-1.5 pt-4 border-t border-line">
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="font-medium text-ink">{r.name}</span>
                        <span className="text-ink-muted"> · {r.date}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-good font-medium text-sm">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z" clipRule="evenodd" />
                        </svg>
                        {t('verifiedLabel')}
                      </span>
                    </div>
                    <CountryFlag country={r.country} />
                  </footer>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  onClick={() => goTo(page - 1)}
                  disabled={page === 0}
                  aria-label="Vorige"
                  className="w-10 h-10 rounded-full border border-line bg-white text-ink flex items-center justify-center hover:border-brand hover:text-brand-dark disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page dots */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }).map((_, p) => (
                    <button
                      key={p}
                      onClick={() => goTo(p)}
                      aria-label={`Pagina ${p + 1}`}
                      className={`rounded-full transition-all ${
                        p === page
                          ? 'w-6 h-2.5 bg-brand'
                          : 'w-2.5 h-2.5 bg-line hover:bg-brand/40'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => goTo(page + 1)}
                  disabled={page === totalPages - 1}
                  aria-label="Volgende"
                  className="w-10 h-10 rounded-full border border-line bg-white text-ink flex items-center justify-center hover:border-brand hover:text-brand-dark disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Count label */}
            <p className="text-center text-xs text-ink-muted mt-3">
              {page * PER_PAGE + 1}–{Math.min((page + 1) * PER_PAGE, filteredReviews.length)} van {filteredReviews.length} beoordelingen
            </p>
          </>
        )}
      </div>
    </section>
  );
}
