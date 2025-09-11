'use client'

import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import { PrismicNextImage } from "@prismicio/next";

import { useEffect, useRef, useState } from "react";


import styles from './individualPortfolio.module.scss';
import { ImageField, ImageFieldImage, RichTextField, Slice } from "@prismicio/client";
import ModalPortfolio from "./modalPortfolio";
import Link from "next/link";

interface PortfolioItem {
  portfolioItemTitle: RichTextField;
  portfolioItemSummary: RichTextField;
  portfolioItemMainPicture: ImageField;
  portfolioItemDescription: RichTextField;
  projectType: RichTextField;
  projectArea: RichTextField;
  projectObjectives: RichTextField;
  projectBenefits: RichTextField;
  slices: Slice[];

}

export default function IndividualPortfolio({page}: { page: PortfolioItem }) {
  const [windowSize, setWindowSize] = useState({
    width: 1151,
  });
  const [isModal, setIsModal] = useState(false);
  const titleBottomRef = useRef<HTMLDivElement>(null);
  const projectTypesRef = useRef<HTMLDivElement>(null);
  const wrapperProjectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleResize() {
        setWindowSize({
            width: window.innerWidth,
        });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
}, []);

  const [sliceMap, setSliceMap] = useState<ImageFieldImage[]>([]);

  useEffect(() => {
    const images: ImageFieldImage[] = [];
    page.slices.forEach((slice) => {
      const primaryImages = Object.values(slice.primary).filter(image => (image as ImageFieldImage).url);
      images.push(...primaryImages as ImageFieldImage[]);
    });
    setSliceMap(images);
  }, [page.slices]);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? sliceMap.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === sliceMap.length - 1 ? 0 : prevIndex + 1));
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrev();
    }
  };



  return (
      <main className={styles.page}>
          {isModal && <ModalPortfolio slices={page.slices} setIsModal={setIsModal} sliceMap={sliceMap}/>}
          <section className={styles.pageIntern}>
          <div className={styles.topInfo}>
            <div className={styles.upText}>
              <Link href="/portfolio" className={styles.backArrow}>
                <Image src="/smallArrow.svg" alt='Left arrow' width={8} height={15}/>
                <p >Voltar</p>
              </Link>
              <div className={styles.text}>
                <PrismicRichText field={page.portfolioItemTitle} />
              </div>
            </div>
            {page.slices[0] ? 
            <div className={styles.imagesWrapper}>
                <div className={styles.leftImage}> 
                  <PrismicNextImage width={588} height={564} field={page.slices[0].primary.portfolioItemImage1 as ImageFieldImage} fallback={page.slices[0].primary.portfolioItemImage1 ? page.slices[0].primary.portfolioItemImage1.toString()  : ''}/>
                </div>
                <div className={styles.rightImages} >
                  <PrismicNextImage width={282} height={270} field={page.slices[0].primary.portfolioItemImage2 as ImageFieldImage} fallback={page.slices[0].primary.portfolioItemImage2 ? page.slices[0].primary.portfolioItemImage2.toString()  : ''} />
                  <PrismicNextImage width={282} height={270} field={page.slices[0].primary.portfolioItemImage3 as ImageFieldImage} fallback={page.slices[0].primary.portfolioItemImage3 ? page.slices[0].primary.portfolioItemImage3.toString()  : ''}/>
                  <PrismicNextImage width={282} height={270} field={page.slices[0].primary.portfolioItemImage4 as ImageFieldImage} fallback={page.slices[0].primary.portfolioItemImage4 ? page.slices[0].primary.portfolioItemImage4.toString()  : ''}/>
                  <PrismicNextImage width={282} height={270} field={page.slices[0].primary.portfolioItemImage5 as ImageFieldImage} fallback={page.slices[0].primary.portfolioItemImage5 ? page.slices[0].primary.portfolioItemImage5.toString()  : ''}/>
                </div>
              <button className={styles.buttonGalery} onClick={() => setIsModal(true)}><p>Ver todas as fotos</p></button>
            </div>
            :
              <div className={styles.uniqueImage}>
                <PrismicNextImage width={588} height={564} field={page.portfolioItemMainPicture} fallback={typeof page.portfolioItemMainPicture === 'string' ? page.portfolioItemMainPicture : page.portfolioItemMainPicture.alt ?? ''}/>
              </div>
            }
          </div>
          <section className={styles.mobileImagesWrapper}>
            <div className={styles.mobileImageContainer}>
              {/* Mostra apenas a primeira imagem no mobile */}
              {page.slices[0] ? (
                <PrismicNextImage
                  width={300}
                  height={300}
                  field={page.slices[0].primary.portfolioItemImage1 as ImageFieldImage}
                  fallback={page.slices[0].primary.portfolioItemImage1 ? page.slices[0].primary.portfolioItemImage1.toString() : ''}
                />
              ) : (
                <PrismicNextImage
                  width={300}
                  height={300}
                  field={page.portfolioItemMainPicture}
                  fallback={typeof page.portfolioItemMainPicture === 'string' ? page.portfolioItemMainPicture : page.portfolioItemMainPicture.alt ?? ''}
                />
              )}
              
              {/* Botão Ver fotos - apenas se existirem mais de uma foto */}
              {sliceMap.length > 1 && (
                <button className={styles.viewPhotosButton} onClick={() => setIsModal(true)}>
                  <p>Ver fotos ({sliceMap.length})</p>
                </button>
              )}
            </div>
          </section>
          <section ref={titleBottomRef} className={styles.titleBottom}>
            <div ref={wrapperProjectRef} className={styles.bottomInfo}>
              <section  className={styles.projectTypes}>
                <div ref={projectTypesRef} className={styles.internSquareDiv}>
                  <div className={styles.eachTypeWrapper}>
                    <Image className={styles.eachTypeIcon} src="/houseIcon.svg" alt={"Tipo de Projeto"} width={30} height={25}/>
                    <div className={styles.typeText}>
                      <h3>Tipo de projeto</h3>
                      <PrismicRichText field={page.projectType} />
                    </div>
                  </div>
                  <div className={styles.eachTypeWrapper}>
                    <Image className={styles.eachTypeIcon} src="/rulerIcon.svg" alt={"Área do Projeto"} width={30} height={25}/>
                    <div className={styles.typeText}>
                      <h3>Área do projeto</h3>
                      <PrismicRichText field={page.projectArea} />
                    </div>
                  </div>
                  <div className={styles.eachTypeWrapper}>
                    <Image className={styles.eachTypeIcon} src="/clipboardIcon.svg" alt={"Objetivos"} width={30} height={25}/>
                    <div className={styles.typeText}>
                      <h3>Objetivos</h3>
                      <PrismicRichText field={page.projectObjectives} />
                    </div>
                  </div>
                  <div className={styles.eachTypeWrapper}>
                    <Image className={styles.eachTypeIcon} src="/heartIcon.svg" alt={"Benefícios"} width={30} height={25}/>
                    <div className={styles.typeText}>
                      <h3>Benefícios</h3>
                      <PrismicRichText field={page.projectBenefits} />
                    </div>
                  </div>
                </div>
              </section>
              <h2 className={styles.aboutProjectTitleDesktop}>Sobre o projeto:</h2>
              <div className={styles.aboutProject}>
                <h2 className={styles.aboutProjectTitleMobile}>Sobre o projeto:</h2>
                <PrismicRichText field={page.portfolioItemSummary} />
                <PrismicRichText field={page.portfolioItemDescription} />
              </div>
            </div>
          </section>
        </section>
      </main>
  );
}