import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "../../app/components/individualPortfolio/individualPortfolio.module.scss";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `PortfolioItemImage`.
 */
export type PortfolioItemImageProps =
  SliceComponentProps<Content.PortfolioItemImageSlice>;

/**
 * Component for "PortfolioItemImage" Slices.
 */
const PortfolioItemImage = ({
  slice,
}: PortfolioItemImageProps): JSX.Element => {

  return (
    <div>
        <PrismicNextImage width={588} height={564} field={slice.primary.portfolioItemImage1 ?? ''}/>
        <PrismicNextImage width={588} height={564} field={slice.primary.portfolioItemImage2 ?? ''}/>
        <PrismicNextImage width={588} height={564} field={slice.primary.portfolioItemImage3 ?? ''}/>
        <PrismicNextImage width={588} height={564} field={slice.primary.portfolioItemImage4 ?? ''}/>
        <PrismicNextImage width={588} height={564} field={slice.primary.portfolioItemImage5 ?? ''}/>
    </div>
  );
};

export default PortfolioItemImage;
