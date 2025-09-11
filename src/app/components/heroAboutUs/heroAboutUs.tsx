import { ImageField, RichTextField, Slice, TitleField } from '@prismicio/client';
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Image from 'next/image';
import styles from './heroAboutUs.module.scss';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';

interface Architect {
  image: ImageField;
  name: string;
  role: string;
  description: string;
}

interface ProjectValue {
  icon: string;
  title: string;
  description: string;
}

export default function heroAboutUs({title, description, image, slices}: {image: ImageField, title: TitleField, description: RichTextField, slices: Slice[]}) {
  // Filtrar slices de arquitetos
  const architectSlices = slices.filter((slice) => slice.slice_type === 'about_us_architect');
  
  // Verificar se há arquitetos
  const hasArchitects = architectSlices.length > 0 && architectSlices.some(slice => slice.items && slice.items.length > 0);

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

        {hasArchitects && (
          <div className={styles.architectsSection}>
            <h2>Nossos arquitetos</h2>
            <div className={styles.architectsList}>
              <SliceZone slices={architectSlices} components={components} />
            </div>
          </div>
        )}

        <div className={styles.projectValuesSection}>
          <h2>Em nossos projetos buscamos trazer:</h2>
          <div className={styles.aboutUsListing}>
            <SliceZone slices={slices.filter((e) => {
              return e.slice_type == 'about_us_item';
            })} components={components} />
          </div>
        </div>
      </section>
    </section>
  );
}