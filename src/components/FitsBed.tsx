import { useTranslations } from 'next-intl';
import CalcButton from './CalcButton';

type Item = { icon: string; label: string; text: string };

const BED_ICONS: Record<string, JSX.Element> = {
  // Bedframe met hoofdeind — side view
  frame: (
    <svg viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 16V9a2 2 0 012-2h3v9" />
      <rect x="6" y="16" width="36" height="7" rx="2" />
      <path d="M14 16v-2a2 2 0 012-2h6" />
      <path d="M9 23v4M39 23v4" />
    </svg>
  ),
  // Lattenbodem — slats
  slats: (
    <svg viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="7" width="36" height="18" rx="2" />
      <path d="M13 7v18M20 7v18M27 7v18M34 7v18" />
      <path d="M9 25v3M39 25v3" />
    </svg>
  ),
  // Boxspring — stacked layers
  boxspring: (
    <svg viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="9" width="36" height="7" rx="3" />
      <rect x="6" y="17" width="36" height="8" rx="1.5" />
      <path d="M9 25v3M39 25v3" />
    </svg>
  ),
  // Opklapbare bedbodem — lifted storage base
  storage: (
    <svg viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="19" width="34" height="7" rx="2" />
      <path d="M9 19L33 8" />
      <path d="M33 8l3 1.4" />
      <path d="M9 26v2M37 26v2" />
    </svg>
  ),
};

export default function FitsBed() {
  const t = useTranslations('fitsBed');
  const items = t.raw('items') as Item[];

  return (
    <section id={t('id')} className="scroll-mt-24 py-20 lg:py-28 bg-gradient-to-b from-white to-soft">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16 reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-medium mb-3">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-ink mb-5">{t('title')}</h2>
          <p className="text-lg text-ink-soft">{t('lead')}</p>
        </div>

        {/* Bed-base types */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mb-14">
          {items.map((it, i) => (
            <div
              key={i}
              className="reveal flex flex-col items-center text-center"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="relative mb-5">
                <span className="absolute inset-0 rounded-full bg-brand/10 blur-xl" />
                <span className="relative inline-flex items-center justify-center w-24 h-24 lg:w-28 lg:h-28 rounded-full border-2 border-brand bg-white text-brand-dark">
                  <span className="w-12 h-12 lg:w-14 lg:h-14 inline-block">{BED_ICONS[it.icon]}</span>
                </span>
              </div>
              <h3 className="font-display text-lg lg:text-xl text-ink mb-1.5">{it.label}</h3>
              <p className="text-sm text-ink-soft leading-relaxed max-w-[14rem]">{it.text}</p>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div className="reveal max-w-3xl mx-auto rounded-3xl border border-line bg-white shadow-sm px-6 py-7 lg:px-10 lg:py-8 text-center">
          <p className="text-base lg:text-lg text-ink-soft leading-relaxed mb-6">{t('note')}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={t('ctaHref')}
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-medium px-7 py-4 rounded-full transition shadow-md"
            >
              {t('cta')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <CalcButton variant="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
