import { useTranslations } from 'next-intl';

type Item = { icon: string; label: string; detail: string; cost: number; source?: number };
type Source = { n: number; label: string; ref: string };

const ICONS: Record<string, JSX.Element> = {
  vet: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16" />
      <rect x="3" y="3" width="18" height="18" rx="4" />
    </svg>
  ),
  pill: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="9" width="18" height="6" rx="3" />
      <path strokeLinecap="round" d="M12 9v6" />
    </svg>
  ),
  therapy: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 19c2-3 5-5 6-5s4 2 6 5M9 7a3 3 0 116 0 3 3 0 01-6 0zM4 19h16" />
    </svg>
  ),
  brain: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a4 4 0 00-4 4v1a3 3 0 00-3 3 3 3 0 003 3v1a4 4 0 008 0v-1a3 3 0 003-3 3 3 0 00-3-3V7a4 4 0 00-4-4zM12 9v6" />
    </svg>
  ),
  leaf: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 21c0-8 5-13 14-13-1 8-6 13-14 13zM5 21l9-9" />
    </svg>
  ),
  calm: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
    </svg>
  ),
  jacket: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h12l3 5-3 2v9H6v-9L3 9l3-5zM9 4v2a3 3 0 006 0V4" />
    </svg>
  ),
  warranty: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  ),
  bolt: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />
    </svg>
  ),
  doctor: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 21v-2a6 6 0 0112 0v2" />
    </svg>
  ),
  heart: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-4.5-9.5-9A5 5 0 0112 6a5 5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z" />
    </svg>
  ),
  infinity: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12a3 3 0 11-3 3 5 5 0 016-5c2 0 3 1 4 2l4 4a5 5 0 006 0 3 3 0 01-3-3" />
    </svg>
  ),
};

const fmt = (v: number) => new Intl.NumberFormat('nl-BE', { minimumFractionDigits: 0 }).format(v);

