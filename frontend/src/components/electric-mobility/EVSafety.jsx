import { SAFETY_CARDS } from './electricMobilityContent';

const EVSafety = () => (
  <section
    className="em-section em-safety"
    id="safety-standards"
    aria-labelledby="em-safety-title"
  >
    <div className="container">
      <div className="em-section-heading">
        <p className="em-eyebrow">Safety &amp; technical standards</p>
        <h2 id="em-safety-title">Charging with Safety at the Centre</h2>
        <p className="em-lead">
          Charging infrastructure development places emphasis on electrical
          safety, appropriate grid integration, testing and ongoing performance
          monitoring.
        </p>
      </div>
      <div className="em-safety-grid">
        {SAFETY_CARDS.map(({ title, text, icon: Icon }) => (
          <article className="em-safety-card" key={title}>
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

export default EVSafety;
