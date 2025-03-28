import { Metadata } from "next";

import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

import { createClient } from "@/prismicio";

import ServicesIntro from "@/app/components/servicesIntro/servicesIntro";

import styles from "./page.module.scss";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("services");

  return (
    <div className={styles.servicePage}>
      <div className={styles.mainServices}>
        <ServicesIntro title={page.data.pageTitle} description={page.data.pageDescription} />
        <ul className={styles.serviceIntern}>
          <SliceZone slices={page.data.slices} components={components} />
        </ul>
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("services");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}