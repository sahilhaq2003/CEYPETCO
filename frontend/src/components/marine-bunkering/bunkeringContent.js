import {
  Container,
  Boxes,
  ShipWheel,
  Package,
  Anchor,
  LifeBuoy,
  Fuel,
  Droplet,
  Gauge,
  FlaskConical,
  Leaf,
  ClipboardCheck,
  FileCheck,
  Cable,
  Ruler,
  Radio,
  Cog,
  ShieldCheck,
  Route,
  Factory,
  Globe,
  Building2,
  Compass,
  Ship,
  CalendarClock,
} from 'lucide-react';

export const VESSEL_TYPES = [
  {
    title: 'Container Ships',
    text: 'Vessels carrying containerised cargo on scheduled liner routes.',
    icon: Container,
  },
  {
    title: 'Bulk Carriers',
    text: 'Vessels transporting dry bulk commodities such as grain, ore and coal.',
    icon: Boxes,
  },
  {
    title: 'Tankers',
    text: 'Vessels built to carry liquid cargoes in bulk.',
    icon: ShipWheel,
  },
  {
    title: 'General Cargo Vessels',
    text: 'Vessels handling mixed and project cargo across regional trades.',
    icon: Package,
  },
  {
    title: 'Offshore Support Vessels',
    text: 'Specialist craft supporting offshore and marine operations.',
    icon: Anchor,
  },
  {
    title: 'Commercial Marine Craft',
    text: 'Workboats, tugs and other commercial marine vessels.',
    icon: LifeBuoy,
  },
];

export const MARINE_FUELS = [
  {
    title: 'Marine Diesel',
    text: 'Marine Diesel is used in marine diesel engines and auxiliary machinery depending on vessel specifications and operating requirements.',
    icon: Fuel,
  },
  {
    title: 'Marine Fuel Oil',
    text: 'Marine Fuel Oil supports marine propulsion applications where vessel machinery and onboard fuel-treatment systems are designed for the applicable fuel grade.',
    icon: Droplet,
  },
];

export const WHY_SRI_LANKA = [
  {
    title: 'Strategic Location',
    text: 'Sri Lanka is positioned close to major international maritime routes connecting Asia, the Middle East, Africa and Europe.',
    icon: Globe,
  },
  {
    title: 'Major Maritime Infrastructure',
    text: "Sri Lanka's ports support an extensive ecosystem of shipping, logistics, petroleum handling and maritime services.",
    icon: Building2,
  },
  {
    title: 'Petroleum Infrastructure',
    text: "Established petroleum storage, distribution, terminal and port facilities support the country's marine fuel supply chain.",
    icon: Factory,
  },
  {
    title: 'Expanding Capabilities',
    text: "Ongoing infrastructure development continues to strengthen Sri Lanka's capabilities as a regional maritime services location.",
    icon: Route,
  },
];

export const BUNKERING_STEPS = [
  {
    step: '01',
    title: 'Submit requirements',
    text: 'The vessel operator or agent shares the fuel grade, estimated quantity, vessel details and intended port call.',
    icon: ClipboardCheck,
  },
  {
    step: '02',
    title: 'Confirm the supply plan',
    text: 'Product availability, specifications, delivery method and timing are reviewed for the requested call.',
    icon: CalendarClock,
  },
  {
    step: '03',
    title: 'Coordinate at port',
    text: 'The vessel, supplier and port teams align on berth or anchorage, access and the agreed transfer arrangements.',
    icon: Compass,
  },
  {
    step: '04',
    title: 'Complete safety checks',
    text: 'The teams verify equipment, communication, transfer procedures and required documentation before pumping begins.',
    icon: FileCheck,
  },
  {
    step: '05',
    title: 'Transfer and monitor',
    text: 'Fuel is delivered through the agreed system while flow, quantity and operating conditions are monitored.',
    icon: Cable,
  },
  {
    step: '06',
    title: 'Close out delivery',
    text: 'The delivered quantity is checked, transfer equipment is secured and the applicable delivery records are completed.',
    icon: ClipboardCheck,
  },
];

