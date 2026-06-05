import { useTranslations } from 'next-intl';

type Item = { icon: string; label: string };

const ICONS: Record<string, JSX.Element> = {
  truck: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  ),
  return: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l-4-4 4-4M5 10h11a4 4 0 014 4v2" />
    </svg>
  ),
  shield: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z" />
    </svg>
  ),
  star: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 1l2.7 5.5 6.1.9-4.4 4.3 1 6.1L10 14.9 4.6 17.8l1-6.1L1.2 7.4l6.1-.9L10 1z" />
    </svg>
  ),
};

export default function TrustBar() {
  const t = useTranslations('trustBar');
  const items = t.raw('items') as Item[];

  return (
    <div className="bg-[#4b4f54] text-white text-xs">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-2 flex flex-wrap items-center justify-center gap-x-8 gap-y-1">
        {items.map((it, i) => (
          <span key={i} className="inline-flex items-center gap-2">
            {ICONS[it.icon] ?? null}
            <span>{it.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
