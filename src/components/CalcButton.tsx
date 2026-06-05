import { useTranslations } from 'next-intl';

type Variant = 'primary' | 'dark' | 'light' | 'inline';

export default function CalcButton({
  variant = 'primary',
  withHint = false,
  className = '',
}: {
  variant?: Variant;
  withHint?: boolean;
  className?: string;
}) {
  const t = useTranslations('calcButton');

  const styles: Record<Variant, string> = {
    primary:
      'bg-brand hover:bg-brand-dark text-white shadow-md',
    dark:
      'bg-ink hover:bg-brand-dark text-white shadow-md',
    light:
      'bg-white hover:bg-brand-cream text-brand-dark border-2 border-brand-dark/20 hover:border-brand-dark shadow-sm',
    inline:
      'bg-brand-cream hover:bg-brand-dark text-brand-dark hover:text-white',
  };

  return (
    <a
      href="#vooruitgang"
      className={`group inline-flex items-center gap-2.5 font-medium px-5 py-3 lg:px-6 lg:py-3.5 rounded-full transition ${styles[variant]} ${className}`}
    >
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/20 group-hover:bg-white/30">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V5M4 19h16M8 15l3.5-4 3 2.5L20 7" />
        </svg>
      </span>
      <span className="flex flex-col text-left">
        <span className="text-base lg:text-lg leading-tight">{t('label')}</span>
        {withHint && (
          <span className="text-xs lg:text-[13px] opacity-80 leading-tight">{t('hint')}</span>
        )}
      </span>
      <svg className="w-4 h-4 transition group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}
