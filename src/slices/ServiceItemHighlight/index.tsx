import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import styles from "./service.module.scss";
import Link from "next/link";
import Image from "next/image";

import rightArrow from '@/app../../../public/ArrowRightServices.svg';

/**
 * Props for `ServiceItemHighlight`.
 */
export type ServiceItemHighlightProps =
  SliceComponentProps<Content.ServiceItemHighlightSlice>;

/**
 * Component for "ServiceItemHighlight" Slices.
 */
const ServiceItemHighlight = ({
  slice,
}: ServiceItemHighlightProps): JSX.Element => {
  return (
    <li className={styles.serviceItem}>
      <PrismicNextImage className={styles.image} field={slice.primary.serviceImage} fallback={slice.primary.serviceImage.alt ?? ''} />
      <div className={styles.serviceWritten}>
        <div className={styles.serviceContent}>
          <span className={styles.title}><PrismicRichText field={slice.primary.serviceTitle} /></span>
          <span className={styles.description}><PrismicRichText field={slice.primary.serviceDescriptionLong} /></span>
        </div>
        <Link className={styles.contactButton} href="/contato">
          <p>Saiba Mais</p> 
          <Image height={24} width={24} src={rightArrow} alt={"Seta"} />
        </Link>
      </div>

    </li>
  );
};

export default ServiceItemHighlight;
