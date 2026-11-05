import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllLeads, getLeadBySlug } from "@/lib/leads";
import DemoSiteLayout from "../DemoSiteLayout";
import HomePageBody from "@/components/pages/HomePageBody";
import { getLeadConfig } from "@/lib/lead-adapter";

interface LeadDemoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const leads = getAllLeads();
  if (leads.length === 0) {
    return [{ slug: "__placeholder" }];
  }
  return leads.map((lead) => ({
    slug: lead.slug,
  }));
}

export async function generateMetadata({
  params,
}: LeadDemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lead = getLeadBySlug(slug);

  if (!lead) {
    return { title: "Client Demo Not Found" };
  }

  return {
    title: {
      absolute: `${lead.name} | Exclusive Fitness Demo`,
    },
    description: `Visit ${lead.name} in Lahore.`,
    authors: [{ name: lead.name }],
    keywords: [`${lead.name}`, "Gym Lahore", "Fitness Club Lahore"],
    openGraph: {
      title: `${lead.name} | Exclusive Fitness Demo`,
      description: `Visit ${lead.name} in Lahore.`,
      siteName: lead.name,
    },
    twitter: {
      title: `${lead.name} | Exclusive Fitness Demo`,
      description: `Visit ${lead.name} in Lahore.`,
    },
    robots: { index: false, follow: false },
  };
}

export default async function LeadDemoHomePage({ params }: LeadDemoPageProps) {
  const { slug } = await params;
  const lead = getLeadBySlug(slug);

  if (!lead) {
    notFound();
  }

  const config = getLeadConfig(lead);

  return (
    <DemoSiteLayout lead={lead}>
      <HomePageBody
        config={config}
        isDemo
        basePath={`/demo/${lead.slug}`}
      />
    </DemoSiteLayout>
  );
}
