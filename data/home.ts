export const LINKEDIN = "https://www.linkedin.com/in/yesidekazeem/";
export const EMAIL = "yesidekazeem@yahoo.co.uk"; // kept for reference, not displayed

export interface Pillar {
  num: string;
  label: string;
  headline: string;
  body: string;
  cta: string;
}

export const pillars: Pillar[] = [
  {
    num: "01",
    label: "BOARD & GOVERNANCE",
    headline: "Two decades of risk and governance at board level.",
    body: "Independent Non-Executive Director at Tangerine Life Insurance, chairing the Enterprise Risk Management and Technical Committee. Board member of NCGC, the Federal Government-backed institution inaugurated by Vice President Kashim Shettima. Governor of the Corporation of East Surrey College. Twenty years of P&L ownership, regulatory navigation, and strategic oversight.",
    cta: "ENQUIRE ABOUT BOARD OPPORTUNITIES →",
  },
  {
    num: "02",
    label: "SPEAKING",
    headline: "She speaks from experience, not theory.",
    body: "From the IBW Women in Insurance Summit in London to the COP30 IAA delegation, from SCGN's 20th Annual Conference to the global actuview stage. Corporate governance, African financial systems, women in insurance leadership. The kind of session that changes what people think is possible.",
    cta: "INVITE YESIDE TO SPEAK →",
  },
  {
    num: "03",
    label: "AFRICA MISSION",
    headline: "Co-founder. Architect. Builder.",
    body: "Co-founded the African Actuarial Development Academy, a pan-African body operating in English and French. Leads the GAIN initiative — a UNDP/Milliman partnership transforming actuarial supply and demand across Nigeria. Technical architect of Nigeria's first mortality table. Secured IAA Full Member Status for the Nigerian Actuarial Society, a historic first. Eight markets. One direction.",
    cta: "PARTNER ON THE AFRICA MISSION →",
  },
];

export const contactColumns = [
  {
    label: "SPEAKING",
    lines: ["Keynotes. Panels. Summits.", "Corporate governance.", "African financial systems.", "Women in leadership."],
    cta: "INVITE TO SPEAK →",
  },
  {
    label: "BOARD & ADVISORY",
    lines: ["Independent Non-Executive Director.", "Risk. Governance.", "Strategic oversight."],
    cta: "BOARD ENQUIRIES →",
  },
  {
    label: "AFRICA MISSION",
    lines: ["AADA collaboration.", "Actuarial capacity building.", "Pan-African partnerships."],
    cta: "GET IN TOUCH →",
  },
];
