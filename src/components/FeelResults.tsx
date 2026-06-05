import { useTranslations } from 'next-intl';

type Feeling = { phase: string; title: string; text: string };
type Result = { stat: string; label: string };

export default function FeelResults() {
  const t = useTranslations('feelResults');
  const feelings = t.raw('feelings') as Feeling[];
  const results = t.raw('results') as Result[];

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

        <div className="grid lg:grid-cols-2 gap-10 mb-14">
          <div className="space-y-4">
            {feelings.map((f, i) => (
              <div
                key={i}
                className="reveal flex gap-4 p-5 bg-soft rounded-xl border border-line"
              >
                <span className="shrink-0 inline-flex items-center justify-center px-3 h-7 bg-brand-dark text-white text-xs uppercase tracking-wider rounded-full self-start">
                  {f.phase}
                </span>
                <div>
                  <h3 className="font-medium text-ink mb-1">{f.title}</h3>
                  <p className="text-sm text-ink-soft">{f.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 self-start">
            {results.map((r, i) => (
              <div
                key={i}
                className="reveal bg-gradient-to-br from-brand-light/60 to-brand/10 rounded-2xl p-6 border border-brand-light"
              >
                <div className="font-display text-4xl lg:text-5xl text-brand-dark mb-2">
                  {r.stat}
                </div>
                <div className="text-sm text-ink-soft leading-snug">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
