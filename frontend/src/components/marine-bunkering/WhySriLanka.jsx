import { WHY_SRI_LANKA } from './bunkeringContent';

const WhySriLanka = () => (
  <section
    className="mb-section mb-why"
    id="why-sri-lanka"
    aria-labelledby="mb-why-title"
  >
    <div className="container">
      <div className="mb-section-heading">
        <p className="mb-eyebrow">Location advantage</p>
        <h2 id="mb-why-title">A Strategic Location for Marine Bunkering</h2>
        <p className="mb-lead">
          Sri Lanka&apos;s position on major shipping lanes and its maritime
          infrastructure provide a strong foundation for bunkering services.
        </p>
      </div>
      <div className="mb-why-grid">
        {WHY_SRI_LANKA.map(({ title, text, icon: Icon }, index) => (
          <article className="mb-why-card" key={title}>
            <span className="mb-why-index" aria-hidden="true">
              0{index + 1}
            </span>
            <span className="mb-card-icon">
              <Icon size={24} aria-hidden="true" />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default WhySriLanka;
