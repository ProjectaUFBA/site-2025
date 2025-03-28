'use client'

import { TitleField, RichTextField } from '@prismicio/client';
import { PortfolioPostDocument } from '../../../../prismicio-types';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, PrismicLink } from '@prismicio/react';

import Image from 'next/image';

import { useRef } from 'react';
import styles from './heroPortfolio.module.scss';


export default function HeroPortfolio({title, description, portfolioPosts}: {title: TitleField, description: RichTextField, portfolioPosts: PortfolioPostDocument<string>[]}) {

  const portfolioListingRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (portfolioListingRef.current) {
      portfolioListingRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (portfolioListingRef.current) {
      portfolioListingRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };
  
  return (
    <section className={styles.wrapperPortfolio}>
      <div className={styles.internPortfolio}>
        <div className={styles.upText}>
          <p className={styles.sectionSmallTitle}>PORTFÓLIO</p>
          <div className={styles.internText}>
            <span className={styles.title}><PrismicRichText field={title} /></span>
            <span className={styles.description}><PrismicRichText field={description}/></span>
          </div>
        </div>
        <div className={styles.portfolioListing} ref={portfolioListingRef}>
          {portfolioPosts.map((post, index) => (
            <PrismicLink key={index} document={post}>
              <div className={styles.absoluteWrapper}>
                <section className={styles.absoluteText}>
                  <p>Ver projeto</p>
                  <Image className={styles.arrow} src="/arrowRightMobile.svg" alt='Left arrow' width={36} height={36}/>
                </section>
                <div className={styles.imgPortfolio}>
                <PrismicNextImage
                  width={383}
                  height={432}
                  key={post.id}
                  field={post.data.portfolioItemMainPicture}
                  fallback={post.data.portfolioItemMainPicture.alt ?? ''}
                  />
                </div>
                <div className={styles.imgPortfolioMobile}>
                <PrismicNextImage
                  width={312}
                  height={350}
                  key={post.id}
                  field={post.data.portfolioItemMainPicture}
                  fallback={post.data.portfolioItemMainPicture.alt ?? ''}
                  />
                </div>
              </div>
            </PrismicLink>
          ))
          }
        </div>
        <div className={styles.buttonArrowWrapper}>
          <Image onClick={scrollLeft} className={styles.leftArrow} src="/buttonArrow.png" alt='button Left' width={45} height={45}/>
          <Image onClick={scrollRight} src="/buttonArrow.png" alt='button Right' width={45} height={45}/>
        </div>
      </div>
    </section>
  );
}