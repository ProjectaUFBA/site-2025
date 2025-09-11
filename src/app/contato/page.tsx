import { Metadata } from "next";

import { createClient } from "@/prismicio";

import ContactComponent from "../components/contactComponent/contactComponent";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("contact");
  // [AI Generated] Data: 19/01/2025
  // Descrição: Obtenção da imagem do hero da página home para usar como background no contato
  // Gerado por: Cursor AI
  // Versão: Next.js 14, Prismic
  // AI_GENERATED_CODE_START
  const homePage = await client.getSingle("home");
  // AI_GENERATED_CODE_END
  
  // Buscar dados dos serviços para popular o dropdown
  const servicesPage = await client.getSingle("services");

  return (
    <ContactComponent 
      page={page.data} 
      heroImage={homePage.data.heroImage1} 
      servicesData={servicesPage.data.slices}
    />
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
