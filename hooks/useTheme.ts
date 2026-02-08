'use client';
import { useState, useEffect } from 'react';
import { getTheme } from '@/lib/firestore';
import { applyTheme } from '@/lib/theme';

export function useTheme() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  async function loadTheme() {
    try {
      const theme = await getTheme();
      if (theme) applyTheme(theme);
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, reloadTheme: loadTheme };
}
