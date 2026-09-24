const EveryDropSection = () => {
  return (
    <section className="every-drop-section">
      <div className="container">
        <div className="every-drop-grid">
          {/* Left Column: Heading, Copy, Feature Cards, CTA */}
          <div className="every-drop-content-col">
            <h2 className="every-drop-title">
              Every drop powers national <span className="text-red">progress</span>
            </h2>

            <p className="every-drop-description">
              Ceylon Petroleum Corporation plays a vital role in the national
              economy through the continuous supply of petroleum products. We are
              committed to ensuring uninterrupted fuel supply so Sri Lanka can
              keep moving toward a stronger, more resilient economy.
            </p>

            <div className="every-drop-features-grid">
              <div className="drop-feature-card">
                <div className="feature-icon-wrapper">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <h4>Energy Security</h4>
                <p>Safeguarding a reliable petroleum supply for the country.</p>
              </div>

              <div className="drop-feature-card">
                <div className="feature-icon-wrapper">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                </div>
                <h4>Trusted Supply</h4>
                <p>Supporting transport, commerce and communities islandwide.</p>
              </div>

              <div className="drop-feature-card">
                <div className="feature-icon-wrapper">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <h4>Driving Growth</h4>
                <p>Powering industries and people for a brighter tomorrow.</p>
              </div>
            </div>

            <div className="every-drop-cta">
              <a href="/about" className="every-drop-btn">
                See our operations
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Image with floating badge */}
          <div className="every-drop-image-col">
            <div className="every-drop-image-wrapper">
              <div className="image-overlay-gradient"></div>
              <img
                src="/images/offshore-platform.jpg"
                alt="Offshore Oil Platform"
                className="every-drop-img"
              />
              {/* Top-right accent stripes */}
              <div className="every-drop-accents" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
            {/* Badge placed below the image */}
            <div className="every-drop-badge">
              <div className="every-drop-badge-content">
                <span className="badge-number">60+</span>
                <span className="badge-text">years serving<br />the nation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EveryDropSection;
