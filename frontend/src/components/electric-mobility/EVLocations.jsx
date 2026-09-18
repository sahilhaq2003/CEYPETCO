import { MapPin } from 'lucide-react';
import { EV_LOCATIONS, EV_LOCATION_FIELDS } from './electricMobilityContent';

const EVLocations = () => (
  <section className="em-section em-locations" id="ev-locations" aria-labelledby="em-locations-title">
    <div className="container">
      <div className="em-section-heading">
        <p className="em-eyebrow">Charging locations</p>
        <h2 id="em-locations-title">Explore CEYPETCO EV Charging</h2>
        <p className="em-lead">
          Reported CEYPETCO EV charging locations include selected areas across
          Sri Lanka. Customers should confirm current operational status, charger
          type, connector compatibility and pricing before travelling
          specifically to use a charging facility.
        </p>
      </div>
      <div className="em-location-grid">
        {EV_LOCATIONS.map((name) => (
          <article className="em-location-card" key={name}>
            <header className="em-location-head">
              <span className="em-card-icon" aria-hidden="true">
                <MapPin size={22} />
              </span>
              <h3>{name}</h3>
            </header>
            <dl className="em-location-fields">
              {EV_LOCATION_FIELDS.map(({ label, value }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default EVLocations;
