import type { Programa } from '@/types';

const API_URL = 'https://69ee25d89163f839f8928c6d.mockapi.io/api/programas';

export class ApiService {
  static async getProgramas(): Promise<Programa[]> {
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`, { cause: response });
      }
      
      const data = await response.json();
      return data as Programa[];
    } catch (error) {
      console.error('Error al obtener programas:', error);
      throw new Error('No se pudieron cargar los programas. Por favor, intente nuevamente.', { cause: error });
    }
  }

  static async getProgramaById(id: string): Promise<Programa | null> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Error HTTP: ${response.status}`, { cause: response });
      }
      
      const data = await response.json();
      return data as Programa;
    } catch (error) {
      console.error(`Error al obtener programa ${id}:`, error);
      throw new Error('No se pudo cargar el programa solicitado.', { cause: error });
    }
  }
}
