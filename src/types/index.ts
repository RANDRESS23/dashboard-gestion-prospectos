export interface Programa {
  id: string;
  programa: string;
  categoria: string;
  modalidad: string;
  duracion: string;
  descripcion: string;
  fechaInicio: string;
}

export interface Lead {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  programaInteres: string;
  fechaRegistro: string;
}

export interface FormData {
  nombre: string;
  email: string;
  telefono?: string;
  programaInteres: string;
}

export type Categoria = Programa['categoria'];

export interface FilterState {
  search: string;
  categoria: string;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
