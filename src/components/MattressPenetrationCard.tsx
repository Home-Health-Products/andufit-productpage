'use client';

import { useTranslations } from 'next-intl';

type Point = { title: string; text: string };

export default function MattressPenetrationCard() {
  const t = useTranslations('penetration');
  const points = t.raw('points') as Point[];

  const waves = [0, 0.9, 1.8, 2.7];

  return (
    <div className="mt-6">
      <h3 className="font-display text-xl lg:text-2xl text-ink mb-1">
        {t('eyebrow')} —{' '}
        <span className="text-brand-dark">tot {t('depthValue')}</span>
      </h3>
      <p className="text-sm text-ink-muted mb-4">{t('lead')}</p>

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

      {/* Illustration card */}
      <div className="rounded-2xl border border-line bg-white shadow-sm p-5 overflow-hidden">
        {/* Person on top */}
        <div className="relative h-16 flex items-end justify-center mb-1">
          <svg viewBox="0 0 320 80" className="w-full h-full text-ink/85" fill="currentColor" aria-hidden>
            <rect x="14" y="52" width="70" height="20" rx="9" className="text-line" fill="currentColor" />
            <circle cx="58" cy="44" r="15" />
            <path d="M74 72c0-14 10-22 26-22h120c30 0 44-14 74-14 26 0 42 12 18 22-2 .8-160 .8-238 .8z" opacity="0.92" />
            <path d="M74 72c0-15 12-24 28-24h118c32 0 46-14 76-14 14 0 24 4 30 10" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-dark/40" />
          </svg>
          <span className="absolute -top-1 right-0 text-[10px] uppercase tracking-widest text-ink-muted">
            {t('personLabel')}
          </span>
        </div>

        {/* Mattress with waves + ruler */}
        <div className="relative h-[180px] rounded-xl bg-gradient-to-b from-white to-brand-cream/50 border border-line overflow-hidden">
          <div className="absolute inset-0 opacity-[0.5] [background-image:repeating-linear-gradient(0deg,transparent,transparent_18px,rgba(0,122,115,0.06)_19px)]" />

          <div className="absolute inset-x-0 bottom-0 h-full">
            {waves.map((delay, i) => (
              <svg
                key={i}
                viewBox="0 0 200 24"
                className="andu-anim absolute left-1/2 -translate-x-1/2 bottom-0 w-[80%] text-brand"
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

          {/* Ruler */}
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

        {/* ANDUFIT module — doorsnede-weergave (geen knop) */}
        <div className="relative mt-1.5 flex items-stretch gap-2">
          {/* Hoogte-indicator links */}
          <div className="flex flex-col items-center justify-between py-0.5 shrink-0">
            <span className="block w-2.5 h-px bg-ink-muted/40" />
            <span className="text-[9px] font-semibold text-ink-muted tabular-nums rotate-180 [writing-mode:vertical-lr] leading-none">7 cm</span>
            <span className="block w-2.5 h-px bg-ink-muted/40" />
          </div>
          {/* Module slab */}
          <div className="flex-1 h-10 rounded bg-gradient-to-r from-brand-dark to-brand border-t border-white/20 shadow-sm flex items-center px-3 overflow-hidden gap-3">
            {/* Label links */}
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-white/90">
              ANDUFIT
            </span>
            {/* Scheidingslijn */}
            <span className="block w-px self-stretch bg-white/20 shrink-0" />
            {/* Geanimeerde motoren */}
            <div className="flex items-center gap-2 flex-1 justify-center">
              {[0, 0.25, 0.5, 0.75, 1, 1.25, 1.5].map((d, i) => (
                <span
                  key={i}
                  className="andu-anim block w-1 h-3.5 rounded-full bg-white/70 origin-center"
                  style={{ animation: `anduMotor 1.4s ${d}s ease-in-out infinite` }}
                />
              ))}
            </div>
            {/* Badge rechts */}
            <span className="shrink-0 text-[9px] font-medium text-white/70 border border-white/25 rounded px-1.5 py-0.5 leading-none">
              7 cm
            </span>
          </div>
        </div>
      </div>

      {/* Stats + bullet points */}
      <div className="mt-4 flex gap-5 items-start">
        {/* 45 cm */}
        <div className="shrink-0">
          <span className="font-display text-4xl text-brand-dark leading-none tabular-nums">
            {t('depthValue')}
          </span>
          <p className="text-[11px] text-ink-muted mt-0.5 max-w-[6rem] leading-snug">
            {t('depthLabel')}
          </p>
        </div>

        {/* Bullet points */}
        <ul className="space-y-2.5 flex-1">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-brand-cream text-brand-dark inline-flex items-center justify-center">
                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z" clipRule="evenodd" />
                </svg>
              </span>
              <div>
                <div className="text-sm font-medium text-ink leading-tight">{p.title}</div>
                <p className="text-xs text-ink-soft leading-snug mt-0.5">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
