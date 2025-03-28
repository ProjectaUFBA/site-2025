import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Statements`.
 */
export type StatementsProps = SliceComponentProps<Content.StatementsSlice>;

/**
 * Component for "Statements" Slices.
 */
const Statements = ({ slice }: StatementsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for statements (variation: {slice.variation}) Slices
    </section>
  );
};

export default Statements;
