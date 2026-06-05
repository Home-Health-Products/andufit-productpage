import { useTranslations } from 'next-intl';

export default function BundleOffer() {
  const t = useTranslations('bundle');
  const single = t.raw('single') as { label: string; price: string; perDog: string };
  const duo = t.raw('duo') as {
    label: string;
    price: string;
    perDog: string;
    badge: string;
  };

  return (
    <section id={t('id')} className="py-20 lg:py-28 bg-soft">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-medium mb-3">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-ink mb-5">{t('title')}</h2>
          <p className="text-lg text-ink-soft">{t('lead')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {/* Single */}
          <div className="reveal bg-white rounded-2xl p-8 border border-line">
            <div className="text-sm uppercase tracking-wider text-ink-muted mb-3">
              {single.label}
            </div>
            <div className="font-display font-normal text-5xl text-ink mb-1">{single.price}</div>
            <div className="text-sm text-ink-muted">{single.perDog}</div>
          </div>

          {/* Duo (highlighted) */}
          <div className="reveal relative bg-gradient-to-br from-brand-dark to-brand rounded-2xl p-8 text-white shadow-xl">
            <div className="absolute -top-3 left-6 inline-flex items-center gap-1 bg-good text-white text-xs uppercase tracking-widest font-medium px-3 py-1 rounded-full shadow">
              ★ {duo.badge}
            </div>
            <div className="text-sm uppercase tracking-wider text-brand-light mb-3">
              {duo.label}
            </div>
            <div className="font-display font-normal text-5xl mb-1">{duo.price}</div>
            <div className="text-sm text-white/80">{duo.perDog}</div>
          </div>
        </div>

        <div className="text-center reveal">
          <a
            href="#prijs"
            className="inline-flex bg-brand hover:bg-brand-dark text-white font-medium px-7 py-3.5 rounded-lg transition shadow-md"
          >
            {t('cta')} →
          </a>
        </div>
      </div>
    </section>
  );
}
