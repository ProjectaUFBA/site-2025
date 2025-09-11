// [AI Generated] Data: 19/12/2024
// Descrição: Modificado layout dos depoimentos - removido imagem do autor, nome alinhado ao fundo, setas mobile removidas
// Gerado por: Cursor AI
'use client'

import Image from 'next/image';

import { TitleField, RichTextField, ImageFieldImage, Slice } from '@prismicio/client';
import {PrismicRichText } from '@prismicio/react';
import styles from './statementPorfolio.module.scss';
import { PrismicNextImage } from '@prismicio/next';

import { useRef } from 'react';
import Link from 'next/link';


export default function StatementPorfolio({title, description, statementCallToAction, slices}: {title: TitleField, description: RichTextField, statementCallToAction: RichTextField, slices: Slice[]}) {
  const slicesRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (slicesRef.current) {
      slicesRef.current.scrollBy({ left: -489, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (slicesRef.current) {
      slicesRef.current.scrollBy({ left: 489, behavior: 'smooth' });
    }
  };
  // Funções de scroll mobile removidas - não são mais necessárias
  return (
    <div className={styles.mainWrapper}>
      <section className={styles.wrapper}>
        <div className={styles.titleAndPagination}>
          <div className={styles.title}>
            <PrismicRichText field={title} />
            <PrismicRichText field={description} />
          </div>
          <div className={styles.paginationWrapper}>
            <Image onClick={() => scrollLeft()} src="/arrowPortfolioScreen.svg" alt='Left' width={56} height={56}/>
            <Image onClick={() => scrollRight()} className={styles.rightArrow} src="/arrowPortfolioScreen.svg" alt='Right' width={56} height={56}/>
          </div>
        </div>
        <div>
          <section className={styles.slices} ref={slicesRef}>
            {slices.map((post, index) => (
              <div key={index} className={styles.wrapperEachStatement}>
                <div className={styles.statementContent}>
                  <Image src="/quotations.svg" alt='Quotes' width={19.5} height={14.25}/>
                  <span className={styles.descriptionStatement}><PrismicRichText field={post.primary.clientStatement as RichTextField}/></span>
                </div>
                {/* AI_GENERATED_CODE_START */}
                <div className={styles.clientInfoWrapper}>
                  <span className={styles.nameClient}><PrismicRichText field={post.primary.clientName as RichTextField}/></span>
                </div>
                {/* AI_GENERATED_CODE_END */}
              </div>
          ))
          }
          </section>
        </div>
        {/* AI_GENERATED_CODE_START */}
        {/* Setas removidas para mobile - usuário pode scrollar com o dedo */}
        {/* AI_GENERATED_CODE_END */}
        <Link href={"/contato"} className={styles.contact}>
          <PrismicRichText field={statementCallToAction} />
          <div>
            <Image src="/arrowRight.svg" alt='Left arrow' width={50} height={50}/>
            <button>Entre em contato</button>
          </div>
        </Link>
      </section>
    </div>
  );
}