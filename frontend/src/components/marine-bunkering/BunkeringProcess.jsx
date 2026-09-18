import { BUNKERING_STEPS } from './bunkeringContent';

const BunkeringProcess = () => (
  <section
    className="mb-section mb-process"
    id="bunkering-process"
    aria-labelledby="mb-process-title"
  >
    <div className="container">
      <div className="mb-section-heading">
        <p className="mb-eyebrow">From request to delivery</p>
        <h2 id="mb-process-title">A clear process for every fuel delivery</h2>
        <p className="mb-lead">
          Each supply request moves through planning, checks, transfer and
          documentation with the vessel and port teams aligned at every stage.
        </p>
      </div>
      <ol className="mb-process-track">
        {BUNKERING_STEPS.map(({ step, title, text, icon: Icon }) => (
          <li className="mb-process-step" key={step}>
            <span className="mb-process-node" aria-hidden="true">
              <Icon size={22} />
            </span>
            <span className="mb-step-number">{step}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default BunkeringProcess;
