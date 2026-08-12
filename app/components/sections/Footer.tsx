import { siteConfig } from '../../config/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 flex flex-col items-center gap-2 border-t border-gray-300 py-6 text-center text-xs text-gray-500">
      <p>&copy; {currentYear} {siteConfig.name}. Todos los derechos reservados.</p>
      <p>{siteConfig.city}, República Dominicana</p>
    </footer>
  );
}