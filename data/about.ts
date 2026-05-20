export const credentials = ["FIA", "FNAS", "Board Director", "Co-Founder"];

export interface Achievement {
  index: string;
  tag: string;
  headline: string;
  body: string;
  stats: { value: string; label: string }[];
  bg: string;
}

export const achievements: Achievement[] = [
  {
    index: "01",
    tag: "INSTITUTION BUILDER",
    headline: "Setting the technical standards Nigeria's profession runs on.",
    body: "Technical Lead of Nigeria's inaugural Mortality Table — the first actuarial data infrastructure of its kind in the country. Chair of the NAS/NAICOM Discount Rate Committee, whose monthly risk-free yield curve every Nigerian insurer applies under IFRS 17. I don't just work in the profession. I set its standards.",
    stats: [
      { value: "1st", label: "Mortality table in Nigeria" },
      { value: "IFRS 17", label: "Discount rate I set" },
    ],
    bg: "#080808",
  },
  {
    index: "02",
    tag: "BOARD DIRECTOR",
    headline: "Risk. Governance. Strategic oversight at the highest level.",
    body: "Independent Non-Executive Director at Tangerine Life Insurance (chairing ERM & Technical Committee) and at NCGC, the Federal Government-backed institution unlocking MSME financing inaugurated by Vice President Kashim Shettima. Governor of the Corporation of East Surrey College. Three active governance seats across financial services and education.",
    stats: [
      { value: "3", label: "Active board seats" },
      { value: "FG", label: "Backed institution" },
      { value: "ERM", label: "Committee chair" },
    ],
    bg: "#0F1F3D",
  },
  {
    index: "03",
    tag: "EXECUTIVE LEADER",
    headline: "40% revenue growth. 2nd fastest growing non-life insurer in Cameroon.",
    body: "As Managing Director of Prudential Beneficial General, led the company to become the 2nd fastest growing non-life insurance firm in Cameroon, with 40% revenue growth in 2021. Progressed from Group CRO to Chief Actuary to Managing Director across Cameroon, Togo, and Côte d'Ivoire, delivering P&L ownership across two markets in a bilingual operating environment.",
    stats: [
      { value: "40%", label: "Revenue growth" },
      { value: "2nd", label: "Fastest growing in Cameroon" },
      { value: "3", label: "Countries led" },
    ],
    bg: "#080808",
  },
  {
    index: "04",
    tag: "RISK ARCHITECT",
    headline: "One Enterprise Risk Framework. Eight African markets.",
    body: "Designed and deployed the Enterprise Risk Management framework across Prudential Africa's entire footprint: Kenya, Ghana, Nigeria, Uganda, Zambia, Cameroon, Togo, and Côte d'Ivoire. A continent-wide governance architecture built from the ground up, ensuring consistent risk standards across eight diverse regulatory environments.",
    stats: [
      { value: "8", label: "Markets covered" },
      { value: "1", label: "Unified ERM framework" },
      { value: "4", label: "Years architecting it" },
    ],
    bg: "#0F1F3D",
  },
];

