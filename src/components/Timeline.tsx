import { useTranslations } from 'next-intl';

type Milestone = { when: string; title: string; text: string };

export default function Timeline() {
  const t = useTranslations('timeline');
  const milestones = t.raw('milestones') as Milestone[];

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

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-brand-light -translate-x-1/2"></div>

          <ol className="space-y-8 lg:space-y-12">
            {milestones.map((m, i) => (
              <li
                key={i}
                className={`reveal lg:grid lg:grid-cols-2 lg:gap-12 items-center ${
                  i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className={`lg:text-${i % 2 === 0 ? 'right' : 'left'}`}>
                  <div className="inline-flex items-center gap-3 mb-3">
                    <span className="font-display text-2xl text-brand-dark">{m.when}</span>
                  </div>
                  <h3 className="font-medium text-xl text-ink mb-2">{m.title}</h3>
                  <p className="text-ink-soft leading-relaxed">{m.text}</p>
                </div>
                <div className="hidden lg:flex justify-center">
                  <div className="w-4 h-4 rounded-full bg-brand-dark ring-4 ring-brand-light"></div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
