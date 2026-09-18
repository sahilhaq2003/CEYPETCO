import { useEffect } from 'react';
import './marine-bunkering.css';
import BunkeringHero from './BunkeringHero';
import BunkeringIntro from './BunkeringIntro';
import WhatIsMarineBunkering from './WhatIsMarineBunkering';
import MarineFuelCards from './MarineFuelCards';
import WhySriLanka from './WhySriLanka';
import BunkeringInfrastructure from './BunkeringInfrastructure';
import BunkeringProcess from './BunkeringProcess';
import QualityControl from './QualityControl';
import SafetySection from './SafetySection';
import ComplianceSection from './ComplianceSection';
import BunkeringStats from './BunkeringStats';
import BunkeringTimeline from './BunkeringTimeline';
import BunkeringFAQ from './BunkeringFAQ';

const PAGE_TITLE = 'Marine Bunkering Services Sri Lanka | CEYPETCO';
const PAGE_DESCRIPTION =
  "Learn about Ceylon Petroleum Corporation's marine bunkering operations, marine fuel supply, infrastructure, quality control and bunker services in Sri Lanka.";

const MarineBunkeringPage = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    let meta = document.head.querySelector('meta[name="description"]');
    const createdMeta = !meta;
    const previousDescription = meta ? meta.getAttribute('content') : '';
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', PAGE_DESCRIPTION);

    return () => {
      document.title = previousTitle;
      if (createdMeta) {
        meta.remove();
      } else {
        meta.setAttribute('content', previousDescription || '');
      }
    };
  }, []);

  return (
    <main className="inner-page mb-page" id="main-content">
      <BunkeringHero />
      <BunkeringIntro />
      <WhatIsMarineBunkering />
      <MarineFuelCards />
      <WhySriLanka />
      <BunkeringInfrastructure />
      <BunkeringProcess />
      <QualityControl />
      <SafetySection />
      <ComplianceSection />
      <BunkeringStats />
      <BunkeringTimeline />
      <BunkeringFAQ />
    </main>
  );
};

export default MarineBunkeringPage;
