import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Profile, Theme } from './types';

export async function getProfile(): Promise<Profile | null> {
  const docRef = doc(db, 'profile', 'main');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Profile;
  }
  return null;
}

export async function getTheme(): Promise<Theme | null> {
  const docRef = doc(db, 'theme', 'main');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Theme;
  }
  return null;
}

export async function updateTheme(data: Omit<Theme, 'id'>): Promise<void> {
  const docRef = doc(db, 'theme', 'main');
  await setDoc(docRef, data);
}
