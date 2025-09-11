import { ImageField, KeyTextField, RichTextField, Slice} from '@prismicio/client';
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import Link from 'next/link';
import styles from './homeHero.module.scss';
import HeroAnimation from '../heroAnimation/heroAnimation';

export default function HomeHero({
  title, 
  titleYellow, 
  description, 
  images,
  slices
}: {
  title: KeyTextField, 
  titleYellow:KeyTextField, 
  description: RichTextField, 
  images: ImageField[],
  slices: Slice[]
}) {

  // [AI Generated] Data: 19/01/2025
  // Descrição: Extração das imagens do slice HeroAnimatedImage do Prismic para formato ImageData compatível com HeroAnimation
  // Gerado por: Cursor AI
  // Versão: React 18, Next.js 14, TypeScript 5
  // AI_GENERATED_CODE_START
  // Filtrar o slice HeroAnimatedImage e extrair as imagens
  const heroAnimatedImageSlice = slices.find(slice => slice.slice_type === 'hero_animated_image');
  
  // Converter as imagens do slice para o formato ImageData esperado pelo HeroAnimation
  const heroImages = heroAnimatedImageSlice && heroAnimatedImageSlice.items && heroAnimatedImageSlice.items.length > 0
    ? heroAnimatedImageSlice.items.map((item: any) => ({
        url: item.image?.url || '',
        alt: item.image?.alt || 'Hero Image',
        dimensions: item.image?.dimensions || undefined
      }))
    : images.length > 0 && images[0] ? [
        {
          url: images[0].url || '',
          alt: images[0].alt || 'Hero Image',
          dimensions: images[0].dimensions || undefined
        },
        {
          url: images[0].url || '',
          alt: images[0].alt || 'Hero Image',
          dimensions: images[0].dimensions || undefined
        },
        {
          url: images[0].url || '',
          alt: images[0].alt || 'Hero Image',
          dimensions: images[0].dimensions || undefined
        }
      ] : [];
  // AI_GENERATED_CODE_END

  return (
    <section className={styles.homeWrapper}>
      {/* Imagens estáticas para desktop (layout original) */}
      <div className={styles.staticImages}>
        {images.map((image, index) => (
          <div className={styles.imageWrapper} key={index}>
            <PrismicNextImage className={styles.bg} field={image} fallback={image.alt ?? ""} />
          </div>
        ))}
      </div>

      {/* Animação para mobile - aparece primeiro (acima do texto) */}
      <div className={styles.mobileAnimation}>
        <HeroAnimation 
          images={heroImages}
          speed="slow"
          pauseOnHover={false}
        />
      </div>

      {/* Conteúdo principal - aparece depois das imagens no mobile */}
      <div className={styles.content}>
        <div className={styles.homeIntern}>
          <div className={styles.wrapperInfos}>
            <div className={styles.text}>
              <h1>{title} <span className={styles.heroTitleYellow}>{titleYellow}</span></h1> 
              <span className={styles.description}><PrismicRichText field={description} /></span>
            </div>
            <div className={styles.wrapperButton}>
              <Link href="/contato"><button className={styles.buttonContact}>Entrar em contato</button></Link>   
              <Link href="/portfolio"><button className={styles.buttonPortfolio}>Nosso portfólio</button></Link>   
            </div>      
          </div>
        </div>
      </div>
    </section>
  );
}