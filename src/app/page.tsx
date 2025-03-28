import { Metadata } from "next";

import { createClient } from "@/prismicio";

import styles from "./page.module.scss";
import HeroCallToAction from "./components/heroCallToAction/heroCallToAction";
import HeroAboutUs from "./components/heroAboutUs/heroAboutUs";
import HeroPortfolio from "./components/heroPortfolio/heroPortfolio";
import HeroMetodology from "./components/heroMetodology/heroMetodology";
import HeroServices from "./components/heroServices/heroServices";
import HomeHero from "./components/homeHero/homeHero";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home");

  const portfolioPosts = await client.getAllByType("portfolioPost", {
    orderings: [
      { field: "my.blog_post.publication_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  return (
    <main className={styles.page}>
      <HomeHero title={page.data.whiteTitleText} titleYellow={page.data.yellowTitleText} description={page.data.heroDescription} image={page.data.heroImage1}/>
      <HeroServices title={page.data.servicesTitle} description={page.data.servicesDescription} slices={page.data.slices.filter((e) => {
            return e.slice_type == 'services_slices';
          })}/>
      <HeroMetodology title={page.data.metodologyTitle} description={page.data.metodologyDescription} asideText={page.data.metodologyAsideText} slices={page.data.slices.filter((e) => {
            return e.slice_type == 'metodology_cards';
          })}/>
      <HeroPortfolio title={page.data.portfolioTitle} description={page.data.portfolioDescription} portfolioPosts={portfolioPosts}/>
      <HeroAboutUs title={page.data.aboutUsTitle} description={page.data.aboutUsDescription} image={page.data.aboutUsImage} slices={page.data.slices.filter((e) => {
            return e.slice_type == 'about_us_item';
          })}/>
      <HeroCallToAction image={page.data.callToActionLogo} title={page.data.callToActionTitle} description={page.data.callToActionDescription}/>

    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}