import { Info } from 'lucide-react';
import { COMPLIANCE_BADGES } from './bunkeringContent';

const ComplianceSection = () => (
  <section
    className="mb-section mb-compliance"
    id="compliance"
    aria-labelledby="mb-compliance-title"
  >
    <div className="container mb-compliance-grid">
      <div className="mb-compliance-copy">
        <p className="mb-eyebrow">Responsibility</p>
        <h2 id="mb-compliance-title">Responsible Marine Fuel Operations</h2>
        <p>
          Marine bunkering operates within relevant maritime, petroleum, safety
          and environmental requirements.
        </p>
        <p className="mb-disclaimer">
          <Info size={17} aria-hidden="true" />
          MARPOL Annex VI addresses the prevention of air pollution from ships
          and includes requirements related to marine fuel sulphur content.
        </p>
      </div>
      <ul className="mb-compliance-badges">
        {COMPLIANCE_BADGES.map(({ title, icon: Icon }) => (
          <li key={title}>
            <Icon size={20} aria-hidden="true" />
            {title}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ComplianceSection;
