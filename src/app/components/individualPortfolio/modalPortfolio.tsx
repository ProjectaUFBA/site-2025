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
        <div className={styles.topModal}>
          <div onClick={() => setIsModal(false)} >
            <Image src="/closeOrangeIcon.svg" alt="Close" width={15} height={15}/>
            <p>Fechar</p>
          </div>
          <h2>{currentIndex +1} / {sliceMap.length}</h2>
        </div>
        <div className={styles.pagination}>
          <Image onClick={handlePrev} className={styles.leftArrow} src="/buttonArrow.svg" alt="arrowLeft" width={48} height={48}/>
          <Image onClick={handleNext} src="/buttonArrow.svg" alt="arrowRight" width={48} height={48}/>
        </div>
        {sliceMap.length > 0 && (
          <>
            <div className={styles.imageContainer}>
              <PrismicNextImage width={588} height={564} field={sliceMap[currentIndex]} fallback={sliceMap[currentIndex].alt ?? ''} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
