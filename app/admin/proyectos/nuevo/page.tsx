'use client';

import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '@/lib/firebase';
import { getStorage } from 'firebase/storage';

export default function NuevoProyectoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tags: '',
    año: new Date().getFullYear(),
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imagenFile, setImagenFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pdfFile) {
      alert('Debes seleccionar un archivo PDF');
      return;
    }

    setLoading(true);

    try {
      const storage = getStorage();
      
      // Subir PDF
      const pdfRef = ref(storage, `proyectos/${Date.now()}_${pdfFile.name}`);
      await uploadBytes(pdfRef, pdfFile);
      const pdfUrl = await getDownloadURL(pdfRef);

      // Subir imagen si existe
      let imagenUrl = '';
      if (imagenFile) {
        const imagenRef = ref(storage, `proyectos/imagenes/${Date.now()}_${imagenFile.name}`);
        await uploadBytes(imagenRef, imagenFile);
        imagenUrl = await getDownloadURL(imagenRef);
      }

      // Guardar en Firestore
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      await addDoc(collection(db, 'projects'), {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        archivoPdf: pdfUrl,
        imagen: imagenUrl,
        tags: tagsArray,
        año: formData.año,
        createdAt: Timestamp.now(),
      });

      alert('✅ Proyecto creado exitosamente');
      router.push('/admin');
    } catch (error) {
      console.error('Error creando proyecto:', error);
      alert('❌ Error al crear el proyecto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-card">
        <header className="bg-background border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link href="/admin" className="text-primary hover:underline mb-2 inline-block">
              ← Volver al admin
            </Link>
            <h1 className="text-2xl font-bold">Nuevo Proyecto</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <form onSubmit={handleSubmit} className="bg-background border border-border rounded-lg p-8 space-y-6">
            <div>
              <label className="block font-medium mb-2">
                Título del proyecto *
              </label>
              <input
                type="text"
                required
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                placeholder="Ej: Identidad Visual - Café Cultura"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Descripción *
              </label>
              <textarea
                required
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
                placeholder="Describe brevemente el proyecto..."
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Archivo PDF del proyecto *
              </label>
              <input
                type="file"
                accept=".pdf"
                required
                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              />
              <p className="text-sm text-muted mt-1">Formatos aceptados: PDF</p>
            </div>

            <div>
              <label className="block font-medium mb-2">
                Imagen de portada (opcional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagenFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              />
              <p className="text-sm text-muted mt-1">Formatos: JPG, PNG, WebP</p>
            </div>

            <div>
              <label className="block font-medium mb-2">
                Tags (separados por comas)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                placeholder="Branding, Editorial, Diseño Gráfico"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Año *
              </label>
              <input
                type="number"
                required
                min="2000"
                max="2100"
                value={formData.año}
                onChange={(e) => setFormData({ ...formData, año: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Subiendo...' : '✅ Crear Proyecto'}
              </Button>
              <Link href="/admin" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </main>
      </div>
    </ProtectedRoute>
  );
}