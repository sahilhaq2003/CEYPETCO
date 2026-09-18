import { Leaf, Recycle, Wind } from 'lucide-react';
import { SUSTAINABILITY_PARAGRAPHS } from './electricMobilityContent';

const SUSTAINABILITY_POINTS = [
  {
    title: 'Lower Direct Emissions',
    text: 'Electric vehicles produce no direct tailpipe emissions while running on electric power.',
    icon: Wind,
  },
  {
    title: 'Energy Diversification',
    text: 'Expanding transportation energy beyond a single fuel type supports a more diversified system.',
    icon: Recycle,
  },
  {
    title: 'Future-Ready Infrastructure',
    text: 'Charging infrastructure supports the growing requirements associated with electric mobility.',
    icon: Leaf,
  },
];

const EVSustainability = () => (
  <section
    className="em-section em-sustainability"
    id="sustainability"
    aria-labelledby="em-sustainability-title"
  >
    <div className="container em-sustainability-grid">
      <div className="em-sustainability-copy">
        <p className="em-eyebrow em-eyebrow--light">Sustainability</p>
        <h2 id="em-sustainability-title">Supporting Cleaner Mobility</h2>
        {SUSTAINABILITY_PARAGRAPHS.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="em-sustainability-note">
          Sustainability benefits depend on factors such as the source of
          electricity and overall vehicle use, and should be considered within
          that broader context.
        </p>
      </div>
      <ul className="em-sustainability-list">
        {SUSTAINABILITY_POINTS.map(({ title, text, icon: Icon }) => (
          <li key={title}>
            <span aria-hidden="true">
              <Icon size={20} />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default EVSustainability;
