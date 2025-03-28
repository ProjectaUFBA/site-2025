import { ImageField, RichTextField, Slice, TitleField } from '@prismicio/client';
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";


import styles from './heroAboutUs.module.scss';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';

export default function heroAboutUs({title, description, image, slices}: {image: ImageField, title: TitleField, description: RichTextField, slices: Slice[]}) {
  return (
    <section id="quem-somos" className={styles.wrapperAboutUs}>
      <section className={styles.internAboutUs}>
        <div className={styles.topInfos}>
          <PrismicNextImage field={image} fallback={image.alt ?? ''}/>
          <div className={styles.textsWrapper}>
            <p className={styles.sectionSmallTitle}>QUEM SOMOS</p>
            <span className={styles.title}><PrismicRichText field={title} /></span>
            <span className={styles.description}><PrismicRichText field={description} /></span>
          </div>
        </div>
        <div className={styles.aboutUsListing}>
          <SliceZone slices={slices.filter((e) => {
            return e.slice_type == 'about_us_item';
          })} components={components} />
        </div>
      </section>
    </section>
  );
}