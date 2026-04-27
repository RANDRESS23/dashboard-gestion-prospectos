import { useMemo } from "react";
import { motion } from "framer-motion";
import { Users, Mail, Phone, Calendar, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Programa } from "@/types";
import { useLeads } from "@/hooks/useLeads";
import type { Lead } from "@/types/leads";

interface LeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  programa: Programa | null;
}

export function LeadsModal({ isOpen, onClose, programa }: LeadsModalProps) {
  const { leads: allLeads } = useLeads();

  const leads = useMemo(() => {
    if (!isOpen || !programa) return [];
    return allLeads.filter(
      (lead: Lead) => lead.programaInteres === programa.programa,
    );
  }, [isOpen, programa, allLeads]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-sm border-0 shadow-2xl dark:bg-gray-800/95 dark:border-gray-700 max-h-[80vh] overflow-hidden rounded-lg mx-2">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            Leads inscritos en {programa?.programa}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Lista de personas interesadas en este programa académico.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          {leads.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-gray-700">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No hay leads inscritos
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Aún nadie se ha inscrito en este programa.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {leads.map((lead, index) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 dark:bg-gray-700/50 dark:border-gray-600"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center dark:bg-blue-900/30">
                        <UserIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {lead.nombre}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          #{leads.length - index}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span>{lead.email}</span>
                    </div>

                    {lead.telefono && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Phone className="w-4 h-4 text-green-500" />
                        <span>{lead.telefono}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <span>{formatDate(lead.fechaRegistro)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Total:{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {leads.length}
            </span>{" "}
            lead{leads.length !== 1 ? "s" : ""} inscrito
            {leads.length !== 1 ? "s" : ""}
          </div>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 cursor-pointer bg-white dark:bg-gray-800"
          >
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
