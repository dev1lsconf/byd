import { Hero, Services, Contact, Footer } from './components/sections';
import { JsonLd } from './components/seo/JsonLd';

export default function Home() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col px-4 py-6 sm:py-10 bg-white text-black">
      <JsonLd />

      <Hero />

      <main className="flex-1">
        <section className="py-8 text-center sm:py-12">
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl text-black">
            Batista Doleo & Asociados
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-sm font-medium uppercase tracking-[0.2em] text-gray-600 sm:text-base">
            Más de 3 décadas en el ejercicio jurídico
          </p>
        </section>

        <Services />
      </main>

      <Contact />

      <Footer />
    </div>
  );
}