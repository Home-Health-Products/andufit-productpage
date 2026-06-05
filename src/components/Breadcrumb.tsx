import { useTranslations } from 'next-intl';

export default function Breadcrumb() {
  const t = useTranslations('breadcrumb');

  return (
    <nav aria-label="Breadcrumb" className="bg-white border-b border-line">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-3">
        <ol className="flex items-center gap-2 text-xs text-ink-muted">
          <li>
            <a href="https://www.andufit.com/nl-BE" className="hover:text-brand-dark">
              {t('home')}
            </a>
          </li>
          <li aria-hidden>›</li>
          <li>
            <a href="https://www.andufit.com/nl-BE/shop" className="hover:text-brand-dark">
              {t('shop')}
            </a>
          </li>
          <li aria-hidden>›</li>
          <li className="text-ink font-medium" aria-current="page">
            {t('product')}
          </li>
        </ol>
      </div>
    </nav>
  );
}
