import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterState, Categoria } from "@/types";

interface FilterControlsProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categorias: Categoria[];
}

export function FilterControls({
  filters,
  onFiltersChange,
  categorias,
}: FilterControlsProps) {
  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search });
  };

  const handleCategoriaChange = (categoria: string) => {
    onFiltersChange({ ...filters, categoria });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 dark:bg-gray-800/80 dark:border-gray-700"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar programas por nombre..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 h-12 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 placeholder-gray-500 dark:bg-gray-800/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>

        <div className="lg:w-80">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <Select
              value={filters.categoria}
              onValueChange={handleCategoriaChange}
            >
              <SelectTrigger className="pl-10 h-12 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-600 dark:text-white cursor-pointer">
                <SelectValue
                  placeholder="Todas las categorías"
                  className="dark:text-gray-300"
                />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                <SelectItem
                  value="all"
                  className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  Todas las categorías
                </SelectItem>
                {categorias.map((categoria) => (
                  <SelectItem
                    key={categoria}
                    value={categoria}
                    className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {(filters.search || filters.categoria !== "all") && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"
        >
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Filtros activos:
            </span>
            {filters.search && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700">
                Búsqueda: "{filters.search}"
              </span>
            )}
            {filters.categoria && filters.categoria !== "all" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700">
                Categoría: {filters.categoria}
              </span>
            )}
            <button
              onClick={() => onFiltersChange({ search: "", categoria: "all" })}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 underline cursor-pointer"
            >
              Limpiar filtros
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
