import { ShieldCheck } from 'lucide-react';
import { SAFETY_ITEMS } from './bunkeringContent';

const SafetySection = () => (
  <section
    className="mb-section mb-safety"
    id="safety"
    aria-labelledby="mb-safety-title"
  >
    <div className="container">
      <div className="mb-safety-heading">
        <div>
          <p className="mb-eyebrow mb-eyebrow--light">Safety first</p>
          <h2 id="mb-safety-title">Safety at Every Stage</h2>
        </div>
        <p>
          Safety is an essential part of marine fuel handling. Bunkering
          operations require careful planning, communication, equipment
          inspection and continuous monitoring throughout the fuel-transfer
          process.
        </p>
      </div>
      <ul className="mb-safety-grid">
        {SAFETY_ITEMS.map(({ title, icon: Icon }) => (
          <li className="mb-safety-item" key={title}>
            <span aria-hidden="true">
              <Icon size={22} />
            </span>
            {title}
          </li>
        ))}
      </ul>
      <p className="mb-safety-note">
        <ShieldCheck size={18} aria-hidden="true" />
        Operational readiness includes pipelines, transfer hoses, loading
        systems, storage facilities, measurement systems and bunker delivery
        equipment.
      </p>
    </div>
  </section>
);

export default SafetySection;
