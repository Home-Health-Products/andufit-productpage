'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Option = { value: string; label: string; subtitle?: string };
type SeverityBlock = { question: string; subtext: string; options: Option[] };
type Step = {
  field: 'goal' | 'severity' | 'gender' | 'age' | 'frequency';
  question?: string;
  subtext?: string;
  options?: Option[];
  goalSpecific?: boolean;
};
type Horizon = { value: string; label: string; short: string; fraction: number };
type Goal = {
  label: string;
  improveLabel: string;
  resultText: string;
  maxPct: Record<string, number>;
  severity: SeverityBlock;
};
type Answers = {
  goal?: string;
  severity?: string;
  gender?: string;
  age?: string;
  frequency?: string;
};

export default function ProgressFunnel() {
  const t = useTranslations('progressFunnel');
  const steps = t.raw('steps') as Step[];
  const horizons = t.raw('horizons') as Horizon[];
  const goals = t.raw('goals') as Record<string, Goal>;
  const freqFactors = t.raw('frequencyFactors') as Record<string, number>;
  const ageFactors = t.raw('ageFactors') as Record<string, number>;
  const genderFactors = t.raw('genderFactors') as Record<string, number>;

  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);

  const totalSteps = steps.length;
  const current = steps[stepIdx];
  const isLastStep = stepIdx === totalSteps - 1;

  // Resolve step content (severity step is tailored to the chosen goal)
  const stepContent = (step: Step): SeverityBlock => {
    if (step.goalSpecific && answers.goal) return goals[answers.goal].severity;
    return { question: step.question ?? '', subtext: step.subtext ?? '', options: step.options ?? [] };
  };
  const content = stepContent(current);

  const canProceed = () => Boolean(answers[current.field]);
  const isSelected = (value: string) => answers[current.field] === value;

  const goNext = () => {
    if (isLastStep) setShowResult(true);
    else setStepIdx((i) => i + 1);
  };

  // Selecting an option auto-advances to the next step (short delay for visual feedback).
  const select = (value: string) => {
    setAnswers((prev) => ({ ...prev, [current.field]: value }));
    setTimeout(goNext, 220);
  };
  const onBack = () => {
    if (showResult) return setShowResult(false);
    if (stepIdx > 0) setStepIdx((i) => i - 1);
  };
  const reset = () => {
    setAnswers({});
    setStepIdx(0);
    setShowResult(false);
  };

  const progressPct = ((stepIdx + (canProceed() ? 1 : 0.5)) / totalSteps) * 100;

  // ---- Projection model (percentages) ----
  const goal = answers.goal ? goals[answers.goal] : undefined;
  const maxPct = goal && answers.severity ? goal.maxPct[answers.severity] : 0;
  const freqF = answers.frequency ? freqFactors[answers.frequency] ?? 1 : 1;
  const ageF = answers.age ? ageFactors[answers.age] ?? 1 : 1;
  const genderF = answers.gender ? genderFactors[answers.gender] ?? 1 : 1;

  const projected = horizons.map((h) => ({
    horizon: h,
    pct: maxPct * h.fraction * freqF * ageF * genderF,
  }));
  const finalPct = projected.length ? projected[projected.length - 1].pct : 0;

  const fmtPct = (p: number) => `+${Math.round(p)}%`;

  // ---- Health-cost savings over time (scales with goal + severity) ----
  const costByGoal = t.raw('result.savings.annualCostByGoal') as Record<string, Record<string, number>>;
  const savingsAnnual =
    (answers.goal && answers.severity && costByGoal[answers.goal]?.[answers.severity]) ||
    Number(t.raw('result.savings.defaultAnnual'));
  const savingsDevice = Number(t.raw('result.savings.deviceCost'));
  const savingsHorizons = t.raw('result.savings.horizons') as { years: number; label: string }[];
  const eurFmt = new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const fmtEur = (v: number) => eurFmt.format(Math.max(0, Math.round(v)));

  // ---- Chart geometry (Nu=0% + 3 horizons) ----
  const chartPoints = [{ label: t('result.nowLabel'), pct: 0 }, ...projected.map((p) => ({ label: p.horizon.short, pct: p.pct }))];
  const maxVal = Math.max(...chartPoints.map((p) => p.pct), 1);
  const yHi = maxVal * 1.18;
  const VW = 320, VH = 130, PADL = 10, PADR = 10, PADT = 18, PADB = 26;
  const innerW = VW - PADL - PADR;
  const innerH = VH - PADT - PADB;
  const n = chartPoints.length;
  const cx = (i: number) => PADL + (i / (n - 1)) * innerW;
  const cy = (v: number) => PADT + (1 - v / yHi) * innerH;
  const linePath = chartPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${cx(i)},${cy(p.pct)}`).join(' ');
  const areaPath = `${linePath} L${cx(n - 1)},${PADT + innerH} L${cx(0)},${PADT + innerH} Z`;

  const staticLabel = (field: Step['field'], val?: string) => {
    const step = steps.find((s) => s.field === field);
    return step?.options?.find((o) => o.value === val)?.label;
  };
  const severityLabel = answers.goal
    ? goals[answers.goal].severity.options.find((o) => o.value === answers.severity)?.label
    : undefined;

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
                  <span>{t('stepLabel', { current: stepIdx + 1, total: totalSteps })}</span>
                  <span>{Math.round(progressPct)}%</span>
                </div>
                <div className="h-1.5 bg-line rounded-full overflow-hidden">
                  <div className="h-full bg-brand-dark transition-all duration-300" style={{ width: `${progressPct}%` }} />
                </div>
              </div>

              {/* Question */}
              <div className="px-6 lg:px-10 pt-8 pb-6">
                <h3 className="font-display text-2xl lg:text-3xl text-ink mb-2">{content.question}</h3>
                <p className="text-sm text-ink-soft">{content.subtext}</p>
              </div>

              {/* Options */}
              <div className="px-6 lg:px-10 pb-6 space-y-3">
                {content.options.map((o) => {
                  const sel = isSelected(o.value);
                  return (
                    <button
                      key={o.value}
                      onClick={() => select(o.value)}
                      className={`w-full text-left p-4 lg:p-5 rounded-xl border-2 transition flex items-start gap-4 ${
                        sel ? 'border-brand-dark bg-brand-cream' : 'border-line bg-white hover:border-brand'
                      }`}
                    >
                      <span
                        className={`shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
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
                        <div className="text-sm lg:text-base font-medium text-ink mb-0.5">{o.label}</div>
                        {o.subtitle && <div className="text-xs lg:text-sm text-ink-muted">{o.subtitle}</div>}
                      </div>
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
                {stepIdx === 0 && (
                  /* Decorative only — selecting an option already advances the funnel */
                  <button
                    type="button"
                    aria-hidden="true"
                    tabIndex={-1}
                    className="bg-brand text-white font-medium px-6 py-3 rounded-full flex items-center gap-2 opacity-60 cursor-default"
                  >
                    {t('next')}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Result */
            <div className="p-6 lg:p-10">
              <div className="text-center mb-7">
                <span className="inline-block text-[11px] uppercase tracking-widest text-brand-dark font-bold mb-3">
                  {t('result.eyebrow')}
                </span>
                <h3 className="font-display text-2xl lg:text-3xl text-ink mb-1">{goal?.label}</h3>
                <p className="text-sm text-ink-soft max-w-md mx-auto">{goal?.resultText}</p>
              </div>

              {/* Hero number — 6-month potential */}
              <div className="text-center mb-7">
                <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-1">
                  {t('result.summaryLabel')}
                </div>
                <div className="font-display text-4xl sm:text-6xl lg:text-7xl text-brand-dark leading-none">
                  {fmtPct(finalPct)}
                </div>
                <div className="text-sm text-ink-soft mt-2">{goal?.improveLabel}</div>
              </div>

              {/* Horizon cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {projected.map((p) => (
                  <div key={p.horizon.value} className="rounded-2xl border border-line bg-white p-4 text-center">
                    <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-2">{p.horizon.label}</div>
                    <div className="font-display text-2xl lg:text-3xl text-brand-dark leading-none tabular-nums">
                      {fmtPct(p.pct)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress chart */}
              <div className="rounded-2xl border border-line bg-white p-5 mb-6">
                <div className="text-[11px] uppercase tracking-widest text-ink-muted font-bold mb-4">
                  {t('result.chartTitle')}
                </div>
                <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img">
                  <defs>
                    <linearGradient id="pf-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3db7b0" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#3db7b0" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1={PADL} y1={cy(0)} x2={VW - PADR} y2={cy(0)} stroke="#DCE8E7" strokeWidth="1" strokeDasharray="3 3" />
                  <path d={areaPath} fill="url(#pf-area)" />
                  <path d={linePath} fill="none" stroke="#1f7c75" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                  {chartPoints.map((p, i) => {
                    const anchor = i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle';
                    return (
                      <g key={i}>
                        <circle cx={cx(i)} cy={cy(p.pct)} r={i === 0 ? 3.5 : 4.5} fill={i === 0 ? '#9aa' : '#1f7c75'} stroke="#fff" strokeWidth="1.5" />
                        <text x={cx(i)} y={cy(p.pct) - 9} textAnchor={anchor} className="fill-ink" fontSize="11" fontWeight="600">
                          {i === 0 ? '0%' : fmtPct(p.pct)}
                        </text>
                        <text x={cx(i)} y={VH - 8} textAnchor={anchor} className="fill-ink-muted" fontSize="10">
                          {p.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Recap */}
              <div className="bg-white border border-line rounded-xl p-5 mb-6">
                <div className="text-[11px] uppercase tracking-widest text-ink-muted font-bold mb-3">
                  {t('result.recapTitle')}
                </div>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-muted">{t('result.recapGoal')}</dt>
                    <dd className="text-ink font-medium text-right">{staticLabel('goal', answers.goal)}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-muted">{t('result.recapSeverity')}</dt>
                    <dd className="text-ink font-medium text-right">{severityLabel}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-muted">{t('result.recapGender')}</dt>
                    <dd className="text-ink font-medium text-right">{staticLabel('gender', answers.gender)}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-muted">{t('result.recapAge')}</dt>
                    <dd className="text-ink font-medium text-right">{staticLabel('age', answers.age)}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-muted">{t('result.recapFrequency')}</dt>
                    <dd className="text-ink font-medium text-right">{staticLabel('frequency', answers.frequency)}</dd>
                  </div>
                </dl>
              </div>

              {/* Health-cost savings over time */}
              <div className="rounded-2xl bg-brand-cream/70 border border-brand/20 p-5 mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="shrink-0 mt-0.5 w-8 h-8 rounded-full bg-white text-brand-dark inline-flex items-center justify-center border border-brand/20">
                    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12a6 5 0 0112 0v4a2 2 0 01-2 2h-1l-1 2H8l-1-2a6 5 0 01-4-4.5z" />
                      <path d="M15 9c2 0 3-1 3-2.5S17 4 16 4M8 9h2" />
                      <circle cx="12" cy="13" r="0.6" fill="currentColor" />
                    </svg>
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-brand-dark mb-0.5">
                      {t('result.savings.title')}
                    </div>
                    <p className="text-xs lg:text-sm text-ink-soft leading-relaxed">
                      {t('result.savings.intro')}
                    </p>
                  </div>
                </div>
                <p className="text-xs font-medium text-brand-dark mb-3">
                  {t('result.savings.basis', { amount: fmtEur(savingsAnnual) })}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {savingsHorizons.map((h) => (
                    <div key={h.years} className="rounded-xl border border-brand/15 bg-white p-3.5 text-center">
                      <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-1.5">{h.label}</div>
                      <div className="font-display text-2xl lg:text-3xl text-brand-dark leading-none tabular-nums">
                        {fmtEur(savingsAnnual * h.years - savingsDevice)}
                      </div>
                      <div className="text-[11px] text-ink-muted mt-1">{t('result.savings.savedLabel')}</div>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-ink-muted mt-3.5 leading-relaxed">{t('result.savings.note')}</p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#buy" className="flex-1 bg-brand hover:bg-brand-dark text-white font-medium px-6 py-4 rounded-full transition text-center">
                  {t('result.ctaPrimary')}
                </a>
                <button
                  onClick={reset}
                  className="flex-1 bg-white border border-line hover:border-brand text-ink font-medium px-6 py-4 rounded-full transition"
                >
                  {t('result.ctaSecondary')}
                </button>
              </div>

              <p className="text-[11px] text-ink-muted text-center mt-5">{t('result.disclaimer')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
