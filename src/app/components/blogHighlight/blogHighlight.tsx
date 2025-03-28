"use client"

import { BlogPostDocument } from '../../../../prismicio-types';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import Image from 'next/image';

import { useRef, useState } from 'react';

import styles from './blogHighlight.module.scss'
import { PrismicRichText } from '@prismicio/react';
import { DateField } from '@prismicio/client';


export default function BlogHighlight({posts}: {posts: BlogPostDocument<string>[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === posts.length - 1 ? 0 : prevIndex + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > window.screen.width * 0.3) {
      handleNext();
    }
  };



  function convertDate(date: DateField) {
    const milliseconds = Date.parse(date?.toString() ?? '');
    const formattedDate = new Date(milliseconds).toLocaleDateString('pt-BR');
    return formattedDate
  }
  return (
    <section className={styles.wrapper}>
      <section className={styles.wrapperDesktop}>
      <div className={styles.arrowDiv}>
        <div></div>
        <Image onClick={handleNext} src="/arrowBlog.svg"  alt="Próximo" width={64} height={64}/>
      </div>
      {posts.length > 0 && (
        <>
          <div className={styles.imageLeft}>
            <PrismicNextImage width={588} height={564} field={posts[currentIndex]?.data?.postImage} fallback={posts[currentIndex]?.data?.postImage?.alt ?? ''} />
          </div>
          <PrismicNextLink href={posts[currentIndex].url ?? "/blog"} className={styles.divRightWrapper}>
            <div className={styles.divRightIntern}>
              <div className={styles.centerDiv}>
                <div className={styles.buttonsWrapper}>
                  <button className={styles.highlightButton} disabled={true}>
                    <Image src="/starBlog.svg" alt="Estrela" width={13.99} height={13.5}/>
                    <p>Destaque</p>
                  </button>
                  {posts[currentIndex].tags.map((tag, index) => {
                    return (
                      <button key={index} disabled={true} className={styles.tagButton}>
                        <p>{tag}</p>
                      </button>
                    )
                  })}
                </div>
                <PrismicRichText field={posts[currentIndex]?.data?.postTitle}/>
                <div className={styles.authorDiv}>
                  <PrismicNextImage width={45} height={45} field={posts[currentIndex]?.data?.authorPicture} fallback={posts[currentIndex]?.data?.authorPicture?.alt ?? ''} />
                  <div className={styles.authorData}>
                    <div>
                      <p>por</p>
                      <h2>{posts[currentIndex]?.data?.authorName}</h2>
                    </div>
                    <p>em {convertDate(posts[currentIndex]?.data?.blogPostDate)}</p>
                  </div>
                </div>
              </div>
            </div>
          </PrismicNextLink>
        </>
      )}
    </section>
    {posts.length > 0 && (
    <section className={styles.wrapperMobile}>
      <section 
        className={styles.internMobileDiv} 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <section  className={styles.divController}>
          <div className={styles.buttonsWrapper}>
            <button className={styles.highlightButton} disabled={true}>
              <Image src="/starBlog.svg" alt="Destaque" width={13.99} height={13.5}/>
              <p>Destaque</p>
            </button>
            {posts[currentIndex].tags.map((tag, index) => {
              return (
                <button key={index} disabled={true} className={styles.tagButton}>
                  <p>{tag}</p>
                </button>
              )
            })}
          </div>
          <PrismicNextLink href={posts[currentIndex].url ?? "/blog"} ><PrismicRichText field={posts[currentIndex]?.data?.postTitle}/></PrismicNextLink>
          <div className={styles.authorDiv}>
            <PrismicNextImage width={45} height={45} field={posts[currentIndex]?.data?.authorPicture} fallback={posts[currentIndex]?.data?.authorPicture?.alt ?? ''} />
            <div className={styles.authorData}>
              <div>
                <p>por</p>
                <h3>{posts[currentIndex]?.data?.authorName}</h3>
              </div>
              <p>em {convertDate(posts[currentIndex]?.data?.blogPostDate)}</p>
            </div>
          </div>
          <div className={styles.mapSphere}>
            {posts.map((number, index) => {
              return (
                <div className={currentIndex == index ? `${styles.eachSphere} ${styles.selectedSphere}` : styles.eachSphere} key={index}></div>
              )
            })}
          </div>
        </section>
      </section>
      <div className={styles.imgWrapperMobile}>
        <PrismicNextImage field={posts[currentIndex]?.data?.postImage} fallback={posts[currentIndex]?.data?.postImage?.alt ?? ''} />
      </div>
    </section>
    )}
    </section>
  );
}