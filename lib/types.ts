export interface Profile {
  id: string;
  name: string;
  role: string;
  bioShort: string;
  bioLong: string;
  age: number;
  location: string;
  email: string;
  phone: string;
  photo?: string;
  skills: string[];
  instagram?: string;
  linkedin?: string;
}

export interface Theme {
  id: string;
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  card: string;
  muted: string;
  border: string;
}

export interface Project {
  id: string;
  titulo: string;
  descripcion: string;
  imagen?: string;
  archivoPdf: string;
  tags: string[];
  año: number;
}