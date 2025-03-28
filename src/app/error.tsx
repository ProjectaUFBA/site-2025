"use client"

import styles from './page.module.scss'

export default function ErrorBoundary({error}: {error: Error}) {
    return (
        <div className={styles.unexpected}>
            <h1>Erro</h1>
            <p>Erro ao carregar a página</p>
            <p>{error.message}</p>
        </div>
    )
}