export const QUALITY_CARDS = [
  {
    title: 'Density',
    text: 'An important measurement used in fuel quantity and quality assessment.',
    icon: Gauge,
  },
  {
    title: 'Viscosity',
    text: 'A key property affecting fuel handling, pumping and combustion characteristics.',
    icon: Droplet,
  },
  {
    title: 'Sulphur Content',
    text: 'An important environmental and regulatory characteristic associated with marine fuels.',
    icon: FlaskConical,
  },
];

export const SAFETY_ITEMS = [
  { title: 'Pre-bunkering inspections', icon: ClipboardCheck },
  { title: 'Pipeline readiness', icon: Cable },
  { title: 'Transfer hose checks', icon: Ruler },
  { title: 'Fuel measurement', icon: Gauge },
  { title: 'Operational communication', icon: Radio },
  { title: 'Equipment monitoring', icon: Cog },
  { title: 'Post-bunkering checks', icon: ShieldCheck },
  { title: 'Documentation', icon: FileCheck },
];

export const COMPLIANCE_BADGES = [
  { title: 'IMO Requirements', icon: Ship },
  { title: 'MARPOL Annex VI', icon: Leaf },
  { title: 'Safety Procedures', icon: ClipboardCheck },
  { title: 'Fuel Quality Monitoring', icon: FlaskConical },
  { title: 'Environmental Responsibility', icon: Leaf },
];

export const BUNKERING_STATS = [
  { value: '1971', label: "Bunkering added to CPC's operational scope" },
  { value: '2021', label: 'CPC re-entered bunkering as a strategic business activity' },
  { value: '62.77 Mn L', label: 'Marine fuel sales reported for 2021', historical: true },
  { value: 'Rs. 6.6 Bn', label: 'Bunkering revenue reported for 2021', historical: true },
];

export const BUNKERING_MILESTONES = [
  {
    year: '1961',
    text: 'Ceylon Petroleum Corporation established under Act No. 28 of 1961.',
  },
  { year: '1962', text: 'CPC commenced commercial operations.' },
  { year: '1969', text: 'Petroleum refinery operations commenced.' },
  {
    year: '1971',
    text: "Bunkering and aviation refuelling were added to CPC's operational scope.",
  },
  {
    year: '2021',
    text: 'CPC re-entered the bunkering business as a strategic business activity.',
  },
  {
    year: '2021',
    text: 'CPC reported approximately 62.77 million litres of Marine Diesel and Marine Fuel Oil sales through its bunkering activities.',
  },
  {
    year: '2025',
    text: "Additional bunker fuel pipeline and loading infrastructure at Colombo Port's South Jetty entered operation.",
  },
];

export const BUNKERING_FAQS = [
  {
    question: 'What is marine bunkering?',
    answer:
      'Marine bunkering is the supply of fuel to ships for propulsion, auxiliary engines and other onboard energy requirements.',
  },
  {
    question: "What marine fuels are associated with CPC's bunkering operations?",
    answer:
      'CPC has historically reported Marine Diesel and Marine Fuel Oil as products supplied through its bunkering activities. Current availability and specifications should be confirmed for individual requirements.',
  },
  {
    question: 'Where are bunkering operations supported?',
    answer:
      "Colombo is one of Sri Lanka's principal maritime and bunkering locations, supported by port, petroleum storage, transfer and marine-service infrastructure.",
  },
  {
    question: 'How is bunker fuel quality managed?',
    answer:
      'Marine fuel handling includes monitoring relevant fuel characteristics and ensuring conformity with applicable product and operational specifications.',
  },
  {
    question: 'Are bunkering operations regulated?',
    answer:
      'Marine bunkering operates within applicable petroleum, port, maritime, environmental and safety requirements, including relevant international maritime requirements.',
  },
];
