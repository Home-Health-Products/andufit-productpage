import { useTranslations } from 'next-intl';

type Block = { title: string; items: string[] };

export default function TabGuarantee() {
  const t = useTranslations('tabs.warranty');
  const blocks = t.raw('blocks') as Block[];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Highlight banner */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl bg-brand-cream border border-line px-6 py-5 mb-8">
        <span className="shrink-0 w-12 h-12 rounded-full bg-brand-dark text-white inline-flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5c0 4.4-3 8.3-7 9.5C8 19.3 5 15.4 5 11V6l7-3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 11.5l2 2 4-4.5" />
          </svg>
        </span>
        <div>
          <div className="font-display text-xl lg:text-2xl text-ink">{t('highlight')}</div>
          <p className="text-sm text-ink-soft mt-0.5">{t('lead')}</p>
        </div>
      </div>

      {/* Detail blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blocks.map((b, i) => (
          <div key={i} className="bg-soft rounded-xl p-6 border border-line">
            <h3 className="font-medium text-ink mb-3">{b.title}</h3>
            <ul className="space-y-2">
              {b.items.map((it, k) => (
                <li key={k} className="flex items-start gap-2 text-sm text-ink-soft">
                  <svg className="shrink-0 w-4 h-4 mt-0.5 text-good" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
