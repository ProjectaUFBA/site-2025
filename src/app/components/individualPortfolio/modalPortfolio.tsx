import { ImageFieldImage, Slice } from '@prismicio/client';
import styles from './individualPortfolio.module.scss';
import { useState } from 'react';
import { PrismicNextImage } from '@prismicio/next';
import Image from 'next/image';

export default function ModalPortfolio({ slices, setIsModal, sliceMap }: { slices: Slice[], setIsModal: (value: boolean) => void, sliceMap: ImageFieldImage[]}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? sliceMap.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === sliceMap.length - 1 ? 0 : prevIndex + 1));
  };

  function closeOnClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      setIsModal(false);
    }
  }

  return (
    <section className={styles.modalWrapper} onClick={closeOnClick}>
      <div className={styles.modal}>
        {/* Botão de fechar */}
        <button className={styles.closeButton} onClick={() => setIsModal(false)}>
          <Image src="/closeIcon.svg" alt="Close" width={24} height={24}/>
        </button>

        {/* Container principal para desktop */}
        <div className={styles.modalContent}>
          {/* Seta esquerda - Desktop */}
          <button className={styles.navButtonDesktop} onClick={handlePrev} aria-label="Imagem anterior">
            <Image src="/assets/arrowLeft.svg" alt="Seta esquerda" width={48} height={49}/>
          </button>

          {/* Container da imagem e contador */}
          <div className={styles.imageSection}>
            {/* Imagem principal */}
            {sliceMap.length > 0 && (
              <div className={styles.imageContainer}>
                <PrismicNextImage 
                  width={800} 
                  height={600} 
                  field={sliceMap[currentIndex]} 
                  fallback={sliceMap[currentIndex].alt ?? ''} 
                />
              </div>
            )}

            {/* Contador de páginas */}
            <div className={styles.pageCounter}>
              {currentIndex + 1}/{sliceMap.length}
            </div>
          </div>

          {/* Seta direita - Desktop */}
          <button className={styles.navButtonDesktop} onClick={handleNext} aria-label="Próxima imagem">
            <Image src="/assets/arrowRight.svg" alt="Seta direita" width={49} height={49}/>
          </button>
        </div>

        {/* Container da imagem para mobile */}
        <div className={styles.mobileImageSection}>
          {/* Imagem */}
          {sliceMap.length > 0 && (
            <div className={styles.imageContainer}>
              <PrismicNextImage 
                width={800} 
                height={600} 
                field={sliceMap[currentIndex]} 
                fallback={sliceMap[currentIndex].alt ?? ''} 
              />
            </div>
          )}

          {/* Controles embaixo da imagem - Mobile */}
          <div className={styles.mobileControls}>
            {/* Seta esquerda - Mobile */}
            <button className={styles.navButtonMobile} onClick={handlePrev} aria-label="Imagem anterior">
              <Image src="/assets/arrowLeft.svg" alt="Seta esquerda" width={36} height={36}/>
            </button>

            {/* Contador para mobile */}
            <div className={styles.mobilePageCounter}>
              {currentIndex + 1}/{sliceMap.length}
            </div>

            {/* Seta direita - Mobile */}
            <button className={styles.navButtonMobile} onClick={handleNext} aria-label="Próxima imagem">
              <Image src="/assets/arrowRight.svg" alt="Seta direita" width={36} height={36}/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
