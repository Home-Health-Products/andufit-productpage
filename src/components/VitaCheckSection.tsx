import { useTranslations } from 'next-intl';
import BeforeAfter from './BeforeAfter';
import CalcButton from './CalcButton';

type Point = { icon: string; title: string; text: string };

const icons: Record<string, React.ReactNode> = {
  scan: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9V5a2 2 0 012-2h4M3 15v4a2 2 0 002 2h4m10-14h4a2 2 0 012 2v4m0 6v4a2 2 0 01-2 2h-4M9 12h6" />
    </svg>
  ),
  program: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
    </svg>
  ),
  progress: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
};

export default function VitaCheckSection() {
  const t = useTranslations('vitacheck');
  const points = t.raw('points') as Point[];

  return (
    <section id={t('id')} className="py-14 lg:py-20 bg-gradient-to-b from-ink to-[#0a1a18] text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-6 reveal">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand font-medium mb-4">
            <span className="relative inline-flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-brand animate-ping opacity-60" />
              <span className="relative inline-block w-2 h-2 rounded-full bg-brand" />
            </span>
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-white mb-5">{t('title')}</h2>
          <p className="text-lg text-white/70">{t('lead')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
          {/* Left — BeforeAfter carousel (neg-margin cancels its internal mt-6) */}
          <div className="reveal -mt-6">
            <BeforeAfter />
          </div>

          {/* Right — explanation */}
          <div className="reveal space-y-6">
            <ul className="space-y-6">
              {points.map((p, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="shrink-0 mt-0.5 w-10 h-10 rounded-full bg-brand/20 text-brand border border-brand/30 inline-flex items-center justify-center">
                    {icons[p.icon] ?? icons.scan}
                  </span>
                  <div>
                    <div className="font-semibold text-white mb-1">{p.title}</div>
                    <p className="text-sm text-white/65 leading-relaxed">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-white/10">
              <CalcButton withHint />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
