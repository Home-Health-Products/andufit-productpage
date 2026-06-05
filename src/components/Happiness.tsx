import { useTranslations } from 'next-intl';
import CalcButton from './CalcButton';

export default function Happiness() {
  const t = useTranslations('happiness');
  const bullets = t.raw('bullets') as string[];

  return (
    <section id={t('id')} className="relative overflow-hidden bg-white">
      <div className="grid lg:grid-cols-2 items-stretch">
        {/* Left: text */}
        <div className="order-2 lg:order-1 px-5 lg:px-16 py-16 lg:py-24 flex items-center bg-gradient-to-br from-brand-cream via-white to-brand-cream">
          <div className="max-w-xl mx-auto reveal">
            <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-medium mb-4">
              {t('eyebrow')}
            </span>
            <h2 className="font-display text-4xl lg:text-6xl text-ink leading-[1.05] mb-3">
              {t('title')}
            </h2>
            <p className="font-display text-xl lg:text-2xl text-ink-soft italic mb-6">
              {t('subtitle')}
            </p>
            <p className="text-base lg:text-lg text-ink-soft leading-relaxed mb-8">
              {t('lead')}
            </p>

            <ul className="space-y-3 mb-9">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-ink">
                  <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-brand-dark text-white inline-flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-medium px-7 py-4 rounded-full transition shadow-md"
              >
                {t('cta')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <CalcButton variant="light" />
            </div>
          </div>
        </div>

        {/* Right: looping hero video (GIF-style) */}
        <div className="order-1 lg:order-2 relative min-h-[400px] lg:min-h-[640px] bg-ink">
          <video
            src={t('videoSrc')}
            poster={t('videoPoster')}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* subtle gradient for text legibility if overlay text used */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

          {/* Floating quote */}
          <div className="absolute bottom-6 left-6 right-6 lg:left-10 lg:right-10">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur text-ink text-xs font-medium px-3 py-2 rounded-full shadow-md">
              <span className="w-2 h-2 rounded-full bg-good animate-pulse-slow" />
              Echte rust · elke nacht
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
