import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `HeroAnimatedImage`.
 */
export type HeroAnimatedImageProps =
  SliceComponentProps<Content.HeroAnimatedImageSlice>;

/**
 * Component for "HeroAnimatedImage" Slices.
 */
const HeroAnimatedImage = ({ slice }: HeroAnimatedImageProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="hero-animated-images">
        {slice.items.map((item, index) => (
          <div key={index} className="hero-image-item">
            <PrismicNextImage 
              field={item.image} 
              fallback={item.image.alt ?? "Hero Image"}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroAnimatedImage;
