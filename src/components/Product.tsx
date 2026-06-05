import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Feature = { image: string; alt: string; title: string; text: string };

export default function Product() {
  const t = useTranslations('product');
  const features = t.raw('features') as Feature[];

  return (
    <section id={t('id')} className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mb-14 reveal">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-dark font-medium mb-3">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-ink mb-5">{t('title')}</h2>
          <p className="text-lg text-ink-soft">{t('lead')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="reveal bg-soft border border-line rounded-2xl overflow-hidden hover:border-brand hover:shadow-md transition group"
            >
              <div className="relative aspect-[4/3] bg-brand-cream overflow-hidden">
                <Image
                  src={f.image}
                  alt={f.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-medium text-ink mb-2">{f.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
