'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type SizeCtx = {
  width: string;
  length: string;
  setWidth: (w: string) => void;
  setLength: (l: string) => void;
  stockCount: number;
};

const SizeContext = createContext<SizeCtx>({
  width: '90',
  length: '200',
  setWidth: () => {},
  setLength: () => {},
  stockCount: 8,
});

export function SizeProvider({ children }: { children: ReactNode }) {
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

  return (
    <SizeContext.Provider value={{ width, length, setWidth, setLength, stockCount }}>
      {children}
    </SizeContext.Provider>
  );
}

export const useSizeContext = () => useContext(SizeContext);
