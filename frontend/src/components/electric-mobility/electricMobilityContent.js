import {
  MapPin,
  Plug,
  Zap,
  BatteryCharging,
  ShieldCheck,
  Network,
  Building2,
  Route,
  Gauge,
  ClipboardCheck,
  FileCheck,
  Cable,
  Radio,
  Activity,
  Search,
  Ruler,
  Settings,
  Compass,
  Wrench,
  Timer,
  Landmark,
  Leaf,
  Lightbulb,
  Recycle,
  TrendingUp,
} from 'lucide-react';

export const ABOUT_PARAGRAPHS = [
  "Sri Lanka's transportation sector is evolving as electric vehicles become an increasingly important part of the country's mobility landscape. Ceylon Petroleum Corporation is responding to this transition by extending its role in transportation energy beyond conventional liquid fuels.",
  'Through the development of electric vehicle charging infrastructure at strategically selected locations, CEYPETCO is supporting the growth of a more accessible and future-ready mobility network.',
  'Selected CEYPETCO locations can progressively evolve from conventional fuel stations into broader multi-energy mobility locations capable of serving both traditional and emerging vehicle-energy requirements.',
];

export const ABOUT_IMAGE = {
  src: '/images/electric-mobility/ev-charging-station-1448.webp',
  srcSet: '/images/electric-mobility/ev-charging-station-720.webp 720w, /images/electric-mobility/ev-charging-station-1448.webp 1448w',
  alt: 'Illustrative view of an electric vehicle connected to a roadside charger',
};

export const EV_STATS = [
  {
    value: '10',
    label: 'Initial CPC filling stations identified for EV charging development',
    icon: Landmark,
  },
  {
    value: 'Rs. 50 Mn',
    label: 'Estimated cost reported for the initial charging-centre programme',
    icon: Gauge,
  },
  {
    value: 'Rs. 100 Mn',
    label: 'Reported allocation for further EV charging development in 2025',
    icon: TrendingUp,
  },
];

export const EV_LOCATIONS = [
  'Hikkaduwa',
  'Divulapitiya',
  'Ethulkotte',
  'Kadawatha',
  'Kalutara',
  'Peliyagoda',
];

export const EV_LOCATION_FIELDS = [
  { label: 'Status', value: 'Confirm before travel' },
  { label: 'Charger Type', value: 'Not published' },
  { label: 'Connector', value: 'Not published' },
  { label: 'Charging Power', value: 'Not published' },
  { label: 'Operating Hours', value: 'Not published' },
  { label: 'Current Tariff', value: 'Not published' },
];

export const CHARGING_TECHNOLOGY = [
  {
    title: 'AC Charging',
    icon: Plug,
    text: "AC charging is commonly used where vehicles remain connected for longer periods. The vehicle's onboard charging system converts alternating current into the direct current required by the battery.",
  },
  {
    title: 'DC Fast Charging',
    icon: Zap,
    text: 'DC fast charging supplies direct current to a compatible vehicle battery and can provide faster charging than conventional AC charging, depending on both the charging equipment and the vehicle.',
  },
];

export const CHARGING_STEPS = [
  {
    step: '01',
    title: 'Locate a Charging Point',
    text: 'Identify a reported charging location and confirm its current operating status before travelling.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Park Safely',
    text: 'Position the vehicle correctly within the designated EV charging area.',
    icon: MapPin,
  },
  {
    step: '03',
    title: 'Connect Your Vehicle',
    text: 'Connect the compatible charging connector according to the vehicle and charging-station instructions.',
    icon: Cable,
  },
  {
    step: '04',
    title: 'Start Charging',
    text: 'Begin the charging session using the process provided at the station.',
    icon: Zap,
  },
  {
    step: '05',
    title: 'Complete & Disconnect',
    text: 'After charging is complete, end the charging session correctly, disconnect the vehicle and return the connector safely.',
    icon: BatteryCharging,
  },
];

