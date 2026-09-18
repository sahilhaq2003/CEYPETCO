import { MapPin } from 'lucide-react';

const EVCTA = () => (
  <section className="em-cta" aria-labelledby="em-cta-title">
    <div className="container em-cta-inner">
      <div className="em-cta-copy">
        <p className="em-eyebrow em-eyebrow--light">Drive the energy transition</p>
        <h2 id="em-cta-title">Powering the Road Ahead</h2>
        <p>
          CEYPETCO is developing new energy infrastructure to support Sri
          Lanka&apos;s changing mobility needs. Explore reported locations and
          confirm current station details before you travel.
        </p>
      </div>
      <div className="em-cta-actions">
        <a className="em-btn em-btn--primary" href="#ev-locations">
          <MapPin size={16} aria-hidden="true" />
          Explore Charging Locations
        </a>
      </div>
    </div>
  </section>
);

export default EVCTA;