export default function Savings() {
  const t = useTranslations('savings');
  const withoutItems = t.raw('withoutItems') as Item[];
  const withItems = t.raw('withItems') as Item[];
  const withoutTotal = t.raw('withoutTotal') as number;
  const withTotal = t.raw('withTotal') as number;
  const savingsAmount = t.raw('savingsAmount') as number;
  const sources = t.raw('sources') as Source[];
  const maxCost = Math.max(...withoutItems.map((i) => i.cost));

  return (
    <section id={t('id')} className="py-20 lg:py-28 bg-gradient-to-b from-soft to-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-14 reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-medium mb-3">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-ink mb-5">{t('title')}</h2>
          <p className="text-lg text-ink-soft">{t('lead')}</p>
        </div>

        {/* Comparison columns */}
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-8 mb-10 lg:mb-12">
          {/* WITHOUT ANDUPET , red/danger */}
          <div className="reveal bg-white rounded-2xl border-2 border-bad/20 overflow-hidden shadow-sm">
            <div className="bg-bad/5 px-6 py-5 border-b border-bad/15">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block w-2 h-2 rounded-full bg-bad" />
                <span className="text-[11px] uppercase tracking-widest font-bold text-bad">
                  {t('withoutTitle')}
                </span>
              </div>
              <p className="text-sm text-ink-soft leading-snug">{t('withoutSubtitle')}</p>
            </div>

            <ul className="divide-y divide-line">
              {withoutItems.map((it, i) => (
                <li key={i} className="px-6 py-4">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="shrink-0 w-9 h-9 rounded-lg bg-bad/10 text-bad flex items-center justify-center">
                        {ICONS[it.icon] ?? null}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-ink truncate flex items-center gap-1.5">
                          {it.label}
                          {it.source && (
                            <a
                              href={`#bron-${it.source}`}
                              className="text-[10px] font-bold text-bad bg-bad/10 hover:bg-bad hover:text-white transition px-1.5 py-0.5 rounded-full"
                              aria-label={`Bekijk bron ${it.source}`}
                            >
                              {it.source}
                            </a>
                          )}
                        </div>
                        <div className="text-xs text-ink-muted">{it.detail}</div>
                      </div>
                    </div>
                    <div className="text-base font-display font-normal text-bad shrink-0">€{fmt(it.cost)}</div>
                  </div>
                  <div className="h-1.5 rounded-full bg-bad/10 overflow-hidden">
                    <div
                      className="h-full bg-bad/60"
                      style={{ width: `${(it.cost / maxCost) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="px-6 py-5 bg-bad/5 border-t border-bad/15 flex items-center justify-between">
              <span className="text-sm font-medium text-ink">{t('withoutTotalLabel')}</span>
              <span className="font-display font-normal text-3xl text-bad">€{fmt(withoutTotal)}</span>
            </div>
          </div>

          {/* WITH ANDUPET , brand turquoise */}
          <div className="reveal bg-white rounded-2xl border-2 border-brand overflow-hidden shadow-lg relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <span className="inline-block bg-brand-dark text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow">
                ★ Aanbevolen
              </span>
            </div>
            <div className="bg-brand-cream px-6 py-5 border-b border-brand/20 pt-7">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block w-2 h-2 rounded-full bg-brand-dark" />
                <span className="text-[11px] uppercase tracking-widest font-bold text-brand-dark">
                  {t('withTitle')}
                </span>
              </div>
              <p className="text-sm text-ink-soft leading-snug">{t('withSubtitle')}</p>
            </div>

            <ul className="divide-y divide-line">
              {withItems.map((it, i) => (
                <li key={i} className="px-6 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="shrink-0 w-9 h-9 rounded-lg bg-brand-cream text-brand-dark flex items-center justify-center">
                        {ICONS[it.icon] ?? null}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-ink truncate">{it.label}</div>
                        <div className="text-xs text-ink-muted">{it.detail}</div>
                      </div>
                    </div>
                    <div className="text-base font-display font-normal text-brand-dark shrink-0">
                      {it.cost > 0 ? `€${fmt(it.cost)}` : '€0'}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="px-6 py-5 bg-brand-cream border-t border-brand/20 flex items-center justify-between">
              <span className="text-sm font-medium text-ink">{t('withTotalLabel')}</span>
              <span className="font-display font-normal text-3xl text-brand-dark">€{fmt(withTotal)}</span>
            </div>
          </div>
        </div>

        {/* Savings highlight banner */}
        <div className="reveal max-w-4xl mx-auto bg-gradient-to-br from-brand-dark to-brand text-white rounded-2xl p-8 lg:p-10 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            <div className="flex-1 text-center lg:text-left">
              <div className="text-[11px] uppercase tracking-widest text-brand-light mb-2">
                {t('savingsLabel')}
              </div>
              <div className="font-display font-normal text-6xl lg:text-7xl leading-none mb-2">
                €{fmt(savingsAmount)}
              </div>
              <div className="text-white/85 text-sm">
                {t('perDayLabel')} <strong className="text-white">{t('perDayValue')}</strong>, {t('perDayHint')}
              </div>
            </div>

            <div className="w-px h-20 bg-white/20 hidden lg:block" />

            <a
              href="#buy"
              className="inline-flex items-center gap-2 bg-white hover:bg-brand-cream text-brand-dark font-medium px-7 py-4 rounded-full transition shadow-md"
            >
              {t('cta')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-ink-muted mt-6 max-w-3xl mx-auto reveal">
          {t('disclaimer')}
        </p>

        {/* Sources , collapsible */}
        <div className="max-w-4xl mx-auto mt-10 reveal">
          <details className="group bg-white border border-line rounded-2xl overflow-hidden">
            <summary className="px-6 py-4 cursor-pointer list-none flex items-center justify-between hover:bg-soft transition">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-brand-cream text-brand-dark flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h12M4 12h12M4 18h8M18 9v9m0 0l-3-3m3 3l3-3" />
                  </svg>
                </span>
                <div>
                  <div className="text-sm font-medium text-ink">{t('sourcesTitle')}</div>
                  <div className="text-xs text-ink-muted">
                    {sources.length} referenties · klik om uit te klappen
                  </div>
                </div>
              </div>
              <svg
                className="w-5 h-5 text-ink-muted transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </summary>

            <ol className="border-t border-line divide-y divide-line">
              {sources.map((s) => (
                <li
                  key={s.n}
                  id={`bron-${s.n}`}
                  className="px-6 py-4 flex gap-4 scroll-mt-24"
                >
                  <span className="shrink-0 w-7 h-7 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center">
                    {s.n}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-ink mb-0.5">{s.label}</div>
                    <p className="text-xs text-ink-soft leading-relaxed">{s.ref}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="px-6 py-4 text-xs text-ink-muted border-t border-line bg-soft italic">
              {t('sourcesFootnote')}
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
