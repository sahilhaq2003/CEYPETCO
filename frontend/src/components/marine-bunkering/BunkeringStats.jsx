import { useEffect, useRef, useState } from 'react';
import { BUNKERING_STATS } from './bunkeringContent';

const parseValue = (value) => {
  const match = value.match(/([\d,]+(?:\.\d+)?)/);
  if (!match) return { prefix: value, number: null, suffix: '', decimals: 0 };
  const raw = match[1];
  const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
  return {
    prefix: value.slice(0, match.index),
    number: parseFloat(raw.replace(/,/g, '')),
    suffix: value.slice(match.index + raw.length),
    decimals,
  };
};

const formatValue = (parsed, amount) => {
  const isYear =
    parsed.decimals === 0 && parsed.number >= 1000 && parsed.number <= 2100;
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
    useGrouping: !isYear,
  });
  return `${parsed.prefix}${formatted}${parsed.suffix}`;
};

const StatValue = ({ value }) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    const parsed = parseValue(value);
    if (!node || parsed.number === null || /^\d{4}$/.test(value)) {
      setDisplay(value);
      return undefined;
    }
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      setDisplay(value);
      return undefined;
    }

    let frame = 0;
    let started = false;
    setDisplay(formatValue(parsed, 0));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started) return;
          started = true;
          observer.disconnect();
          const duration = 1600;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            if (progress < 1) {
              setDisplay(formatValue(parsed, parsed.number * eased));
              frame = requestAnimationFrame(tick);
            } else {
              setDisplay(value);
            }
          };
          frame = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <b ref={ref}>{display}</b>;
};

const BunkeringStats = () => (
  <section
    className="mb-section mb-stats"
    id="bunkering-stats"
    aria-labelledby="mb-stats-title"
  >
    <div className="container">
      <div className="mb-section-heading">
        <p className="mb-eyebrow">Bunkering at a glance</p>
        <h2 id="mb-stats-title">Marine Bunkering in Numbers</h2>
      </div>
      <div className="mb-stats-grid">
        {BUNKERING_STATS.map(({ value, label, historical }) => (
          <article
            className={`mb-stat-card${historical ? ' mb-stat-card--historical' : ''}`}
            key={value}
          >
            <StatValue value={value} />
            <span>{label}</span>
            {historical && <small>Historical &middot; reported 2021</small>}
          </article>
        ))}
      </div>
      <p className="mb-stats-note">
        Historical figures based on CPC&apos;s reported 2021 performance.{' '}
        <a
          href="https://ceypetco.gov.lk/wp-content/uploads/2025/08/2021-_English.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source: CPC Annual Report 2021
        </a>
      </p>
    </div>
  </section>
);

export default BunkeringStats;
