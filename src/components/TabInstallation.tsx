'use client';

import { useTranslations } from 'next-intl';
import { useSizeContext } from '@/contexts/SizeContext';

type Step = { title: string; text: string };

export default function TabInstallation() {
  const t = useTranslations('tabs.installation');
  const { width, length } = useSizeContext();
  const steps = t.raw('steps') as Step[];

  const checkoutHref = (t.raw('videoUrl') as string)
    .replace('{width}', width)
    .replace('{length}', length);

  return (
    <div className="max-w-5xl mx-auto">
      <p className="text-lg text-ink-soft mb-8 leading-relaxed max-w-3xl">{t('lead')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-start">
        {/* Video */}
        <div>
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-ink shadow-md">
            <video
              src={t('videoSrc')}
              poster={t('videoPoster')}
              controls
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between gap-3 mt-3">
            <span className="text-xs text-ink-muted">{t('videoCaption')}</span>
            <a
              href={checkoutHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-dark hover:text-brand transition-colors"
            >
              {t('videoCta')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-9 9M11 5H6a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1v-5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Steps */}
        <ol className="space-y-5">
          {steps.map((s, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="shrink-0 w-9 h-9 rounded-full bg-brand text-white inline-flex items-center justify-center font-display text-lg tabular-nums">
                {i + 1}
              </span>
              <div>
                <div className="font-medium text-ink mb-0.5">{s.title}</div>
                <p className="text-base text-ink-soft leading-relaxed">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
