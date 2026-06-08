'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslations } from 'next-intl';

type WidthOption = { value: string; label: string; seats?: number };

type SizeCtx = {
  width: string;
  length: string;
  setWidth: (w: string) => void;
  setLength: (l: string) => void;
  stockCount: number;
  isDouble: boolean;
  price: string;
  financing: string;
  checkoutUrl: string;
};

const SizeContext = createContext<SizeCtx>({
  width: '90',
  length: '200',
  setWidth: () => {},
  setLength: () => {},
  stockCount: 8,
  isDouble: false,
  price: '',
  financing: '',
  checkoutUrl: '#buy',
});

export function SizeProvider({ children }: { children: ReactNode }) {
  const t = useTranslations('buyBox');
  const widths = t.raw('widths') as WidthOption[];

  const [width, setWidth] = useState('90');
  const [length, setLength] = useState('200');
  const [stockCount, setStockCount] = useState(8);

  useEffect(() => {
    // 0s→8, 10s→7, 40s→6, 120s→5, 300s→4
    const timers = [
      setTimeout(() => setStockCount(7), 10_000),
      setTimeout(() => setStockCount(6), 40_000),
      setTimeout(() => setStockCount(5), 120_000),
      setTimeout(() => setStockCount(4), 300_000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const isDouble = widths.find((w) => w.value === width)?.seats === 2;
  const price = isDouble ? t('priceDouble') : t('priceSingle');
  const financing = isDouble ? t('financingDouble') : t('financingSingle');
  const checkoutUrl = (t.raw('checkoutUrl') as string)
    .replace('{width}', width)
    .replace('{length}', length);

  return (
    <SizeContext.Provider
      value={{ width, length, setWidth, setLength, stockCount, isDouble, price, financing, checkoutUrl }}
    >
      {children}
    </SizeContext.Provider>
  );
}

export const useSizeContext = () => useContext(SizeContext);
