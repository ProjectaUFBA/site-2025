import { Metadata } from "next";

import { createClient } from "@/prismicio";

import styles from "./page.module.scss";
import BlogListing from "../components/blogListing/blogListing";
import BlogHighlight from "../components/blogHighlight/blogHighlight";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("blog");

  const posts = await client.getAllByType("blogPost", {
    orderings: [
      { field: "my.blog_post.publication_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  const highlightedPosts = posts.filter(post => post.data.highlight === true)

  return (
    <div className={styles.blogPage}>
      <BlogHighlight posts={highlightedPosts}/>

      <BlogListing blogPosts={posts} />

    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("blog");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
