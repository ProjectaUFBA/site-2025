"use client"

import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import MaterialsModal from "@/app/components/materialsModal/materialsModal";

import styles from "./materialitem.module.scss";
import { useState } from "react";

/**
 * Props for `MaterialItem`.
 */
export type MaterialItemProps = SliceComponentProps<Content.MaterialItemSlice>;

/**
 * Component for "MaterialItem" Slices.
 */
const MaterialItem = ({ slice }: MaterialItemProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {isModalOpen && <MaterialsModal onClose={() => setIsModalOpen(false)} download={slice.primary.materialLink} /> }
      <div className={styles.materialItemCard}>
        <PrismicNextImage field={slice.primary.materialImage} />

        <div className={styles.writtenArea}>
          <span className={styles.materialItemTitle}><PrismicRichText field={slice.primary.materialTitle} /></span>
          <span className={styles.materialItemDescription}><PrismicRichText field={slice.primary.materialDescription} /></span>
          <span className={styles.materialItemOpenForms} onClick={() => setIsModalOpen(true)}>Baixar</span>
        </div>

      </div>
    </section>
  );
};

export default MaterialItem;
