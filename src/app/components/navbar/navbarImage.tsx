'use client'
import { useState, useEffect } from "react";
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { ImageField } from "@prismicio/client";

export default function NavbarImage({state, pathname, isMenuOpen}: {state: boolean, pathname: string|null, isMenuOpen: boolean}) {
  const [navbarLogo, setNavbarLogo] = useState<ImageField<never> | undefined>();
  const [navbarLight, setNavbarLight] = useState<ImageField<never> | undefined>();

  useEffect(() => {
    const client = createClient();
    const fetchNavbarLogo = async () => {
      const nav = await client.getSingle("globalNavbar");
      if(nav.data){
        setNavbarLogo(nav.data.navbarLogo)
        setNavbarLight(nav.data.navbarLogoLight)
      }
    };

    fetchNavbarLogo();
  }, [state]);

  if(pathname != "/"){
    state = true;
  }

  return (
    (state || isMenuOpen) ? navbarLogo ? <PrismicNextImage field={navbarLogo}/> : <div></div> : navbarLight ? <PrismicNextImage field={navbarLight} alt="" fallback="Light Logo"/> : <div></div> 
  );
}
