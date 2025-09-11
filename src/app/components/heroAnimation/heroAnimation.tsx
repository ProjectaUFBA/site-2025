import React from 'react';
import { PrismicNextImage } from '@prismicio/next';
import styles from './heroAnimation.module.scss';

// [AI Generated] Data: 19/01/2025
// Descrição: Interfaces TypeScript para o componente de animação de galeria
// Gerado por: Cursor AI
// Versão: React 18, Next.js 14, TypeScript 5
// AI_GENERATED_CODE_START 
export interface ImageData {
  url: string;
  alt: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface HeroAnimationProps {
  images: ImageData[];
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  className?: string;
}

interface ImageGroup {
  large: ImageData;
  small1: ImageData;
  small2: ImageData;
}
// AI_GENERATED_CODE_END 

// [AI Generated] Data: 19/01/2025
// Descrição: Função para organizar imagens em grupos de 1 grande + 2 pequenas
// Gerado por: Cursor AI
// Versão: TypeScript 5
// AI_GENERATED_CODE_START 
const organizeImages = (images: ImageData[]): ImageGroup[] => {
  if (images.length < 3) {
    // Se não há imagens suficientes, repete as disponíveis
    const repeated: ImageData[] = [];
    while (repeated.length < 3) {
      repeated.push(...images);
    }
    return organizeImages(repeated.slice(0, 3));
  }

  const groups: ImageGroup[] = [];
  
  for (let i = 0; i < images.length; i += 3) {
    const large = images[i] || images[0];
    const small1 = images[i + 1] || images[1 % images.length];
    const small2 = images[i + 2] || images[2 % images.length];
    
    groups.push({ large, small1, small2 });
  }
  
  return groups;
};
// AI_GENERATED_CODE_END 

// [AI Generated] Data: 19/01/2025
// Descrição: Componente de animação de galeria com movimento horizontal infinito baseado em ScrollingText
// Gerado por: Cursor AI
// Versão: React 18, Next.js 14, TypeScript 5
// AI_GENERATED_CODE_START 
const HeroAnimation: React.FC<HeroAnimationProps> = ({ 
  images, 
  speed = 'normal', 
  pauseOnHover = true, 
  className = '' 
}) => {
  const organizedImages = organizeImages(images);
  
  // Criar múltiplas cópias para garantir loop infinito (similar ao ScrollingText)
  const MINIMUM_COPIES = 8; // Garantir conteúdo suficiente
  const imageGroups = Array(MINIMUM_COPIES).fill(organizedImages).flat();
  
  // Construir classes CSS dinâmicas
  const wrapperClasses = [
    styles.heroAnimationWrapper,
    styles[speed],
    pauseOnHover ? styles.pauseOnHover : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      <div className={styles.scrollingContent}>
        {imageGroups.map((group, groupIndex) => (
          <div key={groupIndex} className={styles.imageGroup}>
            <PrismicNextImage 
              field={{ ...group.large, url: group.large.url }}
              className={styles.largeImage}
              priority={groupIndex < 2}
            />
            <div className={styles.smallImagesColumn}>
              <PrismicNextImage 
                field={{ ...group.small1, url: group.small1.url }}
                className={styles.smallImage}
                priority={groupIndex < 2}
              />
              <PrismicNextImage 
                field={{ ...group.small2, url: group.small2.url }}
                className={styles.smallImage}
                priority={groupIndex < 2}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
// AI_GENERATED_CODE_END 

export default HeroAnimation; 