import { motion } from "framer-motion";
import { Calendar, Clock, BookOpen, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Programa } from "@/types";
import { LeadsModal } from "./LeadsModal";
import { useState } from "react";
import { useLeads } from "@/hooks/useLeads";

interface ProgramCardProps {
  programa: Programa;
  onInscribir: (programa: Programa) => void;
}

export function ProgramCard({ programa, onInscribir }: ProgramCardProps) {
  const [isLeadsModalOpen, setIsLeadsModalOpen] = useState(false);
  const { getLeadCount } = useLeads();

  const leadCount = getLeadCount(programa.programa);
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const getCategoryColor = (categoria: string) => {
    switch (categoria.toLowerCase()) {
      case "pregrado":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "posgrado":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "educación continua":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getModalidadIcon = (modalidad: string) => {
    switch (modalidad.toLowerCase()) {
      case "virtual":
        return "💻";
      case "presencial":
        return "🏫";
      case "híbrido":
        return "🔄";
      default:
        return "📚";
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group dark:bg-gray-800/80 dark:border-gray-700">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-900/40 dark:to-purple-900/40 opacity-60" />
          <CardHeader className="relative pb-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">
                    {getModalidadIcon(programa.modalidad)}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(programa.categoria)}`}
                  >
                    {programa.categoria}
                  </span>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 leading-tight line-clamp-2 dark:text-white">
                  {programa.programa}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
        </div>

        <CardContent className="relative space-y-4">
          <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-3 dark:text-gray-300 pt-2">
            {programa.descripcion}
          </CardDescription>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="font-medium">{programa.duracion}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4 text-green-500" />
              <span className="font-medium">
                {new Date(programa.fechaInicio).toLocaleDateString("es-CO", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <BookOpen className="w-4 h-4 text-purple-500" />
              <span className="font-medium">{programa.modalidad}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="font-medium">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {leadCount}
                  </span>{" "}
                  lead{leadCount !== 1 ? "s" : ""} inscrito
                  {leadCount !== 1 ? "s" : ""}
                </span>
              </div>

              {leadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLeadsModalOpen(true)}
                  className="border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20 cursor-pointer bg-white dark:bg-gray-800"
                >
                  <Users className="w-4 h-4 mr-1" />
                  Ver leads
                </Button>
              )}
            </div>

            <Button
              onClick={() => onInscribir(programa)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] cursor-pointer"
            >
              <User className="w-4 h-4 mr-2" />
              Inscribirse
            </Button>
          </div>
        </CardContent>
      </Card>

      <LeadsModal
        isOpen={isLeadsModalOpen}
        onClose={() => setIsLeadsModalOpen(false)}
        programa={programa}
      />
    </motion.div>
  );
}
