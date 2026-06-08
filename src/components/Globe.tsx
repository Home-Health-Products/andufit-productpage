'use client';

import { useEffect, useRef, useState } from 'react';
import createGlobe, { COBEOptions, Marker } from 'cobe';
import { useTranslations } from 'next-intl';

// ANDUFIT markets , [latitude, longitude]. Lights flicker on at these cities.
const CITIES: [number, number][] = [
  [50.85, 4.35], // Brussels
  [51.05, 3.72], // Ghent
  [51.22, 4.4], // Antwerp
  [52.37, 4.9], // Amsterdam
  [49.61, 6.13], // Luxembourg
  [48.85, 2.35], // Paris
  [52.52, 13.4], // Berlin
  [48.14, 11.58], // Munich
  [53.55, 9.99], // Hamburg
  [50.94, 6.96], // Cologne
  [40.42, -3.7], // Madrid
  [41.39, 2.17], // Barcelona
  [41.9, 12.5], // Rome
  [45.46, 9.19], // Milan
  [51.51, -0.13], // London
  [53.48, -2.24], // Manchester
  [59.33, 18.07], // Stockholm
  [55.68, 12.57], // Copenhagen
  [50.07, 14.43], // Prague
  [47.5, 19.05], // Budapest
  [52.23, 21.01], // Warsaw
  [46.95, 7.45], // Bern
  [48.21, 16.37], // Vienna
  [38.72, -9.14], // Lisbon
  [40.71, -74.0], // New York
  [43.65, -79.38], // Toronto
  [34.05, -118.24], // Los Angeles
  [-33.87, 151.21], // Sydney
  [35.68, 139.69], // Tokyo
];

type Activation = { location: [number, number]; born: number; life: number };

export default function Globe() {
  const t = useTranslations('globe');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let activations: Activation[] = [];
    let lastSpawn = 0;
    let phi = 0;
    let raf = 0;
    let globe: { update: (s: Partial<COBEOptions>) => void; destroy: () => void } | null = null;
    let width = 0;

    const SPAWN_EVERY = reduce ? 900 : 460;
    const MAX_ACTIVE = 14;
    const SPEED = reduce ? 0.001 : 0.003;

    const buildMarkers = (now: number): Marker[] =>
      activations.map((a) => {
        const k = (now - a.born) / a.life; // 0..1
        const env = Math.sin(Math.min(1, Math.max(0, k)) * Math.PI); // ease in → out
        return { location: a.location, size: 0.02 + env * 0.08 };
      });

    const create = () => {
      width = canvas.offsetWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const opts: COBEOptions = {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: width * dpr,
        phi: 0,
        theta: 0.28,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.13, 0.55, 0.52], // teal land dots
        markerColor: [0.8, 1.0, 0.95], // bright activation light
        glowColor: [0.1, 0.42, 0.4],
        markers: [],
      };
      globe = createGlobe(canvas, opts);
    };

    const loop = () => {
      const now = performance.now();
      if (now - lastSpawn > SPAWN_EVERY && activations.length < MAX_ACTIVE) {
        activations.push({
          location: CITIES[(Math.random() * CITIES.length) | 0],
          born: now,
          life: 2200 + Math.random() * 1100,
        });
        lastSpawn = now;
      }
      activations = activations.filter((a) => now - a.born < a.life);

      phi += SPEED;
      globe?.update({ phi, markers: buildMarkers(now) });
      setActiveCount((c) => (c === activations.length ? c : activations.length));

      raf = requestAnimationFrame(loop);
    };

    create();
    raf = requestAnimationFrame(loop);

    // Recreate on significant width change (cobe sizes at creation time)
    const ro = new ResizeObserver(() => {
      if (Math.abs(canvas.offsetWidth - width) > 2) {
        globe?.destroy();
        create();
      }
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      globe?.destroy();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[460px] mx-auto">
      <div className="relative aspect-square">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          role="img"
          aria-label={t('canvasAria')}
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-brand-dark/30 blur-3xl rounded-full pointer-events-none" />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur rounded-full px-4 py-2">
        <span className="relative inline-flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-brand-light animate-ping opacity-70" />
          <span className="relative inline-block w-2 h-2 rounded-full bg-brand-light" />
        </span>
        <span className="text-sm text-white tabular-nums font-medium">{activeCount}</span>
        <span className="text-xs text-white/70">{t('activeLabel')}</span>
      </div>
    </div>
  );
}
