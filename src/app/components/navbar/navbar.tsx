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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 1150;
            setIsMobile(mobile);
            if (!mobile) {
                setIsMenuOpen(false);
            }
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

    const isBgActive = pathname !== "/" || scrolled || isMenuOpen;

    return (
        <div>
            <header className={`${styles.navbarWrapper} ${isBgActive ? styles.backgroundActive : styles.backgroundInactive}`}>
            <section className={styles.internWrapper}>
                <div className={styles.hamburgerIcon} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen
                        ? <Image src="/closeIcon.svg" alt="Close Icon" width={20} height={20} />
                        : (isBgActive || isMobile)
                            ? <Image src="/hamburgerDark.svg" alt="Menu" width={25} height={20} />
                            : <Image src="/hamburger.svg" alt="Menu" width={25} height={20} />
                    }
                </div>
                <div className={styles.navbarLeft}>
                    <Link className={styles.controlImg} href={"/"}>
                        <NavbarImage state={scrolled || isMobile} pathname={pathname} isMenuOpen={isMenuOpen}/>
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
                <Link className={styles.contactButton} href="/contato" onClick={() => setIsMenuOpen(false)}><button>Entrar em Contato</button></Link>
            </section>
        </header>
        {isMenuOpen && <MenuMobile pathname={pathname} hash={hash} setHash={setHash} setIsMenuOpen={setIsMenuOpen}/>}
        </div>
    );
}