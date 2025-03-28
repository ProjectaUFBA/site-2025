import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import styles from './service.module.scss'
import Link from "next/link";

/**
 * Props for `ServicesSlices`.
 */
export type ServicesSlicesProps =
  SliceComponentProps<Content.ServicesSlicesSlice>;

/**
 * Component for "ServicesSlices" Slices.
 */
const ServicesSlices = ({ slice }: ServicesSlicesProps): JSX.Element => {
  return (
    <li>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={styles.serviceItem}
      > 
        <Link href={"/servicos"}>
          <div className={styles.imageSquare}>
            <PrismicNextImage field={slice.primary.serviceIcon} fallback={slice.primary.serviceIcon.alt ?? ''}/>
          </div>
          <div className={styles.text}>
            <span className={styles.title}><PrismicRichText field={slice.primary.serviceTitle} /></span>
            <span className={styles.description}><PrismicRichText field={slice.primary.serviceDescriptionTiny} /></span>
          </div>
        </Link>
      </section>
    </li>

  );
};

export default ServicesSlices;
