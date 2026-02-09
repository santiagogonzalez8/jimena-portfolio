'use client';
import { useEffect, useState } from 'react';
import { getProfile } from '@/lib/firestore';
import { useTheme } from '@/hooks/useTheme';
import { Profile } from '@/lib/types';
import { Button } from '@/components/Button';
import Link from 'next/link';

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { loading: themeLoading } = useTheme();

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const data = await getProfile();
    setProfile(data);
  }

  if (themeLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Cargando...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {profile.name}
          </h1>
          <p className="text-2xl md:text-3xl text-muted mb-8">
            {profile.role}
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            {profile.bioShort}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/proyectos">
              <Button>Ver Proyectos</Button>
            </Link>
            <Link href="/contacto">
              <Button variant="outline">Contactar</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Sobre mí
          </h2>
          <p className="text-lg mb-6 text-center">
            {profile.bioLong}
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-primary text-white rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="text-center space-y-2">
            <p className="text-muted">📍 {profile.location}</p>
            <p className="text-muted">✉️ {profile.email}</p>
            <p className="text-muted">
              📱 <a href="tel:+59894960342" className="hover:text-primary transition-colors">{profile.phone}</a>
            </p>
            {profile.instagram && (
              <p className="text-muted">
                📸 <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
              </p>
            )}
            {profile.linkedin && (
              <p className="text-muted">
                💼 <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}