import { useTranslations } from 'next-intl';

type Row = { label: string; value?: string; check?: boolean };

function ModuleSilhouette() {
  return (
    <svg viewBox="0 0 110 250" className="w-20 lg:w-24 h-auto" aria-hidden>
      <rect x="2" y="2" width="106" height="246" rx="18" fill="#2b3034" />
      {/* massage zones */}
      <g fill="#eef6f5" stroke="#3db7b0" strokeWidth="2">
        <circle cx="55" cy="50" r="22" />
        <rect x="31" y="83" width="48" height="24" rx="12" />
        <rect x="40" y="121" width="30" height="18" rx="9" />
        <rect x="30" y="157" width="50" height="26" rx="13" />
        <rect x="33" y="196" width="44" height="22" rx="11" />
      </g>
      {/* controller */}
      <rect x="46" y="228" width="18" height="8" rx="4" fill="#566066" />
    </svg>
  );
}

export default function Specs() {
  const t = useTranslations('specs');
  const rows = t.raw('rows') as Row[];

  return (
    <div id={t('id')} className="scroll-mt-24 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 lg:items-center">
        {/* Visual with dimension callouts */}
        <div className="flex justify-center">
          <div className="flex items-stretch gap-3">
            {/* height bracket */}
            <div className="flex flex-col items-center justify-center pr-1">
              <span className="block w-px flex-1 bg-line" />
              <span
                className="my-2 text-[11px] text-ink-muted whitespace-nowrap tabular-nums"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                {t('dimHeight')}
              </span>
              <span className="block w-px flex-1 bg-line" />
            </div>

            <div>
              <div className="flex gap-4">
                <ModuleSilhouette />
                <ModuleSilhouette />
              </div>
              {/* width brackets */}
              <div className="flex gap-4 mt-2">
                {[0, 1].map((i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <span className="block w-full border-t border-line" />
                    <span className="mt-1.5 text-[11px] text-ink-muted whitespace-nowrap tabular-nums">
                      {t('dimWidth')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Spec table */}
        <div className="rounded-2xl border border-line overflow-hidden shadow-sm">
          <table className="w-full">
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className={`border-b border-line last:border-0 ${i % 2 ? 'bg-soft/60' : 'bg-white'}`}>
                  <th className="text-right align-top text-sm font-semibold text-ink px-3 py-2.5 sm:px-5 sm:py-3.5 w-[42%]">
                    {r.label}
                  </th>
                  <td className="text-sm text-ink-soft px-3 py-2.5 sm:px-5 sm:py-3.5">
                    {r.check ? (
                      <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="9" className="text-line" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.2l2.3 2.3 4.7-5" />
                      </svg>
                    ) : (
                      r.value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
