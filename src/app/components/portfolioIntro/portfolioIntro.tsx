import { PrismicRichText } from '@prismicio/react';
import styles from './portfolioIntro.module.scss';
import { RichTextField } from '@prismicio/client';

export default function PortfolioIntro({title, description}: {title: RichTextField, description: RichTextField}) {

  return (
    <div className={styles.pageIntroduction}>
      <h1 className={styles.sectionTitle}>PORTFÓLIO</h1>
      <div className={styles.prismicIntro}>
        <span className={styles.mainTitle}><PrismicRichText field={title} /></span>
        <span className={styles.subTitle}><PrismicRichText field={description} /></span>
      </div>
    </div>
  );
}