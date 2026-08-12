import { contactItems } from '../../data/contact';
import { siteConfig } from '../../config/site';

export function Contact() {
  return (
    <section
      aria-labelledby="contacto-title"
      className="mt-10 rounded-3xl border border-gray-300 bg-gray-50 p-6 sm:p-8"
    >
      <h2 id="contacto-title" className="text-xl font-bold text-black">
        Contacto
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Escríbanos por el canal de su preferencia.
      </p>
      <ul className="mt-5 flex flex-col gap-3">
        {contactItems.map((item) => (
          <li key={item.title}>
            <a
              href={item.href}
              {...(item.external
                ? { rel: 'noopener noreferrer', target: '_blank' }
                : {})}
              className="group flex items-center justify-between gap-3 rounded-xl border border-transparent px-4 py-3 transition-colors hover:border-gray-300 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              <span className="text-sm text-gray-600">{item.title}</span>
              <span className="text-sm font-semibold text-black transition-colors group-hover:text-gray-600">
                {item.value}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <a
        href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
        className="mt-5 block w-full rounded-xl bg-black px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >
        Llamar ahora
      </a>
    </section>
  );
}