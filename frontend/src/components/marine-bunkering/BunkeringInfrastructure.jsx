import { Waypoints } from 'lucide-react';

const BunkeringInfrastructure = () => (
  <section
    className="mb-section mb-infra"
    id="colombo-infrastructure"
    aria-labelledby="mb-infra-title"
  >
    <div className="container mb-infra-grid">
      <figure className="mb-infra-figure">
        <img
          src="/images/bunkering/marine-terminal.webp"
          alt="Marine fuel terminal with storage tanks and jetty infrastructure"
          loading="lazy"
          decoding="async"
        />
        <figcaption className="mb-badge">
          <Waypoints size={16} aria-hidden="true" />
          Infrastructure Development &bull; 2025
        </figcaption>
      </figure>
      <div className="mb-infra-copy">
        <p className="mb-eyebrow">Colombo bunkering infrastructure</p>
        <h2 id="mb-infra-title">Supporting Bunkering Operations at Colombo Port</h2>
        <p>
          The Port of Colombo is a major centre of Sri Lanka&apos;s commercial
          maritime activity and plays an important role in the country&apos;s
          bunkering sector.
        </p>
        <p>
          In 2025, additional pipeline and loading infrastructure at Colombo
          Port&apos;s South Jetty was brought into use to support bunker fuel
          handling and supply operations.
        </p>
        <p>
          The additional infrastructure improves operational flexibility and
          complements existing marine fuel handling capabilities within the
          port.
        </p>
      </div>
    </div>
  </section>
);

export default BunkeringInfrastructure;
