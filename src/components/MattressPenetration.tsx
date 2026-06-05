import { useTranslations } from 'next-intl';
import CalcButton from './CalcButton';

type Point = { title: string; text: string };

export default function MattressPenetration() {
  const t = useTranslations('penetration');
  const points = t.raw('points') as Point[];

  // staggered rising andulation waves
  const waves = [0, 0.9, 1.8, 2.7];

  return (
    <section id={t('id')} className="scroll-mt-24 py-20 lg:py-28 bg-gradient-to-b from-soft to-white">
      <style>{`
        @keyframes anduRise {
          0%   { transform: translateY(0)      scaleX(.62); opacity: 0; }
          12%  { opacity: .9; }
          85%  { opacity: .9; }
          100% { transform: translateY(-200px) scaleX(1.1); opacity: 0; }
        }
        @keyframes anduRing {
          0%   { transform: scale(.5); opacity: .7; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes anduMotor {
          0%, 100% { transform: scaleY(1);   opacity: .55; }
          50%      { transform: scaleY(1.9); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .andu-anim { animation: none !important; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16 reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-medium mb-3">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-ink mb-5">{t('title')}</h2>
          <p className="text-lg text-ink-soft">{t('lead')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 lg:items-center">
          {/* Animated cross-section */}
          <div className="reveal rounded-3xl border border-line bg-white shadow-lg p-6 lg:p-8 overflow-hidden">
            <div className="relative mx-auto max-w-md">
              {/* Person on top of the mattress */}
              <div className="relative h-20 flex items-end justify-center">
                <svg viewBox="0 0 320 80" className="w-full h-full text-ink/85" fill="currentColor" aria-hidden>
                  {/* pillow */}
                  <rect x="14" y="52" width="70" height="20" rx="9" className="text-line" fill="currentColor" />
                  {/* head */}
                  <circle cx="58" cy="44" r="15" />
                  {/* body + blanket hump */}
                  <path d="M74 72c0-14 10-22 26-22h120c30 0 44-14 74-14 26 0 42 12 18 22-2 .8-160 .8-238 .8z" opacity="0.92" />
                  <path d="M74 72c0-15 12-24 28-24h118c32 0 46-14 76-14 14 0 24 4 30 10" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-dark/40" />
                </svg>
                <span className="absolute -top-1 right-0 text-[11px] uppercase tracking-widest text-ink-muted">
                  {t('personLabel')}
                </span>
              </div>

              {/* Mattress block with rising waves + ruler */}
              <div className="relative h-[200px] rounded-2xl bg-gradient-to-b from-white to-brand-cream/50 border border-line overflow-hidden">
                {/* subtle foam texture lines */}
                <div className="absolute inset-0 opacity-[0.5] [background-image:repeating-linear-gradient(0deg,transparent,transparent_18px,rgba(0,122,115,0.06)_19px)]" />

                {/* rising andulation waves */}
                <div className="absolute inset-x-0 bottom-0 h-full">
                  {waves.map((delay, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 200 24"
                      className="andu-anim absolute left-1/2 -translate-x-1/2 bottom-0 w-[78%] text-brand"
                      style={{ animation: `anduRise 3.6s ${delay}s linear infinite` }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      aria-hidden
                    >
                      <path d="M2 16 Q 25 2 50 16 T 100 16 T 150 16 T 198 16" />
                    </svg>
                  ))}
                </div>

                {/* depth ruler */}
                <div className="absolute right-3 top-3 bottom-3 w-px bg-brand-dark/30">
                  {[
                    { pos: '0%', label: '45 cm' },
                    { pos: '33%', label: '30' },
                    { pos: '66%', label: '15' },
                    { pos: '100%', label: '0' },
                  ].map((tick, i) => (
                    <div key={i} className="absolute right-0 flex items-center gap-1.5" style={{ top: tick.pos }}>
                      <span className="text-[10px] tabular-nums text-ink-muted -translate-y-1/2 whitespace-nowrap">
                        {tick.label}
                      </span>
                      <span className="block w-2 h-px bg-brand-dark/40" />
                    </div>
                  ))}
                </div>

                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-brand-dark bg-white/80 backdrop-blur rounded-full px-2.5 py-1 border border-line">
                  {t('mattressLabel')}
                </span>
              </div>

              {/* ANDUFIT module */}
              <div className="relative mt-1.5 h-12 rounded-xl bg-gradient-to-r from-brand-dark to-brand shadow-md flex items-center justify-center overflow-hidden">
                {/* pulsing motor bars */}
                <div className="absolute inset-0 flex items-center justify-center gap-2.5">
                  {[0, 0.25, 0.5, 0.75, 1, 1.25, 1.5].map((d, i) => (
                    <span
                      key={i}
                      className="andu-anim block w-1.5 h-5 rounded-full bg-white/80 origin-center"
                      style={{ animation: `anduMotor 1.4s ${d}s ease-in-out infinite` }}
                    />
                  ))}
                </div>
                {/* expanding ring above module center */}
                <span
                  className="andu-anim absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-brand/60"
                  style={{ animation: 'anduRing 2.4s linear infinite' }}
                  aria-hidden
                />
                <span className="relative z-10 text-[11px] font-semibold uppercase tracking-widest text-white">
                  {t('moduleLabel')}
                </span>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="reveal">
            <div className="flex items-end gap-3 mb-6">
              <span className="font-display text-4xl sm:text-6xl lg:text-7xl text-brand-dark leading-none tabular-nums">
                {t('depthValue')}
              </span>
              <span className="text-sm text-ink-soft pb-2 max-w-[10rem] leading-snug">
                {t('depthLabel')}
              </span>
            </div>

            <ul className="space-y-5">
              {points.map((p, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="shrink-0 mt-0.5 w-9 h-9 rounded-full bg-brand-cream text-brand-dark inline-flex items-center justify-center">
                    <svg className="w-4.5 h-4.5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="font-medium text-ink mb-0.5">{p.title}</div>
                    <p className="text-sm text-ink-soft leading-relaxed">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={t('ctaHref')}
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
      </div>
    </section>
  );
}
