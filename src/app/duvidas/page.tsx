import { Metadata } from "next";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

import chatCircle from '../../../public/ChatCircle.svg';

import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.scss";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("faq");

  return (
    <div className={styles.outerPage}>

      <div className={styles.page}>
      
        <div className={styles.faqTitleSection}>
          <h1 className={styles.sectionTitle}>DÚVIDAS</h1>
          <span className={styles.prismicTitle}><PrismicRichText field={page.data.pageTitle} /></span>
        </div>

        <div className={styles.rightSide}>

          <div className={styles.faqQuestionsList}>
            <SliceZone slices={page.data.slices} components={components} />
          </div>

          <div className={styles.chatArea}>
            <Image src={chatCircle} alt="chatCircle" />
            <div className={styles.chatAreaWriting}>
              <p className={styles.chatAreaTitle}>Ainda tem alguma dúvida?</p>
              <p className={styles.chatAreaDescription}>Envie uma mensagem para a nossa equipe</p>
            </div>
            <span className={styles.chatAreaButton}><Link href={"/contato"}>Entre em Contato</Link></span>
            
          </div>
        </div>




      </div>

    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("faq");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
