import { Check } from 'lucide-react';
import { ABOUT_PARAGRAPHS, ABOUT_IMAGE } from './electricMobilityContent';

const HIGHLIGHTS = [
  'Extending transportation energy beyond conventional liquid fuels',
  'Developing charging infrastructure at selected locations',
  'Progressively evolving toward multi-energy mobility locations',
];

const EVAbout = () => (
  <section className="em-section em-about" id="about-electric-mobility" aria-labelledby="em-about-title">
    <div className="container em-about-grid">
      <div className="em-about-copy">
        <p className="em-eyebrow">About electric mobility</p>
        <h2 id="em-about-title">Building Energy Infrastructure for the Next Generation</h2>
        {ABOUT_PARAGRAPHS.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ul className="em-about-points">
          {HIGHLIGHTS.map((item) => (
            <li key={item}>
              <Check size={17} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <figure className="em-about-figure">
        <img
          src={ABOUT_IMAGE.src}
          srcSet={ABOUT_IMAGE.srcSet}
          sizes="(max-width: 900px) 100vw, 45vw"
          alt={ABOUT_IMAGE.alt}
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          <span>Illustrative EV charging scene</span>
          <b>Developing charging infrastructure for Sri Lanka&apos;s transport-energy future</b>
        </figcaption>
      </figure>
    </div>
  </section>
);

export default EVAbout;
