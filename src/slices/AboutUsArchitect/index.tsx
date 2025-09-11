import { Content, isFilled, asText } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import Image from 'next/image';
import { PrismicNextLink } from "@prismicio/next";

import styles from './aboutUsArchitect.module.scss';

/**
 * Props for `AboutUsArchitect`.
 */
export type AboutUsArchitectProps =
  SliceComponentProps<Content.AboutUsArchitectSlice>;

/**
 * Component for "AboutUsArchitect" Slices.
 */
const AboutUsArchitect = ({ slice }: AboutUsArchitectProps): JSX.Element => {
  return (
    <>
      {slice.items.map((item, index) => (
        <div key={index} className={styles.architectCard}>
          <div className={styles.architectImage}>
            <Image 
              src={item.image.url || ''}
              alt={item.image.alt || ''}
              width={102}
              height={102}
            />
          </div>
          <div className={styles.architectInfo}>
            <div className={styles.name}>
                <PrismicRichText 
                    field={item.name} 
                    components={{
                        paragraph: ({ children }) => <h3>{children}</h3>,
                    }}
                />
            </div>
            <div className={styles.description}>
                <PrismicRichText field={item.description} />
            </div>
          </div>
          {isFilled.link(item.url) && (
            <div className={styles.arrowIcon}>
              <PrismicNextLink field={item.url} target="_blank" rel="noopener noreferrer">
                {/* [AI Generated] Data: 05/01/2025 - Alteração do ícone para arrowTopRight.svg */}
                <Image 
                  src="/assets/arrowTopRight.svg" 
                  alt="Ver mais"
                  width={24}
                  height={24}
                />
              </PrismicNextLink>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default AboutUsArchitect;
