import { useTranslations } from 'next-intl';

type Row = {
  criterion: string;
  andupet: string;
  massage: string;
  med: string;
  nothing: string;
};

export default function Comparison() {
  const t = useTranslations('comparison');
  const headers = t.raw('headers') as string[];
  const rows = t.raw('rows') as Row[];

  return (
    <section id={t('id')} className="py-20 lg:py-28 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mb-12 reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-medium mb-3">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-ink mb-5">{t('title')}</h2>
          <p className="text-lg text-ink-soft">{t('lead')}</p>
        </div>

        <div className="reveal bg-white rounded-2xl border border-line overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="bg-soft">
                  {headers.map((h, i) => (
                    <th
                      key={i}
                      className={`text-left text-sm font-medium px-5 py-4 ${
                        i === 1 ? 'text-brand-dark bg-brand-light/40' : 'text-ink-muted'
                      }`}
                    >
                      {i === 1 && (
                        <span className="inline-block text-[10px] uppercase tracking-widest bg-brand-dark text-white px-2 py-0.5 rounded mr-2">
                          Best
                        </span>
                      )}
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t border-line">
                    <th className="text-left text-sm font-medium text-ink px-5 py-4 w-1/5">
                      {r.criterion}
                    </th>
                    <td className="text-sm text-brand-dark font-medium bg-brand-light/20 px-5 py-4">
                      {r.andupet}
                    </td>
                    <td className="text-sm text-ink-soft px-5 py-4">{r.massage}</td>
                    <td className="text-sm text-ink-soft px-5 py-4">{r.med}</td>
                    <td className="text-sm text-ink-muted px-5 py-4">{r.nothing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
