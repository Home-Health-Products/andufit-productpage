import { useTranslations } from 'next-intl';

type Pillar = { icon: string; title: string; text: string };

const ICONS: Record<string, string> = {
  shield: '🛡',
  cpu: '⚙',
  'battery-plus': '🔋',
  tools: '🔧',
  award: '🏅',
  leaf: '🌿',
};

export default function Quality() {
  const t = useTranslations('quality');
  const pillars = t.raw('pillars') as Pillar[];

  return (
    <section id={t('id')} className="py-20 lg:py-28 bg-ink text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mb-14 reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-light font-medium mb-3">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl mb-5">{t('title')}</h2>
          <p className="text-lg text-white/70">{t('lead')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="reveal bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-brand transition"
            >
              <div className="text-3xl mb-3">{ICONS[p.icon] ?? '●'}</div>
              <h3 className="font-medium text-white mb-2">{p.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
