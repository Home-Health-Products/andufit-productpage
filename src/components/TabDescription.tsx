import { useTranslations } from 'next-intl';

type Section = { title: string; text: string };

export default function TabDescription() {
  const t = useTranslations('tabs.description');
  const sections = t.raw('sections') as Section[];

  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-lg text-ink-soft mb-8 leading-relaxed">{t('lead')}</p>
      <div className="grid md:grid-cols-3 gap-6">
        {sections.map((s, i) => (
          <div key={i} className="bg-soft rounded-xl p-6 border border-line">
            <h3 className="font-medium text-ink mb-2">{s.title}</h3>
            <p className="text-sm text-ink-soft leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
