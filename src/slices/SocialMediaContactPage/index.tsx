"use client"

import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { useState } from "react";

/**
 * Props for `SocialMediaContactPage`.
 */
export type SocialMediaContactPageProps = SliceComponentProps<Content.SocialMediaContactPageSlice>;

/**
 * Component for "SocialMediaContactPage" Slices.
 */
const SocialMediaContactPage = ({ slice }: SocialMediaContactPageProps): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <PrismicNextLink 
      field={slice.primary.link}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        <PrismicNextImage
        width={slice.primary.linkImageNormal.dimensions?.width}
        height={slice.primary.linkImageNormal.dimensions?.height}
        field={isHovered ? slice.primary.linkImageHover : slice.primary.linkImageNormal}
        fallback={(isHovered ? slice.primary.linkImageHover.alt : slice.primary.linkImageNormal.alt) ?? ''}
      />
    </PrismicNextLink>
  );
};

export default SocialMediaContactPage;
