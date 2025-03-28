'use client';

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import styles from './faqquestion.module.scss';

import caretUpActive from '../../../public/CaretUpActive.svg';
import caretDownUnactive from '../../../public/CaretDownUnactive.svg';

import Image from "next/image";
import { useState } from "react";

/**
 * Props for `FaqQuestion`.
 */
export type FaqQuestionProps = SliceComponentProps<Content.FaqQuestionSlice>;

/**
 * Component for "FaqQuestion" Slices.
 */
const FaqQuestion = ({ slice, index }: FaqQuestionProps): JSX.Element => {

  const [isActive, setIsActive] = useState(false);

  const updateActive = () => {
    setIsActive(!isActive);
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className={styles.faqItem}>

        <div onClick={() => updateActive()} className={styles.questionArea}>
          <div className={styles.writtenArea}>
            {index+1 < 10 ? 
            <p className={
              isActive ? styles.activeQuestionIndex :
              styles.questionIndex
            }>0{index+1}</p>
            :
            <p className={
              isActive ? styles.activeQuestionIndex :
              styles.questionIndex
            }>{index+1}</p>
            }
            <span className={styles.questionTitle}><PrismicRichText field={slice.primary.questionTitle} /></span>
          </div>
          <div className={styles.iconArea}>
            <Image src={isActive ? caretUpActive : caretDownUnactive} alt="indicatorArrow" />
          </div>

        </div>

        <div className={
          isActive ? styles.activeAnswerArea :
          styles.answerArea
          }>
          <span className={styles.questionAnswer}><PrismicRichText field={slice.primary.questionAnswer} /></span>
        </div>
        
      </div>
    </section>
  );
};

export default FaqQuestion;
