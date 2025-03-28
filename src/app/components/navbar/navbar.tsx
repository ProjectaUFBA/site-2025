'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation'
import NavbarImage from "./navbarImage";
import Image from "next/image";
import { useState, useEffect } from "react";

import styles from "./navbar.module.scss";
import MenuMobile from "./menuMobile";

export default function Navbar() {
    const pathname = usePathname()
    const [hash, setHash] = useState("/");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (pathname == "/") {
            const updatePageWidth = () => {
                const pageWidth = window.innerWidth;
                if (pageWidth > 1050) { 
                    setIsMenuOpen(false);
                }
            }

            window.addEventListener('resize', updatePageWidth);
            return () => {
            window.removeEventListener('resize', updatePageWidth);
            }

    }
    }, [pathname]);

    useEffect(() => {
        if(pathname == "/"){
            const handleScroll = () => {
                const scrollTop = window.scrollY;
                if (scrollTop > 600) { 
                    setScrolled(true);
                } else {
                    setScrolled(false);
                }
                };
                window.addEventListener('scroll', handleScroll);
                return () => {
                window.removeEventListener('scroll', handleScroll);
                };
        }
    }, [pathname]);

    return (
        <div>
            <header className={pathname == "/" && !isMenuOpen ? scrolled ? `${styles.navbarWrapper} ${styles.backgroundActive}` : 
        `${styles.navbarWrapper} ${styles.backgroundInactive}` : `${styles.navbarWrapper} ${styles.backgroundActive}`}>
            <section className={styles.internWrapper}>
                <div className={styles.navbarLeft}>
                    <Link className={styles.controlImg} href={"/"}>
                        <NavbarImage state={scrolled} pathname={pathname} isMenuOpen={isMenuOpen}/>
                    </Link>
                    <ul className={pathname == "/" ? scrolled ? styles.navbarList : styles.navbarListInactive : styles.navbarList}>
                        <li className={pathname == "/" && hash != "#quem-somos" ? styles.listActive : styles.listInactive}>
                            <Link href="/" onClick={() => setHash("/")}>
                            Início</Link>
                            <div className={styles.line}/>
                        </li>
                        <li className={pathname == "/servicos" ? styles.listActive : styles.listInactive}>
                            <Link href="/servicos">
                            Serviços</Link>
                            <div className={styles.line}/>
                        </li>
                         <li className={pathname?.includes("/portfolio") ? styles.listActive : styles.listInactive}>
                            <Link href="/portfolio">
                            Portfólio</Link>
                            <div className={styles.line}/>
                        </li>
                        <li className={hash == "#quem-somos" && pathname == "/" ? styles.listActive : styles.listInactive}>
                            <Link href="/#quem-somos" onClick={() => setHash("#quem-somos")}>
                            Quem Somos</Link>
                            <div className={styles.line}/>
                        </li>
                        <li className={pathname == "/duvidas" ? styles.listActive : styles.listInactive}>
                            <Link href="/duvidas">
                            Dúvidas</Link>
                            <div className={styles.line}/>
                        </li>
                        <li className={pathname == "/materiais" ? styles.listActive : styles.listInactive}>
                            <Link href="/materiais">
                            Materiais</Link>
                            <div className={styles.line}/>
                        </li>
                        <li className={pathname?.includes("/blog") ? styles.listActive : styles.listInactive}>
                            <Link href="/blog">
                            Blog</Link>
                            <div className={styles.line}/>
                        </li>
                        <li className={pathname == "/contato" ? styles.listActive : styles.listInactive}>
                            <Link href="/contato">
                            Contato</Link>
                            <div className={styles.line}/>
                        </li>
                    </ul>
                </div>
                <Link className="button" href="/contato" onClick={() => setIsMenuOpen(false)}><button>Entrar em Contato</button></Link>
                <div className={styles.hamburgerIcon}>
                    {(pathname == "/" && (!isMenuOpen && !scrolled)) && <Image src="/hamburger.svg" alt="Menu" width={25} height={20} onClick={() => setIsMenuOpen(true)} />}
                    { (pathname != "/" ? (!isMenuOpen) : (!isMenuOpen && scrolled)) && <Image src="/hamburgerDark.svg" alt="Menu" width={25} height={20} onClick={() => setIsMenuOpen(true)} />}
                    {isMenuOpen && <Image src="/closeIcon.svg" alt="Close Icon" width={20} height={20} onClick={() => setIsMenuOpen(false)} />}         
                </div>
            </section>
        </header>
        {isMenuOpen && <MenuMobile pathname={pathname} hash={hash} setHash={setHash} setIsMenuOpen={setIsMenuOpen}/>}
        </div>
    );

}