"use client";

import { PrismicLink, PrismicRichText } from '@prismicio/react';
import styles from './portfolioListing.module.scss';
import { PrismicNextImage } from '@prismicio/next';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PortfolioPostDocument } from '../../../../prismicio-types';

import ArrowRight from '@/../public/arrowRight.svg';
import CaretLeft from '@/../public/CaretLeft.svg'
import CaretRight from '@/../public/CaretRight.svg'

import Image from 'next/image'

export default function PortfolioListing( {portfolioPosts} : {portfolioPosts: PortfolioPostDocument<string>[]} ) {

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

  //Pagination

  const pathname = usePathname();

  //Initializes the page width
  const [pageWidth, setPageWidth] = useState( typeof window !== "undefined" ? window.innerWidth : 768)

  //Deals with the resizing and updating of the width
  useEffect(() => {
    if (pathname == "/portfolio") {
    const updatePageWidth = () => {
      setPageWidth(window.innerWidth);
    }
    window.addEventListener('resize', updatePageWidth);
    return () => {
      window.removeEventListener('resize', updatePageWidth);
    }
  }
  }, [pathname]);

  //Initializes the amount of items to be shown in the page
  const [itemsPerPage, setItemsPerPage] = useState(12); 

  useEffect(() => {
    if (itemsPerPage !== 12 && window.innerWidth > 1334) {
      setItemsPerPage(12); //3 rows of 4 items
    } else if (itemsPerPage !== 9 && window.innerWidth > 995 && window.innerWidth <= 1334) {
      setItemsPerPage(9); //3 rows of 3 items
    } else if (itemsPerPage !== 6 && window.innerWidth > 652 && window.innerWidth <= 995) {
      setItemsPerPage(6); //3 rows of 2 items
    } else if (itemsPerPage !== 4 && window.innerWidth <= 652) {
      setItemsPerPage(4); //4 rows of 1 item
    }}
  ,[pageWidth, itemsPerPage]);
  
  //Initializes the current page
  const [currentPage, setCurrentPage] = useState(1);

  //Initializes the content of the current page
  const [currentPageContent, setCurrentPageContent] = useState(filteredPosts.slice(0, itemsPerPage));

  const updateCurrentPage = (page: number) => {
    setCurrentPage(page);
  }

  //Initializes how many pages there are
  const [totalPages, setTotalPages] = useState(Math.ceil(filteredPosts.length/itemsPerPage));

  useEffect(() => {
    //Deals with changing the content of the current page
    setCurrentPageContent(filteredPosts.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage));
  }, [currentPage, selectedTag, itemsPerPage, filteredPosts]);

  useEffect(() => {
    //Deals with putting the current page back to 1 when another tag is selected or content breakpoints are reached
    setCurrentPage(1);
    //Deals with how many pages there are based on the amount of items per page
    setTotalPages(Math.ceil(filteredPosts.length/itemsPerPage));
  }, [selectedTag, itemsPerPage, filteredPosts.length]);


  return (

    <div id="portfolioSection" className={styles.section}>

      <ul id='tagSelection' className={styles.tagSelection}>
        <li onClick={() => changeSelectedTag("")} className={selectedTag==="" ? styles.selectedTag : styles.tag}>Ver Todos</li>
        {uniqueTags.map((post, index) => (
          <li onClick={() => changeSelectedTag(post.toString())} className={selectedTag===post.toString() ? styles.selectedTag : styles.tag} key={index}>{post.toString()}</li>
        ))}
      </ul>

      <div id="portfolioListing" className={styles.portfolioListing}>
        {currentPageContent.map((post, index) => 
        (
          <PrismicLink className={styles.portfolioItem} document={post} key={index}>
            <PrismicNextImage
              className={styles.postImage}
              width={282}
              height={330}
              key={post.id}
              field={post.data.portfolioItemMainPicture}/>

              <p className={styles.postTag}>{post.tags[0]}</p>

              <div className={styles.hoveringComponent}>
                <p className={styles.hoveringText}>Ver projeto</p>
                <Image src={ArrowRight} width={18} height={18} alt={'Seta para prosseguir'} />
              </div>

              <div className={styles.postSummary}>
                <p className={styles.postDate}>{post.data.portfolioItemDate?.slice(0,4)}</p>
                <span className={styles.postTitle}><PrismicRichText field={post.data.portfolioItemTitle} /></span>
              </div>

          </PrismicLink>
        ))
        }
      </div>

      <ul className={styles.pagination}>
        <li className={currentPage > 1 ? styles.paginationButton : styles.disabledButton } onClick={currentPage > 1 ? () => updateCurrentPage(currentPage-1) : ()=>{} } ><Image width={16} height={16} src={CaretLeft} alt={'Seta Esquerda'} /></li>
        
        {currentPage > 1 && <li className={styles.paginationButton} onClick={() => updateCurrentPage(currentPage-1)}><p>{currentPage-1}</p></li>}
        <li className={styles.selectedPage}><p>{currentPage}</p></li>
        {currentPage < totalPages && <li className={styles.paginationButton} onClick={() => updateCurrentPage(currentPage+1)}><p>{currentPage+1}</p></li>}
        
        <li className={currentPage < totalPages ? styles.paginationButton : styles.disabledButton } onClick={currentPage < totalPages ? () => updateCurrentPage(currentPage+1) : ()=>{}} ><Image width={16} height={16} src={CaretRight} alt={'Seta Direita'} /></li>
      </ul>

    </div>
  );
}