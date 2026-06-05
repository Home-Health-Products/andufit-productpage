import { useTranslations } from 'next-intl';

type Item = { icon: string; title: string; text: string };

const ICONS: Record<string, JSX.Element> = {
  jacket: <span className="text-3xl">🧥</span>,
  remote: <span className="text-3xl">🎛</span>,
  charger: <span className="text-3xl">🔌</span>,
  manual: <span className="text-3xl">📘</span>,
  bag: <span className="text-3xl">👜</span>,
};

export default function WhatsInBox() {
  const t = useTranslations('whatsInBox');
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {items.map((it, i) => (
            <div
              key={i}
              className="reveal bg-white rounded-2xl p-5 border border-line text-center hover:border-brand hover:shadow-md transition"
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-brand-light flex items-center justify-center">
                {ICONS[it.icon] ?? <span className="text-3xl">📦</span>}
              </div>
              <h3 className="font-medium text-ink mb-1 text-sm">{it.title}</h3>
              <p className="text-xs text-ink-soft leading-relaxed">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
