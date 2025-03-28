import { Metadata } from "next";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

import styles from "./page.module.scss";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("material");

  return (
    <div className={styles.outerPage}>

      <div className={styles.pageContent}>

        <div className={styles.materialIntro}>
          <span className={styles.materialTitle}><PrismicRichText field={page.data.pageTitle} /></span>
          <span className={styles.materialDescription}><PrismicRichText field={page.data.pageDescription} /></span>
        </div>

        <div className={styles.materialList}>
          <SliceZone slices={page.data.slices} components={components} />
        </div>

      </div>
      
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("material");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
