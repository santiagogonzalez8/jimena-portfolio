import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Jimena Agüero - Portfolio',
  description: 'Portfolio de diseño de Jimena Agüero',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
