import fs from "fs";
import path from "path";

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

function loadLeads(): LeadItem[] {
  // Check both next-site/data/leads.json and ../data/leads.json if placed outside next-site
  const candidatePaths = [
    path.resolve(process.cwd(), "data", "leads.json"),
    path.resolve(process.cwd(), "..", "data", "leads.json"),
  ];

  for (const filePath of candidatePaths) {
    if (fs.existsSync(filePath)) {
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(raw) as LeadItem[];
      } catch {
        return [];
      }
    }
  }

  return [];
}

const leadsData: LeadItem[] = loadLeads();

export function getAllLeads(): LeadItem[] {
  return leadsData;
}

export function getLeadBySlug(slug: string): LeadItem | undefined {
  return leadsData.find((l) => l.slug === slug);
}
