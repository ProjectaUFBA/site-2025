"use client";

import { PrismicLink, PrismicRichText } from '@prismicio/react';
import styles from './blogListing.module.scss';
import { PrismicNextImage } from '@prismicio/next';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { BlogPostDocument } from '../../../../prismicio-types';

import CaretLeft from '@/../public/CaretLeft.svg'
import CaretRight from '@/../public/CaretRight.svg'

import Image from 'next/image'
import ArrowRight from '@/../public/arrowRight.svg';
import MagnifyingGlass from '@/../public/magnifyingGlass.svg';

export default function BlogListing( {blogPosts} : {blogPosts: BlogPostDocument<string>[] }) {

  //Decides what month correlates to what number
  const monthNames = ["jan", "fev", "mar", "abr", "maio", "jun", "jul", "ago", "set", "out", "nov", "dez"];

  //All unique tags from the posts

  const tags = blogPosts.map(post => post.tags);

  const uniqueTags = tags.concat.apply([], tags).filter((value, index, self) => self.indexOf(value) === index);

  //Filtering posts by tag and search value

  const [selectedTag, setSelectedTag] = useState<string>("");

  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = (event: any) => {
    const newValue = event.target.value.toLowerCase();
    setSearchValue(newValue);
  }

  const [lookedForPosts, setLookedForPosts] = useState(
    blogPosts.filter(post => post.data.postTitle[0]!.text.toString().toLowerCase().includes(""))  
  );

  useEffect(() => {
    if (selectedTag === "") setLookedForPosts(blogPosts.filter(post => post.data.postTitle[0]!.text.toString().toLowerCase().includes(searchValue)));
    else setLookedForPosts(blogPosts.filter(post => post.data.postTitle[0]!.text.toString().toLowerCase().includes(searchValue)).filter(post => post.tags.includes(selectedTag)));    setCurrentPage(1);
  }, [searchValue, blogPosts, selectedTag]);

  const changeSelectedTag = (tag: string) => {
    setSelectedTag(tag);
    if (tag === "") setLookedForPosts(blogPosts.filter(post => post.data.postTitle[0]!.text.toString().toLowerCase().includes(searchValue)));
    else setLookedForPosts(blogPosts.filter(post => post.data.postTitle[0]!.text.toString().toLowerCase().includes(searchValue)).filter(post => post.tags.includes(tag)));
    setCurrentPage(1);
  }


  //Pagination

  const pathname = usePathname();

  //Initializes the page width
  const [pageWidth, setPageWidth] = useState( typeof window !== "undefined" ? window.innerWidth : 768)

  //Deals with the resizing and updating of the width
  useEffect(() => {
    if (pathname == "/blog") {
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
  const [itemsPerPage, setItemsPerPage] = useState(9); 

  //Defines how large images will be
  const [imageWidth, setImageWidth] = useState(384);

  useEffect(() => {
    if (itemsPerPage !== 9 && window.innerWidth > 1334) {
      setItemsPerPage(9); //3 rows of 3 items
    } else if (itemsPerPage !== 6 && window.innerWidth > 652 && window.innerWidth <= 1334) {
      setItemsPerPage(6); //3 rows of 2 items
    } else if (itemsPerPage !== 4 && window.innerWidth <= 652) {
      setItemsPerPage(4); //4 rows of 1 item
    }
    if (window.innerWidth < 900) setImageWidth(282);
    else setImageWidth(384);
  }
  ,[pageWidth, itemsPerPage]);
  
  //Initializes the current page
  const [currentPage, setCurrentPage] = useState(1);

  //Initializes the content of the current page
  const [currentPageContent, setCurrentPageContent] = useState(lookedForPosts.slice(0, itemsPerPage));

  const updateCurrentPage = (page: number) => {
    setCurrentPage(page);
  }

  //Initializes how many pages there are
  const [totalPages, setTotalPages] = useState(Math.ceil(lookedForPosts.length/itemsPerPage));

  useEffect(() => {
    //Deals with changing the content of the current page
    setCurrentPageContent(lookedForPosts.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage));
  }, [currentPage, selectedTag, itemsPerPage, lookedForPosts]);

  useEffect(() => {
    //Deals with putting the current page back to 1 when another tag is selected or content breakpoints are reached
    setCurrentPage(1);
    //Deals with how many pages there are based on the amount of items per page
    setTotalPages(Math.ceil(lookedForPosts.length/itemsPerPage));
  }, [selectedTag, itemsPerPage, lookedForPosts]);

  return (

    <div id="blogSection" className={styles.section}>

      <div className={styles.filtersArea}>

        <ul id='tagSelection' className={styles.tagSelection}>
          <li onClick={() => changeSelectedTag("")} className={selectedTag==="" ? styles.selectedTag : styles.tag}>Ver tudo</li>

          {uniqueTags.map((post, index) => (
            <li onClick={() => changeSelectedTag(post.toString())} className={selectedTag===post.toString() ? styles.selectedTag : styles.tag} key={index}>{post.toString()}</li>
          ))}
        </ul>

        <div className={styles.search}>
          <Image src={MagnifyingGlass} width={16} height={16} alt={'Lupa'} />
          <input onChange={handleSearchValue} className={styles.searchInput} type="text" id="searchTitle" placeholder="Buscar um artigo" />
        </div>

      </div>


      <div id="blogListing" className={styles.blogListing}>
        {currentPageContent.map((post, index) => 
        (
          <PrismicLink className={styles.blogItem} document={post} key={index}>
            <PrismicNextImage
              className={styles.postImage}
              width={imageWidth}
              height={224}
              key={post.id}
              field={post.data.postImage}/>

              <p className={styles.postTag}>{post.tags[0]}</p>

              <div className={styles.hoveringComponent}>
                <p className={styles.hoveringText}>Ver post</p>
                <Image src={ArrowRight} width={18} height={18} alt={'Seta para prosseguir'} />
              </div>

              <div className={styles.postSummary}>
                <span className={styles.postTitle}><PrismicRichText field={post.data.postTitle} /></span>
                <span className={styles.postSummaryDescription}><PrismicRichText field={post.data.postSummary} /></span>
                <div className={styles.authorDate}>
                  <div className={styles.postAuthor}>
                    <PrismicNextImage field={post.data.authorPicture} />
                    <p className={styles.postAuthor}>{post.data.authorName}</p>
                  </div>
                  <p className={styles.postDate}>
                    {post.data.blogPostDate?.slice(8,10)} de {monthNames[parseInt(post.data.blogPostDate?.slice(5,7)!)-1]} de {post.data.blogPostDate?.slice(0,4)}
                  </p>
                </div>
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