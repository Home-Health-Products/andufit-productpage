import { useTranslations } from 'next-intl';

type Badge = { label: string };

export default function Hero() {
  const t = useTranslations('hero');
  const badges = t.raw('trustBadges') as Badge[];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-cream via-soft to-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-medium mb-4">
            {t('eyebrow')}
          </span>
          <h1 className="font-display text-4xl lg:text-6xl leading-tight text-ink mb-5">
            {t('title')}
          </h1>

          {/* Rating row */}
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex gap-0.5 text-brand">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 1l2.7 5.5 6.1.9-4.4 4.3 1 6.1L10 14.9 4.6 17.8l1-6.1L1.2 7.4l6.1-.9L10 1z" />
                </svg>
              ))}
            </span>
            <span className="text-sm text-ink-soft">
              <strong className="text-ink">{t('rating')}</strong> · {t('ratingCount')}
            </span>
          </div>

          <p className="text-lg text-ink-soft mb-6 max-w-xl">{t('subtitle')}</p>

          {/* Price block */}
          <div className="flex items-baseline gap-3 mb-2">
            <span className="font-display font-normal text-5xl text-brand-dark">{t('price')}</span>
            <span className="text-xl text-ink-muted line-through">{t('oldPrice')}</span>
            <span className="inline-flex items-center bg-bad/10 text-bad text-xs font-medium px-2.5 py-1 rounded-full uppercase tracking-wider">
              {t('saveLabel')}
            </span>
          </div>
          <p className="text-sm text-good mb-6 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-good rounded-full animate-pulse-slow"></span>
            {t('stockBadge')}
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href="#prijs"
              className="inline-flex bg-brand hover:bg-brand-dark text-white font-medium px-7 py-3.5 rounded-lg transition shadow-md"
            >
              {t('primaryCta')} →
            </a>
            <a
              href="#prijs"
              className="inline-flex bg-white border border-line hover:border-brand text-ink font-medium px-6 py-3.5 rounded-lg transition"
            >
              {t('secondaryCta')}
            </a>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-muted">
            {badges.map((b, i) => (
              <li key={i} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-good" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {b.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative reveal">
          <div className="relative aspect-square rounded-3xl bg-black overflow-hidden shadow-xl">
            <iframe
              src="https://www.youtube-nocookie.com/embed/U0GrBIgBFts?autoplay=1&mute=1&loop=1&playlist=U0GrBIgBFts&controls=1&modestbranding=1&rel=0&playsinline=1"
              title={t('videoTitle')}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="absolute top-0 h-full"
              style={{ width: '177.78%', left: '-38.89%' }}
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-4 max-w-[220px]">
            <div className="flex items-center gap-2 mb-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 1l2.7 5.5 6.1.9-4.4 4.3 1 6.1L10 14.9 4.6 17.8l1-6.1L1.2 7.4l6.1-.9L10 1z" />
                </svg>
              ))}
            </div>
            <p className="text-xs text-ink-soft">
              &quot;Bella slaapt voor het eerst weer dóór de nacht.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
