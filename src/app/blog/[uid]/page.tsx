import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicLink, PrismicRichText } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";

import styles from './page.module.scss'

import ArrowRight from '@/../public/arrowRight.svg';
import Image from 'next/image';

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("blogPost", params.uid)
    .catch(() => notFound());

  const posts = await (await client.getAllByType("blogPost", {
    orderings: [
      { field: "my.blog_post.publication_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  })).filter((post) => post.id !== page.id);

  return (
    <div className={styles.blogPostPage}>
        <div className={styles.post}>

          <div className={styles.postIntroBackground} />

          <div className={styles.postIntro}>

          <div className={styles.tagListing}>
            {page.tags.map((tag, index) => (
              index > 1 ? null :
                <p className={styles.postTag} key={index}>{tag}</p>
              ))}
          </div>
           
            
            <div className={styles.postTitleContainer}>
              <PrismicRichText field={page.data.postTitle} />
            </div>

            <div className={styles.authorArea}>
              <PrismicNextImage width={36} height={36} className={styles.authorImage} field={page.data.authorPicture}/>
              <p>
                por <span className={styles.authorName}>{page.data.authorName} </span>
                em {page.data.blogPostDate?.slice(8,10)}/{page.data.blogPostDate?.slice(5,7)}/{page.data.blogPostDate?.slice(0,4)}
                  
              </p>
            </div>

            <PrismicNextImage className={styles.postMainImage} field={page.data.postImage}/>
          
          </div>

          <div className={styles.postContent}>
            <PrismicRichText field={page.data.postDescription} />
            <div className={styles.tagListing}>
              {page.tags.map((tag, index) => (
                <p className={styles.postTag} key={index}>{tag}</p>
              ))}
            </div>
          </div>

          <div className={styles.youCouldAlsoEnjoy}>
            <h2 className={styles.youCouldAlsoEnjoyTitle}>Você também pode gostar:</h2>

            <div className={styles.postListing}>
              {posts.map((post, index) => 
              index > 1 ? null :
              (
                <PrismicLink className={styles.blogItem} document={post} key={index}>
                  <PrismicNextImage
                    className={styles.postImage}
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
                        <p className={styles.postDate}>{page.data.blogPostDate?.slice(8,10)}/{page.data.blogPostDate?.slice(5,7)}/{page.data.blogPostDate?.slice(0,4)}</p>
                      </div>
                    </div>

                </PrismicLink>
              ))
              }
            </div>

          </div>

        </div>
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("blogPost", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blogPost");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
