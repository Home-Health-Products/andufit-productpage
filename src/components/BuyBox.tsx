'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import CalcButton from './CalcButton';

type Option = { value: string; label: string; seats?: number };
type Usp = { icon: string; text: string };

const USP_ICONS: Record<string, JSX.Element> = {
  truck: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  ),
  return: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l-4-4 4-4M5 10h11a4 4 0 014 4v2" />
    </svg>
  ),
  shield: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z" />
    </svg>
  ),
  lock: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 11h14v10H5zM8 11V7a4 4 0 118 0v4" />
    </svg>
  ),
};

const PAYMENT_LABELS: Record<string, { label: string; bg: string; fg: string }> = {
  visa: { label: 'VISA', bg: 'bg-white', fg: 'text-[#1A1F71]' },
  mastercard: { label: 'MC', bg: 'bg-white', fg: 'text-[#EB001B]' },
  amex: { label: 'AMEX', bg: 'bg-[#2E77BC]', fg: 'text-white' },
  applepay: { label: 'Pay', bg: 'bg-black', fg: 'text-white' },
  googlepay: { label: 'G Pay', bg: 'bg-white', fg: 'text-ink' },
  paypal: { label: 'PayPal', bg: 'bg-white', fg: 'text-[#003087]' },
  bancontact: { label: 'BC', bg: 'bg-white', fg: 'text-[#005498]' },
  klarna: { label: 'Klarna', bg: 'bg-[#FFB3C7]', fg: 'text-black' },
};

