import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllLeads, getLeadBySlug } from "@/lib/leads";
import DemoSiteLayout from "../../DemoSiteLayout";
import GalleryPageBody from "@/components/pages/GalleryPageBody";
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
      absolute: `Gallery | ${lead.name} Demo`,
    },
    description: `Facility gallery and training atmosphere at ${lead.name}.`,
    robots: { index: false, follow: false },
  };
}

export default async function DemoGalleryPage({ params }: DemoSubPageProps) {
  const { slug } = await params;
  const lead = getLeadBySlug(slug);

  if (!lead) {
    notFound();
  }

  const config = getLeadConfig(lead);

  return (
    <DemoSiteLayout lead={lead}>
      <GalleryPageBody
        config={config}
        isDemo
        basePath={`/demo/${lead.slug}`}
      />
    </DemoSiteLayout>
  );
}

