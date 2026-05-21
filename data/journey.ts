export interface JourneyStop {
  year: string;
  city: string;
  country: string;
  org: string;
  role: string;
  bullets: string[];
  bg: string;
  accent: string;
}

export const stops: JourneyStop[] = [
  {
    // London — institutional, cold. Where it started.
    year: "2004",
    city: "LONDON",
    country: "UNITED KINGDOM",
    org: "Deloitte UK",
    role: "Manager, Actuarial",
    bullets: [
      "Led actuarial engagements across pensions, life assurance, and investment for UK clients over a decade.",
      "Led buy-side due diligence for the acquisitions of Prudential Ghana and Prudential Kenya.",
    ],
    bg: "#0C1018",
    accent: "#86BC25",
  },
  {
    // Lagos — warm earth. First move to the continent.
    year: "2014",
    city: "LAGOS",
    country: "NIGERIA",
    org: "Old Mutual Nigeria",
    role: "Actuarial Executive & Chief Risk Officer",
    bullets: [
      "Built a pricing model that doubled revenue.",
      "Released 20% of reserves through a bottom-up operational review.",
    ],
    bg: "#170D04",
    accent: "#B5892B",
  },
  {
    // Nairobi — deep equatorial green. Eight markets begin here.
    year: "2016",
    city: "NAIROBI",
    country: "KENYA",
    org: "Prudential Africa",
    role: "Senior Business Development Manager",
    bullets: [
      "Designed and deployed the Enterprise Risk Framework across eight African markets.",
      "Secured regulatory approval for Prudential Zenith Nigeria.",
    ],
    bg: "#061409",
    accent: "#2D8653",
  },
  {
    // Douala — Cameroon warm red-earth. Group CRO, three countries.
    year: "2019",
    city: "DOUALA",
    country: "CAMEROON",
    org: "Prudential Beneficial Group",
    role: "Group CRO & Chief Actuary",
    bullets: [
      "Built the group risk architecture across Cameroon, Togo, and Côte d'Ivoire.",
      "Revamped reinsurance arrangements, cutting premium paid by 30%.",
    ],
    bg: "#190A04",
    accent: "#C84B31",
  },
  {
    // Douala — same ground, bigger authority. Managing Director.
    year: "2020",
    city: "DOUALA",
    country: "CAMEROON",
    org: "Prudential Beneficial General",
    role: "Managing Director",
    bullets: [
      "Led the company to 40% revenue growth — 2nd fastest growing non-life insurer in the market.",
      "Ranked first in people culture across all Group peer entities.",
    ],
    bg: "#140808",
    accent: "#C84B31",
  },
  {
    // Lagos returns — now as founder and consultant.
    year: "2022",
    city: "LAGOS",
    country: "NIGERIA",
    org: "Insythes Limited",
    role: "Managing Director, Consulting",
    bullets: [
      "Built go-to-market strategy for KCB's pan-African insurance platform, unlocking c.$1m in annual GWP.",
    ],
    bg: "#080F1A",
    accent: "#4A7C6F",
  },
  {
    // Lagos — NAS President. The historic moment.
    year: "2022",
    city: "LAGOS",
    country: "NIGERIA",
    org: "Nigerian Actuarial Society",
    role: "President",
    bullets: [
      "Secured IAA Full Member Status for Nigeria — a historic first.",
      "Led the GAIN initiative with UNDP and Milliman, building actuarial capacity across Nigeria's insurance sector.",
    ],
    bg: "#051209",
    accent: "#008751",
  },
  {
    // Global — the IAA. Deepest institutional blue. The apex of international standing.
    year: "2022",
    city: "GLOBAL",
    country: "CONTINENTAL AFRICA",
    org: "International Actuarial Association",
    role: "Vice Chair, Africa Subcommittee",
    bullets: [
      "Representing Africa's actuarial societies at the highest international forum.",
      "On the IAA Strategic Planning Committee — setting the profession's agenda on AI, climate risk, and cyber.",
    ],
    bg: "#03061A",
    accent: "#4A7FD4",
  },
  {
    // Lagos — board seat. Tangerine warmth.
    year: "2023",
    city: "LAGOS",
    country: "NIGERIA",
    org: "Tangerine Life Insurance",
    role: "Independent Non-Executive Director",
    bullets: [
      "Chair of the Enterprise Risk Management and Technical Committee.",
      "Oversaw CEO recruitment and established performance frameworks for the C-Suite.",
    ],
    bg: "#180904",
    accent: "#E8622A",
  },
  {
    // London + pan-Africa. Builder. Founding the academy.
    year: "2024",
    city: "LONDON",
    country: "PAN-AFRICAN",
    org: "African Actuarial Development Academy",
    role: "Co-Founder",
    bullets: [
      "Co-founded the pan-African body developing the next generation of actuaries in English and French.",
      "Technical Lead for Nigeria's inaugural Mortality Table; Chair of the NAS/NAICOM Discount Rate Committee.",
    ],
    bg: "#0A0E1C",
    accent: "#B5892B",
  },
  {
    // Abuja — federal. Nigeria's government-backed institution.
    year: "2025",
    city: "ABUJA",
    country: "NIGERIA",
    org: "NCGC",
    role: "Independent Non-Executive Director",
    bullets: [
      "Chair of the Audit Committee at the Federal Government-backed institution financing Nigeria's small and mid-size businesses.",
    ],
    bg: "#041008",
    accent: "#008751",
  },
  {
    // Surrey — UK closes the circle. Still building both worlds.
    year: "2025",
    city: "SURREY",
    country: "UNITED KINGDOM",
    org: "East Surrey College",
    role: "Governor",
    bullets: [
      "Member of the Finance & Resource Committee.",
    ],
    bg: "#0A1016",
    accent: "#4A7FD4",
  },
];
