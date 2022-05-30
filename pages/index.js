import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Batista Doleo & Asociados</title>
        <meta name="description" content="Buffette de Abogados" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img src='home.png' alt='logo' />

        <h2 className={styles.description}>
          MAS DE 3 DECADAS EN EL EJERCICIO JURIDICO.
        </h2>

        <div className={styles.grid}>
          <a href="https://www.instagram.com/batistaydoleo" className={styles.card}>
            <h2>Bienes Raices</h2>
            <p>Fotos y videos de nuestros apartamentos disponibles</p>
          </a>

          <a href="https://wa.me/18297038306" className={styles.card}>
            <h2>Departamento Legal</h2>
            <p>Contacto con nuestro despacho via Whatsapp.</p>
          </a>

          <a
            href="https://wa.me/18098434342"
            className={styles.card}
          >
            <h2>Dr. Eleuterio Batista</h2>
            <p>Contacto con el Dr. Batista (Abogado) via Whatsapp.</p>
          </a>

          <a
            href="https://wa.me/18297038306"
            className={styles.card}
          >
            <h2>Adm Condominio</h2>
            <p>
              La administracion de nuestros condominios.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          target="_blank"
          rel="noopener noreferrer"
        >
          2022 Batista Doleo & Asociados.
        </a>
      </footer>
    </div>
  )
}