export default function BuyBox() {
  const t = useTranslations('buyBox');
  const widths = t.raw('widths') as Option[];
  const lengths = t.raw('lengths') as Option[];
  const usps = t.raw('usp') as Usp[];
  const highlights = t.raw('highlights') as string[];
  const paymentMethods = t.raw('payments.methods') as string[];
  const vetRating = t.raw('vetReview.rating') as number;

  const [width, setWidth] = useState<string>(t('defaultWidth'));
  const [length, setLength] = useState<string>(t('defaultLength'));
  const [giftImgError, setGiftImgError] = useState(false);
  const giftImg = giftImgError ? t('gift.fallbackImage') : t('gift.image');

  const selectedWidth = widths.find((w) => w.value === width);
  const isDouble = selectedWidth?.seats === 2;
  const currentPrice = isDouble ? t('priceDouble') : t('priceSingle');
  const currentFinancing = isDouble ? t('financingDouble') : t('financingSingle');

  const singleWidths = widths.filter((w) => w.seats !== 2);
  const doubleWidths = widths.filter((w) => w.seats === 2);

  const checkout = () => {
    const url = t('checkoutUrl')
      .replace('{width}', width)
      .replace('{length}', length);
    window.location.href = url;
  };

  return (
    <div className="lg:pl-4">
      {/* Category */}
      <div className="text-xs uppercase tracking-widest text-brand-dark font-medium mb-2">
        {t('category')}
      </div>

      {/* Title */}
      <h1 className="font-display text-3xl lg:text-4xl text-ink leading-tight mb-2">
        {t('title')}
      </h1>
      <p className="text-base text-ink-soft mb-4">{t('subtitle')}</p>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-5 pb-5 border-b border-line">
        <span className="inline-flex gap-0.5 text-brand">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 1l2.7 5.5 6.1.9-4.4 4.3 1 6.1L10 14.9 4.6 17.8l1-6.1L1.2 7.4l6.1-.9L10 1z" />
            </svg>
          ))}
        </span>
        <span className="text-sm">
          <strong className="text-ink">{t('rating')}</strong>
          <span className="text-ink-muted">/{t('ratingMax')}</span>
        </span>
        <a href="#reviews" className="text-sm text-ink-muted hover:text-brand-dark underline underline-offset-2">
          {t('reviewCount')}
        </a>
      </div>

      {/* Price */}
      <div className="flex items-baseline flex-wrap gap-3 mb-1">
        <span className="font-display font-normal text-4xl lg:text-5xl text-ink">{currentPrice}</span>
        <span className="text-sm font-medium text-brand-dark bg-brand-cream rounded-full px-3 py-1">
          {isDouble ? t('groupDoubleLabel') : t('groupSingleLabel')}
        </span>
      </div>
      <p className="text-xs text-ink-muted mb-3">{t('vatNote')}</p>
      <p className="text-sm text-ink-soft mb-5 pb-5 border-b border-line flex items-center gap-2">
        <span className="inline-block px-2 py-0.5 bg-ink text-white text-[10px] font-bold rounded">
          0% rente
        </span>
        {currentFinancing}
      </p>

      {/*
        Highlights + size configurator.
        On mobile the configurator (order-1) sits directly under the price so the
        live price updates in view when a size changes; highlights drop below it.
        On desktop the original order is restored (highlights first).
      */}
      <div className="flex flex-col">
        {/* Size configurator — own card with a live price header */}
        <div className="order-1 lg:order-2 mb-6">
          {/* Width selector — dropdown grouped by 1-/2-person mattress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="width-select" className="text-sm font-medium text-ink">
                {t('widthLabel')}
                <span className="ml-2 text-ink-muted font-normal">{selectedWidth?.label}</span>
              </label>
              <a href="#maten" className="text-xs text-brand-dark underline underline-offset-2 hover:text-ink">
                {t('sizeHelp')}
              </a>
            </div>
            <div className="relative">
              <select
                id="width-select"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full appearance-none bg-white border-2 border-line rounded-xl px-4 py-3 text-sm font-medium text-ink focus:outline-none focus:border-brand transition pr-10 cursor-pointer"
              >
                <optgroup label={`${t('groupSingleLabel')} — ${t('priceSingle')}`}>
                  {singleWidths.map((w) => (
                    <option key={w.value} value={w.value}>{w.label}</option>
                  ))}
                </optgroup>
                <optgroup label={`${t('groupDoubleLabel')} — ${t('priceDouble')}`}>
                  {doubleWidths.map((w) => (
                    <option key={w.value} value={w.value}>{w.label}</option>
                  ))}
                </optgroup>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </div>
          </div>

          {/* Length selector — dropdown */}
          <div>
            <label htmlFor="length-select" className="text-sm font-medium text-ink block mb-2">
              {t('lengthLabel')}
              <span className="ml-2 text-ink-muted font-normal">
                {lengths.find((l) => l.value === length)?.label}
              </span>
            </label>
            <div className="relative">
              <select
                id="length-select"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full appearance-none bg-white border-2 border-line rounded-xl px-4 py-3 text-sm font-medium text-ink focus:outline-none focus:border-brand transition pr-10 cursor-pointer"
              >
                {lengths.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Free gift with purchase — just above the highlights */}
        <div className="order-2 lg:order-1 mb-5 rounded-2xl bg-good/5 border border-good/25 p-4">
          <div className="flex items-start gap-3 mb-3">
            <svg className="w-6 h-6 shrink-0 text-good" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
            </svg>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-good leading-snug">{t('gift.badge')}</p>
              <p className="text-sm text-good leading-snug">
                <strong className="font-semibold">{t('gift.stockCount')}</strong> {t('gift.stockText')}
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-white border border-line p-4 flex flex-col sm:flex-row gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={giftImg}
              alt={t('gift.alt')}
              onError={() => setGiftImgError(true)}
              className="shrink-0 w-full sm:w-24 h-40 sm:h-24 rounded-lg object-cover bg-soft"
            />
            <div className="min-w-0">
              <div className="font-display font-semibold text-base text-ink mb-1">{t('gift.name')}</div>
              <p className="text-sm text-ink-soft leading-snug mb-2">{t('gift.description')}</p>
              <p className="text-xs text-ink-muted leading-snug">{t('gift.note')}</p>
            </div>
          </div>
        </div>

        {/* Highlights — 2-col USP grid with dark circular badges */}
        <ul className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-5 gap-y-3 mb-6">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] text-ink font-medium leading-snug">
              <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-ink text-white inline-flex items-center justify-center">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTAs */}
      <div className="space-y-3 mb-6">
        <button
          onClick={checkout}
          className="w-full bg-brand hover:bg-brand-dark text-white font-medium px-6 py-4 rounded-lg transition shadow-md flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.5 3M7 13h10l3-7H5.5M7 13l-1.5-7M7 13l-2 7m4-7v7m4-7v7m4-7v7" />
          </svg>
          {t('addToCart')} — {currentPrice}
        </button>
        {/* Savings calculator accent CTA */}
        <div className="flex justify-center pt-1">
          <CalcButton variant="inline" />
        </div>
      </div>

      {/* Stock */}
      <div className="mb-6 p-4 bg-good/5 border border-good/20 rounded-lg">
        <div className="flex items-center gap-2 text-sm font-medium text-good mb-1">
          <span className="inline-block w-2 h-2 bg-good rounded-full animate-pulse-slow" />
          {t('stockTitle')}
        </div>
        <p className="text-xs text-ink-soft">{t('stockText')}</p>
      </div>

      {/* Payment methods */}
      <div className="mb-7 text-center">
        <p className="text-sm text-ink-muted mb-3">{t('payments.title')}</p>
        <div className="flex flex-wrap justify-center items-center gap-2">
          {paymentMethods.map((m) => {
            const pm = PAYMENT_LABELS[m];
            if (!pm) return null;
            return (
              <span
                key={m}
                className={`inline-flex items-center justify-center min-w-[48px] h-7 px-2 rounded-md border border-line text-[11px] font-bold tracking-tight ${pm.bg} ${pm.fg}`}
              >
                {pm.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Vet review */}
      <div className="mb-7 p-5 border border-line rounded-xl bg-white">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-14 h-14 rounded-full bg-brand-cream border border-line flex items-center justify-center text-brand-dark">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 3a9 9 0 100 18 9 9 0 000-18z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-medium text-ink text-sm">{t('vetReview.name')}</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-dark bg-brand-cream px-2 py-0.5 rounded-full">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 1l2 2 3-1 1 3 3 1-1 3 1 3-3 1-1 3-3-1-2 2-2-2-3 1-1-3-3-1 1-3-1-3 3-1 1-3 3 1 2-2z"
                    clipRule="evenodd"
                  />
                </svg>
                {t('vetReview.verifiedLabel')}
              </span>
            </div>
            <p className="text-xs text-ink-muted mb-2">{t('vetReview.credential')}</p>
            <div className="flex gap-0.5 text-ink mb-2">
              {[...Array(vetRating)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 1l2.7 5.5 6.1.9-4.4 4.3 1 6.1L10 14.9 4.6 17.8l1-6.1L1.2 7.4l6.1-.9L10 1z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-ink-soft leading-relaxed">"{t('vetReview.quote')}"</p>
          </div>
        </div>
      </div>

      {/* Money-back guarantee */}
      <div className="mb-7 rounded-2xl bg-[#4b4f54] text-white p-6">
        <div className="flex items-start gap-3 mb-3">
          <svg className="w-7 h-7 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          </svg>
          <h3 className="font-display text-xl">{t('guarantee.title')}</h3>
        </div>
        <p className="text-sm text-white/85 leading-relaxed mb-3">{t('guarantee.text')}</p>
        <div className="flex items-center gap-2 text-xs text-white/70 pt-3 border-t border-white/15">
          <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z" />
          </svg>
          {t('guarantee.footnote')}
        </div>
      </div>

      {/* USPs */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-line">
        {usps.map((u, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-ink-soft">
            <span className="text-brand-dark">{USP_ICONS[u.icon] ?? null}</span>
            {u.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
