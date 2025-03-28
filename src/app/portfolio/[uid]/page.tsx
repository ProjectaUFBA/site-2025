import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";

import IndividualPortfolio from "@/app/components/individualPortfolio/individualPortfolio";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("portfolioPost", params.uid)
    .catch(() => notFound());
  // page.data.projectType
  // page.data.projectArea
  // page.data.projectObjectives
  // page.data.projectBenefits
  

  return (
    <IndividualPortfolio page={page.data}/>
);
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("portfolioPost", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("portfolioPost");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
