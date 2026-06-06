'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type SizeCtx = {
  width: string;
  length: string;
  setWidth: (w: string) => void;
  setLength: (l: string) => void;
};

const SizeContext = createContext<SizeCtx>({
  width: '90',
  length: '200',
  setWidth: () => {},
  setLength: () => {},
});

export function SizeProvider({ children }: { children: ReactNode }) {
  const [width, setWidth] = useState('90');
  const [length, setLength] = useState('200');

  return (
    <SizeContext.Provider value={{ width, length, setWidth, setLength }}>
      {children}
    </SizeContext.Provider>
  );
}

export const useSizeContext = () => useContext(SizeContext);
