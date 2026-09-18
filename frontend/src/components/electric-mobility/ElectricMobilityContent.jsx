import { useEffect } from 'react';
import './electric-mobility.css';
import EVAbout from './EVAbout';
import EVInitiative from './EVInitiative';
import EVLocations from './EVLocations';
import EVNotice from './EVNotice';
import EVTechnology from './EVTechnology';
import EVChargingProcess from './EVChargingProcess';
import EVSiteDevelopment from './EVSiteDevelopment';
import EVSafety from './EVSafety';
import EVBenefits from './EVBenefits';
import EVSustainability from './EVSustainability';
import EVFAQ from './EVFAQ';

const META_DESCRIPTION =
  'Explore CEYPETCO EV charging and electric mobility in Sri Lanka. Learn about reported charging locations, AC and DC charging, and safety.';

const ElectricMobilityContent = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta ? meta.getAttribute('content') : null;

    document.title = 'CEYPETCO EV Charging | Electric Mobility';
    if (meta) meta.setAttribute('content', META_DESCRIPTION);

    return () => {
      document.title = previousTitle;
      if (meta && previousDescription !== null) {
        meta.setAttribute('content', previousDescription);
      }
    };
  }, []);

  return (
    <div className="em-page">
      <EVAbout />
      <EVInitiative />
      <EVLocations />
      <EVNotice />
      <EVTechnology />
      <EVChargingProcess />
      <EVSiteDevelopment />
      <EVSafety />
      <EVBenefits />
      <EVSustainability />
      <EVFAQ />
    </div>
  );
};

export default ElectricMobilityContent;
