import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Image from "next/image";

import styles from "./about.module.scss";

/**
 * Props for `AboutUsItem`.
 */
export type AboutUsItemProps = SliceComponentProps<Content.AboutUsItemSlice>;

/**
 * Component for "AboutUsItem" Slices.
 */
const AboutUsItem = ({ slice }: AboutUsItemProps): JSX.Element => {
  return (
    <section className={styles.wrapperSquare}>
      <div className={styles.internSquare}>
        <div className={styles.wrapperIcon}>
          <Image src={slice.primary.aboutUsItemIcon.url ?? ''} alt={slice.primary.aboutUsItemIcon.alt ?? ''} width={30} height={30}/>
        </div>
        <h4>{slice.primary.aboutUsItemTitle[0]?.text}</h4>
        <p>{slice.primary.aboutUsItemDescription[0]?.type == 'paragraph' ? slice.primary.aboutUsItemDescription[0]?.text : ''}</p>
      </div>
    </section>
  );
};

export default AboutUsItem;
