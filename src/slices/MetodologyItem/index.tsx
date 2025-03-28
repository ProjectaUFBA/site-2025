import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Image from "next/image";

import styles from './metodology.module.scss';

/**
 * Props for `MetodologyCards`.
 */
export type MetodologyCardsProps =
  SliceComponentProps<Content.MetodologyCardsSlice>;

/**
 * Component for "MetodologyCards" Slices.
 */
const MetodologyCards = ({ slice, index }: MetodologyCardsProps): JSX.Element => {

  return (
    <section className={styles.metodologyCardWrapper}>
      <Image 
        src={slice.primary.metodologyImage.url ?? ''} 
        alt={slice.primary.metodologyImage.alt ?? ''} 
        width={280}
        height={slice.primary.metodologyImage.dimensions?.height}
      />
      <div className={styles.metodologyBottom}>
        <div className={styles.cardNumber}>  
          <p>0{index+1}</p>
        </div>
        <h2>{slice.primary.metodologyTitle[0]?.type == 'heading2' ? slice.primary.metodologyTitle[0]?.text : '' }</h2>
        <p>{slice.primary.metodologyDescriptionTiny[0]?.type == 'paragraph' ?  slice.primary.metodologyDescriptionTiny[0]?.text : ''}</p>
      </div>
    </section>
  );
};

export default MetodologyCards;
