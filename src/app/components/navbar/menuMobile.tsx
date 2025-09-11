import Image from 'next/image';
import styles from './navbar.module.scss'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Link from 'next/link';
import { SliceZone } from '@prismicio/react';
import { components } from '@/slices';

import footer from '../footer/footer';
import { createClient } from '@/prismicio';

export default function MenuMobile({pathname, hash, setHash, setIsMenuOpen}:{pathname: string|null, hash: string, setHash: Dispatch<SetStateAction<string>>, setIsMenuOpen: Dispatch<SetStateAction<boolean>>}) {
    const [navSlice, setNavSlice] = useState<any>();
    useEffect(() => {
        const client = createClient();
        const fetchNavbarLogo = async () => {
          const nav = await client.getSingle("globalNavbar");
          setNavSlice(nav.data.slices)
        };
    
        fetchNavbarLogo();
      }, []);

    return (
    <section className={styles.mobileMenuWrapper}>
      <ul className={styles.listMobileWrapper}>
          <li onClick={() => setIsMenuOpen(false)} className={pathname == "/" && hash != "#quem-somos" ? styles.optionSelected : styles.optionNotSelected}>
              <Link href="/" onClick={() => setHash("/")}>
              Início</Link>
              <div className={styles.line}/>
          </li>
          <li onClick={() => setIsMenuOpen(false)} className={pathname == "/servicos" ? styles.optionSelected : styles.optionNotSelected}>
              <Link href="/servicos">
              Serviços</Link>
              <div className={styles.line}/>
          </li>
          <li onClick={() => setIsMenuOpen(false)} className={pathname == "/portfolio" ? styles.optionSelected : styles.optionNotSelected}>
              <Link href="/portfolio">
              Portfólio</Link>
              <div className={styles.line}/>
          </li> 
          <li onClick={() => setIsMenuOpen(false)} className={hash == "#quem-somos" && pathname == "/" ? styles.optionSelected : styles.optionNotSelected}>
              <Link href="/#quem-somos" onClick={() => setHash("#quem-somos")}>
              Quem Somos</Link>
              <div className={styles.line}/>
          </li>
           <li onClick={() => setIsMenuOpen(false)} className={pathname == "/duvidas" ? styles.optionSelected : styles.optionNotSelected}>
              <Link href="/duvidas">
              Dúvidas</Link>
              <div className={styles.line}/>
          </li>
          <li onClick={() => setIsMenuOpen(false)} className={pathname == "/materiais" ? styles.optionSelected : styles.optionNotSelected}>
              <Link href="/materiais">
              Materiais</Link>
              <div className={styles.line}/>
          </li>
          <li onClick={() => setIsMenuOpen(false)} className={pathname?.includes("/blog") ? styles.optionSelected : styles.optionNotSelected}>
              <Link href="/blog">
              Blog</Link>
              <div className={styles.line}/>
          </li>
      </ul>
      <div className={styles.bottomEmail}>
        <div className={styles.bottomEmailText}>
            <Image src='/emailIcon.svg' alt='email icon' width={42} height={42}/>
            <p>Newsletter</p>
        </div>
        <ul className={styles.navbarListSocialMedia}>
            <SliceZone slices={navSlice} components={components} />
        </ul>
      </div>
    </section>
  );
}