'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

const LABELS: Record<string, string> = {
  nl: 'NL',
  en: 'EN',
  de: 'DE',
  fr: 'FR',
  es: 'ES',
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-xs">
      {routing.locales.map((l) => (
        <button
          key={l}
          onClick={() => router.replace(pathname, { locale: l })}
          className={`px-2 py-1 rounded transition ${
            l === locale
              ? 'bg-ink text-white'
              : 'text-ink-muted hover:text-ink hover:bg-soft'
          }`}
          aria-label={`Switch to ${LABELS[l]}`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
