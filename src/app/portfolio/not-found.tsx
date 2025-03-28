import Link from "next/link";

import styles from "./page.module.scss";

export default function NotFound() {
  return (
    <div className={styles.unexpected}>
      <h1>Página não encontrada</h1>
        <Link href="/blog"> Voltar para a tela de Portfolio</Link>        
    </div>
  );
}