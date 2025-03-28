import { ImageField, RichTextField, TitleField } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';

import styles from './heroCallToAction.module.scss'
import Link from 'next/link';

export default function HeroCallToAction({image, title, description}: {image: ImageField, title: TitleField, description: RichTextField}) {
  return (
    <section className={styles.wrapper}>
      <PrismicNextImage className={styles.absoluteImg} field={image} fallback={image.alt ?? ''} />
      <div className={styles.internWrapper}>
        <div className={styles.text}>
          <span className={styles.title}><PrismicRichText field={title} /></span>
          <span className={styles.description}><PrismicRichText field={description} /></span>
        </div>
        <button><Link href="/contato">Fale com o nosso time</Link></button>
      </div>
    </section>
  );
}