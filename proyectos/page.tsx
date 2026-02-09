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
  imagen?: string;
  archivoPdf: string;
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
      const datos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
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
          <Link href="/" className="text-primary hover:underline mb-4 inline-block">
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mis Proyectos
          </h1>
          <p className="text-lg text-muted mb-8">
            Explora mi trabajo de diseño editorial y branding
          </p>
        </div>

        {/* Grid de Proyectos */}
        {proyectos.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto bg-card border border-border rounded-lg p-8">
              <p className="text-lg mb-4">
                📂 Todavía no hay proyectos publicados
              </p>
              <p className="text-sm text-muted mb-6">
                Los proyectos aparecerán aquí cuando los agregues desde Firebase.
              </p>
              <Link href="/contacto">
                <Button>Contactarme mientras tanto</Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {proyectos.map((proyecto) => (
                <div
                  key={proyecto.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  {/* Imagen o preview PDF */}
                  {proyecto.imagen ? (
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={proyecto.imagen}
                        alt={proyecto.titulo}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="text-6xl mb-2">📄</div>
                        <p className="text-sm text-muted">Proyecto PDF</p>
                      </div>
                    </div>
                  )}

                  {/* Contenido */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold flex-1">
                        {proyecto.titulo}
                      </h3>
                      <span className="text-sm text-muted ml-2 whitespace-nowrap">
                        {proyecto.año}
                      </span>
                    </div>

                    <p className="text-muted mb-4 line-clamp-2">
                      {proyecto.descripcion}
                    </p>

                    {/* Tags */}
                    {proyecto.tags && proyecto.tags.length > 0 && (
                      <div className="flex gap-2 flex-wrap mb-4">
                        {proyecto.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Botón Ver PDF */}
                    <a
                      href={proyecto.archivoPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full">
                        📄 Ver Proyecto
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-muted mb-4">
                ¿Te gustaría trabajar juntos?
              </p>
              <Link href="/contacto">
                <Button variant="outline">Contactarme</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
} 