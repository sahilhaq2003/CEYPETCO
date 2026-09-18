import { SITE_DEVELOPMENT_STEPS } from './electricMobilityContent';

const EVSiteDevelopment = () => (
  <section
    className="em-section em-development"
    id="site-development"
    aria-labelledby="em-development-title"
  >
    <div className="container">
      <div className="em-section-heading">
        <p className="em-eyebrow">Site development process</p>
        <h2 id="em-development-title">Developing the Right Charging Locations</h2>
        <p className="em-lead">
          Developing EV charging infrastructure involves a structured process
          covering site assessment, technical design, installation, testing and
          ongoing monitoring.
        </p>
      </div>
      <ol className="em-development-list">
        {SITE_DEVELOPMENT_STEPS.map(({ title, icon: Icon }, index) => (
          <li className="em-development-step" key={title}>
            <span className="em-development-icon" aria-hidden="true">
              <Icon size={20} />
            </span>
            <span className="em-development-index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3>{title}</h3>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default EVSiteDevelopment;
