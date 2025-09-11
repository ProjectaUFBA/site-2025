import { Metadata } from "next";

import { createClient } from "@/prismicio";

import styles from "./page.module.scss";

import PortfolioIntro from "../components/portfolioIntro/portfolioIntro";
import PortfolioListing from "../components/portfolioListing/portfolioListing";
import StatementPorfolio from "../components/statementPortfolio/statementPortfolio";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("portfolio");

  const portfolioPosts = await client.getAllByType("portfolioPost", {
    orderings: [
      { field: "my.blog_post.publication_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  return (
    <main>
      <div className={styles.portfolioPage}>
        <div className={styles.pageContent}>
          <PortfolioListing 
            intro={
              <PortfolioIntro
                title={page.data.pageTitle}
                description={page.data.pageDescription}
              />
            }
            portfolioPosts={portfolioPosts} 
          />
        </div>
      </div>
      <StatementPorfolio title={page.data.statementTitle} description={page.data.statementDescription} statementCallToAction={page.data.statementCallToAction} slices={page.data.slices} />
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("portfolio");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
