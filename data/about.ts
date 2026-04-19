export const credentials = ["FIA", "FNAS", "Board Director", "Co-Founder", "Former President NAS", "IAA Vice Chair"];

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
    headline: "Building the infrastructure Africa's actuarial profession needed.",
    body: "Co-founded the African Actuarial Development Academy, a pan-African body created by actuaries in Africa, for actuaries in Africa. Operating in English and French across the continent. Provided technical support for Nigeria's first-ever mortality table. As President of the Nigerian Actuarial Society, secured IAA Full Member Status for Nigeria, a historic milestone.",
    stats: [
      { value: "1st", label: "Mortality table in Nigeria" },
      { value: "IAA", label: "Full membership secured" },
      { value: "2024", label: "AADA co-founded" },
    ],
    bg: "#080808",
  },
  {
    index: "02",
    tag: "BOARD DIRECTOR",
    headline: "Risk. Governance. Strategic oversight at the highest level.",
    body: "Currently serving as Independent Non-Executive Director at Tangerine Life Insurance, chairing the Enterprise Risk Management and Technical Committee, and on Audit and Remuneration Committees. Serves on the inaugural board of NCGC, the Federal Government-backed institution unlocking MSME financing across Nigeria, inaugurated by Vice President Kashim Shettima.",
    stats: [
      { value: "2", label: "Active board seats" },
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
  {
    index: "05",
    tag: "GLOBAL VOICE",
    headline: "Representing Africa's actuarial interests on the world stage.",
    body: "Vice Chair of the IAA Africa Subcommittee, representing the continent at the International Actuarial Association. Speaker at IBW Women in Insurance Summit in London, COP30 IAA delegation, SCGN 20th Annual Conference, Convention A, and actuview Speaker of the Month. A consistent voice for African actuarial excellence in global forums.",
    stats: [
      { value: "6+", label: "International stages" },
      { value: "IAA", label: "Vice Chair, Africa" },
      { value: "2", label: "Continents represented" },
    ],
    bg: "#080808",
  },
];

export const statsStrip = [
  { n: "20+", l: "YEARS" },
  { n: "10", l: "ROLES" },
  { n: "8", l: "MARKETS" },
  { n: "3", l: "COUNTRIES" },
  { n: "2", l: "CONTINENTS" },
  { n: "1", l: "DIRECTION" },
];
