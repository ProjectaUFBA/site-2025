import { ImageField, KeyTextField, RichTextField} from '@prismicio/client';
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";


import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import Link from 'next/link';
import styles from './homeHero.module.scss'

export default function HomeHero({title, titleYellow, description, image}: {title: KeyTextField, titleYellow:KeyTextField, description: RichTextField, image: ImageField}) {

  return (
    <section className={styles.homeWrapper}>
      <div className={styles.homeIntern}>
        <div className={styles.wrapperInfos}>
          <div className={styles.text}>
            <h1>{title} <span className={styles.heroTitleYellow}>{titleYellow}</span></h1> 
            <span className={styles.description}><PrismicRichText field={description} /></span>
          </div>
          <div className={styles.wrapperButton}>
            <Link href="/contato"><button className={styles.buttonContact}>Entrar em contato</button></Link>   
            <Link href="/portfolio"><button className={styles.buttonPortfolio}>Nosso portfolio</button></Link>   
          </div>      
        </div>
      </div>
      <PrismicNextImage className={styles.bg} field={image} fallback={image.alt ?? ""} />
    </section>
  );
}