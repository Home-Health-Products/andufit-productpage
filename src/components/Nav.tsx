import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';

type NavLink = { label: string; href: string };

export default function Nav() {
  const t = useTranslations('nav');
  const links = t.raw('links') as NavLink[];

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="inline-flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo_black.svg" alt="ANDUFIT" className="h-7 lg:h-8 w-auto" />
        </a>
        <nav className="hidden lg:flex items-center gap-7 text-sm text-ink-soft">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-brand-dark transition">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <a
            href="#buy"
            className="hidden md:inline-flex bg-brand hover:bg-brand-dark text-white text-sm font-medium px-4 py-2 rounded transition"
          >
            {t('cta')}
          </a>
        </div>
      </div>
    </header>
  );
}
