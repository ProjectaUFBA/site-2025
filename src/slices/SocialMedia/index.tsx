import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FooterLink`.
 */
export type FooterLinkProps = SliceComponentProps<Content.FooterLinkSlice>;

/**
 * Component for "FooterLink" Slices.
 */
const FooterLink = ({ slice }: FooterLinkProps): JSX.Element => {
  return (
    <li>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <PrismicNextLink field={slice.primary.link}>
          <PrismicNextImage field={slice.primary.linkImage} fallback={slice.primary.linkImage.alt ?? ''}/>
        </PrismicNextLink>
      </section>
    </li>
  );
};

export default FooterLink;
