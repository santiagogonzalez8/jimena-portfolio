'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/Button';
import Link from 'next/link';

interface Proyecto {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  archivoPdf?: string;
  tags: string[];
  año: number;
}

export default function ProyectosPage() {
  const { loading: themeLoading } = useTheme();
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarProyectos();
  }, []);

  async function cargarProyectos() {
    try {
      const q = query(collection(db, 'projects'), orderBy('año', 'desc'));
      const snapshot = await getDocs(q);
      const datos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Proyecto[];
      setProyectos(datos);
    } catch (error) {
      console.log('Error cargando proyectos:', error);
    } finally {
      setLoading(false);
    }
  }

  if (themeLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Cargando proyectos...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link
            href="/"
            className="text-primary hover:underline mb-4 inline-block"
          >
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mis Proyectos</h1>
          <p className="text-lg text-muted">
            Explora mi trabajo de diseño editorial y branding
          </p>
        </div>

        {/* Grid de Proyectos */}
        {proyectos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted text-lg mb-4">
              Todavía no hay proyectos publicados.
            </p>
            <p className="text-sm text-muted">
              Pronto estarán disponibles mis trabajos de diseño.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectos.map((proyecto) => (
              <div
                key={proyecto.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
              >
                {/* Imagen */}
                {proyecto.imagen ? (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={proyecto.imagen}
                      alt={proyecto.titulo}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <p className="text-foreground/30">Sin imagen</p>
                  </div>
                )}

                {/* Contenido */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold flex-1">
                      {proyecto.titulo}
                    </h3>
                    <span className="text-sm text-muted ml-2">
                      {proyecto.año}
                    </span>
                  </div>

                  <p className="text-muted mb-4 line-clamp-2">
                    {proyecto.descripcion}
                  </p>

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    {proyecto.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Botón PDF si existe */}
                  {proyecto.archivoPdf && (
                    <a
                      href={proyecto.archivoPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                    >
                      📄 Ver PDF completo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-muted mb-4">¿Te gustaría trabajar juntos?</p>
          <Link href="/contacto">
            <Button>Contactarme</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
