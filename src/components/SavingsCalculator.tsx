'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Option = {
  value: string;
  label: string;
  subtitle?: string;
  multiplier?: number;
  add?: number;
};
type Step = {
  question: string;
  subtext: string;
  field: 'age' | 'health' | 'symptoms' | 'horizon';
  multiSelect?: boolean;
  options: Option[];
};

type Answers = {
  age?: string;
  health?: string;
  symptoms?: string[];
  horizon?: string;
};

const fmt = (v: number) => new Intl.NumberFormat('nl-BE', { minimumFractionDigits: 0 }).format(v);

export default function SavingsCalculator() {
  const t = useTranslations('savingsCalculator');
  const steps = t.raw('steps') as Step[];
  const baseCost = t.raw('baseCost') as number;
  const andufitCost = t.raw('andufitCost') as number;
  const horizonBase = t.raw('horizonBase') as number;

  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ symptoms: [] });
  const [showResult, setShowResult] = useState(false);

  const totalSteps = steps.length;
  const current = steps[stepIdx];
  const isLastStep = stepIdx === totalSteps - 1;

  const findOption = (step: Step, value?: string) =>
    step.options.find((o) => o.value === value);

  const selectedSymptoms = (answers.symptoms ?? [])
    .map((v) => findOption(steps[2], v))
    .filter(Boolean) as Option[];

  const ageOpt = findOption(steps[0], answers.age);
  const healthOpt = findOption(steps[1], answers.health);
  const horizonOpt = findOption(steps[3], answers.horizon);

  const ageMult = ageOpt?.multiplier ?? 1;
  const healthMult = healthOpt?.multiplier ?? 1;
  const horizonMult = horizonOpt?.multiplier ?? 1;
  const horizonYears = horizonOpt ? Math.round(horizonBase * horizonMult) : horizonBase;
  const symptomBonus = selectedSymptoms.reduce((sum, s) => sum + (s.add ?? 0), 0);

  const withoutAndupet = Math.round(
    (baseCost * ageMult * healthMult + symptomBonus) * horizonMult
  );
  const investment = Math.round(andufitCost + 5 * horizonYears); // €1/yr power
  const savings = Math.max(0, withoutAndupet - investment);
  const perDay = horizonYears > 0 ? savings / (horizonYears * 365) : 0;

  const canProceed = () => {
    const f = current.field;
    if (current.multiSelect) return (answers.symptoms ?? []).length > 0;
    return Boolean((answers as Record<string, unknown>)[f]);
  };

  const select = (value: string) => {
    const f = current.field;
    if (current.multiSelect) {
      setAnswers((prev) => {
        const list = prev.symptoms ?? [];
        return {
          ...prev,
          symptoms: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
        };
      });
    } else {
      setAnswers((prev) => ({ ...prev, [f]: value }));
    }
  };

  const isSelected = (value: string) => {
    if (current.multiSelect) return (answers.symptoms ?? []).includes(value);
    return (answers as Record<string, unknown>)[current.field] === value;
  };

  const onNext = () => {
    if (!canProceed()) return;
    if (isLastStep) {
      setShowResult(true);
    } else {
      setStepIdx((i) => i + 1);
    }
  };

  const onBack = () => {
    if (showResult) {
      setShowResult(false);
      return;
    }
    if (stepIdx > 0) setStepIdx((i) => i - 1);
  };

  const reset = () => {
    setAnswers({ symptoms: [] });
    setStepIdx(0);
    setShowResult(false);
  };

  const progressPct = ((stepIdx + (canProceed() ? 1 : 0.5)) / totalSteps) * 100;

  return (
    <section id={t('id')} className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-medium mb-3">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-ink mb-5">{t('title')}</h2>
          <p className="text-lg text-ink-soft">{t('lead')}</p>
        </div>

        <div className="max-w-3xl mx-auto bg-soft rounded-3xl border border-line overflow-hidden shadow-sm">
          {!showResult ? (
            <>
              {/* Progress bar */}
              <div className="px-6 lg:px-8 pt-6">
                <div className="flex items-center justify-between text-xs text-ink-muted mb-2 font-medium">
                  <span>
                    {t('stepLabel', { current: stepIdx + 1, total: totalSteps })}
                  </span>
                  <span>{Math.round(progressPct)}%</span>
                </div>
                <div className="h-1.5 bg-line rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-dark transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="px-6 lg:px-10 pt-8 pb-6">
                <h3 className="font-display text-2xl lg:text-3xl text-ink mb-2">
                  {current.question}
                </h3>
                <p className="text-sm text-ink-soft">{current.subtext}</p>
              </div>

              {/* Options */}
              <div className="px-6 lg:px-10 pb-6 space-y-3">
                {current.options.map((o) => {
                  const sel = isSelected(o.value);
                  return (
                    <button
                      key={o.value}
                      onClick={() => select(o.value)}
                      className={`w-full text-left p-4 lg:p-5 rounded-xl border-2 transition flex items-start gap-4 ${
                        sel
                          ? 'border-brand-dark bg-brand-cream'
                          : 'border-line bg-white hover:border-brand'
                      }`}
                    >
                      <span
                        className={`shrink-0 mt-0.5 w-6 h-6 rounded-${
                          current.multiSelect ? 'md' : 'full'
                        } border-2 flex items-center justify-center transition ${
                          sel ? 'border-brand bg-brand text-white' : 'border-line'
                        }`}
                      >
                        {sel && (
                          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-base lg:text-lg font-medium text-ink mb-0.5">
                          {o.label}
                        </div>
                        {o.subtitle && (
                          <div className="text-xs lg:text-sm text-ink-muted">{o.subtitle}</div>
                        )}
                      </div>
                      {typeof o.add === 'number' && o.add > 0 && (
                        <span className="shrink-0 text-xs font-medium text-bad bg-bad/10 px-2 py-0.5 rounded-full self-center">
                          +€{fmt(o.add)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="px-6 lg:px-10 py-5 border-t border-line bg-white flex items-center justify-between">
                <button
                  onClick={onBack}
                  disabled={stepIdx === 0}
                  className="text-sm font-medium text-ink-muted hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
                  </svg>
                  {t('back')}
                </button>
                <button
                  onClick={onNext}
                  disabled={!canProceed()}
                  className="bg-brand hover:bg-brand-dark text-white font-medium px-6 py-3 rounded-full transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLastStep ? t('compute') : t('next')}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            /* Result */
            <div className="p-6 lg:p-10">
              <div className="text-center mb-8 reveal">
                <span className="inline-block text-[11px] uppercase tracking-widest text-brand-dark font-bold mb-3">
                  {t('result.eyebrow')}
                </span>
                {savings > 0 ? (
                  <>
                    <div className="text-sm text-ink-muted mb-2">{t('result.savingsLabel')}</div>
                    <div className="font-display font-normal text-6xl lg:text-7xl text-brand-dark leading-none mb-3">
                      €{fmt(savings)}
                    </div>
                    <div className="text-sm text-ink-soft">
                      {t('result.perDayLabel')}{' '}
                      <strong className="text-ink">€{perDay.toFixed(2).replace('.', ',')}</strong>{' '}
                      {t('result.perDay')}
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="font-display text-2xl lg:text-3xl text-ink mb-3">
                      {t('result.noSavingsTitle')}
                    </h3>
                    <p className="text-sm text-ink-soft max-w-md mx-auto">
                      {t('result.noSavingsText')}
                    </p>
                  </>
                )}
              </div>

              {/* Numeric breakdown */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <div className="bg-bad/5 border border-bad/20 rounded-xl p-4 text-center">
                  <div className="text-[11px] uppercase tracking-widest text-bad font-bold mb-1">
                    {t('result.withoutLabel')}
                  </div>
                  <div className="font-display font-normal text-3xl text-bad">€{fmt(withoutAndupet)}</div>
                  <div className="text-xs text-ink-muted mt-1">over {horizonYears} jaar</div>
                </div>
                <div className="bg-brand-cream border border-brand/30 rounded-xl p-4 text-center">
                  <div className="text-[11px] uppercase tracking-widest text-brand-dark font-bold mb-1">
                    {t('result.withLabel')}
                  </div>
                  <div className="font-display font-normal text-3xl text-brand-dark">€{fmt(investment)}</div>
                  <div className="text-xs text-ink-muted mt-1">
                    eenmalig + €1/jaar stroom
                  </div>
                </div>
              </div>

              {/* Configuration recap */}
              <div className="bg-white border border-line rounded-xl p-5 mb-6">
                <div className="text-[11px] uppercase tracking-widest text-ink-muted font-bold mb-3">
                  {t('result.breakdownTitle')}
                </div>
                <dl className="space-y-2 text-sm">
                  {ageOpt && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-ink-muted">Leeftijd</dt>
                      <dd className="text-ink font-medium text-right">{ageOpt.label}</dd>
                    </div>
                  )}
                  {healthOpt && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-ink-muted">Gezondheid</dt>
                      <dd className="text-ink font-medium text-right">{healthOpt.label}</dd>
                    </div>
                  )}
                  {selectedSymptoms.length > 0 && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-ink-muted">Symptomen</dt>
                      <dd className="text-ink font-medium text-right">
                        {selectedSymptoms.map((s) => s.label.split(' ')[0]).join(', ')}
                      </dd>
                    </div>
                  )}
                  {horizonOpt && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-ink-muted">Periode</dt>
                      <dd className="text-ink font-medium text-right">{horizonOpt.label}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#buy"
                  className="flex-1 bg-brand hover:bg-brand-dark text-white font-medium px-6 py-4 rounded-full transition text-center"
                >
                  {t('result.ctaPrimary')}
                </a>
                <button
                  onClick={reset}
                  className="flex-1 bg-white border border-line hover:border-brand text-ink font-medium px-6 py-4 rounded-full transition"
                >
                  {t('result.ctaSecondary')}
                </button>
              </div>

              <p className="text-[11px] text-ink-muted text-center mt-5">
                {t('result.disclaimer')}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
