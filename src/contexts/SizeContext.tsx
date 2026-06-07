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
    const timer = setTimeout(() => {
      // random between 4 and 7 (above 3, below 8)
      const random = Math.floor(Math.random() * 4) + 4;
      setStockCount(random);
    }, 20000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SizeContext.Provider value={{ width, length, setWidth, setLength, stockCount }}>
      {children}
    </SizeContext.Provider>
  );
}

export const useSizeContext = () => useContext(SizeContext);
