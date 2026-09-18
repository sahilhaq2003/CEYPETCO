import { EV_STATS } from './electricMobilityContent';

const EVInitiative = () => (
  <section
    className="em-section em-initiative"
    id="ev-charging-initiative"
    aria-labelledby="em-initiative-title"
  >
    <div className="container">
      <div className="em-section-heading">
        <p className="em-eyebrow">EV charging initiative</p>
        <h2 id="em-initiative-title">Expanding the CEYPETCO Energy Network</h2>
        <p className="em-lead">
          CEYPETCO has been developing electric vehicle charging infrastructure
          as part of its wider transition toward supporting new
          transportation-energy requirements.
        </p>
      </div>
      <div className="em-stat-grid">
        {EV_STATS.map(({ value, label, icon: Icon }) => (
          <article className="em-stat-card" key={value}>
            <span className="em-card-icon">
              <Icon size={24} aria-hidden="true" />
            </span>
            <b>{value}</b>
            <span>{label}</span>
          </article>
        ))}
      </div>
      <p className="em-note">
        Historical programme figures shown for context. These figures should not
        be interpreted as current charging tariffs or real-time station counts.
      </p>
    </div>
  </section>
);

export default EVInitiative;
