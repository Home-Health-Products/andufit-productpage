import { useTranslations } from 'next-intl';

type Item = { quote: string; name: string; title: string; highlight: string };

export default function TrainerTestimonials() {
  const t = useTranslations('trainerTestimonials');
  const items = t.raw('items') as Item[];

  return (
    <section id={t('id')} className="py-20 lg:py-28 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mb-14 reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-medium mb-3">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-ink mb-5">{t('title')}</h2>
          <p className="text-lg text-ink-soft">{t('lead')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((it, i) => (
            <article
              key={i}
              className="reveal bg-white rounded-2xl p-7 border border-line"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl text-brand">🐾</div>
                <span className="text-xs font-medium uppercase tracking-wider bg-good/10 text-good px-3 py-1 rounded-full">
                  {it.highlight}
                </span>
              </div>
              <p className="text-ink-soft leading-relaxed mb-5">&ldquo;{it.quote}&rdquo;</p>
              <footer className="pt-4 border-t border-line">
                <div className="font-medium text-ink text-sm">{it.name}</div>
                <div className="text-xs text-ink-muted">{it.title}</div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
