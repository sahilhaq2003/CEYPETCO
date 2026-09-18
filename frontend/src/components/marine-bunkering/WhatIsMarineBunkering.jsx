import { VESSEL_TYPES } from './bunkeringContent';

const WhatIsMarineBunkering = () => (
  <section
    className="mb-section mb-what"
    id="what-is-bunkering"
    aria-labelledby="mb-what-title"
  >
    <div className="container">
      <div className="mb-section-heading">
        <p className="mb-eyebrow">Understanding bunkering</p>
        <h2 id="mb-what-title">What is Marine Bunkering?</h2>
        <p className="mb-lead">
          Marine bunkering is the process of supplying fuel to ships and other
          marine vessels for propulsion, auxiliary machinery and onboard energy
          requirements.
        </p>
      </div>
      <div className="mb-vessel-grid">
        {VESSEL_TYPES.map(({ title, text, icon: Icon }) => (
          <article className="mb-vessel-card" key={title}>
            <span className="mb-card-icon">
              <Icon size={26} aria-hidden="true" />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <p className="mb-note">
        Marine bunkering involves specialized storage, transfer equipment, fuel
        measurement, operational coordination, safety procedures and
        documentation.
      </p>
    </div>
  </section>
);

export default WhatIsMarineBunkering;
