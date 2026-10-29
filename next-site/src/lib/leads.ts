import leadsData from "../../data/leads.json";

export interface LeadItem {
  slug: string;
  name: string;
  rating: number;
  reviews: number;
  phoneE164: string;
  whatsapp: string; // empty string means call only
  address: string;
  hours: string; // raw string to display as is
  about: string; // raw string
  audience: "ladies" | "mixed";
  flags: {
    sauna?: boolean;
    wifi?: boolean;
    parking?: boolean;
    onlineClasses?: boolean;
    childCare?: boolean;
  };
}

export function getAllLeads(): LeadItem[] {
  return leadsData as LeadItem[];
}

export function getLeadBySlug(slug: string): LeadItem | undefined {
  return (leadsData as LeadItem[]).find((l) => l.slug === slug);
}
