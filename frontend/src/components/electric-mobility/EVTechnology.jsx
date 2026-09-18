import { CHARGING_TECHNOLOGY } from './electricMobilityContent';

const EVTechnology = () => (
  <section
    className="em-section em-technology"
    id="charging-technology"
    aria-labelledby="em-technology-title"
  >
    <div className="container">
      <div className="em-section-heading">
        <p className="em-eyebrow">AC &amp; DC charging</p>
        <h2 id="em-technology-title">AC &amp; DC Charging Infrastructure</h2>
        <p className="em-lead">
          Charging equipment and vehicle compatibility can vary. The information
          below provides a general overview only and does not represent the
          specifications of any individual CEYPETCO charging station.
        </p>
      </div>
      <div className="em-tech-grid">
        {CHARGING_TECHNOLOGY.map(({ title, text, icon: Icon }) => (
          <article className="em-tech-card" key={title}>
            <span className="em-card-icon" aria-hidden="true">
              <Icon size={24} />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default EVTechnology;
