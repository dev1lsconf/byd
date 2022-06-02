import Head from 'next/head'
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
            <p>Fotos y videos de nuestros apartamentos disponibles en Instagram.</p>
          </a>

          <a href="https://wa.me/18297038306" className={styles.card}>
            <h2>Departamento Legal</h2>
            <p>Contacto con la Recepcion de nuestro despacho via Whatsapp.</p>
          </a>

          <a
            href="https://wa.me/18098434342"
            className={styles.card}
          >
            <h2>Dr. Eleuterio Batista</h2>
            <p>Contacto con el Dr. Batista (Abogado) 809.843.4342 via Whatsapp.</p>
          </a>

          <a
            href="mailto:despacho@batistaydoleo.com"
            className={styles.card}
          >
            <h2>Contacto</h2>
            <p>
              Via Nuestra direccion de Correo Electronico despacho@batistaydoleo.com
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