export const SITE_DEVELOPMENT_STEPS = [
  { title: 'Location Identification', icon: MapPin },
  { title: 'Feasibility Assessment', icon: Compass },
  { title: 'Electrical Load Assessment', icon: Gauge },
  { title: 'Technical Design', icon: Ruler },
  { title: 'Installation', icon: Wrench },
  { title: 'Testing', icon: ClipboardCheck },
  { title: 'Commissioning', icon: FileCheck },
  { title: 'Performance Monitoring', icon: Activity },
];

export const SAFETY_CARDS = [
  {
    title: 'Electrical Safety',
    icon: ShieldCheck,
    text: 'Charging infrastructure should operate in accordance with applicable electrical safety requirements.',
  },
  {
    title: 'Grid Integration',
    icon: Network,
    text: 'Site development includes consideration of electrical loads and grid-connection requirements.',
  },
  {
    title: 'Testing & Commissioning',
    icon: ClipboardCheck,
    text: 'Charging systems require appropriate testing and commissioning before operational use.',
  },
  {
    title: 'Performance Monitoring',
    icon: Activity,
    text: 'Installed charging infrastructure requires monitoring to support reliable and safe operation.',
  },
];

export const EV_BENEFITS = [
  {
    title: 'Strategic Locations',
    icon: MapPin,
    text: "Making use of established locations within Sri Lanka's transport and petroleum network.",
  },
  {
    title: 'Growing Network',
    icon: Network,
    text: 'Supporting the progressive development of EV charging infrastructure as mobility needs change.',
  },
  {
    title: 'Multi-Energy Future',
    icon: BatteryCharging,
    text: "Extending CEYPETCO's transportation-energy role beyond conventional petroleum products.",
  },
  {
    title: 'National Infrastructure',
    icon: Building2,
    text: "Supporting the wider infrastructure needed for Sri Lanka's evolving transport-energy landscape.",
  },
];

export const SUSTAINABILITY_PARAGRAPHS = [
  'Electric mobility can contribute to reducing direct vehicle tailpipe emissions while supporting the broader evolution of transportation-energy systems.',
  "CEYPETCO's development of EV charging infrastructure represents an expansion of its traditional transportation-energy role and supports the growing infrastructure requirements associated with electric vehicle adoption.",
];

export const INFO_REQUIRED_OPTIONS = [
  'Charging Availability',
  'Current Tariff',
  'Charger Type',
  'Connector Compatibility',
  'Charging Capacity',
  'Operating Hours',
  'Payment Information',
  'Other',
];

export const EV_FAQS = [
  {
    question: 'What is CEYPETCO EV Charging?',
    answer:
      "CEYPETCO EV Charging forms part of CPC's developing electric-mobility infrastructure aimed at supporting electric vehicle charging at selected locations.",
  },
  {
    question: 'Does CEYPETCO support fast charging?',
    answer:
      "CEYPETCO's EV charging development work includes AC and DC charging infrastructure. Individual station specifications should be confirmed before travel.",
  },
  {
    question: 'Where are CEYPETCO charging stations located?',
    answer:
      'Reported locations include Hikkaduwa, Divulapitiya, Ethulkotte, Kadawatha, Kalutara and Peliyagoda. Current station availability should be confirmed before use.',
  },
  {
    question: 'How much does EV charging cost?',
    answer:
      'Current tariffs may vary and should be confirmed using the latest CEYPETCO charging information.',
  },
  {
    question: 'How long does EV charging take?',
    answer:
      'Charging time depends on the charging equipment, vehicle model, battery size, current battery level, battery condition and supported charging rate.',
  },
  {
    question: 'Can every electric vehicle use every charger?',
    answer:
      "No. The vehicle's charging connector and supported charging standard must be compatible with the charging equipment available at the location.",
  },
];

export const EV_SECTION_ICONS = {
  safety: ShieldCheck,
  initiative: Lightbulb,
  technology: Zap,
  process: Route,
  development: Settings,
  sustainability: Leaf,
  location: MapPin,
  radio: Radio,
  recycle: Recycle,
  timer: Timer,
};
