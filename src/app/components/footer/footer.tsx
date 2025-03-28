import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";

import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

import styles from "./footer.module.scss";

export default async function Footer() {
    const client = createClient();
    const footer = await client.getSingle("footer");

    return (
        <footer className={styles.footer}>
            <div className={styles.internFooter}>
                <div className={styles.logoAddress}>
                    <PrismicNextImage field={footer.data.footerLogo} fallback={footer.data.footerLogo.alt ?? ''}/>
                    <p className={styles.address}>{footer.data.address}</p>
                </div>
                <ul className={styles.footerList}>
                    <SliceZone slices={footer.data.slices} components={components} />
                </ul>
            </div>
        </footer>
    );

}