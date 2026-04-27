import { useState, useEffect, useMemo, useCallback } from 'react';
import { ApiService } from '@/services/api';
import type { Programa, FilterState } from '@/types';

export function useProgramas() {
  const [programas, setProgramas] = useState<Programa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({ search: '', categoria: '' });

  useEffect(() => {
    let isMounted = true;
    
    const loadProgramas = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ApiService.getProgramas();
        if (isMounted) {
          setProgramas(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProgramas();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProgramas = useMemo(() => {
    return programas.filter((programa) => {
      const matchesSearch = filters.search === '' || 
        programa.programa.toLowerCase().includes(filters.search.toLowerCase()) ||
        programa.descripcion.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategoria = filters.categoria === '' || filters.categoria === 'all' || 
        programa.categoria === filters.categoria;
      
      return matchesSearch && matchesCategoria;
    });
  }, [programas, filters]);

  const categorias = useMemo(() => {
    return Array.from(new Set(programas.map(p => p.categoria)));
  }, [programas]);

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const refetch = useCallback(async () => {
    const isMounted = true;
    
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getProgramas();
      if (isMounted) {
        setProgramas(data);
      }
    } catch (err) {
      if (isMounted) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  }, []);

  return {
    programas: filteredProgramas,
    allProgramas: programas,
    loading,
    error,
    filters,
    categorias,
    handleFiltersChange,
    refetch,
  };
}
