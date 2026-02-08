'use client';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/Button';
import Link from 'next/link';

export default function ServiciosPage() {
  const { loading } = useTheme();

  const servicios = [
    {
      nombre: 'Diseño de Identidad Visual',
      descripcion:
        'Creación completa de marca: logo, paleta de colores, tipografías y manual de uso.',
      precio: 'Desde $500',
      incluye: [
        'Logo principal y variantes',
        'Paleta de colores',
        'Tipografías',
        'Manual de marca',
      ],
      tiempo: '2-3 semanas',
    },
    {
      nombre: 'Diseño Editorial',
      descripcion:
        'Diseño de libros, revistas, catálogos y material impreso con atención al detalle.',
      precio: 'Desde $400',
      incluye: [
        'Maquetación completa',
        'Diseño de portada',
        'Composición tipográfica',
        'Archivos para imprenta',
      ],
      tiempo: '3-4 semanas',
    },
    {
      nombre: 'Material Publicitario',
      descripcion:
        'Diseño de flyers, banners, posts para redes sociales y piezas promocionales.',
      precio: 'Desde $200',
      incluye: [
        '5 diseños personalizados',
        'Formatos para digital',
        'Revisiones incluidas',
        'Archivos editables',
      ],
      tiempo: '1-2 semanas',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Cargando...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <Link
            href="/"
            className="text-primary hover:underline mb-4 inline-block"
          >
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Servicios</h1>
          <p className="text-lg text-muted">
            Soluciones de diseño adaptadas a tus necesidades
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-2xl font-bold mb-3">{servicio.nombre}</h3>
              <p className="text-muted mb-4">{servicio.descripcion}</p>
              <p className="text-3xl font-bold text-primary mb-6">
                {servicio.precio}
              </p>

              <div className="mb-6">
                <p className="font-semibold mb-2">Incluye:</p>
                <ul className="space-y-2">
                  {servicio.incluye.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm text-muted mb-6">
                ⏱️ Tiempo estimado: {servicio.tiempo}
              </p>

              <Link href="/contacto">
                <Button className="w-full">Solicitar</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
