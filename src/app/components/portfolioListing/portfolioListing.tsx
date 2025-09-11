// [AI Generated] Data: 19/12/2024
// Descrição: Removida completamente a paginação do portfólio - todos os projetos aparecem imediatamente
// Gerado por: Cursor AI
// Versão: React 18, PrimeReact, Next.js
// AI_GENERATED_CODE_START
"use client";

import { PrismicLink, PrismicRichText } from '@prismicio/react';
import styles from './portfolioListing.module.scss';
import { PrismicNextImage } from '@prismicio/next';
import { useState } from 'react';
import { PortfolioPostDocument } from '../../../../prismicio-types';
import { Dropdown } from "primereact/dropdown";
// AI_GENERATED_CODE_END

import CaretLeft from '@/../public/CaretLeft.svg'
import CaretRight from '@/../public/CaretRight.svg'

import Image from 'next/image'

export default function PortfolioListing( {portfolioPosts, intro} : {portfolioPosts: PortfolioPostDocument<string>[], intro: React.ReactNode} ) {

  //All unique tags from the posts

  const tags = portfolioPosts.map(post => post.tags);

  const uniqueTags = tags.concat.apply([], tags).filter((value, index, self) => self.indexOf(value) === index);

  //Filtering posts by tag

  const [selectedTag, setSelectedTag] = useState<string>("");

  const [filteredPosts, setFilteredPosts] = useState(portfolioPosts);

  const changeSelectedTag = (tag: string) => {
    setSelectedTag(tag);
    if (tag === "") setFilteredPosts(portfolioPosts);
    else setFilteredPosts(portfolioPosts.filter(post => post.tags.includes(tag)));
  }

  // AI_GENERATED_CODE_START
  // Dropdown options for mobile
  const dropdownOptions = [
    { option: "Ver Todos" },
    ...uniqueTags.map(tag => ({ option: tag.toString() }))
  ];

  interface Option {
    option: string;
  }

  const itemTemplate = (option: Option) => {
    return (
      <section className={styles.itemTemplate}>
        <p>{option.option}</p>
      </section>
    );
  }
  // AI_GENERATED_CODE_END

  return (

    <div id="portfolioSection" className={styles.section}>
      {intro}
      {/* Desktop Filter - Lista de botões */}
      <ul id='tagSelection' className={styles.tagSelection}>
        <li onClick={() => changeSelectedTag("")} className={selectedTag==="" ? styles.selectedTag : styles.tag}>Ver Todos</li>
        {uniqueTags.map((post, index) => (
          <li onClick={() => changeSelectedTag(post.toString())} className={selectedTag===post.toString() ? styles.selectedTag : styles.tag} key={index}>{post.toString()}</li>
        ))}
      </ul>

      {/* AI_GENERATED_CODE_START */}
      {/* Mobile Filter - Dropdown */}
      <div className={styles.mobileFilterWrapper}>
        {/* AI_GENERATED_CODE_START */}
        <p className={styles.filterLabel}>Filtrar:</p>
        {/* AI_GENERATED_CODE_END */}
        <Dropdown
          panelClassName={styles.panelWrapper}
          options={dropdownOptions}
          value={dropdownOptions.find(option => 
            selectedTag === "" ? option.option === "Ver Todos" : option.option === selectedTag
          )}
          onChange={(e) => {
            const service = e.target.value;
            if (service.option === "Ver Todos") {
              changeSelectedTag("");
            } else {
              changeSelectedTag(service.option);
            }
          }}
          optionLabel="option"
          placeholder="Selecione uma categoria"
          itemTemplate={itemTemplate}
          className={styles.dropdown}
        />
      </div>
      {/* AI_GENERATED_CODE_END */}

      <div id="portfolioListing" className={styles.portfolioListing}>
        {filteredPosts.map((post, index) => 
        (
          <PrismicLink className={styles.portfolioItem} document={post} key={index}>
            <PrismicNextImage
              className={styles.postImage}
              width={282}
              height={330}
              key={post.id}
              field={post.data.portfolioItemMainPicture}/>

              <p className={styles.postTag}>{post.tags[0]}</p>

              <div className={styles.postSummary}>
                <p className={styles.postDate}>{post.data.portfolioItemDate?.slice(0,4)}</p>
                <span className={styles.postTitle}><PrismicRichText field={post.data.portfolioItemTitle} /></span>
              </div>

          </PrismicLink>
        ))
        }
      </div>

    </div>
  );
}