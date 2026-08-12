'use client';

import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ErrorBoundary({ children, fallback }: Props) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handler = (event: ErrorEvent) => {
      event.preventDefault();
      setError(event.error);
      setHasError(true);
    };

    window.addEventListener('error', handler);
    return () => window.removeEventListener('error', handler);
  }, []);

  if (hasError) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex min-h-[400px] items-center justify-center px-4 text-center">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold text-black mb-4">
            Algo salió mal
          </h2>
          <p className="text-gray-600 mb-6">
            Lo sentimos, ha ocurrido un error inesperado. Por favor, intente recargar la página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Recargar página
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}