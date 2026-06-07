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
    const interval = setInterval(() => {
      setStockCount((prev) => {
        if (prev <= 4) {
          clearInterval(interval);
          return 4;
        }
        return prev - 1;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SizeContext.Provider value={{ width, length, setWidth, setLength, stockCount }}>
      {children}
    </SizeContext.Provider>
  );
}

export const useSizeContext = () => useContext(SizeContext);
