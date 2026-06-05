import { useTranslations } from 'next-intl';

type Link = { label: string; href: string };
type Column = { heading: string; links: Link[] };

export default function Footer() {
  const t = useTranslations('footer');
  const columns = t.raw('columns') as Column[];

  return (
    <footer className="bg-ink text-white/70 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo_white.svg" alt="ANDUFIT" className="h-8 w-auto mb-3" />
            <p className="text-sm text-white/60">{t('tagline')}</p>
          </div>

          {columns.map((col, i) => (
            <div key={i}>
              <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">
                {col.heading}
              </h4>
              <ul className="space-y-2 text-sm">
                {col.links.map((l, j) => (
                  <li key={j}>
                    <a
                      href={l.href}
                      className="text-white/60 hover:text-brand-light transition"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 text-xs text-white/50 text-center">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
