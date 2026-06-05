import { useTranslations } from 'next-intl';

export default function FinalCta() {
  const t = useTranslations('finalCta');
  const guarantees = t.raw('guarantees') as string[];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-brand-dark via-brand to-brand-light text-white">
      <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-5xl mb-5 reveal">{t('title')}</h2>
        <p className="text-lg text-white/90 mb-8 reveal">{t('subtitle')}</p>

        <div className="flex flex-wrap justify-center gap-3 mb-10 reveal">
          <a
            href="#prijs"
            className="bg-white text-brand-dark hover:bg-brand-cream font-medium px-7 py-3.5 rounded-lg transition shadow-lg"
          >
            {t('primary')}
          </a>
          <a
            href="#prijs"
            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium px-7 py-3.5 rounded-lg transition"
          >
            {t('secondary')}
          </a>
        </div>

        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/80 reveal">
          {guarantees.map((g, i) => (
            <li key={i} className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z"
                  clipRule="evenodd"
                />
              </svg>
              {g}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
