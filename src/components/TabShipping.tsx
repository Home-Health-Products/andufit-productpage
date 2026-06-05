import { useTranslations } from 'next-intl';

type Block = { title: string; items: string[] };

export default function TabShipping() {
  const t = useTranslations('tabs.shipping');
  const blocks = t.raw('blocks') as Block[];

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
      {blocks.map((b, i) => (
        <div key={i} className="bg-soft rounded-xl p-6 border border-line">
          <h3 className="font-medium text-ink mb-3">{b.title}</h3>
          <ul className="space-y-2">
            {b.items.map((it, k) => (
              <li key={k} className="flex items-start gap-2 text-sm text-ink-soft">
                <svg className="shrink-0 w-4 h-4 mt-0.5 text-good" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {it}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
