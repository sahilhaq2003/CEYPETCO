const bankLogosRow1 = [
  { name: 'Bank of Ceylon', logo: '/images/banks/boc.svg' },
  { name: 'Commercial Bank PLC', logo: '/images/banks/commercial.svg' },
  { name: 'DFCC Vardhana Bank', logo: '/images/banks/dfcc.png' },
  { name: 'Hatton National Bank', logo: '/images/banks/hnb.png' },
  { name: 'National Development Bank', logo: '/images/banks/ndb.svg' },
  { name: 'Nations Trust Bank', logo: '/images/banks/nations-trust.svg' },
];

const bankLogosRow2 = [
  { name: 'Peoples Bank', logo: '/images/banks/peoples.png' },
  { name: 'Sampath Bank PLC', logo: '/images/banks/sampath.jpg' },
  { name: 'Seylan Bank PLC', logo: '/images/banks/seylan.png' },
  { name: 'Visa International', logo: '/images/visa.svg' },
  { name: 'Mastercard', logo: '/images/mastercard.svg' },
  { name: 'UnionPay', logo: '/images/unionpay.svg' },
  { name: 'JCB Cards', logo: '/images/jcb.svg' },
];

const LogoMarqueeSection = ({
  title = "Our Associated Partners & Financial Institutions",
  subtitle = "Collaborating with Sri Lanka's leading banking institutions and international payment networks."
}) => {
  // Duplicate arrays for smooth seamless infinite CSS marquee scrolling
  const row1Items = [...bankLogosRow1, ...bankLogosRow1, ...bankLogosRow1];
  const row2Items = [...bankLogosRow2, ...bankLogosRow2, ...bankLogosRow2];

  return (
    <section className="logo-section-wrapper content-section">
      <div className="container">
        <div className="logo-section-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="marquee-container">
          {/* Row 1: Leftward infinite scroll */}
          <div className="marquee-row marquee-row-left">
            <div className="marquee-track">
              {row1Items.map((item, idx) => (
                <div className="logo-card" key={`r1-${idx}`}>
                  <img src={item.logo} alt={`${item.name} logo`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Rightward infinite scroll */}
          <div className="marquee-row marquee-row-right">
            <div className="marquee-track">
              {row2Items.map((item, idx) => (
                <div className="logo-card" key={`r2-${idx}`}>
                  <img src={item.logo} alt={`${item.name} logo`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoMarqueeSection;
