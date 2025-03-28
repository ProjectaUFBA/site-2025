import { PrismicRichText } from '@prismicio/react';
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { RichTextField, Slice } from '@prismicio/client';

import Link from 'next/link';
import Image from 'next/image';

import styles from './heroMetodology.module.scss'

export default function HeroMetodology({title, description, asideText, slices}: {title: RichTextField, description: RichTextField, asideText: RichTextField, slices: Slice[]}) {
  return (
    <section className={styles.metodologyWrapper}>
      <div className={styles.internMetodology}>
        <p className={styles.sectionSmallTitle}>METODOLOGIA</p>
        <span className={styles.title}><PrismicRichText field={title} /></span>
        <span className={styles.description}><PrismicRichText field={description} /></span>
        <div className={styles.metodologyListing}>
          <SliceZone slices={slices.filter((e) => {
            return e.slice_type == 'metodology_cards';
          })} components={components} />
        </div>
        <div className={styles.contactWrapper}>
          <span className={styles.aside}><PrismicRichText field={asideText} /></span>
          <div className={styles.contact}>
            <Image src="/arrowRight.svg" alt='Left arrow' width={30} height={30}/>
            <button><Link href="/contato">Entre em Contato</Link></button>
          </div>
        </div>
      </div>
    </section>
  );
}