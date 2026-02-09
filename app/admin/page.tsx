'use client';

import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Proyecto {
  id: string;
  titulo: string;
  descripcion: string;
  año: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarProyectos();
  }, []);

  async function cargarProyectos() {
    try {
      const snapshot = await getDocs(collection(db, 'projects'));
      const datos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Proyecto[];
      setProyectos(datos);
    } catch (error) {
      console.error('Error cargando proyectos:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Segura que quieres eliminar este proyecto?')) return;

    try {
      await deleteDoc(doc(db, 'projects', id));
      setProyectos(proyectos.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error eliminando proyecto:', error);
      alert('Error al eliminar el proyecto');
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-card">
        {/* Header */}
        <header className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Panel de Administración</h1>
              <p className="text-sm text-muted">Jimena Agüero Portfolio</p>
            </div>
            <div className="flex gap-4">
              <Link href="/" target="_blank">
                <Button variant="outline">Ver sitio</Button>
              </Link>
              <Button onClick={handleLogout} variant="outline">
                Cerrar sesión
              </Button>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Tarjetas de acceso rápido */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Link href="/admin/proyectos/nuevo">
              <div className="bg-background border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-4">➕</div>
                <h3 className="text-xl font-bold mb-2">Nuevo Proyecto</h3>
                <p className="text-sm text-muted">Agregar un proyecto nuevo</p>
              </div>
            </Link>

            <div className="bg-background border border-border rounded-lg p-6">
              <div className="text-4xl mb-4">📁</div>
              <h3 className="text-xl font-bold mb-2">{proyectos.length} Proyectos</h3>
              <p className="text-sm text-muted">Proyectos publicados</p>
            </div>

            <Link href="/admin/apariencia">
              <div className="bg-background border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold mb-2">Apariencia</h3>
                <p className="text-sm text-muted">Cambiar colores del sitio</p>
              </div>
            </Link>
          </div>

          {/* Lista de proyectos */}
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Proyectos</h2>
              <Link href="/admin/proyectos/nuevo">
                <Button>➕ Nuevo Proyecto</Button>
              </Link>
            </div>

            {loading ? (
              <p className="text-center text-muted py-8">Cargando proyectos...</p>
            ) : proyectos.length === 0 ? (
              <p className="text-center text-muted py-8">No hay proyectos. ¡Crea el primero!</p>
            ) : (
              <div className="space-y-4">
                {proyectos.map((proyecto) => (
                  <div
                    key={proyecto.id}
                    className="border border-border rounded-lg p-4 flex items-center justify-between hover:bg-card transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-bold">{proyecto.titulo}</h3>
                      <p className="text-sm text-muted line-clamp-1">{proyecto.descripcion}</p>
                      <p className="text-xs text-muted mt-1">Año: {proyecto.año}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleDelete(proyecto.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        🗑️ Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}