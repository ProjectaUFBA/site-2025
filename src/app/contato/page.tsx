import { Metadata } from "next";

import { createClient } from "@/prismicio";

import ContactComponent from "../components/contactComponent/contactComponent";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("contact");
  

  return (
    <ContactComponent page={page.data} />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("contact");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
