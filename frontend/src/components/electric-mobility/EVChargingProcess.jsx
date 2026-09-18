import { CHARGING_STEPS } from './electricMobilityContent';

const EVChargingProcess = () => (
  <section
    className="em-section em-process"
    id="how-charging-works"
    aria-labelledby="em-process-title"
  >
    <div className="container">
      <div className="em-section-heading">
        <p className="em-eyebrow">How EV charging works</p>
        <h2 id="em-process-title">How EV Charging Works</h2>
        <p className="em-lead">
          While equipment and station procedures may differ, most electric
          vehicle charging sessions follow a similar sequence of steps.
        </p>
      </div>
      <ol className="em-process-list">
        {CHARGING_STEPS.map(({ step, title, text, icon: Icon }) => (
          <li className="em-process-step" key={step}>
            <span className="em-step-number" aria-hidden="true">
              {step}
            </span>
            <span className="em-step-icon" aria-hidden="true">
              <Icon size={22} />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default EVChargingProcess;
