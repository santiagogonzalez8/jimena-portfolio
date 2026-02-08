'use client';
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/Button';
import Link from 'next/link';

export default function ContactoPage() {
  const { loading } = useTheme();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    // Aquí irá la lógica para guardar en Firebase
    // Por ahora solo simulamos el envío
    setTimeout(() => {
      setEnviado(true);
      setEnviando(false);
      setFormData({ nombre: '', email: '', mensaje: '' });
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Cargando...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <Link
            href="/"
            className="text-primary hover:underline mb-4 inline-block"
          >
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
          <p className="text-lg text-muted">Hablemos de tu próximo proyecto</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Información</h2>

            <div className="space-y-6">
              <div>
                <p className="font-semibold mb-2">📍 Ubicación</p>
                <p className="text-muted">Montevideo, Uruguay</p>
              </div>

              <div>
                <p className="font-semibold mb-2">✉️ Email</p>
                <a
                  href="mailto:jimenaaguerord@gmail.com"
                  className="text-primary hover:underline"
                >
                  jimenaaguerord@gmail.com
                </a>
              </div>

              <div>
                <p className="font-semibold mb-2">📱 Teléfono</p>
                <a
                  href="tel:+59895532294"
                  className="text-primary hover:underline"
                >
                  095532294
                </a>
              </div>

              <div>
                <p className="font-semibold mb-2">🌐 Redes Sociales</p>
                <div className="flex gap-4 mt-2">
                  <a href="#" className="text-primary hover:underline">
                    Instagram
                  </a>
                  <a href="#" className="text-primary hover:underline">
                    Behance
                  </a>
                  <a href="#" className="text-primary hover:underline">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Enviar mensaje</h2>

            {enviado ? (
              <div className="bg-primary/10 border border-primary rounded-lg p-6 text-center">
                <p className="text-primary font-semibold mb-2">
                  ✓ Mensaje enviado
                </p>
                <p className="text-sm text-muted">
                  Te responderé pronto. ¡Gracias!
                </p>
                <Button
                  onClick={() => setEnviado(false)}
                  variant="outline"
                  className="mt-4"
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">Nombre *</label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Mensaje *</label>
                  <textarea
                    required
                    value={formData.mensaje}
                    onChange={(e) =>
                      setFormData({ ...formData, mensaje: e.target.value })
                    }
                    rows={5}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Cuéntame sobre tu proyecto..."
                  />
                </div>

                <Button type="submit" disabled={enviando} className="w-full">
                  {enviando ? 'Enviando...' : 'Enviar mensaje'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
