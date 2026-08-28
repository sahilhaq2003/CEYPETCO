import { useEffect, useState } from 'react';
import sriLankaMap from './assets/sri-lanka-districts.svg?raw';
import fuelStations from './data/fuelStations.json';
import lubricantProducts from './data/lubricants.json';
import api from './api';

const Icon = ({ name, size = 24 }) => {
  const paths = {
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    phone: (
      <path d="M7 3H4.5A1.5 1.5 0 0 0 3 4.5C3 13.6 10.4 21 19.5 21a1.5 1.5 0 0 0 1.5-1.5V17l-4-1-1.2 3c-4.7-1.2-8.4-4.9-9.6-9.6l3-1.2L7 3Z" />
    ),
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    station: (
      <>
        <path d="M5 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h15M8 7h5v4H8z" />
        <path d="M16 8h2l2 2v7a1.5 1.5 0 0 1-3 0v-3" />
      </>
    ),
    building: (
      <>
        <path d="M4 21V7l8-4 8 4v14M8 10h2m4 0h2m-8 4h2m4 0h2M9 21v-3h6v3" />
      </>
    ),
    app: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path d="M10 6h4m-3 12h2" />
      </>
    ),
    droplet: <path d="M12 2s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13Z" />,
    shield: (
      <>
        <path d="M12 3 5 6v5c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m-5-5 5 5 5-5" />
        <path d="M5 20h14" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
};

const services = [
  [
    'globe',
    'Regional Offices',
    'Find regional contacts and support.',
    '/regional-offices',
  ],
  [
    'building',
    'Market & Sales',
    'Explore fuel products, pricing and the dealer network.',
    '/marketing-sales',
  ],
  [
    'app',
    'Mobile App',
    'Access Ceypetco services on mobile.',
    'https://fuelup.cpstl.lk/apk/',
  ],
  [
    'droplet',
    'Product Specifications',
    'Review petroleum product standards.',
    'https://ceypetco.gov.lk/wp-content/uploads/2026/04/Marketing-Sepecifictions.pdf',
  ],
  [
    'shield',
    'Registration of Suppliers',
    'Supplier registration and procurement.',
    '/tenders#supplier-registration',
  ],
  [
    'app',
    'Consumer Registration',
    'Register for applicable consumer services.',
    '/consumer-registration',
  ],
  [
    'clock',
    'Notices',
    'Read current public and operational notices.',
    '/notices',
  ],
  [
    'building',
    'Projects',
    'Explore current development initiatives.',
    '/projects',
  ],
  [
    'download',
    'Annual Reports',
    'Access corporate performance publications.',
    '/annual-reports',
  ],
  [
    'globe',
    'Right to Information',
    'Public information and RTI guidance.',
    '/right-to-information',
  ],
];
const divisions = [
  [
    'Refinery',
    'At the heart of CPC operations, strengthening the nation’s petroleum supply.',
    'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/refinery.png',
    '/refinery',
  ],
  [
    'Marketing & Sales',
    'Serving communities and industries through a trusted islandwide network.',
    'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/distribution.jpg',
    '/marketing-sales',
  ],
  [
    'Aviation',
    'Specialised aviation fuel handling supporting Sri Lanka’s air transport sector.',
    'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/control-room.png',
    '/aviation',
  ],
];
const heroSlides = [
  {
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/distribution.jpg',
    alt: 'Ceypetco fuel distribution truck travelling through Sri Lanka',
    eyebrow: 'ISLANDWIDE DISTRIBUTION',
    title: (
      <>
        Fuel where the
        <br />
        nation needs it.
      </>
    ),
    copy: 'An extensive distribution network delivering essential petroleum products safely and reliably across every district.',
    cta: 'Explore our network',
    href: '#fuel-network',
  },
  {
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/refinery.png',
    alt: 'Ceypetco refinery under a clear blue sky',
    eyebrow: 'REFINING WITH PURPOSE',
    title: (
      <>
        Strengthening national
        <br />
        energy security.
      </>
    ),
    copy: 'Experienced people, proven infrastructure and disciplined operations supporting a resilient energy future for Sri Lanka.',
    cta: 'Explore the refinery',
    href: '/refinery',
  },
  {
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/agro-products.jpg',
    alt: 'Ceypetco agrochemical products supporting Sri Lankan agriculture',
    eyebrow: 'SUPPORTING SRI LANKAN AGRICULTURE',
    title: (
      <>
        Stronger crops.
        <br />
        Confident farmers.
      </>
    ),
    copy: 'Quality crop-protection solutions, responsible production and islandwide support helping farming communities prosper.',
    cta: 'Explore Agro Chemicals',
    href: '/agro-chemicals',
  },
  {
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/fuel-train.jpg',
    alt: 'Fuel transport train travelling through Sri Lanka',
    eyebrow: 'ENERGY IN MOTION',
    title: (
      <>
        Moving energy.
        <br />
        Connecting the nation.
      </>
    ),
    copy: 'Dependable transport and distribution infrastructure helps essential petroleum products reach communities and industries across Sri Lanka.',
    cta: 'Explore Marketing & Sales',
    href: '/marketing-sales',
  },
];
const fuelDistricts = [
  ['Colombo', 119, 'Western'],
  ['Gampaha', 140, 'Western'],
  ['Kalutara', 52, 'Western'],
  ['Kandy', 58, 'Central'],
  ['Matale', 18, 'Central'],
  ['Nuwara Eliya', 16, 'Central'],
  ['Galle', 61, 'Southern'],
  ['Matara', 41, 'Southern'],
  ['Hambantota', 37, 'Southern'],
  ['Jaffna', 60, 'Northern'],
  ['Mannar', 13, 'Northern'],
  ['Mullaitivu', 10, 'Northern'],
  ['Vavuniya', 14, 'Northern'],
  ['Batticaloa', 40, 'Eastern'],
  ['Ampara', 51, 'Eastern'],
  ['Trincomalee', 23, 'Eastern'],
  ['Kurunegala', 106, 'North Western'],
  ['Puttalam', 70, 'North Western'],
  ['Anuradhapura', 48, 'North Central'],
  ['Polonnaruwa', 17, 'North Central'],
  ['Badulla', 33, 'Uva'],
  ['Monaragala', 23, 'Uva'],
  ['Ratnapura', 42, 'Sabaragamuwa'],
  ['Kegalle', 33, 'Sabaragamuwa'],
  ['Kilinochchi', 9, 'Northern'],
];
const districtSlug = (name) => name.toLowerCase().replaceAll(' ', '-');
const districtFromPath = (path) => {
  const slug = path.match(/^\/fuel-stations\/([^/]+)$/)?.[1];
  return (
    fuelDistricts.find(([name]) => districtSlug(name) === slug)?.[0] || null
  );
};
const jumpToPageTop = () => {
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previousBehavior;
};

function FuelDistributionMap() {
  const [selected, setSelected] = useState(null);
  const current = fuelDistricts.find(([name]) => name === selected) || null;
  const totalStations = fuelDistricts.reduce((sum, item) => sum + item[1], 0);

  const selectFromMap = (event) => {
    const path = event.target.closest('path[title]');
    if (!path) return;
    const name = path.getAttribute('title');
    if (fuelDistricts.some(([district]) => district === name)) {
      jumpToPageTop();
      setSelected(name);
      window.history.pushState({}, '', `/fuel-stations/${districtSlug(name)}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  useEffect(() => {
    const paths = document.querySelectorAll('.fuel-map-svg path[title]');
    paths.forEach((path) =>
      path.classList.toggle(
        'selected',
        path.getAttribute('title') === selected,
      ),
    );
  }, [selected]);

  return (
    <section className="fuel-map-section section">
      <div className="container">
        <div className="fuel-map-heading">
          <div>
            <p className="eyebrow">ISLANDWIDE NETWORK</p>
            <h2>
              Auto fuel distribution
              <br />
              across Sri Lanka.
            </h2>
          </div>
          <div className="network-total">
            <b>{totalStations.toLocaleString()}</b>
            <span>
              fuel stations across
              <br />
              25 districts
            </span>
          </div>
        </div>
        <div className="fuel-map-panel">
          <div className="map-column">
            <div
              className="fuel-map-svg"
              onClick={selectFromMap}
              dangerouslySetInnerHTML={{ __html: sriLankaMap }}
            />
            <div className="map-hint">
              <span></span> Select a district on the map
            </div>
          </div>
          <div className="district-column">
            <div className="selected-district">
              {current ? (
                <>
                  <div>
                    <small>SELECTED DISTRICT</small>
                    <h3>{current[0]}</h3>
                    <p>{current[2]} Province</p>
                  </div>
                  <div>
                    <b>{current[1]}</b>
                    <span>Fuel stations</span>
                  </div>
                </>
              ) : (
                <div className="district-empty-state">
                  <small>DISTRICT NETWORK</small>
                  <h3>Select a district</h3>
                  <p>Use the map or district directory below.</p>
                </div>
              )}
            </div>
            <div className="district-list">
              {fuelDistricts.map(([name, total], index) => (
                <a
                  className={selected === name ? 'active' : ''}
                  onMouseEnter={() => setSelected(name)}
                  href={`/fuel-stations/${districtSlug(name)}`}
                  key={name}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <b>{name}</b>
                  <small>{total}</small>
                </a>
              ))}
            </div>
            {current ? (
              <a
                className="district-contact"
                href={`/fuel-stations/${districtSlug(current[0])}`}
              >
                View {current[0]} fuel stations <Icon name="arrow" size={17} />
              </a>
            ) : (
              <div className="district-contact district-contact-empty">
                Choose a district to view its fuel stations
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FuelStationPage({ district }) {
  const [query, setQuery] = useState('');
  const meta = fuelDistricts.find(([name]) => name === district);
  const stations = fuelStations[district] || [];
  const filtered = stations.filter(({ dealerNo, address, dealerName }) =>
    `${dealerNo} ${address} ${dealerName}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <main className="inner-page fuel-directory-page">
      <section className="fuel-directory-hero">
        <div className="container">
          <div>
            <a className="back-to-map" href="/#fuel-network">
              <Icon name="arrow" size={16} /> Back to district map
            </a>
            <p className="eyebrow light">
              FUEL STATION NETWORK · {meta[2].toUpperCase()} PROVINCE
            </p>
            <h1>{district}</h1>
            <p>
              Explore Ceypetco dealers and filling stations operating across the{' '}
              {district} District.
            </p>
            <div className="breadcrumbs">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/#fuel-network">Fuel station network</a>
              <span>/</span>
              <b>{district}</b>
            </div>
          </div>
          <div className="district-count">
            <b>{stations.length}</b>
            <span>
              listed
              <br />
              stations
            </span>
          </div>
        </div>
      </section>
      <section className="fuel-directory-content content-section">
        <div className="container">
          <div className="directory-toolbar">
            <div>
              <p className="eyebrow">AUTHORIZED DEALER DIRECTORY</p>
              <h2>Find a station in {district}.</h2>
            </div>
            <label>
              <span>Search dealer, town or number</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${district} stations...`}
              />
            </label>
          </div>
          <div className="station-results">
            <div className="station-table-head">
              <span>Dealer no.</span>
              <span>Address</span>
              <span>Dealer name</span>
            </div>
            {filtered.map((station) => (
              <article key={`${station.dealerNo}-${station.address}`}>
                <span className="dealer-number">{station.dealerNo}</span>
                <strong>{station.address}</strong>
                <p>{station.dealerName}</p>
              </article>
            ))}
            {filtered.length === 0 && (
              <div className="no-stations">
                <h3>No matching stations</h3>
                <p>Try another dealer number, town or dealer name.</p>
              </div>
            )}
          </div>
          <div className="directory-footer">
            <span>
              Showing {filtered.length} of {stations.length} stations
            </span>
            <a href="/#fuel-network">
              Explore another district <Icon name="arrow" size={16} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

const pageData = {
  '/about': {
    label: 'ABOUT CEYPETCO',
    title: 'Built to power national progress.',
    intro:
      'For more than six decades, Ceylon Petroleum Corporation has served at the centre of Sri Lanka’s energy landscape.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/about-banner.webp',
  },
  '/services': {
    label: 'PUBLIC SERVICES',
    title: 'Energy services made accessible.',
    intro:
      'Find official registrations, applications, specifications and information from one clear destination.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/media-2.jpg',
  },
  '/regional-offices': {
    label: 'PUBLIC SERVICES · REGIONAL OFFICES',
    title: 'Support across every region.',
    intro:
      'Connect directly with Ceypetco regional management teams serving customers, dealers and communities across Sri Lanka.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/head-office.webp',
  },
  '/consumer-registration': {
    label: 'PUBLIC SERVICES · BULK CONSUMERS',
    title: 'Register your consumer point.',
    intro:
      'A clear registration pathway for industrial customers requiring more than 3,300 litres of fuel per month.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/distribution.jpg',
  },
  '/notices': {
    label: 'PUBLIC INFORMATION · NOTICES',
    title: 'Official notices and circulars.',
    intro:
      'Read current public statements, marketing circulars and institutional agreements published by Ceypetco.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/media-1.jpg',
  },
  '/projects': {
    label: 'STRATEGIC PROJECTS · SOREM',
    title: 'Modernising Sri Lanka’s refining future.',
    intro:
      'The Sapugaskanda Oil Refinery Expansion and Modernization Project is designed to strengthen capacity, product quality and national energy resilience.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/refinery.png',
  },
  '/annual-reports': {
    label: 'CORPORATE PUBLICATIONS · ANNUAL REPORTS',
    title: 'Performance documented with clarity.',
    intro:
      'Access Ceylon Petroleum Corporation annual reports and review our operational and financial record across the years.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/about-banner.webp',
  },
  '/right-to-information': {
    label: 'PUBLIC INFORMATION · RTI',
    title: 'Information access made clear.',
    intro:
      'Contact the officers nominated by Ceylon Petroleum Corporation to support Right to Information enquiries and official information requests.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/head-office.webp',
  },
  '/media': {
    label: 'MEDIA CENTRE',
    title: 'News from across Ceypetco.',
    intro:
      'Access the latest corporate notices, project updates and public information.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/media-1.jpg',
  },
  '/tenders': {
    label: 'PROCUREMENT',
    title: 'Open and transparent opportunities.',
    intro:
      'Explore current tenders, supplier registrations and procurement documents.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/refinery.png',
  },
  '/careers': {
    label: 'CAREERS',
    title: 'Power your career.',
    intro:
      'Join Sri Lanka’s energy journey and help build the systems that keep a nation moving.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/career-team.jpg',
  },
  '/contact': {
    label: 'CONTACT US',
    title: 'We’re here to help.',
    intro:
      'Connect with our head office, customer care and specialist operating divisions.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/head-office.webp',
  },
  '/refinery': {
    label: 'OUR SERVICES · REFINERY',
    title: 'Precision refining for national growth.',
    intro:
      'Transforming crude oil into quality fuels through experienced people, proven processes and rigorous standards.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/refinery-detail-1.jpg',
  },
  '/marketing-sales': {
    label: 'OUR SERVICES · MARKETING',
    title: 'Fueling every part of Sri Lanka.',
    intro:
      'An islandwide dealer and distribution network serving transport, industry and communities.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/distribution.jpg',
  },
  '/aviation': {
    label: 'OUR SERVICES · AVIATION',
    title: 'Reliable energy for every takeoff.',
    intro:
      'Round-the-clock aviation fueling built around quality, safety and on-time service.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/aviation-hero.jpg',
  },
  '/agro-chemicals': {
    label: 'OUR SERVICES · AGRO',
    title: 'Supporting stronger harvests.',
    intro:
      'Quality crop-protection solutions and expert support for Sri Lanka’s farming communities.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/agro-products.jpg',
  },
  '/lubricants': {
    label: 'OUR SERVICES · LUBRICANTS',
    title: 'Performance engineered to last.',
    intro:
      'Certified automotive and industrial lubricants meeting recognised international specifications.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/lubricants-hero.jpg',
  },
  '/history': {
    label: 'OUR HISTORY',
    title: 'Milestones that shaped our journey.',
    intro:
      'Explore the defining moments behind more than six decades of service to Sri Lanka.',
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/history-1.jpg',
  },
};

const historyMilestones = [
  [
    '1962',
    'The Corporation commenced business in competition with the other oil companies operating in Sri Lanka at the time.',
  ],
  [
    '1964',
    'CPC took over the import, sale and distribution of petroleum products nationally. Kolonnawa, regional bulk depots and retail outlets were integrated and improved as one network, with added storage, fire-safety systems, internal roads and modernised gantry filling.',
  ],
  [
    '1968',
    'The Corporation continued expanding its national operating footprint and petroleum-services capabilities.',
  ],
  [
    '1969',
    'The refinery commenced production. Refining capacity was later increased to 50,000 BPD. A lubricating-oil blending plant was installed at Kolonnawa and CPC entered the agrochemical market.',
  ],
  [
    '1971',
    'Bunkering operations at Sri Lankan ports and aviation refuelling activities were integrated into the Corporation.',
  ],
  [
    '1978',
    'CPC built a Nylon 6 yarn factory for the textile, tyre and finishing industries at a cost of Rs. 603 million.',
  ],
  [
    '1987',
    'A Single Point Buoy Mooring facility was commissioned 9.2 kilometres offshore from Colombo Port, together with an intermediate crude-oil tank farm at Orugodawatte.',
  ],
  [
    '1992',
    'The refinery crude-distiller unit was revamped to modernise operations and improve efficiency at a cost of Rs. 250 million.',
  ],
];

const managementGroups = [
  {
    title: 'Corporate Management',
    people: [
      [
        'K G H Kodagoda',
        'Refinery Manager',
        '+94 11 2400666 / +94 11 5668490',
        'refinery.manager@ceypetco.gov.lk',
      ],
      [
        'K W Samantha Pushpalal',
        'Deputy General Manager · HR & Admin',
        '+94 11 2106758',
        'dgm.hr@ceypetco.gov.lk',
      ],
      [
        'W K S Gunawardhana',
        'Acting Deputy General Manager · Marketing',
        '+94 11 2106753',
        'dgm.mkt@ceypetco.gov.lk',
      ],
      [
        'K K A Jayawikrama',
        'Deputy General Manager · Commercial & Supply Chain',
        '+94 11 2106761',
        'dgm.commercial@ceypetco.gov.lk',
      ],
      [
        'N B M P Jeewasiri',
        'Deputy General Manager · Technical Services & Corporate Affairs',
        '+94 11 7296290',
        'dgm.ts@ceypetco.gov.lk',
      ],
      [
        'B T T Perera',
        'Deputy General Manager · Finance',
        '+94 11 7296146',
        'dgm.fin@ceypetco.gov.lk',
      ],
    ],
  },
  {
    title: 'Senior Management · Refinery',
    people: [
      [
        'Deputy Refinery Manager',
        'Manufacturing & Operations',
        '+94 11 2400666 / +94 11 5668490',
        'refinery.manager@ceypetco.gov.lk',
      ],
      [
        'Deputy Refinery Manager',
        'Maintenance & Projects',
        '+94 11 2400684 / +94 11 5668911',
        'drm.mp@ceypetco.gov.lk',
      ],
      [
        'A K Seneviratne',
        'Acting Deputy Refinery Manager · Technical Services',
        '',
        'drm.ts@ceypetco.gov.lk',
      ],
      [
        'K V J Chandrawanka',
        'Acting Deputy Refinery Manager · Electrical & Instrument',
        '+94 11 2401527',
        'mgr.electrical@ceypetco.gov.lk',
      ],
    ],
  },
  {
    title: 'Head Office',
    people: [
      [
        'R A K C Ariyaratne',
        'Chief Legal Officer',
        '+94 11 2106773',
        'clo@ceypetco.gov.lk',
      ],
      [
        'M C D Perera',
        'Senior Manager · Finance',
        '+94 11 2400435',
        'smgr.fin@ceypetco.gov.lk',
      ],
      [
        'Y A D S Priyankara',
        'Chief Internal Auditor',
        '+94 11 7296223',
        'cia@ceypetco.gov.lk',
      ],
      [
        'G P Upananda',
        'Manager · Human Resource',
        '+94 11 7296278',
        'mgr.hr@ceypetco.gov.lk',
      ],
      [
        'G P K Wijekoon',
        'Manager · Engineering & Premises',
        '+94 11 7296132',
        'mgr.eng@ceypetco.gov.lk',
      ],
      [
        'W K S Gunawardhana',
        'Manager · Research & Development',
        '+94 11 7296287',
        'dgm.mkt@ceypetco.gov.lk',
      ],
      [
        'W M T Wijesinghe',
        'Acting Manager · Commercial',
        '+94 11 7296125',
        'dgm.commercial@ceypetco.gov.lk',
      ],
      [
        'A G D Bandara',
        'Manager · Shipping',
        '+94 11 7296300',
        'mgr.shipping@ceypetco.gov.lk',
      ],
      [
        'Operations Management',
        'Stocks & Terminal Operations',
        '+94 11 7296290',
        'dgm.ts@ceypetco.gov.lk',
      ],
      [
        'K Hewagamage',
        'Manager · Procurements & Stores',
        '+94 11 7296331',
        'mgr.procurement@ceypetco.gov.lk',
      ],
      [
        'W A A C Weerasinghe',
        'Manager · Human Resource Development',
        '',
        'mgr.hrd@ceypetco.gov.lk',
      ],
      [
        'V Shanmuganathan',
        'Acting Manager · Marketing',
        '+94 11 7296248',
        'mgr.mkt@ceypetco.gov.lk',
      ],
      [
        'R M Ariyamanjula',
        'Acting Manager · Corporate Planning & Business Development',
        '+94 11 7296292',
        'mgr.cpbd@ceypetco.gov.lk',
      ],
      [
        'I C Galagodage',
        'Acting Manager · Lubricant & Special Products',
        '+94 11 7296346',
        'dmgr.lub@ceypetco.gov.lk',
      ],
      [
        'D L Perera',
        'Acting Manager · Information Technology',
        '+94 11 7296218',
        'lakshitha@ceypetco.gov.lk',
      ],
      [
        'U H A S Jayaweera',
        'Acting Deputy Manager · Investigation',
        '+94 11 7296230',
        '',
      ],
      [
        'B M W A R Bandara',
        'Acting Assistant Manager · Security',
        '+94 11 7296320',
        '',
      ],
      [
        'Anurudda B. Koralagedara',
        'Acting Assistant Manager · Secretariat',
        '+94 11 7296310',
        'anuruddakg@ceypetco.gov.lk',
      ],
    ],
  },
  {
    title: 'Operating Divisions',
    people: [
      [
        'A I Wanasekara',
        'Manager · Aviation Operations, Katunayake',
        '+94 11 2253039',
        'mgr.avi@ceypetco.gov.lk',
      ],
      [
        'A M K B Adhikari',
        'Acting Deputy Manager · Sapugaskanda Terminal',
        '+94 11 2401112 / +94 11 5750880',
        '',
      ],
      [
        'B S S Perera',
        'Manager · Agro Chemicals',
        '+94 11 2694483 / +94 11 5666815',
        'mgr.agro@ceypetco.gov.lk',
      ],
    ],
  },
];

const DIRECTORY_GROUP_ORDER = [
  'Corporate Management',
  'Senior Management · Refinery',
  'Head Office',
  'Operating Divisions',
];

function ManagementDirectory() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get('/admin/management-contacts/active', {
          params: { limit: 500 },
        });
        const contacts = res.data && res.data.data ? res.data.data : [];
        if (cancelled) return;
        const map = {};
        contacts.forEach((c) => {
          const key = c.group || 'Other';
          if (!map[key]) map[key] = [];
          map[key].push(c);
        });
        const ordered = Object.keys(map).sort((a, b) => {
          const ia = DIRECTORY_GROUP_ORDER.indexOf(a);
          const ib = DIRECTORY_GROUP_ORDER.indexOf(b);
          if (ia === -1 && ib === -1) return a.localeCompare(b);
          if (ia === -1) return 1;
          if (ib === -1) return -1;
          return ia - ib;
        });
        setGroups(
          ordered.map((title) => ({
            title,
            people: (map[title] || []).sort((a, b) => a.order - b.order),
          }))
        );
      } catch (err) {
        if (!cancelled) setGroups([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="management-directory content-section">
      <div className="container">
        <div className="page-title-row">
          <div>
            <p className="eyebrow">MANAGEMENT DIRECTORY</p>
            <h2>Corporate and operational leadership.</h2>
          </div>
          <p>
            Official contact directory for Ceypetco&rsquo;s management functions
            and divisions.
          </p>
        </div>
        <div className="management-groups">
          {loading ? (
            <details open>
              <summary>
                <span>
                  <small>—</small>
                  Loading directory...
                </span>
                <b>—</b>
              </summary>
            </details>
          ) : groups.length === 0 ? (
            <details open>
              <summary>
                <span>
                  <small>—</small>
                  No directory entries yet
                </span>
                <b>—</b>
              </summary>
            </details>
          ) : (
            groups.map((group, index) => (
              <details open={index === 0} key={group.title}>
                <summary>
                  <span>
                    <small>{String(index + 1).padStart(2, '0')}</small>
                    {group.title}
                  </span>
                  <b>{String(group.people.length).padStart(2, '0')} contacts</b>
                </summary>
                <div className="management-list">
                  {group.people.map((person, personIndex) => (
                    <article key={person._id}>
                      <span className="management-person-index">
                        {String(personIndex + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3>{person.name}</h3>
                        <p>{person.role}</p>
                      </div>
                      <div className="management-contact-details">
                        {person.phone && (
                          <a
                            href={`tel:${person.phone
                              .split('/')[0]
                              .replaceAll(' ', '')}`}
                          >
                            <Icon name="phone" size={14} /> {person.phone}
                          </a>
                        )}
                        {person.email && (
                          <a href={`mailto:${person.email}`}>
                            <span>@</span> {person.email}
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </details>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function ManagementTeam() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get('/admin/team-members/active', {
          params: { limit: 200 },
        });
        if (cancelled) return;
        const items = res.data && res.data.data ? res.data.data : [];
        setLeaders(
          [...items].sort((a, b) =>
            (a.order ?? 0) - (b.order ?? 0) ||
            String(a.name).localeCompare(String(b.name))
          )
        );
      } catch (err) {
        if (!cancelled) setLeaders([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="content-section management-team-section">
      <div className="container">
        <div className="page-title-row">
          <div>
            <p className="eyebrow">LEADERSHIP</p>
            <h2>Management team</h2>
          </div>
        </div>
        <div className="leadership-grid">
          {loading ? (
            <article>
              <div className="leader-photo">
                <img src="https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/chairman.jpeg" alt="" />
              </div>
              <h3>Loading...</h3>
              <p>Please wait</p>
            </article>
          ) : leaders.length === 0 ? (
            <article>
              <div className="leader-photo">
                <img src="https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/chairman.jpeg" alt="" />
              </div>
              <h3>No team members yet</h3>
              <p>Check back soon</p>
            </article>
          ) : (
            leaders.map((member) => (
              <article key={member._id}>
                <div className="leader-photo">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} />
                  ) : (
                    <span className="leader-photo-fallback">
                      {member.name
                        .split(' ')
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join('')
                        .toUpperCase()}
                    </span>
                  )}
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

const contactLocations = [
  ['Customer Care', '+94 117 296 130', '', ''],
  ['Head Office', '+94 117 296 100', '', 'secretariat@ceypetco.gov.lk'],
  [
    'Refinery',
    '+94 11 2541382',
    '+94 11 2400436',
    'ref.manager@ceypetco.gov.lk',
  ],
  [
    'Aviation · Katunayake',
    '+94 11 2251319 / +94 11 2253376',
    '+94 11 2252331',
    'avi.opsbia@ceypetco.gov.lk',
  ],
  [
    'Aviation · Ratmalana',
    '+94 11 2637755',
    '+94 11 2637755',
    'avi.opsrat@ceypetco.gov.lk',
  ],
  [
    'Agro Chemicals · Kolonnawa',
    '+94 11 2572316',
    '+94 11 2572316',
    'agrochem@ceypetco.gov.lk',
  ],
];

function ContactDirectory() {
  return (
    <section className="contact-directory">
      <div className="container">
        <div className="contact-directory-heading">
          <div>
            <p className="eyebrow">OFFICE DIRECTORY</p>
            <h2>Direct contacts by location.</h2>
          </div>
          <address>
            No. 609, Dr. Danister de Silva Mawatha,
            <br />
            Colombo 09, Sri Lanka
          </address>
        </div>
        <div className="contact-location-grid">
          {contactLocations.map(([name, phone, fax, email]) => (
            <article key={name}>
              <h3>{name}</h3>
              <dl>
                <div>
                  <dt>Telephone</dt>
                  <dd>{phone}</dd>
                </div>
                {fax && (
                  <div>
                    <dt>Fax</dt>
                    <dd>{fax}</dd>
                  </div>
                )}
                {email && (
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${email}`}>{email}</a>
                    </dd>
                  </div>
                )}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HistoryPage() {
  const gallery = [1, 2, 3, 4, 6, 7, 8, 9];
  return (
    <>
      <section className="content-section history-section">
        <div className="container">
          <div className="page-title-row">
            <div>
              <p className="eyebrow">OUR JOURNEY</p>
              <h2>Six decades of national service.</h2>
            </div>
            <p>
              From market entry and national distribution to refinery
              modernisation, each milestone strengthened Sri Lanka’s energy
              infrastructure.
            </p>
          </div>
          <div className="history-timeline">
            {historyMilestones.map(([year, text], index) => (
              <article key={year}>
                <div className="history-year">
                  <span>0{index + 1}</span>
                  <b>{year}</b>
                </div>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="history-gallery-section">
        <div className="container">
          <div className="page-title-row">
            <div>
              <p className="eyebrow">HISTORICAL MOMENTS</p>
              <h2>A visual journey through our legacy.</h2>
            </div>
          </div>
          <div className="history-gallery">
            {gallery.map((number, index) => (
              <figure
                className={index === 0 || index === 5 ? 'wide' : ''}
                key={number}
              >
                <img
                  src={`https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/history-${number}.jpg`}
                  alt={`Ceypetco historical archive ${index + 1}`}
                />
                <figcaption>
                  Archive {String(index + 1).padStart(2, '0')}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const divisionPages = {
  '/refinery': {
    kicker: 'REFINERY OPERATIONS',
    heading: 'More than five decades of refining expertise.',
    copy: 'The Sapugaskanda Refinery was commissioned in August 1969 to process 38,000 barrels per stream day. Continuous improvements have expanded capability, improved efficiency and enabled production that meets changing national requirements.',
    stats: [
      ['1969', 'Commissioned'],
      ['1,100+', 'Direct jobs'],
      ['30–35%', 'CPC sales volume'],
    ],
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/refinery-detail-2.jpg',
    features: [
      '100% Sri Lankan operating staff',
      'Foreign-exchange savings for the nation',
      'Internationally recognised refinery training',
    ],
    table: [
      ['Crude distiller', '5,200'],
      ['Naphtha Unifiner', '940'],
      ['Platformer', '285'],
      ['Gas oil Unifiner', '450'],
      ['Visbreaker', '2,000'],
      ['Merox unit', '70'],
      ['Vacuum Unit', '950'],
      ['Bitumen Blowing Unit', '350'],
    ],
  },
  '/marketing-sales': {
    kicker: 'MARKETING & SALES',
    heading: 'An islandwide network built around access.',
    copy: 'CPC marketing operations began in April 1962. Today, the network supplies Sri Lanka through hundreds of dealers, connecting dependable petroleum products with households, mobility and industry.',
    stats: [
      ['850+', 'Dealer locations'],
      ['Islandwide', 'Distribution'],
      ['Since 1962', 'Marketing operations'],
    ],
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/media-3.jpg',
    features: [
      'Retail and commercial fuel supply',
      'Dealer and regional-office support',
      'Product quality and pricing information',
    ],
    prices: [
      ['Petrol 92', 'Rs. 414.00 / L'],
      ['Auto Diesel', 'Rs. 382.00 / L'],
      ['Lanka Kerosene', 'Rs. 285.00 / L'],
      ['Petrol 95 Euro 4', 'Rs. 495.00 / L'],
      ['Super Diesel Euro 4', 'Rs. 478.00 / L'],
      ['Industrial Kerosene', 'Rs. 434.00 / L'],
      ['Fuel Oil Super', 'Rs. 332.00 / L'],
      ['Fuel Oil 1500 · High Sulphur', 'Rs. 332.00 / L'],
      ['Fuel Oil 1500 · Low Sulphur', 'Rs. 332.00 / L'],
    ],
  },
  '/aviation': {
    kicker: 'CEYPETCO AVIATION',
    heading: 'Quality fuel. The right aircraft. The right time.',
    copy: 'Ceypetco Aviation provides round-the-clock aviation refuelling at Sri Lanka’s international airports, with daytime services for domestic, executive and nominated aircraft at Ratmalana.',
    stats: [
      ['24/7', 'International service'],
      ['1.3M L', 'Daily demand'],
      ['3', 'Operating locations'],
    ],
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/aviation-service.jpg',
    features: [
      'JET A-1 and AV GAS availability',
      'International quality-control standards',
      'Hydrant and refueller operations',
    ],
    locations: [
      ['Katunayake', 'Three JET A-1 tanks · 2.6M litres each'],
      ['Mattala', 'Three JET A-1 tanks · 1.0M litres each'],
      ['Ratmalana', 'Five tanks · 280,000 litres total'],
    ],
  },
  '/agro-chemicals': {
    kicker: 'AGRO CHEMICALS',
    heading: 'Trusted crop protection for over 50 years.',
    copy: 'Established in 1969, the Agrochemicals Function supplies quality crop-protection solutions while supporting safe use, reasonable pricing and timely delivery across farming communities.',
    stats: [
      ['50+ years', 'Market service'],
      ['ISO 9001', 'Quality certified'],
      ['Islandwide', 'Field support'],
    ],
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/agro-products.jpg',
    features: [
      'Quality, environment and safety systems',
      'Guidance for farmers and agrarian centres',
      'Reasonably priced crop-protection products',
    ],
    products: [
      ['Insecticides', 'Profenophos · BPMC · Fipronil'],
      ['Weedicides', 'Diuron · Pretilachlor · Glyphosate'],
      ['Fungicides', 'Tebuconazole · Mancozeb · Captan'],
      ['Bio-Insecticides', 'Flipper'],
    ],
  },
  '/lubricants': {
    kicker: 'CEYPETCO LUBRICANTS',
    heading: 'Certified protection for every application.',
    copy: 'Ceypetco lubricating oils are blended in an ISO-certified plant and developed for demanding automotive and industrial uses in line with recognised API and ACEA specifications.',
    stats: [
      ['ISO', 'Certified blending'],
      ['20+', 'Product families'],
      ['Automotive +', 'Industrial use'],
    ],
    image: 'https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/control-room.png',
    features: [
      'Internationally aligned specifications',
      'Automotive and industrial product ranges',
      'Nationwide Ceypetco brand support',
    ],
    products: [
      ['Engine Oils', 'Enduro · Supreme XHD · Platinum'],
      ['Transmission', 'ATF Dexron III · Gear Oil GL-4/GL-5'],
      ['Speciality', 'Brake Fluid · Coolant · Grease'],
      ['Industrial', 'Hydra · Hypertrans · Circulation Oil'],
    ],
  },
};

function DivisionPage({ data }) {
  const details = data.table || data.prices || data.locations || data.products;
  const detailTitle = data.table
    ? 'Process-unit capacity'
    : data.prices
      ? 'Current product prices'
      : data.locations
        ? 'Operating locations'
        : 'Product range';
  return (
    <>
      <section className="division-intro content-section">
        <div className="container division-story">
          <div>
            <p className="eyebrow">{data.kicker}</p>
            <h2>{data.heading}</h2>
            <p>{data.copy}</p>
          </div>
          <div className="division-feature-image">
            <img src={data.image} alt="" />
          </div>
        </div>
      </section>
      <section className="division-stat-band">
        <div className="container">
          {data.stats.map(([value, label]) => (
            <div key={label}>
              <b>{value}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="content-section division-details">
        <div className="container division-detail-grid">
          <div>
            <p className="eyebrow">WHY IT MATTERS</p>
            <h2>Built around quality, reliability and service.</h2>
            <ul>
              {data.features.map((item) => (
                <li key={item}>
                  <Icon name="shield" size={19} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="detail-panel">
            <div>
              <p className="eyebrow">AT A GLANCE</p>
              <h3>{detailTitle}</h3>
            </div>
            {details.map(([name, value]) => (
              <div className="detail-row" key={name}>
                <span>{name}</span>
                <b>
                  {value}
                  {data.table ? ' MT/day' : ''}
                </b>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="division-cta">
        <div className="container">
          <div>
            <p className="eyebrow light">NEED MORE INFORMATION?</p>
            <h2>Connect with the right Ceypetco team.</h2>
          </div>
          <a href={`/contact?subject=${encodeURIComponent(data.kicker)}`}>
            Contact this division <Icon name="arrow" size={18} />
          </a>
        </div>
      </section>
    </>
  );
}

function RefineryPage() {
  const units = [
    ['Crude distiller', '5,200'],
    ['Naphtha Unifiner', '940'],
    ['Platformer', '285'],
    ['Gas oil Unifiner', '450'],
    ['Visbreaker', '2,000'],
    ['Merox unit', '70'],
    ['Vacuum Unit', '950'],
    ['Bitumen Blowing Unit', '350'],
  ];
  const importance = [
    'Operated by a 100% Sri Lankan workforce.',
    'Provides direct employment for more than 1,100 citizens.',
    'Contributes 30–35% of CPC’s total sales volume.',
    'Reduces foreign-currency outflows through domestic refining.',
    'More than five decades of continuous operating experience.',
    'Refinery training is recognised by overseas organisations.',
  ];
  return (
    <>
      <section className="refinery-opening content-section">
        <div className="container refinery-opening-grid">
          <div>
            <p className="eyebrow">REFINERY OPERATIONS & CAPABILITIES</p>
            <h2>
              We refine with precision and expertise, delivering quality
              petroleum products that fuel the nation’s growth.
            </h2>
          </div>
          <div className="refinery-lead">
            <strong>
              Our refinery transforms crude oil into high-quality fuels and
              products that keep Sri Lanka moving.
            </strong>
            <p>
              We combine proven technology with strict safety and quality
              standards to deliver reliable energy every day.
            </p>
          </div>
        </div>
        <div className="container refinery-photo-strip">
          {[
            'refinery-card-1.jpg',
            'refinery-card-2.jpg',
            'refinery-card-3.jpg',
          ].map((image, index) => (
            <figure key={image}>
              <img
                src={`https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/${image}`}
                alt={
                  [
                    'Laboratory quality testing at the refinery',
                    'Maintenance work at the refinery',
                    'Skilled refinery welding operations',
                  ][index]
                }
              />
              <span>0{index + 1}</span>
            </figure>
          ))}
        </div>
      </section>
      <section className="refinery-history content-section">
        <div className="container refinery-history-grid">
          <div className="refinery-sticky-title">
            <p className="eyebrow">SAPUGASKANDA REFINERY</p>
            <h2>Advancing Sri Lanka’s refining capability since 1969.</h2>
            <div className="refinery-year">
              <b>1969</b>
              <span>
                Commissioned
                <br />
                in August
              </span>
            </div>
          </div>
          <div className="refinery-narrative">
            <p>
              The Ceylon Petroleum Corporation was established under Act No. 28
              of 1961 and entered the import, distribution and marketing of
              petroleum products throughout the island. The Sapugaskanda Oil
              Refinery was commissioned in August 1969 to process 38,000 barrels
              per stream day—approximately 5,200 metric tonnes per day—of
              Iranian Light crude oil.
            </p>
            <p>
              Although the crude distiller’s rated capacity was 5,200 MT/day,
              the unit was capable of processing 5,800 MT/day. Crudes with
              characteristics similar to Iranian Light, including Upper Zakum
              and Arabian Light, could be processed while meeting the required
              specifications.
            </p>
            <p>
              LPG production commenced in 1971, with the Naphtha Merox unit
              modified to process LPG. Special Boiling Point Solvent production
              also began using existing facilities. The Crude Distiller was
              subsequently debottlenecked, increasing refining capacity to
              50,000 barrels per stream day—approximately 6,900 MT/day.
            </p>
            <p>
              A new Kerosene Merox unit was commissioned in 1981 to process Jet
              A-1. The crude distiller was later revamped to process Far Eastern
              crudes such as Miri Light, while Naphtha Unifiner capacity
              increased to 1,100 MT/day in 1992. The Platformer was revamped in
              1999 to reach 650 MT/day, meet growing gasoline demand and support
              the phase-out of lead in gasoline.
            </p>
            <p>
              The existing Kerosene Unifiner was converted to process diesel,
              and the Gas Oil Unifiner was rehabilitated in 2003 to meet a
              diesel sulphur specification of 0.3% by weight.
            </p>
            <p>
              Small and medium-scale energy-conservation projects have improved
              operational efficiency. The Utilities section supplies the
              electricity, water, steam and instrument air required for plant
              operations. The refinery contains 65 tanks for crude oil, finished
              products and intermediate products, supported by four additional
              crude-oil tanks at the Orugodawatta tank farm.
            </p>
          </div>
        </div>
      </section>
      <section className="refinery-importance">
        <div className="container">
          <div className="refinery-importance-heading">
            <p className="eyebrow light">NATIONAL VALUE</p>
            <h2>Why the refinery matters.</h2>
          </div>
          <div className="refinery-importance-grid">
            {importance.map((item, index) => (
              <article key={item}>
                <span>0{index + 1}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="refining-process content-section">
        <div className="container">
          <div className="page-title-row">
            <div>
              <p className="eyebrow">REFINING PROCESS</p>
              <h2>From crude oil to essential products.</h2>
              <p className="refining-process-intro">
                Fractional distillation separates crude oil into useful products
                according to boiling point and density—from LPG and petrol to
                diesel, lubricants and bitumen.
              </p>
            </div>
          </div>
          <div
            className="refinery-flow"
            role="img"
            aria-label="Animated fractional distillation process showing crude oil separated into LPG, petrol, jet fuel, diesel, lubricants and bitumen"
          >
            <div className="flow-intake">
              <span className="flow-drop" aria-hidden="true" />
              <strong>Crude oil</strong>
              <p>Heated before entering the distillation column</p>
              <div className="intake-line">
                <i />
              </div>
            </div>
            <div className="distillation-column">
              <div className="column-cap">
                <span />
              </div>
              <div className="temperature-scale">
                <span>20°C</span>
                <span>120°C</span>
                <span>250°C</span>
                <span>370°C+</span>
              </div>
              <div className="column-core">
                {Array.from({ length: 7 }).map((_, index) => (
                  <span key={index} style={{ '--tray': index }} />
                ))}
                <i className="process-vapour vapour-one" />
                <i className="process-vapour vapour-two" />
                <i className="process-vapour vapour-three" />
              </div>
              <div className="column-label">
                <small>FRACTIONATION</small>
                <b>Distillation column</b>
              </div>
            </div>
            <div className="product-streams">
              {[
                ['01', 'LPG', 'Light gases', '20°C'],
                ['02', 'Petrol', 'Motor gasoline', '70°C'],
                ['03', 'Jet fuel', 'Kerosene fraction', '170°C'],
                ['04', 'Diesel', 'Transport fuel', '270°C'],
                ['05', 'Lubricants', 'Oils & waxes', '350°C'],
                ['06', 'Bitumen', 'Heavy residue', '370°C+'],
              ].map(([number, name, use, temperature], index) => (
                <article
                  className="product-stream"
                  style={{ '--stream': index }}
                  key={name}
                >
                  <div className="stream-pipe">
                    <i />
                  </div>
                  <span>{number}</span>
                  <div>
                    <strong>{name}</strong>
                    <small>{use}</small>
                  </div>
                  <b>{temperature}</b>
                </article>
              ))}
            </div>
            <div className="process-legend">
              <span>Lower boiling point</span>
              <i />
              <span>Higher boiling point & density</span>
            </div>
          </div>
        </div>
      </section>
      <section className="process-units content-section">
        <div className="container process-units-grid">
          <div>
            <p className="eyebrow">PROCESS UNITS</p>
            <h2>Installed production capacity.</h2>
            <p>Rated capacity in metric tonnes per stream day.</p>
          </div>
          <div className="unit-table">
            <div className="unit-table-head">
              <span>Unit</span>
              <span>Capacity · MT/stream day</span>
            </div>
            {units.map(([unit, capacity], index) => (
              <div className="unit-row" key={unit}>
                <span>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  {unit}
                </span>
                <b>{capacity}</b>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="division-cta">
        <div className="container">
          <div>
            <p className="eyebrow light">REFINERY INFORMATION</p>
            <h2>Connect with our refinery team.</h2>
          </div>
          <a href="/contact?subject=Refinery%20Operations">
            Contact the refinery <Icon name="arrow" size={18} />
          </a>
        </div>
      </section>
    </>
  );
}

function FuelPriceCards({ products, category }) {
  return (
    <div className="fuel-price-grid">
      {products.map(([name, price, date], index) => (
        <article className="fuel-price-card" key={name}>
          <div className="price-card-top">
            <span>{category}</span>
            <small>{String(index + 1).padStart(2, '0')}</small>
          </div>
          <h3>{name}</h3>
          <div className="price-value">
            <span>Rs.</span>
            <b>{price}</b>
            <small>per litre</small>
          </div>
          <div className="price-effective">
            <Icon name="clock" size={15} />
            <span>
              Effective from <b>{date}</b>
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

function MarketingSalesPage() {
  const [fuelPrices, setFuelPrices] = useState([]);
  const [fuelPricesLoading, setFuelPricesLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setFuelPricesLoading(true);
      try {
        const res = await api.get('/admin/fuel-prices/active', {
          params: { limit: 100 },
        });
        if (!cancelled)
          setFuelPrices(res.data && res.data.data ? res.data.data : []);
      } catch (err) {
        if (!cancelled) setFuelPrices([]);
      } finally {
        if (!cancelled) setFuelPricesLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const categoryOrder = [
    'White Oil',
    'Black Oil',
    'Lubricants',
    'Aviation Fuel',
  ];
  const grouped = categoryOrder
    .map((category) => ({
      category,
      products: fuelPrices
        .filter((p) => p.category === category)
        .map((p) => [
          p.product,
          (p.price ?? 0).toFixed(2),
          p.effectiveDate
            ? new Date(p.effectiveDate)
                .toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
                .replace(/\//g, '-')
            : '',
        ]),
    }))
    .filter((g) => g.products.length > 0);

  return (
    <>
      <section className="marketing-intro content-section">
        <div className="container marketing-intro-grid">
          <div>
            <p className="eyebrow">MARKETING & SALES</p>
            <h2>
              Serving every fuel need through an islandwide dealer network.
            </h2>
          </div>
          <div>
            <p>
              Following the incorporation of CPC under the Act of Parliament in
              1961, marketing operations commenced on 28 April 1962. Today,
              Ceypetco serves Sri Lanka’s fuel requirements through
              approximately 850 dealers.
            </p>
            <p>
              Outstation spot prices incorporate the applicable transport
              differential.
            </p>
          </div>
        </div>
        <div className="container marketing-stats">
          <div>
            <b>1962</b>
            <span>
              Marketing operations
              <br />
              commenced
            </span>
          </div>
          <div>
            <b>850</b>
            <span>
              Dealers serving
              <br />
              Sri Lanka
            </span>
          </div>
          <div>
            <b>Islandwide</b>
            <span>
              Retail and commercial
              <br />
              fuel access
            </span>
          </div>
        </div>
      </section>
      <section className="fuel-pricing content-section">
        <div className="container">
          <div className="pricing-heading">
            <div>
              <p className="eyebrow">FUEL PRICING</p>
              <h2>Current market rates.</h2>
              <p>
                Current rates for Ceylon Petroleum Corporation fuel products.
              </p>
            </div>
            <div className="pricing-status">
              <span></span>
              <div>
                <b>Current pricing</b>
                <small>Rates supplied for June 2026</small>
              </div>
            </div>
          </div>
          {fuelPricesLoading ? (
            <div className="price-category">
              <div className="price-category-title">
                <div>
                  <p className="eyebrow">PRODUCT CATEGORY</p>
                  <h3>Loading prices...</h3>
                </div>
              </div>
            </div>
          ) : grouped.length === 0 ? (
            <div className="price-category">
              <div className="price-category-title">
                <div>
                  <p className="eyebrow">PRODUCT CATEGORY</p>
                  <h3>No prices published</h3>
                </div>
              </div>
            </div>
          ) : (
            grouped.map((g, i) => (
              <div
                className={`price-category ${
                  g.category === 'Black Oil' ? 'black-oil' : ''
                }`}
                key={g.category}
              >
                <div className="price-category-title">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="eyebrow">PRODUCT CATEGORY</p>
                    <h3>{g.category}</h3>
                  </div>
                </div>
                <FuelPriceCards products={g.products} category={g.category} />
              </div>
            ))
          )}
          <div className="pricing-note">
            <Icon name="building" size={22} />
            <div>
              <b>Outstation pricing</b>
              <p>
                Outstation spot prices incorporate the applicable transport
                differential.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="marketing-resources">
        <div className="container">
          <div>
            <p className="eyebrow light">MARKETING RESOURCES</p>
            <h2>More product information.</h2>
          </div>
          <div className="marketing-resource-links">
            <a href="/lubricants">
              <span>Ceypetco Lubricants</span>
              <Icon name="arrow" size={18} />
            </a>
            <a href="/contact?subject=Historical%20Fuel%20Prices">
              <span>Historical Prices</span>
              <Icon name="arrow" size={18} />
            </a>
            <a href="/contact?subject=Marketing%20Circulars">
              <span>Marketing Circulars</span>
              <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function AviationPage() {
  const prices = [
    ['Local Customer with AOC Document', 'BIA, CIAR & MRIA', '2.43'],
    ['Local Customer with AOC Document', 'JIA', '2.54'],
    [
      'Local Contract Customer without Operating an Airline',
      'BIA, CIAR & MRIA',
      '2.46',
    ],
    ['Local Contract Customer without Operating an Airline', 'JIA', '2.57'],
    ['All Contract Customers · Foreign', 'BIA, CIAR & MRIA', '2.43'],
    ['All Contract Customers · Foreign', 'JIA', '2.54'],
  ];
  const locations = [
    {
      name: 'Katunayake',
      code: 'BIA · CMB / VCBI',
      service: 'Hydrant and refueller · over-wing / under-wing',
      capacity: 'Three JET A-1 tanks · 2.6 million litres each',
      avgas: '200-litre sealed drums',
      contacts: [
        [
          'Deputy Manager · Aviation Operations',
          '+94 11 2253039',
          'manjular@ceypetco.gov.lk',
        ],
        [
          'Operations Department',
          '+94 11 5756955',
          'avi.opsbia@ceypetco.gov.lk',
        ],
      ],
    },
    {
      name: 'Mattala',
      code: 'MRIA · HRI / VCRI',
      service: 'Hydrant and refueller · over-wing / under-wing',
      capacity: 'Three JET A-1 tanks · 1.0 million litres each',
      avgas: '200-litre sealed drums',
      contacts: [
        ['Assistant Manager · Aviation Operations', '+94 47 2031946', ''],
        [
          'Operations Department',
          '+94 47 5678343 · +94 47 2031945 · +94 47 2031947',
          'mria.ops@ceypetco.gov.lk',
        ],
      ],
    },
    {
      name: 'Ratmalana',
      code: 'RML / VCCC',
      service: 'Daytime refueller service · over-wing / under-wing',
      capacity: 'Five JET A-1 tanks · 280,000 litres total',
      avgas: '200-litre sealed drums',
      contacts: [
        [
          'Shift Superintendent',
          '+94 11 2637755 · +94 11 5664707',
          'cpcavirat@ceypetco.gov.lk',
        ],
        [
          'Commercial Manager',
          '+94 11 5455115 · +94 76 3842287',
          'mria.cm@ceypetco.gov.lk',
        ],
        [
          'Accountant · Aviation',
          '+94 11 5455191',
          'acc.aviation@ceypetco.gov.lk',
        ],
      ],
    },
  ];
  return (
    <>
      <section className="aviation-opening content-section">
        <div className="container aviation-opening-grid">
          <div>
            <p className="eyebrow">OUR AIM</p>
            <h2>Quality fuel. The right aircraft. The right time.</h2>
            <blockquote>
              To be the region’s leading service-oriented, customer-focused and
              environmentally responsible aviation fuel supplier.
            </blockquote>
          </div>
          <div>
            <p>
              Ceypetco Aviation provides round-the-clock refuelling at
              Bandaranaike International Airport and Mattala Rajapaksa
              International Airport, together with daytime service for domestic
              flights, corporate and executive jets, and nominated aircraft at
              Colombo Airport, Ratmalana.
            </p>
            <p>
              Clean, dry aviation fuel and rigorous contamination control are
              essential to aircraft safety, engine life and maintenance
              performance. Ceypetco applies international-quality handling
              standards throughout its into-plane operation.
            </p>
          </div>
        </div>
        <div className="container aviation-stats">
          <div>
            <b>24/7</b>
            <span>
              International airport
              <br />
              refuelling
            </span>
          </div>
          <div>
            <b>1.3M L</b>
            <span>
              Current daily
              <br />
              demand
            </span>
          </div>
          <div>
            <b>03</b>
            <span>
              Operating
              <br />
              locations
            </span>
          </div>
          <div>
            <b>Sole</b>
            <span>
              Into-plane operator
              <br />
              in Sri Lanka
            </span>
          </div>
        </div>
      </section>
      <section className="aviation-price-section content-section">
        <div className="container">
          <div className="aviation-price-heading">
            <div>
              <p className="eyebrow">AVIATION FUEL PRICING</p>
              <h2>Contract customer rates.</h2>
              <p>
                Effective 01 February 2025 · Prices shown in US dollars per US
                gallon.
              </p>
            </div>
            <div className="aviation-price-unit">
              <b>US$/USG</b>
              <span>Published pricing unit</span>
            </div>
          </div>
          <div className="aviation-price-table">
            <div className="aviation-price-head">
              <span>Customer category</span>
              <span>Location</span>
              <span>Revised price</span>
            </div>
            {prices.map(([customer, location, price], index) => (
              <article key={`${customer}-${location}`}>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <strong>{customer}</strong>
                <span>{location}</span>
                <b>${price}</b>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="aviation-fuel content-section">
        <div className="container">
          <div className="page-title-row">
            <div>
              <p className="eyebrow">FUEL & QUALITY</p>
              <h2>International specifications at every location.</h2>
            </div>
            <p>
              JET A-1 and Aviation Gasoline 100LL are supported across all three
              aviation locations.
            </p>
          </div>
          <div className="aviation-fuel-grid">
            <article>
              <span>01</span>
              <h3>JET A-1</h3>
              <p>
                Produced and supplied to the latest Aviation Fuel Quality
                Requirements for Jointly Operated Systems (AFQRJOS),
                incorporating DEF STAN 91-91 for turbine fuel, kerosene type JET
                A-1, NATO Code F-35 and ASTM D1655.
              </p>
              <small>Readily available</small>
            </article>
            <article>
              <span>02</span>
              <h3>Aviation Gasoline 100LL</h3>
              <p>
                Supplied to the latest British Ministry of Defence DEF STAN
                91-90 specification and made available in sealed 200-litre drums
                with prior notice.
              </p>
              <small>Available on prior notice</small>
            </article>
            <article className="aviation-provider">
              <p className="eyebrow light">TECHNICAL SERVICE PROVIDER</p>
              <h3>PETRONAS Aviation</h3>
              <p>
                Supporting Ceypetco Aviation’s commitment to specialist
                handling, operational quality and international service
                standards.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="aviation-gallery-section">
        <div className="container">
          <div className="page-title-row">
            <div>
              <p className="eyebrow">OPERATIONS GALLERY</p>
              <h2>Aviation fuel in action.</h2>
            </div>
          </div>
          <div className="aviation-gallery">
            {[1, 2, 3, 4, 5, 6].map((image, index) => (
              <figure
                className={index === 0 || index === 3 ? 'wide' : ''}
                key={image}
              >
                <img
                  src={`https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/aviation-gallery-${image}.jpg`}
                  alt={`Ceypetco aviation fuel operation ${image}`}
                />
                <figcaption>
                  Operation {String(index + 1).padStart(2, '0')}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="aviation-payment">
        <div className="container aviation-payment-grid">
          <div>
            <p className="eyebrow light">PAYMENT SCHEMES</p>
            <h2>Flexible arrangements for aviation customers.</h2>
            <p>
              Contract customers are served through arrangements with the
              Ceypetco Commercial Manager. International credit cards, cash in
              USD, Air BP cards and UVair are accepted according to the
              applicable customer arrangement.
            </p>
            <small>
              Customers should maintain a backup payment or third-party fuelling
              nomination and contact operations in advance to prevent
              last-minute disruption.
            </small>
          </div>
          <div className="aviation-payment-contact">
            <span>COMMERCIAL & PAYMENT SUPPORT</span>
            <a href="tel:+94112253039">+94 11 2253039</a>
            <a href="tel:+94771066764">+94 77 1066764</a>
            <p>Fax · +94 11 2252331</p>
          </div>
        </div>
      </section>
      <section className="aviation-locations content-section">
        <div className="container">
          <div className="page-title-row">
            <div>
              <p className="eyebrow">OPERATING LOCATIONS</p>
              <h2>Airport services and contacts.</h2>
            </div>
          </div>
          <div className="aviation-location-grid">
            {locations.map((location, index) => (
              <article key={location.name}>
                <div className="aviation-location-title">
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{location.name}</h3>
                    <small>{location.code}</small>
                  </div>
                </div>
                <dl>
                  <div>
                    <dt>Service</dt>
                    <dd>{location.service}</dd>
                  </div>
                  <div>
                    <dt>JET A-1 Storage</dt>
                    <dd>{location.capacity}</dd>
                  </div>
                  <div>
                    <dt>AV GAS</dt>
                    <dd>{location.avgas}</dd>
                  </div>
                </dl>
                <div className="aviation-contact-list">
                  {location.contacts.map(([role, phone, email]) => (
                    <div key={role}>
                      <b>{role}</b>
                      <a
                        href={`tel:${phone.split('·')[0].replaceAll(' ', '')}`}
                      >
                        {phone}
                      </a>
                      {email && <a href={`mailto:${email}`}>{email}</a>}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function AgroChemicalsPage() {
  const productGroups = [
    [
      'Insecticides',
      [
        'Profenophos 50% EC',
        'B.P.M.C. 50% EC',
        'Fipronil 0.3% G',
        'Fipronil 50g/l SC',
        'Imidacloprid 200g/l SC',
      ],
    ],
    [
      'Weedicides',
      [
        'Diuron 80% WP',
        'Pretilachlor 30% EC',
        'Glyphosate 36% SL · Restricted',
      ],
    ],
    [
      'Fungicides',
      [
        'Tebuconazole 25% EW',
        'Mancozeb 80% WP',
        'Captan 50% WP',
        'Sulphur 80% WG',
      ],
    ],
    ['Bio-Insecticides', ['Flipper']],
  ];
  return (
    <>
      <section className="agro-opening content-section">
        <div className="container agro-opening-grid">
          <div>
            <p className="eyebrow">CEYPETCO AGROCHEMICALS</p>
            <h2>
              More than 50 years supporting Sri Lanka’s farming communities.
            </h2>
            <p>
              Ceylon Petroleum Corporation established its Agrochemicals
              Function in 1969. As a strategic business unit within the
              Marketing Function, it has served the national agrochemicals
              market for more than five decades.
            </p>
            <p>
              Ceypetco Agrochemicals is the only government-sector organisation
              engaged in the agrochemicals business among Sri Lanka’s marketing
              companies, helping maintain product quality, access and reasonable
              market pricing.
            </p>
          </div>
          <div className="agro-opening-images">
            <figure>
              <img
                src="https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/agro-production-1.webp"
                alt="Ceypetco agrochemical production team member wearing protective equipment"
              />
              <span>Safe production</span>
            </figure>
            <figure>
              <img
                src="https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/agro-production-2.webp"
                alt="Ceypetco agrochemical automated production facility"
              />
              <span>Quality controlled</span>
            </figure>
          </div>
        </div>
      </section>
      <section className="agro-standards">
        <div className="container">
          <div className="agro-standards-heading">
            <p className="eyebrow light">CERTIFIED SYSTEMS</p>
            <h2>Quality, environment and occupational safety.</h2>
            <p>
              Experienced staff maintain the product range under guidance from
              the Sri Lanka Standards Institution.
            </p>
          </div>
          <div className="agro-cert-grid">
            {[
              ['ISO 9001:2015', 'Quality Management System'],
              ['ISO 14001:2015', 'Environmental Management System'],
              [
                'OHSAS 18001:2007',
                'Employee Health & Safety · qualified since 2019',
              ],
            ].map(([standard, label], index) => (
              <article key={standard}>
                <span>0{index + 1}</span>
                <h3>{standard}</h3>
                <p>{label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="agro-role content-section">
        <div className="container agro-role-grid">
          <div>
            <p className="eyebrow">FROM PREPARATION TO HARVEST</p>
            <h2>
              Practical crop-protection solutions across the cultivation cycle.
            </h2>
            <img
              src="https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/agro-products.jpg"
              alt="Safe application of crop-protection products in farmland"
            />
          </div>
          <div className="agro-role-copy">
            <p>
              Ceypetco Agrochemicals provides solutions from land and bed
              preparation through harvest by controlling or eradicating pests,
              fungi and weeds. The range includes insecticides, fungicides and
              weedicides for diverse cultivation requirements.
            </p>
            <p>
              Our primary goal is to strengthen a marketing strategy based on
              consistently high quality, reasonable prices and dependable
              on-time delivery. Professionally qualified field officers located
              around the island work directly with farming communities.
            </p>
            <p>
              Since December 2018, restricted Ceypetco Glyphosate has been
              distributed to approved planters at reasonable prices, supporting
              efforts to reduce production costs in the tea and rubber
              plantation sectors.
            </p>
            <p>
              Ceypetco imports quality agrochemicals, formulates, repacks,
              stores and markets them while working closely with the Registrar
              of Pesticides, Department of Agriculture, agrarian service
              centres, farmer organisations and other agricultural institutions
              to promote safe use.
            </p>
          </div>
        </div>
      </section>
      <section className="agro-flipper">
        <div className="container agro-flipper-grid">
          <div>
            <span>BIO-PESTICIDE</span>
            <h2>Flipper</h2>
            <p>
              Supporting the transition toward greener agriculture with a
              new-generation bio-insecticide solution for modern crop
              protection.
            </p>
            <a
              href="/documents/agro/Flipper.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View Flipper product information{' '}
              <Icon name="download" size={18} />
            </a>
          </div>
          <div>
            <p className="eyebrow light">GREEN AGRICULTURE</p>
            <h3>A progressive addition to the Ceypetco Agro portfolio.</h3>
            <p>
              Flipper was planned as part of the organisation’s response to the
              newly introduced Green Agriculture concept, complementing
              established insecticide, fungicide and weed-control solutions.
            </p>
          </div>
        </div>
      </section>
      <section className="agro-products-section content-section">
        <div className="container">
          <div className="page-title-row">
            <div>
              <p className="eyebrow">PRODUCT RANGE</p>
              <h2>Solutions for healthier cultivation.</h2>
            </div>
            <p>
              Ceypetco agrochemical products are available across the Sri Lankan
              market at reasonable prices.
            </p>
          </div>
          <div className="agro-product-grid">
            {productGroups.map(([group, products], index) => (
              <article key={group}>
                <div>
                  <span>0{index + 1}</span>
                  <h3>{group}</h3>
                </div>
                <ul>
                  {products.map((product) => (
                    <li key={product}>{product}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="agro-strategy content-section">
        <div className="container agro-strategy-grid">
          <div>
            <p className="eyebrow">OUR BUSINESS STRATEGY</p>
            <h2>
              Quality products, reasonable pricing and delivery when farmers
              need it.
            </h2>
          </div>
          <div>
            <p>
              Automated production equipment supports defect-free output and
              strengthens the competitiveness of the Ceypetco range. The
              organisation continues to preserve farmer confidence by providing
              current guidance to sellers, farmer organisations, agrarian
              service centres and intermediaries.
            </p>
            <p>
              Ceypetco maintains health-care facilities, HSE practices and a
              supportive working environment for agrochemical staff, helping the
              strategic business unit fulfil its national responsibilities and
              sustain goodwill across farming communities.
            </p>
          </div>
        </div>
      </section>
      <section className="division-cta">
        <div className="container">
          <div>
            <p className="eyebrow light">AGROCHEMICAL SUPPORT</p>
            <h2>Connect with our islandwide field team.</h2>
          </div>
          <a href="/contact?subject=Ceypetco%20Agrochemicals">
            Contact Agrochemicals <Icon name="arrow" size={18} />
          </a>
        </div>
      </section>
    </>
  );
}

const oilTypes = [
  ['Brake Fluid', '#ff0000'],
  ['Specialty Oil', '#ffd400'],
  ['Transformer Oil', '#8a8a8a'],
  ['Industrial Oil', '#11bde3'],
  ['Tractor Fluid', '#f5f4c7'],
  ['Transmission Fluid', '#f5a7b7'],
  ['Gear Oil', '#8c0046'],
  ['Marine Engine Oil', '#08678a'],
  ['Gas Fuel Engine Oil', '#99470f'],
  ['Two Stroke Engine Oil', '#9cff20'],
  ['Four Stroke Engine Oil', '#008000'],
  ['Diesel Engine Oil', '#1000ee'],
  ['Petrol Engine Oil', '#ffa300'],
  ['Greases', '#70451f'],
];

function OilTypesChart() {
  return (
    <section className="oil-types-section content-section">
      <div className="container oil-types-layout">
        <div className="oil-types-copy">
          <p className="eyebrow">PRODUCT COVERAGE</p>
          <h2>Oil types distribution.</h2>
          <p>
            A broad lubricant portfolio developed for mobility, industry,
            agriculture, marine operations and specialist applications.
          </p>
          <div className="oil-types-legend">
            {oilTypes.map(([name, color], index) => (
              <div
                style={{
                  '--oil-color': color,
                  '--oil-delay': `${index * 45}ms`,
                }}
                key={name}
              >
                <i></i>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="oil-chart-wrap">
          <div
            className="oil-chart"
            aria-label="Circular chart showing fourteen Ceypetco lubricant categories"
          >
            <div className="oil-chart-centre">
              <b>14</b>
              <span>
                Lubricant
                <br />
                categories
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LubricantsPage() {
  const [query, setQuery] = useState('');
  const filtered = lubricantProducts.filter(({ name }) =>
    name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <section className="lubricant-intro content-section">
        <div className="container lubricant-intro-grid">
          <div className="lubricant-image">
            <img
              src="https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/lubricants-hero.jpg"
              alt="Ceypetco lubricating oil being poured into an engine"
            />
            <span>
              ISO
              <br />
              <b>9001</b>
            </span>
          </div>
          <div>
            <p className="eyebrow">THE BEST FROM THE BEST</p>
            <h2>
              Internationally aligned protection for automotive and industrial
              performance.
            </h2>
            <p>
              All Ceypetco lubricating oils are blended in a plant certified to
              ISO 9001/2000. The Ceypetco lubricant range covers products
              developed to meet relevant international specifications from the
              American Petroleum Institute (API), MTU Friedrichshafen GmbH and
              the European Automobile Manufacturers’ Association (ACEA).
            </p>
            <p>
              Our products serve demanding automotive and industrial
              applications with a focus on quality, consistency and dependable
              protection.
            </p>
            <div className="lubricant-standards">
              <span>API</span>
              <span>ACEA</span>
              <span>MTU</span>
              <span>ISO</span>
            </div>
          </div>
        </div>
      </section>
      <section className="lubricant-purpose">
        <div className="container lubricant-purpose-grid">
          <article>
            <span>01</span>
            <p className="eyebrow">OUR MISSION</p>
            <h3>
              Deliver quality products and total solutions through professional
              expertise, technology and innovation.
            </h3>
            <p>
              To achieve excellence in petroleum refining, sales and marketing
              while meeting stakeholder expectations through a dedicated team,
              an efficient dealer network, high ethical standards and the
              highest concern for health, safety and the environment.
            </p>
          </article>
          <article>
            <span>02</span>
            <p className="eyebrow">OUR VISION</p>
            <h3>
              A premier, customer-driven and environmentally responsible
              petroleum enterprise.
            </h3>
            <p>
              To lead petroleum and related industries in the region while
              contributing meaningfully to the prosperity of Sri Lanka.
            </p>
          </article>
        </div>
      </section>
      <OilTypesChart />
      <section className="lubricant-products content-section">
        <div className="container">
          <div className="lubricant-products-heading">
            <div>
              <p className="eyebrow">PRODUCT INDEX</p>
              <h2>Technical product documents.</h2>
              <p>
                Access locally stored product information and material safety
                datasheets.
              </p>
            </div>
            <label>
              <span>Search product</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search lubricant products..."
              />
            </label>
          </div>
          <div className="lubricant-table">
            <div className="lubricant-table-head">
              <span>Product name</span>
              <span>Product information</span>
              <span>Safety datasheet</span>
            </div>
            {filtered.map((product, index) => (
              <article key={product.name}>
                <div>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <b>{product.name}</b>
                </div>
                <div>
                  {product.tds ? (
                    <a href={product.tds} target="_blank" rel="noreferrer">
                      TDS PDF <Icon name="download" size={16} />
                    </a>
                  ) : (
                    <span>Not available</span>
                  )}
                </div>
                <div>
                  {product.msds ? (
                    <a href={product.msds} target="_blank" rel="noreferrer">
                      MSDS PDF <Icon name="download" size={16} />
                    </a>
                  ) : (
                    <span>Not available</span>
                  )}
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <div className="no-lubricants">
                <h3>No matching products</h3>
                <p>Try a different product name or specification.</p>
              </div>
            )}
          </div>
          <div className="lubricant-table-footer">
            <span>
              Showing {filtered.length} of {lubricantProducts.length} products
            </span>
            <span>Documents open from this website</span>
          </div>
        </div>
      </section>
      <section className="division-cta">
        <div className="container">
          <div>
            <p className="eyebrow light">PRODUCT SUPPORT</p>
            <h2>Need help selecting a lubricant?</h2>
          </div>
          <a href="/contact?subject=Ceypetco%20Lubricants">
            Contact product support <Icon name="arrow" size={18} />
          </a>
        </div>
      </section>
    </>
  );
}

const regionalOffices = [
  [
    'West',
    'Dematagoda',
    'Mr. M C Mendis',
    'Acting Regional Manager',
    '+94 11 729 6457',
    'ro.west@ceypetco.gov.lk',
  ],
  [
    'Sabaragamuwa',
    'Kegalle',
    'K A N D Chandrasena',
    'Acting Regional Manager',
    '+94 35 313 5732',
    'ro.sabaragamuwa@ceypetco.gov.lk',
  ],
  [
    'South',
    'Galle',
    'Mr. D C Edirisinghe',
    'Regional Manager',
    '+94 91 223 4523',
    'ro.south@ceypetco.gov.lk',
  ],
  [
    'Uva',
    'Badulla',
    '',
    'Acting Regional Manager',
    '+94 55 223 1979',
    'ro.uwa@ceypetco.gov.lk',
  ],
  [
    'North Central',
    'Anuradhapura',
    '',
    'Regional Manager',
    '+94 25 222 2374',
    'ro.nc@ceypetco.gov.lk',
  ],
  [
    'North',
    'Jaffna',
    'Mr. S Sivatharan',
    'Regional Manager',
    '+94 21 222 2033',
    'ro.north@ceypetco.gov.lk',
  ],
  [
    'Central',
    'Kandy',
    'Mr. B R M S B Ratnayake',
    'Acting Regional Manager',
    '+94 81 238 8674',
    'ro.central@ceypetco.gov.lk',
  ],
  [
    'North West',
    'Kurunegala',
    'Mr. A G J W Bandara',
    'Regional Manager',
    '+94 37 222 2517',
    'ro.nw@ceypetco.gov.lk',
  ],
  [
    'East',
    'Batticaloa',
    '',
    'Regional Manager',
    '+94 65 222 4429',
    'ro.east@ceypetco.gov.lk',
  ],
];

const bulkConsumerSteps = [
  'Download and submit the duly completed CPC application form.',
  'Submit every supporting document listed in the Documents Required guide.',
  'A CPC officer will visit the location and certify the premises.',
  'CPC will create an account number and issue mobile-app credentials.',
  'Sign the Bulk Consumer Agreement and submit the required bank guarantee.',
  'Install the fuel-ordering application on an Android mobile device.',
  'Pay for monthly fuel requirements through the available online platforms.',
  'Place fuel orders using the registered mobile application.',
];

const bulkConsumerRegions = [
  [
    'Western Province',
    'Colombo · Kalutara · Gampaha',
    'Mr. Chaminda Mendis',
    '0777768546',
  ],
  [
    'Northern Province',
    'Jaffna · Mullaitivu · Kilinochchi · Mannar · Vavuniya',
    'Mr. Sivadaran',
    '0775023457',
  ],
  [
    'North Western Province',
    'Kurunegala · Puttalam',
    'Mr. Bandara',
    '0713473103',
  ],
  [
    'North Central Province',
    'Anuradhapura · Polonnaruwa',
    'Mr. Pethiyagoda',
    '0714395411',
  ],
  [
    'Central Province',
    'Kandy · Nuwara Eliya · Matale',
    'Mr. Rathnayake',
    '0714440471',
  ],
  [
    'Eastern Province',
    'Batticaloa · Trincomalee · Ampara',
    'Mr. Devapriya',
    '0777566455',
  ],
  ['Uva Province', 'Badulla · Monaragala', 'Mr. Wimalasiri', '0774101377'],
  [
    'Southern Province',
    'Galle · Hambantota · Matara',
    'Mr. Chandimal',
    '0777440062',
  ],
];

const bulkConsumerResources = [
  [
    'Application Form',
    'https://ceypetco.gov.lk/wp-content/uploads/2026/04/Consumer-Registration-Application.pdf',
  ],
  [
    'Documents Required',
    'https://ceypetco.gov.lk/wp-content/uploads/2026/04/Documents-Required.pdf',
  ],
  [
    'Bulk Consumer Agreement',
    'https://ceypetco.gov.lk/wp-content/uploads/2026/04/Agreement-for-Bulk-Consumers-Private-Company.pdf',
  ],
  [
    'Bank Guarantee Format',
    'https://ceypetco.gov.lk/wp-content/uploads/2026/04/Guarantee-Format.pdf',
  ],
  ['Fuel Ordering Mobile App', 'https://fuelup.cpstl.lk/apk/'],
];

function InnerPage({ type }) {
  const page = pageData[type] || pageData['/about'];
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [tenders, setTenders] = useState([]);
  const [tendersLoading, setTendersLoading] = useState(true);
  const [notices, setNotices] = useState([]);
  const [noticesLoading, setNoticesLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [supplierResources, setSupplierResources] = useState([]);
  const [supplierSection, setSupplierSection] = useState(null);
  const [careers, setCareers] = useState([]);
  const [careersLoading, setCareersLoading] = useState(true);
  const [annualReports, setAnnualReports] = useState([]);
  const [annualReportsLoading, setAnnualReportsLoading] = useState(true);
  const serviceItems = [
    {
      title: 'New Dealership Registration',
      category: 'Business Services',
      text: 'Start an application to join Ceypetco’s islandwide retail network.',
      image: 'media-3.jpg',
      href: '/contact?subject=New%20Dealership%20Registration&from=services',
    },
    {
      title: 'Regional Offices',
      category: 'Islandwide Support',
      text: 'Find regional contacts serving communities and dealers across Sri Lanka.',
      image: 'head-office.webp',
      href: '/regional-offices?from=services',
    },
    {
      title: 'Fuel Station Services',
      category: 'Digital Services',
      text: 'Access information and support for Ceypetco fuel station operations.',
      image: 'distribution.jpg',
      href: '/#fuel-network',
    },
    {
      title: 'Product Specifications',
      category: 'Technical Information',
      text: 'Review quality and technical information for marketed petroleum products.',
      image: 'media-1.jpg',
      href: 'https://ceypetco.gov.lk/wp-content/uploads/2026/04/Marketing-Sepecifictions.pdf',
    },
    {
      title: 'Supplier Registration',
      category: 'Procurement',
      text: 'Register interest in supplying products and professional services to CPC.',
      image: 'refinery.png',
      href: '/tenders?from=services#supplier-registration',
    },
    {
      title: 'Consumer Registration',
      category: 'Customer Services',
      text: 'Submit consumer information and connect with the appropriate service team.',
      image: 'hero.png',
      href: '/consumer-registration?from=services',
    },
    {
      title: 'Notices',
      category: 'Public Information',
      text: 'Follow important notices and updates from current infrastructure projects.',
      image: 'media-2.jpg',
      href: '/notices?from=services',
    },
    {
      title: 'Projects',
      category: 'Strategic Development',
      text: 'Explore refinery modernization and infrastructure initiatives.',
      image: 'refinery-detail-1.jpg',
      href: '/projects?from=services',
    },
    {
      title: 'Annual Reports',
      category: 'Corporate Publications',
      text: 'Request access to annual reports and key corporate publications.',
      image: 'about-banner.webp',
      href: '/annual-reports?from=services',
    },
    {
      title: 'Right to Information',
      category: 'Public Access',
      text: 'Learn how to submit an official request for public information.',
      image: 'career-team.jpg',
      href: '/right-to-information?from=services',
    },
  ];
  const requestedSubject =
    new URLSearchParams(window.location.search).get('subject') || '';
  const cameFromServices =
    new URLSearchParams(window.location.search).get('from') === 'services';

  useEffect(() => {
    let cancelled = false;
    const loadNews = async () => {
      setNewsLoading(true);
      try {
        const res = await api.get('/admin/news', {
          params: { limit: 50 },
        });
        if (!cancelled) setNews(res.data && res.data.data ? res.data.data : []);
      } catch (err) {
        if (!cancelled) setNews([]);
      } finally {
        if (!cancelled) setNewsLoading(false);
      }
    };
    loadNews();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadTenders = async () => {
      setTendersLoading(true);
      try {
        const res = await api.get('/admin/tenders', {
          params: { limit: 100 },
        });
        if (!cancelled)
          setTenders(res.data && res.data.data ? res.data.data : []);
      } catch (err) {
        if (!cancelled) setTenders([]);
      } finally {
        if (!cancelled) setTendersLoading(false);
      }
    };
    loadTenders();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadNotices = async () => {
      setNoticesLoading(true);
      try {
        const res = await api.get('/admin/notices', {
          params: { limit: 50 },
        });
        if (!cancelled)
          setNotices(res.data && res.data.data ? res.data.data : []);
      } catch (err) {
        if (!cancelled) setNotices([]);
      } finally {
        if (!cancelled) setNoticesLoading(false);
      }
    };
    loadNotices();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadProjects = async () => {
      setProjectsLoading(true);
      try {
        const res = await api.get('/admin/projects', {
          params: { limit: 50 },
        });
        if (!cancelled)
          setProjects(res.data && res.data.data ? res.data.data : []);
      } catch (err) {
        if (!cancelled) setProjects([]);
      } finally {
        if (!cancelled) setProjectsLoading(false);
      }
    };
    loadProjects();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadSupplier = async () => {
      try {
        const [res, sec] = await Promise.all([
          api.get('/admin/supplier-resources'),
          api.get('/admin/supplier-section'),
        ]);
        if (!cancelled) {
          const list = (res.data && res.data.data) || [];
          setSupplierResources([...list].sort((a, b) => a.order - b.order));
          setSupplierSection(sec.data && sec.data.data ? sec.data.data : null);
        }
      } catch (err) {
        if (!cancelled) {
          setSupplierResources([]);
          setSupplierSection(null);
        }
      }
    };
    loadSupplier();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadCareers = async () => {
      setCareersLoading(true);
      try {
        const res = await api.get('/admin/careers/active', {
          params: { limit: 100 },
        });
        if (!cancelled)
          setCareers(res.data && res.data.data ? res.data.data : []);
      } catch (err) {
        if (!cancelled) setCareers([]);
      } finally {
        if (!cancelled) setCareersLoading(false);
      }
    };
    loadCareers();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadAnnualReports = async () => {
      setAnnualReportsLoading(true);
      try {
        const res = await api.get('/admin/annual-reports/active', {
          params: { limit: 100 },
        });
        if (!cancelled)
          setAnnualReports(
            res.data && res.data.data ? res.data.data : []
          );
      } catch (err) {
        if (!cancelled) setAnnualReports([]);
      } finally {
        if (!cancelled) setAnnualReportsLoading(false);
      }
    };
    loadAnnualReports();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="inner-page">
      <section className="page-hero">
        <img src={page.image} alt="" />
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-copy">
          <p className="eyebrow light">{page.label}</p>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <div className="breadcrumbs">
            <a href="/">Home</a>
            <span>/</span>
            <b>{page.label}</b>
          </div>
        </div>
      </section>
      {[
        '/regional-offices',
        '/consumer-registration',
        '/notices',
        '/projects',
        '/annual-reports',
        '/right-to-information',
        '/tenders',
      ].includes(type) && (
        <div className="public-access-backbar">
          <div className="container">
            <a href={cameFromServices ? '/services' : '/#services'}>
              <Icon name="arrow" size={16} />
              {cameFromServices
                ? 'Back to All Services'
                : 'Back to Services & Resources'}
            </a>
          </div>
        </div>
      )}
      {type === '/about' && (
        <div className="subpage-nav">
          <div className="container">
            <span>Discover Ceypetco</span>
            <a className="active" href="/about">
              About us
            </a>
            <a href="/history">Our history</a>
          </div>
        </div>
      )}
      {type === '/history' && (
        <div className="subpage-nav">
          <div className="container">
            <span>Discover Ceypetco</span>
            <a href="/about">About us</a>
            <a className="active" href="/history">
              Our history
            </a>
          </div>
        </div>
      )}
      {divisionPages[type] &&
        ![
          '/refinery',
          '/marketing-sales',
          '/aviation',
          '/agro-chemicals',
          '/lubricants',
        ].includes(type) && <DivisionPage data={divisionPages[type]} />}
      {type === '/refinery' && <RefineryPage />}
      {type === '/marketing-sales' && <MarketingSalesPage />}
      {type === '/aviation' && <AviationPage />}
      {type === '/agro-chemicals' && <AgroChemicalsPage />}
      {type === '/lubricants' && <LubricantsPage />}
      {type === '/history' && <HistoryPage />}
      {type === '/about' && (
        <>
          <ManagementTeam />
          <ManagementDirectory />
        </>
      )}
      {type === '/contact' && <ContactDirectory />}
      {type === '/about' && (
        <>
          <section className="content-section">
            <div className="container story-grid">
              <div>
                <p className="eyebrow">WHO WE ARE</p>
                <h2>Energy security at the heart of everything.</h2>
              </div>
              <div>
                <p>
                  CPC carries on business as an importer, exporter, seller,
                  supplier and distributor of petroleum products, while
                  supporting exploration, production and refining activities
                  that advance the nation.
                </p>
                <p>
                  Established under Act No. 28 of 1961, the Corporation
                  continues to serve households, transport, aviation and
                  industry across Sri Lanka.
                </p>
              </div>
            </div>
          </section>
          <section className="vision-section">
            <div className="container vision-grid">
              <article>
                <span>01</span>
                <p className="eyebrow">OUR VISION</p>
                <h3>To become Asia’s most trusted and premier energy brand.</h3>
              </article>
              <article>
                <span>02</span>
                <p className="eyebrow">OUR MISSION</p>
                <h3>
                  To deliver sustainable energy solutions meeting the highest
                  Quality, Health, Safety and Environment standards.
                </h3>
              </article>
            </div>
          </section>
        </>
      )}
      {type === '/services' && (
        <>
          <section className="services-intro">
            <div className="container services-stats">
              <div>
                <b>09</b>
                <span>
                  Essential public
                  <br />
                  service areas
                </span>
              </div>
              <div>
                <b>Islandwide</b>
                <span>
                  Regional support
                  <br />
                  and operations
                </span>
              </div>
              <div>
                <b>One place</b>
                <span>
                  Clear access to
                  <br />
                  official information
                </span>
              </div>
            </div>
          </section>
          <section className="content-section services-directory">
            <div className="container">
              <div className="page-title-row">
                <div>
                  <p className="eyebrow">EXPLORE SERVICES</p>
                  <h2>How can we help?</h2>
                </div>
                <p>
                  Direct access to frequently used Ceypetco services and
                  information.
                </p>
              </div>
              <div className="directory-grid">
                {serviceItems.map((item, i) => (
                  <article className="service-card" key={item.title}>
                    <a
                      className="service-card-image"
                      href={item.href}
                      target={
                        item.href.startsWith('http') ? '_blank' : undefined
                      }
                      rel={
                        item.href.startsWith('http') ? 'noreferrer' : undefined
                      }
                    >
                      <img src={`https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/${item.image}`} alt="" />
                      <span>0{i + 1}</span>
                    </a>
                    <div className="service-card-body">
                      <p className="eyebrow">{item.category}</p>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <a
                        className="service-card-link"
                        href={item.href}
                        target={
                          item.href.startsWith('http') ? '_blank' : undefined
                        }
                        rel={
                          item.href.startsWith('http')
                            ? 'noreferrer'
                            : undefined
                        }
                      >
                        Access service
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
      {type === '/consumer-registration' && (
        <>
          <section className="bulk-consumer-intro content-section">
            <div className="container bulk-consumer-intro-grid">
              <div>
                <p className="eyebrow">CONSUMER POINT REGISTRATION</p>
                <h2>Bulk customer registration.</h2>
              </div>
              <div>
                <p>
                  Customers consuming more than{' '}
                  <strong>3,300 litres per month</strong> of Industrial Diesel,
                  Industrial Kerosene, Furnace Oil or SBP must register with CPC
                  as Bulk Consumers.
                </p>
                <div className="bulk-fuel-tags">
                  {[
                    'Industrial Diesel',
                    'Industrial Kerosene',
                    'Furnace Oil',
                    'SBP',
                  ].map((fuel) => (
                    <span key={fuel}>{fuel}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bulk-process content-section">
            <div className="container">
              <div className="bulk-section-heading">
                <p className="eyebrow">REGISTRATION PROCESS</p>
                <h2>How to become a bulk consumer.</h2>
              </div>
              <div className="bulk-step-grid">
                {bulkConsumerSteps.map((step, index) => (
                  <article key={step}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{step}</p>
                  </article>
                ))}
              </div>
              <aside className="bulk-important-note">
                <div>
                  <Icon name="clock" size={25} />
                </div>
                <div>
                  <p className="eyebrow light">IMPORTANT ORDERING NOTE</p>
                  <h3>Next-working-day cutoff: 3:00 PM</h3>
                  <p>
                    Delivery allocations are generated automatically on working
                    days. The order must be placed through the mobile app and
                    sufficient funds must be available in the CPC account when
                    allocation is generated. Delivery remains subject to
                    capacity.
                  </p>
                </div>
              </aside>
            </div>
          </section>

          <section className="bulk-resources content-section">
            <div className="container">
              <div className="bulk-section-heading split-heading">
                <div>
                  <p className="eyebrow">DOWNLOADS & RESOURCES</p>
                  <h2>Everything needed to apply.</h2>
                </div>
                <p>Official forms and resources open in a new browser tab.</p>
              </div>
              <div className="bulk-resource-grid">
                {bulkConsumerResources.map(([label, href], index) => (
                  <a href={href} target="_blank" rel="noreferrer" key={label}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <Icon name={index === 4 ? 'app' : 'download'} size={24} />
                    <strong>{label}</strong>
                    <Icon name="arrow" size={17} />
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="bulk-contacts content-section">
            <div className="container">
              <div className="bulk-contact-summary">
                <div>
                  <p className="eyebrow light">FURTHER ASSISTANCE</p>
                  <h2>Bulk consumer support.</h2>
                </div>
                <a href="mailto:ccu@ceypetco.gov.lk">
                  <span>Email</span>
                  <b>ccu@ceypetco.gov.lk</b>
                </a>
                <a href="tel:0117296130">
                  <span>General line</span>
                  <b>011 729 6130</b>
                </a>
              </div>
              <div className="bulk-whatsapp-row">
                <span>WhatsApp assistance</span>
                {[
                  '0744136151',
                  '0744136152',
                  '0744136153',
                  '0744136154',
                  '0744136155',
                  '0744136157',
                ].map((number) => (
                  <a
                    href={`https://wa.me/94${number.slice(1)}`}
                    target="_blank"
                    rel="noreferrer"
                    key={number}
                  >
                    {number}
                  </a>
                ))}
              </div>
              <div className="bulk-regional-heading">
                <p className="eyebrow">REGIONAL ASSISTANCE</p>
                <h3>Regional managers and area supervisors</h3>
              </div>
              <div className="bulk-region-grid">
                {bulkConsumerRegions.map(([region, districts, name, phone]) => (
                  <article key={region}>
                    <small>{region}</small>
                    <h4>{name}</h4>
                    <p>{districts}</p>
                    <a href={`tel:${phone}`}>
                      <Icon name="phone" size={15} /> {phone}
                    </a>
                  </article>
                ))}
              </div>
              <div className="bulk-faq">
                <p className="eyebrow">FREQUENTLY ASKED QUESTION</p>
                <h3>Which fuels are available to industrial customers?</h3>
                <p>
                  Industrial Diesel, Industrial Kerosene, Furnace Oil and SBP.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
      {type === '/regional-offices' && (
        <section className="regional-offices-page content-section">
          <div className="container">
            <div className="regional-offices-heading">
              <div>
                <p className="eyebrow">ISLANDWIDE ASSISTANCE</p>
                <h2>Regional offices</h2>
              </div>
              <p>
                Contact the regional team responsible for customer, dealer and
                operational support in your area.
              </p>
            </div>
            <div className="regional-office-grid">
              {regionalOffices.map(
                ([region, city, manager, role, phone, email], index) => (
                  <article className="regional-office-card" key={region}>
                    <div className="regional-office-top">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <Icon name="building" size={24} />
                    </div>
                    <p className="eyebrow">{region.toUpperCase()} REGION</p>
                    <h3>{city}</h3>
                    <div className="regional-manager">
                      <small>REGIONAL CONTACT</small>
                      {manager && <strong>{manager}</strong>}
                      <span>{role}</span>
                    </div>
                    <div className="regional-contact-links">
                      <a href={`tel:${phone.replaceAll(' ', '')}`}>
                        <Icon name="phone" size={16} />
                        <span>{phone}</span>
                      </a>
                      <a href={`mailto:${email}`}>
                        <span className="contact-at">@</span>
                        <span>{email}</span>
                      </a>
                    </div>
                  </article>
                ),
              )}
            </div>
            <div className="regional-offices-note">
              <Icon name="globe" size={21} />
              <p>
                For general enquiries or assistance identifying the appropriate
                regional office, contact the Ceypetco head office.
              </p>
              <a href="/contact">
                Contact head office <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>
        </section>
      )}
      {type === '/right-to-information' && (
        <section className="rti-page content-section">
          <div className="container">
            <div className="rti-heading">
              <div>
                <p className="eyebrow">RIGHT TO INFORMATION</p>
                <h2>Nominated and Information Officers.</h2>
              </div>
              <p>
                Official points of contact for information requests addressed to
                Ceylon Petroleum Corporation.
              </p>
            </div>

            <div className="rti-intro-panel">
              <div className="rti-mark" aria-hidden="true">
                RTI
              </div>
              <div>
                <p className="eyebrow light">CEYLON PETROLEUM CORPORATION</p>
                <h3>Report of nominated and information officers</h3>
                <p>
                  Use the contact details below to reach the appropriate officer
                  regarding an official Right to Information enquiry.
                </p>
              </div>
              <span>No. 609, Dr. Danister de Silva Road, Colombo 09</span>
            </div>

            <div className="rti-officer-grid">
              {[
                {
                  index: '01',
                  role: 'Nominated Officer',
                  name: 'Mr. K W Samantha Pushpalal',
                  phones: ['+94 11 2106758', '+94 77 3856981'],
                  email: 'dgm.hr@ceypetco.gov.lk',
                },
                {
                  index: '02',
                  role: 'Information Officer',
                  name: 'Ms. R M Y S Rajakaruna',
                  phones: ['+94 11 7296353'],
                  email: 'infor.officer@ceypetco.gov.lk',
                },
              ].map((officer) => (
                <article key={officer.role}>
                  <div className="rti-officer-top">
                    <span>{officer.index}</span>
                    <div>
                      <Icon name="shield" size={24} />
                    </div>
                  </div>
                  <p className="eyebrow">{officer.role.toUpperCase()}</p>
                  <h3>{officer.name}</h3>
                  <div className="rti-address">
                    <small>OFFICIAL ADDRESS</small>
                    <p>No. 609, Dr. Danister de Silva Road, Colombo 09</p>
                  </div>
                  <div className="rti-contact-actions">
                    <div>
                      <small>TELEPHONE</small>
                      {officer.phones.map((phone) => (
                        <a
                          href={`tel:${phone.replaceAll(' ', '')}`}
                          key={phone}
                        >
                          <Icon name="phone" size={15} /> {phone}
                        </a>
                      ))}
                    </div>
                    <div>
                      <small>EMAIL</small>
                      <a href={`mailto:${officer.email}`}>
                        <span>@</span> {officer.email}
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="rti-guidance">
              <div>
                <Icon name="globe" size={22} />
              </div>
              <div>
                <p className="eyebrow">CONTACT GUIDANCE</p>
                <h3>Direct your enquiry to the Information Officer.</h3>
                <p>
                  For general assistance with CPC services, use the main contact
                  directory. For RTI correspondence, use the official officer
                  details shown above.
                </p>
              </div>
              <a href="/contact?subject=Right%20to%20Information">
                General contact directory <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>
        </section>
      )}
      {type === '/annual-reports' && (
        <section className="annual-reports-page content-section">
          <div className="container">
            <div className="annual-reports-heading">
              <div>
                <p className="eyebrow">PUBLICATION ARCHIVE</p>
                <h2>Annual reports.</h2>
              </div>
              <p>
                A chronological archive of CPC corporate reports covering
                operational performance, governance and financial reporting.
              </p>
            </div>

            {annualReportsLoading ? (
              <div className="annual-reports-loading">
                <p className="eyebrow light">LATEST AVAILABLE REPORT</p>
                <p>Loading reports...</p>
              </div>
            ) : annualReports.length === 0 ? (
              <div className="annual-reports-loading">
                <p className="eyebrow light">PUBLICATION ARCHIVE</p>
                <p>No annual reports published yet.</p>
              </div>
            ) : (
              <>
                <article className="annual-report-featured">
                  <div className="annual-report-cover" aria-hidden="true">
                    <span>CEYPETCO</span>
                    <b>{annualReports[0].year}</b>
                    <small>ANNUAL REPORT</small>
                    <i />
                  </div>
                  <div className="annual-report-featured-copy">
                    <p className="eyebrow light">LATEST AVAILABLE REPORT</p>
                    <h3>Annual Report {annualReports[0].year}</h3>
                    <p>
                      Review the latest available published record of Ceylon
                      Petroleum Corporation&rsquo;s performance and activities.
                    </p>
                    <div className="annual-report-meta">
                      <span>
                        <b>{annualReports[0].year}</b> Reporting year
                      </span>
                      <span>
                        <b>PDF</b> English edition
                      </span>
                    </div>
                    {annualReports[0].url && (
                      <a
                        href={annualReports[0].url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download latest report{' '}
                        <Icon name="download" size={17} />
                      </a>
                    )}
                  </div>
                </article>

                <div className="annual-archive-heading">
                  <div>
                    <p className="eyebrow">REPORT LIBRARY</p>
                    <h3>Previous annual reports</h3>
                  </div>
                  <span>
                    {annualReports.length} report
                    {annualReports.length === 1 ? '' : 's'} available
                  </span>
                </div>
                {annualReports.length > 1 ? (
                  <div className="annual-report-grid">
                    {annualReports.slice(1).map((report, index) => (
                      <a
                        href={report.url}
                        target="_blank"
                        rel="noreferrer"
                        key={report._id}
                        style={{ cursor: report.url ? 'pointer' : 'default' }}
                      >
                        <span>{String(index + 2).padStart(2, '0')}</span>
                        <div>
                          <small>ANNUAL REPORT</small>
                          <strong>{report.year}</strong>
                        </div>
                        <div className="annual-download-icon">
                          <Icon name="download" size={18} />
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="annual-reports-loading">
                    <p className="eyebrow light">REPORT LIBRARY</p>
                    <p>More reports will be added to the archive.</p>
                  </div>
                )}
              </>
            )}

            <div className="annual-report-note">
              <Icon name="globe" size={21} />
              <p>
                Reports are presented in the years currently available in the
                CPC publication archive. Selecting a report opens the official
                PDF in a new browser tab.
              </p>
              <a href="/contact?subject=Annual%20report%20enquiry">
                Publication enquiry <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>
        </section>
      )}
      {type === '/projects' && (
        <section className="media-page content-section">
          <div className="container">
            <div className="page-title-row">
              <div>
                <p className="eyebrow">STRATEGIC INITIATIVES</p>
                <h2>Projects & Development</h2>
              </div>
              <p>
                Key infrastructure and modernization projects driving Ceypetco's
                development.
              </p>
            </div>
            {projectsLoading ? (
              <div className="news-grid">
                <div className="news-grid-empty">Loading projects...</div>
              </div>
            ) : projects.length === 0 ? (
              <div className="news-grid">
                <div className="news-grid-empty">No projects published yet.</div>
              </div>
            ) : (
              <div className="news-grid">
                {projects.map((project) => (
                  <article key={project._id}>
                    <div
                      className="news-image"
                      style={{
                        backgroundImage: project.featuredImage
                          ? `url(${project.featuredImage})`
                          : undefined,
                      }}
                    ></div>
                    <div>
                      <p className="eyebrow">{project.category}</p>
                      <h3>{project.title}</h3>
                      {(project.location || project.statusLabel) && (
                        <p className="project-location">
                          {[project.location, project.statusLabel]
                            .filter(Boolean)
                            .join(' · ')}
                        </p>
                      )}
                      <p>{project.summary || project.content}</p>
                      {project.documents && project.documents.length > 0 && (
                        <div className="project-doc-links">
                          {project.documents.map((doc, i) => (
                            <a
                              key={i}
                              href={doc.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {doc.name} <Icon name="download" size={16} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      {type === '/notices' && (
        <section className="notices-page content-section">
          <div className="container">
            <div className="notices-heading">
              <div>
                <p className="eyebrow">PUBLIC INFORMATION</p>
                <h2>Notices, circulars and agreements.</h2>
              </div>
              <p>
                Official statements and downloadable documents published for
                customers, dealers, partners and the public.
              </p>
            </div>
            {!noticesLoading && notices.length === 0 && (
              <div className="notices-featured">
                <div className="notice-featured-index">01</div>
                <div>
                  <p className="eyebrow light">PUBLIC INFORMATION</p>
                  <h3>No notices published yet.</h3>
                </div>
              </div>
            )}

            {notices.length > 0 && (
              <>
                <div className="notices-featured">
                  <div className="notice-featured-index">01</div>
                  <div>
                    <p className="eyebrow light">{notices[0].category}</p>
                    <h3>{notices[0].title}</h3>
                    <p>{notices[0].summary || notices[0].content}</p>
                    {notices[0].document ? (
                      <a
                        href={notices[0].document}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download document <Icon name="download" size={16} />
                      </a>
                    ) : (
                      <small>Official statement</small>
                    )}
                  </div>
                </div>
                <div className="notice-document-grid">
                  {notices.slice(1).map((notice, index) => (
                    <article key={notice._id}>
                      <div className="notice-document-top">
                        <span>{String(index + 2).padStart(2, '0')}</span>
                        <Icon
                          name={notice.document ? 'download' : 'clock'}
                          size={22}
                        />
                      </div>
                      <p className="eyebrow">{notice.category}</p>
                      <h3>{notice.title}</h3>
                      <p>{notice.summary || notice.content}</p>
                      {notice.document ? (
                        <a
                          href={notice.document}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Download document <Icon name="download" size={16} />
                        </a>
                      ) : (
                        <span className="notice-unavailable">
                          Document not available
                        </span>
                      )}
                    </article>
                  ))}
                </div>
              </>
            )}
            <div className="notices-support">
              <Icon name="globe" size={22} />
              <p>
                Need clarification about a notice or circular? Contact Ceypetco
                customer care for assistance.
              </p>
              <a href="/contact?subject=Public%20notice%20enquiry">
                Request clarification <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>
        </section>
      )}
      {type === '/media' && (
        <section className="content-section">
          <div className="container">
            <div className="page-title-row">
              <div>
                <p className="eyebrow">LATEST UPDATES</p>
                <h2>Media & notices</h2>
              </div>
            </div>
            <div className="news-grid">
              {newsLoading ? (
                <p className="news-grid-empty">Loading latest updates...</p>
              ) : news.length === 0 ? (
                <p className="news-grid-empty">
                  No published updates available yet.
                </p>
              ) : (
                news.map((item) => (
                  <article key={item._id}>
                    {item.featuredImage ? (
                      <div
                        className="news-image"
                        style={{
                          backgroundImage: `url(${item.featuredImage})`,
                        }}
                      ></div>
                    ) : (
                      <div className="news-image"></div>
                    )}
                    <div>
                      <p className="eyebrow">
                        {(item.category || 'News')
                          .replace(/-/g, ' ')
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </p>
                      <h3>{item.title}</h3>
                      <p>{item.summary || item.content}</p>
                      <a href="#footer">
                        Read update <Icon name="arrow" size={16} />
                      </a>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      )}
      {type === '/tenders' && (
        <section className="tenders-hub content-section">
          <div className="container">
            <div className="tenders-heading">
              <div>
                <p className="eyebrow">PROCUREMENT PORTAL</p>
                <h2>Tenders and supplier registration.</h2>
              </div>
              <p>
                Commercial, refinery and procurement opportunities, supported by
                supplier registration guidance and application resources.
              </p>
            </div>

            <section
              className="supplier-registration-panel"
              id="supplier-registration"
            >
              <div className="supplier-registration-copy">
                <p className="eyebrow light">
                  {supplierSection
                    ? supplierSection.eyebrow
                    : 'SUPPLIER ACCESS'}
                </p>
                <h3>
                  {supplierSection
                    ? supplierSection.title
                    : 'Registration resources'}
                </h3>
                <p>
                  {supplierSection
                    ? supplierSection.description
                    : 'Guidance and application support for oil suppliers, foreign suppliers, independent inspectors and local contractors.'}
                </p>
              </div>
              <div className="supplier-resource-grid">
                {supplierResources.length === 0 ? (
                  <span className="supplier-resource-empty">
                    No registration resources available yet.
                  </span>
                ) : (
                  supplierResources.map((resource) => (
                    <a
                      href={resource.url || '#'}
                      key={resource._id}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="download" size={16} />
                      <span>{resource.title}</span>
                      <Icon name="arrow" size={14} />
                    </a>
                  ))
                )}
              </div>
            </section>

            {!tendersLoading && tenders.length === 0 && (
              <div className="tender-division">
                <div className="tender-division-heading">
                  <p className="eyebrow">OPEN TENDERS</p>
                  <span>No open opportunities</span>
                </div>
              </div>
            )}

            {[
              'COMMERCIAL DIVISION',
              'REFINERY DIVISION',
              'PROCUREMENTS & STORES DIVISION',
            ].map((division) => {
              const items = tenders.filter((t) => t.division === division);
              if (items.length === 0) return null;
              return (
                <section className="tender-division" key={division}>
                  <div className="tender-division-heading">
                    <p className="eyebrow">{division}</p>
                    <span>{items.length} published opportunities</span>
                  </div>
                  <div className="tender-list">
                    {items.map((item) => (
                      <article key={item._id}>
                        <div>
                          <span className="status">
                            {item.status ? item.status.toUpperCase() : 'OPEN'}
                          </span>
                          <b>{item.reference}</b>
                        </div>
                        <h3>{item.title}</h3>
                        <div>
                          <small>
                            {item.closingDate
                              ? 'Closing date'
                              : 'Availability'}
                          </small>
                          <p>
                            {item.closingDate
                              ? new Date(
                                  item.closingDate,
                                ).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })
                              : 'Open'}
                          </p>
                        </div>
                        <a
                          href={
                            item.documents && item.documents.length
                              ? item.documents[0].url
                              : '#'
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          Download tender <Icon name="download" size={16} />
                        </a>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}

            <div className="tender-rfq-note">
              <div>
                <p className="eyebrow light">REFINERY DIVISION · RFQ</p>
                <h3>Request-for-quotation information</h3>
              </div>
              <a href="/contact?subject=Refinery%20Division%20RFQ">
                Request RFQ details <Icon name="arrow" size={17} />
              </a>
            </div>
          </div>
        </section>
      )}
      {type === '/careers' && (
        <section className="content-section">
          <div className="container career-grid">
            <div>
              <p className="eyebrow">WORK WITH US</p>
              <h2>Build the future of energy.</h2>
              <p>
                Be at the forefront of national development with a team
                committed to safety, reliability and meaningful public service.
              </p>
              <a className="career-button" href="#opportunities">
                View current opportunities <Icon name="arrow" size={17} />
              </a>
            </div>
            <div className="opportunity-card" id="opportunities">
              <div>
                <span>NOW HIRING</span>
                <small>Current opportunities</small>
              </div>
              {careersLoading ? (
                <article>
                  <h3>Loading opportunities...</h3>
                  <p>Please wait</p>
                </article>
              ) : careers.length === 0 ? (
                <article>
                  <h3>No current openings</h3>
                  <p>Please check back later for new vacancies.</p>
                </article>
              ) : (
                careers.map((job) => (
                  <article key={job._id}>
                    <h3>{job.title}</h3>
                    <p>
                      {[job.department, job.location, job.type]
                        .filter(Boolean)
                        .join(' · ') || 'Ceypetco Careers'}
                    </p>
                    <a
                      href={`/contact?subject=${encodeURIComponent(job.title)}`}
                    >
                      <Icon name="arrow" size={18} />
                    </a>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      )}
      {type === '/contact' && (
        <section className="content-section">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">CONTACT INFORMATION</p>
              <h2>Find the right team.</h2>
              <div className="contact-cards">
                {[
                  ['Customer Care', '+94 117 296 130'],
                  ['Head Office', '+94 117 296 100'],
                  ['Refinery', '+94 11 254 1382'],
                  ['Aviation · Katunayake', '+94 11 225 1319'],
                ].map(([name, phone]) => (
                  <article key={name}>
                    <span>
                      <Icon name="phone" size={20} />
                    </span>
                    <div>
                      <small>{name}</small>
                      <a href={`tel:${phone.replaceAll(' ', '')}`}>{phone}</a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <p className="eyebrow">SEND A MESSAGE</p>
              <h3>How can we help?</h3>
              <div className="field-row">
                <input aria-label="Name" placeholder="Your name" />
                <input
                  aria-label="Email"
                  placeholder="Email address"
                  type="email"
                />
              </div>
              <input aria-label="Phone" placeholder="Phone number" />
              <input
                aria-label="Subject"
                placeholder="Subject"
                defaultValue={requestedSubject}
              />
              <textarea
                aria-label="Message"
                placeholder="Your message"
                rows="5"
              ></textarea>
              <button>
                Send message <Icon name="arrow" size={17} />
              </button>
            </form>
          </div>
        </section>
      )}
    </main>
  );
}

function App() {
  const [path, setPath] = useState(
    () => window.location.pathname.replace(/\/$/, '') || '/',
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [navDropClosed, setNavDropClosed] = useState(false);
  const [slide, setSlide] = useState(0);
  const changeSlide = (direction) =>
    setSlide(
      (current) =>
        (current + direction + heroSlides.length) % heroSlides.length,
    );
  const scrollAfterNavigation = (hash) => {
    window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => {
        if (hash)
          document
            .querySelector(hash)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else jumpToPageTop();
      }),
    );
  };

  const handleHeaderNavigation = (event) => {
    const link = event.target.closest('a');
    if (
      !link ||
      link.target === '_blank' ||
      link.hasAttribute('download') ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const url = new URL(link.href, window.location.origin);
    if (url.origin !== window.location.origin) return;
    const nextPath = url.pathname.replace(/\/$/, '') || '/';
    if (nextPath.startsWith('/admin') || nextPath.startsWith('/login')) return;
    if (url.hash && nextPath === path) return;
    event.preventDefault();
    if (!url.hash) jumpToPageTop();
    window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
    setPath(nextPath);
    setMenuOpen(false);
    setNavDropClosed(true);
    scrollAfterNavigation(url.hash);
  };

  useEffect(() => {
    const handlePopState = () => {
      if (!window.location.hash) jumpToPageTop();
      setPath(window.location.pathname.replace(/\/$/, '') || '/');
      scrollAfterNavigation(window.location.hash);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => changeSlide(1), 5000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll(
      [
        '.section-heading',
        '.about-copy',
        '.image-composition',
        '.quick-card',
        '.home-service-card',
        '.home-services-all',
        '.regional-office-card',
        '.bulk-step-grid article',
        '.bulk-resource-grid a',
        '.bulk-region-grid article',
        '.notice-document-grid article',
        '.sorem-impact-grid article',
        '.sorem-detail-grid article',
        '.sorem-timeline article',
        '.annual-report-grid a',
        '.rti-officer-grid article',
        '.division-card',
        '.service-card',
        '.banking-panel',
        '.story-grid',
        '.vision-grid article',
        '.leadership-grid article',
        '.news-grid article',
        '.tender-list article',
        '.career-grid > div',
        '.contact-grid > *',
        '.services-stats > div',
        '.page-title-row',
        '.service-band-inner',
        '.division-story > *',
        '.division-stat-band .container > div',
        '.division-detail-grid > *',
        '.division-cta .container',
        '.history-timeline article',
        '.history-gallery figure',
        '.management-groups details',
        '.contact-location-grid article',
        '.fuel-map-heading > *',
        '.fuel-map-panel',
        '.directory-toolbar > *',
        '.station-results article',
        '.refinery-opening-grid > *',
        '.refinery-photo-strip figure',
        '.refinery-history-grid > *',
        '.refinery-importance-grid article',
        '.process-visual',
        '.process-units-grid > *',
        '.marketing-intro-grid > *',
        '.marketing-stats > div',
        '.pricing-heading > *',
        '.fuel-price-card',
        '.pricing-note',
        '.marketing-resources .container > *',
        '.aviation-opening-grid > *',
        '.aviation-stats > div',
        '.aviation-price-heading > *',
        '.aviation-price-table article',
        '.aviation-fuel-grid article',
        '.aviation-gallery figure',
        '.aviation-payment-grid > *',
        '.aviation-location-grid > article',
        '.agro-opening-grid > *',
        '.agro-cert-grid article',
        '.agro-role-grid > *',
        '.agro-flipper-grid > *',
        '.agro-product-grid article',
        '.agro-strategy-grid > *',
        '.lubricant-intro-grid > *',
        '.lubricant-purpose article',
        '.oil-types-copy > *',
        '.oil-chart-wrap',
        '.lubricant-products-heading > *',
        '.lubricant-table article',
      ].join(','),
    );

    targets.forEach((element, index) => {
      element.classList.add('reveal-item');
      element.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -45px' },
    );

    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [path]);
  return (
    <div className="site-shell" onClick={handleHeaderNavigation}>
      <header className="header">
        <div className="container nav-wrap">
          <a className="brand" href="/">
            <img
              src="https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/ceypetco-logo.png"
              alt="Ceylon Petroleum Corporation logo"
            />
            <span>
              <b>CEYPETCO</b>
              <small>Ceylon Petroleum Corporation</small>
            </span>
          </a>
          <button
            className={`menu-button ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav
            className={menuOpen ? 'nav open' : 'nav'}
            aria-label="Primary navigation"
          >
            <a className={path === '/' ? 'active' : ''} href="/">
              Home
            </a>
            <a className={path === '/about' ? 'active' : ''} href="/about">
              About
            </a>
            <div
              className={`nav-group ${navDropClosed ? 'closed' : ''} ${path === '/services' || divisionPages[path] ? 'active' : ''}`}
              onMouseEnter={() => setNavDropClosed(false)}
            >
              <a href="/services">
                Services{' '}
                <span className="chevron" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </a>
              <div className="nav-dropdown">
                <div className="dropdown-heading">
                  <span>CEYPETCO SERVICES</span>
                  <b>Powering every sector.</b>
                  <p>Explore our operations and public services.</p>
                </div>
                <div className="dropdown-links">
                  <a href="/services">
                    <b>All Services</b>
                    <small>Applications and public access</small>
                  </a>
                  <a href="/refinery">
                    <b>Refinery</b>
                    <small>Operations and capabilities</small>
                  </a>
                  <a href="/marketing-sales">
                    <b>Marketing & Sales</b>
                    <small>Distribution and fuel products</small>
                  </a>
                  <a href="/aviation">
                    <b>Ceypetco Aviation</b>
                    <small>Airport fueling services</small>
                  </a>
                  <a href="/agro-chemicals">
                    <b>Agro Chemicals</b>
                    <small>Crop-protection solutions</small>
                  </a>
                  <a href="/lubricants">
                    <b>Ceypetco Lubricants</b>
                    <small>Automotive and industrial oils</small>
                  </a>
                </div>
              </div>
            </div>
            <a className={path === '/media' ? 'active' : ''} href="/media">
              Media
            </a>
            <a className={path === '/tenders' ? 'active' : ''} href="/tenders">
              Tenders
            </a>
            <a className={path === '/careers' ? 'active' : ''} href="/careers">
              Careers
            </a>
            <a
              className={`nav-cta ${path === '/contact' ? 'current' : ''}`}
              href="/contact"
            >
              <span>Contact us</span> <Icon name="arrow" size={16} />
            </a>
          </nav>
        </div>
      </header>
      {path === '/' ? (
        <main>
          <section
            className="hero"
            id="home"
          >
            <div className="hero-slides">
              {heroSlides.map((item, index) => (
                <img
                  className={`hero-photo hero-photo-${index + 1} ${index === slide ? 'active' : ''}`}
                  src={item.image}
                  alt={item.alt}
                  key={item.image}
                />
              ))}
            </div>
            <div className="hero-shade"></div>
            <div className="container hero-inner">
              <div className="hero-copy-panel" key={slide}>
                <div className="hero-accent"></div>
                <p className="eyebrow light">{heroSlides[slide].eyebrow}</p>
                <h1>{heroSlides[slide].title}</h1>
                <p className="hero-copy">{heroSlides[slide].copy}</p>
                <a className="hero-link" href={heroSlides[slide].href}>
                  {heroSlides[slide].cta} <Icon name="arrow" size={18} />
                </a>
              </div>
            </div>
            <div
              className="hero-slide-progress"
              role="progressbar"
              aria-label="Hero slide progress"
              aria-valuemin="1"
              aria-valuemax={heroSlides.length}
              aria-valuenow={slide + 1}
            >
              <i
                style={{ width: `${((slide + 1) / heroSlides.length) * 100}%` }}
              ></i>
            </div>
            <button
              className="slider-arrow prev"
              onClick={() => changeSlide(-1)}
              aria-label="Previous image"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="slider-arrow next"
              onClick={() => changeSlide(1)}
              aria-label="Next image"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <div className="slider-dots">
              {heroSlides.map((item, index) => (
                <button
                  className={index === slide ? 'active' : ''}
                  onClick={() => setSlide(index)}
                  aria-label={`Show image ${index + 1}`}
                  key={item.image}
                ></button>
              ))}
            </div>
          </section>
          <section className="about section" id="about">
            <div className="container about-grid">
              <div className="image-composition">
                <div className="image-main">
                  <img
                    src="https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/distribution.jpg"
                    alt="Ceypetco fuel distribution truck in Sri Lanka"
                  />
                </div>
                <div className="experience">
                  <b>60+</b>
                  <span>
                    years serving
                    <br />
                    the nation
                  </span>
                </div>
                <div className="red-strokes">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
              </div>
              <div className="about-copy">
                <p className="eyebrow">ABOUT CEYPETCO</p>
                <h2>
                  Every drop powers
                  <br />
                  national progress.
                </h2>
                <p>
                  Ceylon Petroleum Corporation plays a vital role in the
                  national economy through the continuous supply of petroleum
                  products. We are committed to assuring uninterrupted fuel
                  supply so Sri Lanka can keep moving toward resilient economic
                  growth.
                </p>
                <div className="promise-grid">
                  <div>
                    <Icon name="shield" size={30} />
                    <h3>Energy Security</h3>
                    <p>
                      Safeguarding a reliable petroleum supply for the country.
                    </p>
                  </div>
                  <div>
                    <Icon name="droplet" size={30} />
                    <h3>Trusted Supply</h3>
                    <p>
                      Supporting transport, commerce and communities islandwide.
                    </p>
                  </div>
                </div>
                <a className="text-link" href="#divisions">
                  See our operations <Icon name="arrow" size={17} />
                </a>
              </div>
            </div>
          </section>
          <section className="home-services" id="services">
            <div className="container">
              <div className="home-services-heading">
                <div>
                  <p className="eyebrow">PUBLIC ACCESS</p>
                  <h2>Services and resources.</h2>
                </div>
                <p>
                  Applications, digital tools, publications and information for
                  customers, dealers and business partners.
                </p>
              </div>
              <div className="home-services-grid">
                {services.map(([icon, title, text, href], index) => (
                  <a className="home-service-card" href={href} key={title}>
                    <span className="home-service-icon">
                      <Icon name={icon} size={25} />
                    </span>
                    <span className="home-service-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <span className="home-service-link">
                      Access service <Icon name="arrow" size={15} />
                    </span>
                  </a>
                ))}
                <a className="home-services-all" href="/services">
                  <span>Complete service directory</span>
                  <Icon name="arrow" size={22} />
                </a>
              </div>
            </div>
          </section>
          <section className="operations section" id="divisions">
            <div className="container">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">OUR OPERATIONS</p>
                  <h2>
                    One corporation.
                    <br />A nation in motion.
                  </h2>
                </div>
                <p>
                  From refining and distribution to specialised sectors, our
                  operations work together to serve Sri Lanka’s energy needs.
                </p>
              </div>
              <div className="division-grid">
                {divisions.map(([title, text, image, href], i) => (
                  <article className="division-card" key={title}>
                    <img src={image} alt="" />
                    <div className="division-overlay"></div>
                    <span className="division-index">0{i + 1}</span>
                    <div className="division-content">
                      <h3>{title}</h3>
                      <p>{text}</p>
                      <a href={href}>
                        <Icon name="arrow" size={20} />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section className="service-band">
            <div className="container service-band-inner">
              <div>
                <p className="eyebrow light">PUBLIC SERVICES</p>
                <h2>
                  Everything you need,
                  <br />
                  in one place.
                </h2>
              </div>
              <div className="service-links">
                {[
                  [
                    'Product Specifications',
                    'https://ceypetco.gov.lk/wp-content/uploads/2026/04/Marketing-Sepecifictions.pdf',
                  ],
                  ['Supplier Registration', '/tenders#supplier-registration'],
                  ['Consumer Registration', '/consumer-registration'],
                  ['Annual Reports', '/annual-reports'],
                  ['Right to Information', '/right-to-information'],
                  ['Notices & Projects', '/notices'],
                ].map(([item, href]) => (
                  <a href={href} key={item}>
                    {item}
                    <Icon name="arrow" size={17} />
                  </a>
                ))}
              </div>
            </div>
          </section>
          <div id="fuel-network">
            <FuelDistributionMap />
          </div>
          <section className="banking section legacy-banking">
            <div className="container banking-panel">
              <div className="banking-copy">
                <p className="eyebrow">ONLINE BANKING</p>
                <h2>Pay with confidence.</h2>
                <p>
                  Access secure online payment services through our trusted
                  banking partners.
                </p>
                <div className="secure-note">
                  <span>
                    <Icon name="shield" size={18} />
                  </span>
                  <div>
                    <b>Secure payment access</b>
                    <small>
                      You will continue through the selected bank’s official
                      service.
                    </small>
                  </div>
                </div>
              </div>
              <div className="banking-partners">
                <div className="partners-heading">
                  <span>SELECT YOUR BANK</span>
                  <small>Official payment partners</small>
                </div>
                <div className="bank-logos">
                  {[
                    ['boc.png', 'Bank of Ceylon'],
                    ['peoples.png', "People's Bank"],
                    ['hnb.png', 'HNB'],
                    ['sampath.png', 'Sampath Bank'],
                  ].map(([src, alt]) => (
                    <a
                      href="#footer"
                      className="bank-card"
                      key={src}
                      aria-label={`Continue with ${alt}`}
                    >
                      <span className="bank-image">
                        <img src={`https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/${src}`} alt={alt} />
                      </span>
                      <span className="bank-action">
                        Continue <Icon name="arrow" size={15} />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="payment-options section">
            <div className="container">
              <div className="payment-heading">
                <p className="eyebrow">SECURE PAYMENT OPTIONS</p>
                <h2>Online banking</h2>
                <p>Continue with one of our official banking partners.</p>
              </div>
              <div className="payment-logo-row bank-payment-row">
                {[
                  ['boc.png', 'Bank of Ceylon'],
                  ['peoples.png', "People's Bank"],
                  ['hnb.png', 'HNB'],
                  ['sampath.png', 'Sampath Bank'],
                ].map(([src, alt]) => (
                  <a
                    href="#footer"
                    key={src}
                    aria-label={`Continue with ${alt}`}
                  >
                    <img src={`https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/${src}`} alt={alt} />
                  </a>
                ))}
              </div>
              <div className="aviation-payment-heading">
                <span />
                <h3>Aviation fuelling</h3>
                <span />
                <p>
                  Accepted card networks for eligible aviation transactions.
                </p>
              </div>
              <div className="payment-logo-row card-payment-row">
                {[
                  ['visa.svg', 'Visa'],
                  ['unionpay.svg', 'UnionPay'],
                  ['jcb.svg', 'JCB'],
                  ['mastercard.svg', 'Mastercard'],
                ].map(([src, alt]) => (
                  <div key={src}>
                    <img src={`https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/${src}`} alt={alt} />
                  </div>
                ))}
              </div>
              <div className="payment-security-note">
                <Icon name="shield" size={17} />
                <span>
                  Payment availability is subject to the selected service and
                  customer arrangement.
                </span>
              </div>
            </div>
          </section>
        </main>
      ) : districtFromPath(path) ? (
        <FuelStationPage district={districtFromPath(path)} />
      ) : (
        <InnerPage type={path} />
      )}
      <footer id="footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <div className="footer-brand-lockup">
              <img
                src="https://res.cloudinary.com/e9fb61tl/image/upload/f_auto,q_auto/ceypetco/images/ceypetco-logo.png"
                alt="Ceylon Petroleum Corporation logo"
              />
              <div>
                <h3>Ceylon Petroleum Corporation</h3>
                <span>CEYPETCO · SRI LANKA</span>
              </div>
            </div>
            <p>
              Delivering dependable petroleum products and energy services that
              support mobility, industry and national progress.
            </p>
            <a className="footer-brand-link" href="/about">
              About the corporation <Icon name="arrow" size={16} />
            </a>
          </div>
          <nav className="footer-links" aria-label="Corporation links">
            <h4>Corporation</h4>
            <a href="/about">About us</a>
            <a href="/history">Our history</a>
            <a href="/services">All services</a>
            <a href="/careers">Careers</a>
            <a href="/contact">Contact us</a>
          </nav>
          <nav className="footer-links" aria-label="Public resource links">
            <h4>Public resources</h4>
            <a href="/marketing-sales">Fuel pricing</a>
            <a href="/tenders">Tenders</a>
            <a href="/notices">Notices</a>
            <a href="/annual-reports">Annual reports</a>
            <a href="/right-to-information">Right to Information</a>
          </nav>
          <div className="footer-contact">
            <h4>Head office</h4>
            <div className="footer-contact-item">
              <Icon name="building" size={19} />
              <p>
                No. 609, Dr. Danister de Silva Mawatha, Colombo 09, Sri Lanka.
              </p>
            </div>
            <div className="footer-contact-item">
              <Icon name="phone" size={19} />
              <div>
                <span>General line</span>
                <a href="tel:+94117296100">+94 11 7296 100</a>
              </div>
            </div>
            <div className="footer-contact-item">
              <Icon name="globe" size={19} />
              <div>
                <span>Email</span>
                <a href="mailto:secretariat@ceypetco.gov.lk">
                  secretariat@ceypetco.gov.lk
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>Â© 2026 Ceylon Petroleum Corporation</span>
          <span>Powering progress. Serving the nation.</span>
        </div>
      </footer>
    </div>
  );
}
export default App;
