import { useTranslations } from 'next-intl';

type Category = { tag: string; title: string; text: string };

export default function ForWhichDogs() {
  const t = useTranslations('forWhichDogs');
  const categories = t.raw('categories') as Category[];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((c, i) => (
            <div
              key={i}
              className="reveal bg-white rounded-2xl p-6 border border-line hover:shadow-lg transition"
            >
              <span className="inline-block text-xs font-medium uppercase tracking-wider text-brand-dark bg-brand-light px-3 py-1 rounded-full mb-3">
                {c.tag}
              </span>
              <h3 className="font-medium text-lg text-ink mb-2">{c.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
