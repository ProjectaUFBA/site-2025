import { PrismicRichText } from '@prismicio/react';
import styles from './servicesIntro.module.scss';
import { RichTextField } from '@prismicio/client';

export default function ServicesIntro({title, description}: {title: RichTextField, description: RichTextField}) {

  return (
    <section className={styles.servicesIntroWrapper}>
      <div className={styles.servicesIntroContent}>
        <span className={styles.title}><PrismicRichText field={title} /></span>
        <span className={styles.description}><PrismicRichText field={description} /></span>
      </div>
    </section>
  );
}