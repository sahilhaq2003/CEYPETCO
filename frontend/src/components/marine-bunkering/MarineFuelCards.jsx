import { Info } from 'lucide-react';
import { MARINE_FUELS } from './bunkeringContent';

const MarineFuelCards = () => (
  <section
    className="mb-section mb-fuels"
    id="marine-fuels"
    aria-labelledby="mb-fuels-title"
  >
    <div className="container">
      <div className="mb-section-heading">
        <p className="mb-eyebrow">Fuel products</p>
        <h2 id="mb-fuels-title">Marine fuels supplied</h2>
        <p className="mb-lead">
          CPC has reported supplying marine diesel and marine fuel oil through
          its bunkering activities. Confirm the available grade and specification
          for each delivery.
        </p>
      </div>
      <div className="mb-fuel-grid">
        {MARINE_FUELS.map(({ title, text, icon: Icon }) => (
          <article className="mb-fuel-card" key={title}>
            <span className="mb-fuel-icon">
              <Icon size={30} aria-hidden="true" />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <p className="mb-disclaimer">
        <Info size={17} aria-hidden="true" />
        Product specifications and current availability should be confirmed for
        individual bunker requirements.
      </p>
    </div>
  </section>
);

export default MarineFuelCards;
