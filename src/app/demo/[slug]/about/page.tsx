import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllLeads, getLeadBySlug } from "@/lib/leads";
import DemoSiteLayout from "../../DemoSiteLayout";
import AboutPageBody from "@/components/pages/AboutPageBody";
import { getLeadConfig } from "@/lib/lead-adapter";

interface DemoSubPageProps {
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
}: DemoSubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lead = getLeadBySlug(slug);

  if (!lead) {
    return { title: "Not Found" };
  }

  return {
    title: {
      absolute: `About | ${lead.name} Demo`,
    },
    description: `About ${lead.name} in Lahore.`,
    robots: { index: false, follow: false },
  };
}

export default async function DemoAboutPage({ params }: DemoSubPageProps) {
  const { slug } = await params;
  const lead = getLeadBySlug(slug);

  if (!lead) {
    notFound();
  }

  const config = getLeadConfig(lead);

  return (
    <DemoSiteLayout lead={lead}>
      <AboutPageBody
        config={config}
        isDemo
        basePath={`/demo/${lead.slug}`}
      />
    </DemoSiteLayout>
  );
}

