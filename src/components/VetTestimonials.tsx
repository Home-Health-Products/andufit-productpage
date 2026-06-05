import { useTranslations } from 'next-intl';

type Item = { quote: string; name: string; title: string; rating: number };

export default function VetTestimonials() {
  const t = useTranslations('vetTestimonials');
  const items = t.raw('items') as Item[];

  return (
    <section id={t('id')} className="py-20 lg:py-28 bg-white">
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
              className="reveal bg-soft rounded-2xl p-7 border border-line relative"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: it.rating }).map((_, k) => (
                  <svg key={k} className="w-4 h-4 text-brand" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 1l2.7 5.5 6.1.9-4.4 4.3 1 6.1L10 14.9 4.6 17.8l1-6.1L1.2 7.4l6.1-.9L10 1z" />
                  </svg>
                ))}
              </div>
              <p className="text-ink-soft leading-relaxed mb-5">&ldquo;{it.quote}&rdquo;</p>
              <footer className="flex items-center gap-3 pt-4 border-t border-line">
                <div className="w-10 h-10 rounded-full bg-brand-light text-brand-dark flex items-center justify-center font-medium">
                  {it.name.split(' ').slice(-1)[0][0]}
                </div>
                <div>
                  <div className="font-medium text-ink text-sm">{it.name}</div>
                  <div className="text-xs text-ink-muted">{it.title}</div>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
