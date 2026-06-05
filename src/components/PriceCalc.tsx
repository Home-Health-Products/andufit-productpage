'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

type Option = { value: string; label: string; size?: string; addon?: number };
type Step = { question: string; subtext: string; options: Option[] };

export default function PriceCalc() {
  const t = useTranslations('priceCalc');
  const steps = t.raw('steps') as Step[];
  const basePrice = t.raw('basePrice') as number;
  const currency = t('currency');
  const buttons = t.raw('buttons') as Record<string, string>;
  const result = t.raw('result') as Record<string, string>;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});

  const isMulti = step === 1;

  const toggle = (val: string) => {
    setAnswers((a) => {
      const cur = a[step] ?? [];
      if (isMulti) {
        return {
          ...a,
          [step]: cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val],
        };
      }
      return { ...a, [step]: [val] };
    });
    if (!isMulti) {
      // auto-advance on single select
      setTimeout(() => setStep((s) => Math.min(s + 1, steps.length)), 250);
    }
  };

  const totalAddons = useMemo(() => {
    let sum = 0;
    Object.entries(answers).forEach(([sIdx, vals]) => {
      const s = steps[parseInt(sIdx)];
      vals.forEach((v) => {
        const opt = s.options.find((o) => o.value === v);
        if (opt?.addon) sum += opt.addon;
      });
    });
    return sum;
  }, [answers, steps]);

  const finalPrice = basePrice + totalAddons;
  const chosenSize = answers[0]?.[0]
    ? steps[0].options.find((o) => o.value === answers[0][0])?.size
    : null;

  const done = step >= steps.length;
  const cur = steps[step];
  const curSelections = answers[step] ?? [];

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  return (
    <section id={t('id')} className="py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mb-10 reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-medium mb-3">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-ink mb-5">{t('title')}</h2>
          <p className="text-lg text-ink-soft">{t('lead')}</p>
        </div>

        <div className="bg-gradient-to-br from-brand-cream via-soft to-white rounded-3xl border border-brand-light p-6 lg:p-10 shadow-lg reveal">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition ${
                  i < step || done ? 'bg-brand' : i === step ? 'bg-brand-dark' : 'bg-line'
                }`}
              />
            ))}
          </div>

          {!done ? (
            <div>
              <div className="text-xs text-ink-muted mb-2">
                Stap {step + 1} / {steps.length}
              </div>
              <h3 className="font-display text-2xl lg:text-3xl text-ink mb-2">{cur.question}</h3>
              <p className="text-sm text-ink-soft mb-6">{cur.subtext}</p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {cur.options.map((opt) => {
                  const selected = curSelections.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      onClick={() => toggle(opt.value)}
                      className={`text-left px-5 py-4 rounded-xl border-2 transition flex items-center justify-between gap-3 ${
                        selected
                          ? 'bg-brand text-white border-brand'
                          : 'bg-white border-line hover:border-brand'
                      }`}
                    >
                      <span className={selected ? '' : 'text-ink'}>{opt.label}</span>
                      <span
                        className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selected ? 'bg-white border-white' : 'border-line'
                        }`}
                      >
                        {selected && (
                          <svg className="w-3 h-3 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between">
                <button
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(s - 1, 0))}
                  className="text-sm text-ink-muted hover:text-ink disabled:opacity-30"
                >
                  ← {buttons.back}
                </button>
                {isMulti && (
                  <button
                    disabled={curSelections.length === 0}
                    onClick={() => setStep((s) => s + 1)}
                    className="bg-brand hover:bg-brand-dark text-white text-sm font-medium px-5 py-2 rounded transition disabled:opacity-30"
                  >
                    {buttons.next} →
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 animate-fade-in">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-display text-2xl lg:text-3xl text-ink mb-2">
                {result.title}
              </h3>
              {chosenSize && (
                <p className="text-ink-soft mb-6">
                  Maat: <strong className="text-brand-dark">{chosenSize}</strong>
                </p>
              )}
              <div className="inline-block bg-white border-2 border-brand-dark rounded-2xl px-8 py-6 mb-6">
                <div className="text-xs uppercase tracking-widest text-ink-muted mb-1">
                  {result.priceLabel}
                </div>
                <div className="font-display font-normal text-5xl text-brand-dark">
                  {currency}
                  {finalPrice}
                </div>
                <div className="text-xs text-ink-muted mt-2">
                  {result.installments.replace('{amount}', `${currency}${Math.ceil(finalPrice / 3)}`)}
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://andupet.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand hover:bg-brand-dark text-white font-medium px-6 py-3 rounded transition"
                >
                  {result.cta}
                </a>
                <button
                  onClick={reset}
                  className="bg-white border border-line hover:border-brand text-ink-soft px-6 py-3 rounded transition"
                >
                  {buttons.restart}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
