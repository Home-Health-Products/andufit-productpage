import { setRequestLocale } from 'next-intl/server';
import TrustBar from '@/components/TrustBar';
import Nav from '@/components/Nav';
import Breadcrumb from '@/components/Breadcrumb';
import ProductGallery from '@/components/ProductGallery';
import BuyBox from '@/components/BuyBox';
import ProductOverview from '@/components/ProductOverview';
import ProductTabs from '@/components/ProductTabs';
import TabInstallation from '@/components/TabInstallation';
import TabGuarantee from '@/components/TabGuarantee';
import Specs from '@/components/Specs';
import Faq from '@/components/Faq';
import MattressPenetrationCard from '@/components/MattressPenetrationCard';
import Circulation from '@/components/Circulation';
import Outcomes from '@/components/Outcomes';
import ProgressFunnel from '@/components/ProgressFunnel';
import VitaCheckSection from '@/components/VitaCheckSection';
import Study from '@/components/Study';
import SocialReviews from '@/components/SocialReviews';
import InAction from '@/components/InAction';
import FitsBed from '@/components/FitsBed';
import HoursMeter from '@/components/HoursMeter';
import Footer from '@/components/Footer';
import StickyCta from '@/components/StickyCta';
import RevealClient from '@/components/RevealClient';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="bg-white">
      <RevealClient />
      <TrustBar />
      <Nav />
      <Breadcrumb />

      {/* Product detail — gallery + buy box */}
      <section id="buy" className="scroll-mt-24 py-6 lg:py-10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 lg:items-start">
          <div className="lg:sticky lg:top-24 min-w-0">
            <ProductGallery />
            <MattressPenetrationCard />
          </div>
          <div className="min-w-0">
            <BuyBox />
          </div>
        </div>
      </section>

      {/* Circulation comparison — before / after slider */}
      <Circulation />

      {/* Measurable results per audience — AI VitaCheck before/after gauges */}
      <Outcomes />

      {/* Personalized progress funnel — projected progress per goal over 14d / 3m / 6m */}
      <ProgressFunnel />

      {/* AI VitaCheck — personalised programme section */}
      <VitaCheckSection />

      {/* Peer-reviewed andullation study — clinical proof */}
      <Study />

      {/* Social proof — filterable reviews by source + before/after measurements */}
      <SocialReviews />

      {/* Product in action — looping autoplay videos (GIF-style) */}
      <InAction />

      {/* Product system overview — all ANDUFIT features showcased */}
      <ProductOverview />

      {/* Fits on every bed base — ANDUFIT works under any mattress/foundation */}
      <FitsBed />

      {/* Live hours counter + globe — worldwide ANDUFIT activations */}
      <HoursMeter />

      {/* Product info tabs — moved to bottom */}
      <ProductTabs>
        {{
          installation: <TabInstallation />,
          specs: <Specs />,
          warranty: <TabGuarantee />,
          faq: <Faq />,
        }}
      </ProductTabs>

      <Footer />
      <StickyCta />
    </main>
  );
}
