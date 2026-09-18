import { EV_BENEFITS } from './electricMobilityContent';

const EVBenefits = () => (
  <section
    className="em-section em-benefits"
    id="why-ceypetco-ev"
    aria-labelledby="em-benefits-title"
  >
    <div className="container">
      <div className="em-section-heading">
        <p className="em-eyebrow">Why CEYPETCO EV charging</p>
        <h2 id="em-benefits-title">From Fuel Stations to Energy Stations</h2>
        <p className="em-lead">
          CEYPETCO&apos;s established presence across Sri Lanka provides a
          foundation for the progressive development of electric vehicle
          charging infrastructure.
        </p>
      </div>
      <div className="em-benefit-grid">
        {EV_BENEFITS.map(({ title, text, icon: Icon }) => (
          <article className="em-benefit-card" key={title}>
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

export default EVBenefits;
