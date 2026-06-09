import Image from 'next/image';
import { useTranslations } from 'next-intl';
import CalcButton from './CalcButton';

type Item = { icon: string; label: string; text: string };

// Same bed-base line icons as on www.andufit.com (/images/v2/bed1..4.svg).
const BED_ICONS: Record<string, string> = {
  frame: '/beds/bed1.svg',
  slats: '/beds/bed2.svg',
  boxspring: '/beds/bed3.svg',
  storage: '/beds/bed4.svg',
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
                  <Image
                    src={BED_ICONS[it.icon] ?? '/beds/bed1.svg'}
                    alt={it.label}
                    width={56}
                    height={56}
                    className="w-12 h-12 lg:w-14 lg:h-14 object-contain"
                  />
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
