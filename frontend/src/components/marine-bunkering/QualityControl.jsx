import { Info } from 'lucide-react';
import { QUALITY_CARDS } from './bunkeringContent';

const QualityControl = () => (
  <section
    className="mb-section mb-quality"
    id="quality-control"
    aria-labelledby="mb-quality-title"
  >
    <div className="container">
      <div className="mb-section-heading">
        <p className="mb-eyebrow">Quality focus</p>
        <h2 id="mb-quality-title">Quality-Focused Marine Fuel Handling</h2>
        <p className="mb-lead">
          Marine fuel operations require controlled handling and monitoring of
          important fuel characteristics. CEYPETCO&apos;s bunkering operations
          include attention to relevant fuel-quality parameters and operational
          specifications.
        </p>
      </div>
      <div className="mb-quality-grid">
        {QUALITY_CARDS.map(({ title, text, icon: Icon }) => (
          <article className="mb-quality-card" key={title}>
            <span className="mb-card-icon">
              <Icon size={26} aria-hidden="true" />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <p className="mb-disclaimer">
        <Info size={17} aria-hidden="true" />
        Applicable product specifications should be confirmed for each bunker
        requirement.
      </p>
    </div>
  </section>
);

export default QualityControl;
