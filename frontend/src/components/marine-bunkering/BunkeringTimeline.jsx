import { BUNKERING_MILESTONES } from './bunkeringContent';

const BunkeringTimeline = () => (
  <section
    className="mb-section mb-timeline"
    id="bunkering-history"
    aria-labelledby="mb-timeline-title"
  >
    <div className="container">
      <div className="mb-section-heading">
        <p className="mb-eyebrow">Our journey</p>
        <h2 id="mb-timeline-title">CEYPETCO Bunkering Milestones</h2>
      </div>
      <ol className="mb-timeline-track">
        {BUNKERING_MILESTONES.map(({ year, text }, index) => (
          <li className="mb-timeline-item" key={`${year}-${index}`}>
            <span className="mb-timeline-year">{year}</span>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default BunkeringTimeline;
