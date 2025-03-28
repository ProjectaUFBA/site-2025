import { RichTextField, Slice, TitleField } from '@prismicio/client';
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";


import { PrismicRichText } from '@prismicio/react';
import styles from './heroServices.module.scss'
import Link from 'next/link';

export default function HeroServices({title, description, slices}: {title: TitleField, description: RichTextField, slices: Slice[]}) {
  return (
    <section className={styles.servicesWrapper}>
      <div className={styles.servicesIntern}>
        <div className={styles.upText}>
          <p className={styles.smallTitle}>SERVIÇOS</p>
          <div className={styles.internText}>
            <span className={styles.title}><PrismicRichText field={title} /></span>
            <span className={styles.description}><PrismicRichText field={description} /></span>
          </div>
        </div>
        <ul className={styles.serviceListing}>
          <SliceZone slices={slices.filter((e) => {
            return e.slice_type == 'services_slices';
          })} components={components} />
        </ul>
        <Link href="/contato" className={styles.buttonWrapper}><button>Entre em Contato</button></Link>
      </div>
    </section>
  );
}