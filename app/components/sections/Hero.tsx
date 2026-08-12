import Image from 'next/image';
import { siteConfig } from '../../config/site';

export function Hero() {
  return (
    <header className="flex items-center justify-center py-4">
      <Image
        src="/home.png"
        alt={`Logo de ${siteConfig.name}`}
        width={300}
        height={250}
        priority
        className="h-auto w-40 sm:w-48"
      />
    </header>
  );
}