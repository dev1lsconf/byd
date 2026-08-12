import { services } from '../../data/services';
import { Card } from '../ui';
import { ExternalLink } from '../ui';

export function Services() {
  return (
    <section aria-label="Servicios" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Card
          key={service.href}
          href={service.href}
          variant="bordered"
          padding="md"
          className="group flex flex-col rounded-2xl"
          {...(service.external ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
        >
          <h2 className="text-lg font-bold text-black">{service.title}</h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
            {service.description}
          </p>
          <ExternalLink
            href={service.href}
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gray-600 transition-transform group-hover:translate-x-0.5"
          >
            {service.label}
          </ExternalLink>
        </Card>
      ))}
    </section>
  );
}