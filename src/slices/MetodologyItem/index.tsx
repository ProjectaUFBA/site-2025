import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from './metodology.module.scss'
import Image from "next/image";

/**
 * Props for `MetodologyItem`.
 */
export type MetodologyItemProps = SliceComponentProps<Content.MetodologyCardsSlice>;

/**
 * Component for "MetodologyItem" Slices.
 */
const MetodologyItem = ({ slice, index }: MetodologyItemProps): JSX.Element => {
  return (
    <div className={styles.metodologyCardWrapper}>
      <div className={styles.imageWrapper}>
        {slice.primary.metodologyImage.url && (
          <Image 
            src={slice.primary.metodologyImage.url} 
            alt={slice.primary.metodologyImage.alt || ''} 
            fill 
            style={{objectFit: 'cover'}} 
          />
        )}
      </div>
      <div className={styles.metodologyBottom}>
        <div className={styles.cardNumber}>
          <p>0{index + 1}</p>
        </div>
        <PrismicRichText field={slice.primary.metodologyTitle} components={{
          heading2: ({children}) => <h2>{children}</h2>
        }} />
        <PrismicRichText field={slice.primary.metodologyDescriptionTiny} />
      </div>
    </div>
  );
};

export default MetodologyItem;
