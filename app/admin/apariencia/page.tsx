'use client';

import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { HexColorPicker } from 'react-colorful';

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  card: string;
  muted: string;
  border: string;
}

const presets = [
  {
    name: 'Violeta Creativo',
    colors: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      background: '#fefefe',
      foreground: '#1e1b4b',
      card: '#f5f3ff',
      muted: '#a78bfa',
      border: '#ddd6fe',
    }
  },
  {
    name: 'Verde Estudio',
    colors: {
      primary: '#10b981',
      secondary: '#34d399',
      background: '#ffffff',
      foreground: '#064e3b',
      card: '#f0fdf4',
      muted: '#6ee7b7',
      border: '#d1fae5',
    }
  },
  {
    name: 'Azul Profesional',
    colors: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      background: '#ffffff',
      foreground: '#1e3a8a',
      card: '#eff6ff',
      muted: '#93c5fd',
      border: '#dbeafe',
    }
  },
];

export default function AparienciaPage() {
  const [colors, setColors] = useState<ThemeColors>({
    primary: '#6366f1',
    secondary: '#8b5cf6',
    background: '#ffffff',
    foreground: '#0f172a',
    card: '#f8fafc',
    muted: '#94a3b8',
    border: '#e2e8f0',
  });
  const [selectedColor, setSelectedColor] = useState<keyof ThemeColors>('primary');
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  async function loadTheme() {
    try {
      const docRef = doc(db, 'theme', 'main');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setColors(docSnap.data() as ThemeColors);
      }
    } catch (error) {
      console.error('Error cargando tema:', error);
    }
  }

  async function handleSave() {
    setLoading(true);
    try {
      await setDoc(doc(db, 'theme', 'main'), colors);
      alert('✅ Colores guardados. Recarga la página principal para verlos.');
    } catch (error) {
      console.error('Error guardando tema:', error);
      alert('❌ Error al guardar los colores');
    } finally {
      setLoading(false);
    }
  }

  function applyPreset(preset: typeof presets[0]) {
    setColors(preset.colors);
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-card">
        <header className="bg-background border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <Link href="/admin" className="text-primary hover:underline mb-2 inline-block">
              ← Volver al admin
            </Link>
            <h1 className="text-2xl font-bold">Apariencia</h1>
            <p className="text-sm text-muted">Personaliza los colores de tu sitio</p>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Panel de colores */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Colores Personalizados</h2>
              
              <div className="space-y-4">
                {(Object.keys(colors) as Array<keyof ThemeColors>).map((key) => (
                  <div key={key} className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded border border-border cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: colors[key] }}
                      onClick={() => {
                        setSelectedColor(key);
                        setShowPicker(true);
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-medium capitalize">{key}</p>
                      <p className="text-sm text-muted">{colors[key]}</p>
                    </div>
                  </div>
                ))}
              </div>

              {showPicker && (
                <div className="mt-6 p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-medium">Editar: {selectedColor}</p>
                    <button
                      onClick={() => setShowPicker(false)}
                      className="text-sm text-muted hover:text-foreground"
                    >
                      ✕ Cerrar
                    </button>
                  </div>
                  <HexColorPicker
                    color={colors[selectedColor]}
                    onChange={(color) => setColors({ ...colors, [selectedColor]: color })}
                  />
                  <input
                    type="text"
                    value={colors[selectedColor]}
                    onChange={(e) => setColors({ ...colors, [selectedColor]: e.target.value })}
                    className="w-full mt-4 px-4 py-2 border border-border rounded-md bg-background"
                  />
                </div>
              )}

              <Button
                onClick={handleSave}
                disabled={loading}
                className="w-full mt-6"
              >
                {loading ? 'Guardando...' : '💾 Guardar Cambios'}
              </Button>
            </div>

            {/* Paletas predefinidas */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Paletas Predefinidas</h2>
              
              <div className="space-y-4">
                {presets.map((preset) => (
                  <div
                    key={preset.name}
                    className="border border-border rounded-lg p-4 cursor-pointer hover:bg-card transition-colors"
                    onClick={() => applyPreset(preset)}
                  >
                    <p className="font-medium mb-3">{preset.name}</p>
                    <div className="flex gap-2">
                      {Object.values(preset.colors).slice(0, 4).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-10 h-10 rounded border border-border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}