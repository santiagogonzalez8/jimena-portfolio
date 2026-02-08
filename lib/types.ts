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
