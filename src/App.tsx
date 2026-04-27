import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Users, Loader2, RefreshCw } from "lucide-react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LeadsProvider } from "@/contexts/LeadsContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FilterControls } from "@/components/FilterControls";
import { ProgramCard } from "@/components/ProgramCard";
import { LeadForm } from "@/components/LeadForm";
import { Toaster } from "sonner";
import { useProgramas } from "@/hooks/useProgramas";
import type { Programa } from "@/types";
import Aurora from "./components/Aurora";
import { ChevronUp } from "lucide-react";
import { AuroraBackground } from "./components/ui/aurora-background";
import { useTheme } from "@/contexts/ThemeContext";

function AppContent() {
  const { theme } = useTheme();
  const {
    programas,
    allProgramas,
    loading,
    error,
    filters,
    categorias,
    handleFiltersChange,
    refetch,
  } = useProgramas();

  const [selectedProgram, setSelectedProgram] = useState<Programa | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleInscribir = (programa: Programa) => {
    setSelectedProgram(programa);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedProgram(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      <div className="fixed w-full h-full hidden dark:md:block">
        <Aurora
          key={theme}
          colorStops={["#155dfc", "#B497CF", "#9810fa"]}
          blend={0.5}
          amplitude={1.0}
          speed={1}
        />
      </div>
      <AuroraBackground></AuroraBackground>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Javeriana Lead & Events Manager
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Descubre nuestra oferta académica
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {programas.length}
                  </span>{" "}
                  de{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {allProgramas.length}
                  </span>{" "}
                  programas
                </p>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <FilterControls
            filters={filters}
            onFiltersChange={handleFiltersChange}
            categorias={categorias}
          />
        </div>

        {/* Error State */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-900">
                    Error al cargar los programas
                  </h3>
                  <p className="text-red-700">{error}</p>
                </div>
                <button
                  onClick={refetch}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reintentar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-lg text-gray-600">Cargando programas...</p>
          </motion.div>
        )}

        {/* Programs Grid */}
        {!loading && !error && (
          <AnimatePresence mode="wait">
            {programas.length > 0 ? (
              <motion.div
                key="programs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {programas.map((programa) => (
                  <ProgramCard
                    key={programa.id}
                    programa={programa}
                    onInscribir={handleInscribir}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No se encontraron programas
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {filters.search ||
                  (filters.categoria && filters.categoria !== "all")
                    ? "Intenta ajustar los filtros para ver más resultados."
                    : "No hay programas disponibles en este momento."}
                </p>
                {(filters.search ||
                  (filters.categoria && filters.categoria !== "all")) && (
                  <button
                    onClick={() =>
                      handleFiltersChange({ search: "", categoria: "all" })
                    }
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Limpiar filtros
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Lead Form Modal */}
      <LeadForm
        key={selectedProgram?.id || "default"}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        programa={selectedProgram}
        programas={allProgramas}
      />

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
          y: showScrollTop ? 0 : 20,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 24,
        }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50 cursor-pointer"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-7 h-7" />
      </motion.button>
      <Toaster richColors />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LeadsProvider>
        <AppContent />
      </LeadsProvider>
    </ThemeProvider>
  );
}
