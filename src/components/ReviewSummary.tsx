import { useTranslations } from 'next-intl';

type Breakdown = { stars: number; percent: number };
type Highlight = { label: string; score: string };
type Review = {
  name: string;
  dog: string;
  rating: number;
  title: string;
  text: string;
  verified: boolean;
};

function Stars({ rating, size = 4 }: { rating: number; size?: number }) {
  return (
    <span className={`inline-flex gap-0.5 text-brand`}>
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} className={`w-${size} h-${size}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 1l2.7 5.5 6.1.9-4.4 4.3 1 6.1L10 14.9 4.6 17.8l1-6.1L1.2 7.4l6.1-.9L10 1z" />
        </svg>
      ))}
    </span>
  );
}

export default function ReviewSummary() {
  const t = useTranslations('reviewSummary');
  const breakdown = t.raw('breakdown') as Breakdown[];
  const highlights = t.raw('highlights') as Highlight[];
  const reviews = t.raw('reviews') as Review[];
  const paymentMethods = t.raw('paymentMethods') as string[];

  return (
    <section id={t('id')} className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mb-12 reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-medium mb-3">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-ink">{t('title')}</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-14">
          {/* Aggregate rating */}
          <div className="reveal bg-gradient-to-br from-brand-cream to-soft rounded-2xl p-8 border border-line text-center">
            <div className="font-display text-6xl text-brand-dark mb-2">{t('rating')}</div>
            <Stars rating={5} size={5} />
            <p className="text-sm text-ink-muted mt-3">
              gebaseerd op <strong className="text-ink">{t('totalReviews')}</strong> beoordelingen
            </p>
          </div>

          {/* Breakdown */}
          <div className="reveal bg-soft rounded-2xl p-6 border border-line">
            <h3 className="text-xs uppercase tracking-widest text-ink-muted mb-4">Verdeling</h3>
            <ul className="space-y-2">
              {breakdown.map((b) => (
                <li key={b.stars} className="flex items-center gap-3 text-sm">
                  <span className="w-3 text-ink-muted">{b.stars}</span>
                  <svg className="w-3 h-3 text-brand" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 1l2.7 5.5 6.1.9-4.4 4.3 1 6.1L10 14.9 4.6 17.8l1-6.1L1.2 7.4l6.1-.9L10 1z" />
                  </svg>
                  <span className="flex-1 h-2 bg-line rounded-full overflow-hidden">
                    <span
                      className="block h-full bg-brand-dark"
                      style={{ width: `${b.percent}%` }}
                    />
                  </span>
                  <span className="w-8 text-right text-ink-muted">{b.percent}%</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Highlights */}
          <div className="reveal bg-soft rounded-2xl p-6 border border-line">
            <h3 className="text-xs uppercase tracking-widest text-ink-muted mb-4">
              Scores per criterium
            </h3>
            <ul className="space-y-3">
              {highlights.map((h, i) => (
                <li key={i} className="flex justify-between items-center text-sm">
                  <span className="text-ink-soft">{h.label}</span>
                  <span className="font-medium text-brand-dark">{h.score}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Featured reviews */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="reveal bg-soft rounded-2xl p-6 border border-line"
            >
              <Stars rating={r.rating} />
              <h4 className="font-medium text-ink mt-3 mb-2">{r.title}</h4>
              <p className="text-sm text-ink-soft leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
              <footer className="flex items-center justify-between text-xs pt-4 border-t border-line">
                <div>
                  <div className="font-medium text-ink">{r.name}</div>
                  <div className="text-ink-muted">{r.dog}</div>
                </div>
                {r.verified && (
                  <span className="inline-flex items-center gap-1 text-good">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Geverifieerd
                  </span>
                )}
              </footer>
            </article>
          ))}
        </div>

        {/* Payment methods */}
        <div className="reveal pt-8 border-t border-line text-center">
          <p className="text-xs uppercase tracking-widest text-ink-muted mb-4">
            {t('paymentTitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {paymentMethods.map((m, i) => (
              <span
                key={i}
                className="text-xs font-medium bg-soft border border-line rounded px-3 py-2 text-ink-soft"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
