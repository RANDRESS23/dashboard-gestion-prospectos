import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Lead } from "@/types/leads";

interface LeadsContextType {
  leads: Lead[];
  addLead: (lead: Lead) => void;
  getLeadCount: (programa: string) => number;
  refreshLeads: () => void;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export { LeadsContext };

export function LeadsProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([]);

  // Cargar leads del localStorage al montar el componente
  useEffect(() => {
    const loadLeads = () => {
      const storedLeads = JSON.parse(localStorage.getItem("leads") || "[]");
      setLeads(storedLeads);
    };

    loadLeads();

    // Escuchar cambios en el localStorage (para actualizaciones entre pestañas)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "leads") {
        loadLeads();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addLead = (lead: Lead) => {
    const updatedLeads = [...leads, lead];
    setLeads(updatedLeads);
    localStorage.setItem("leads", JSON.stringify(updatedLeads));
  };

  const getLeadCount = (programa: string) => {
    return leads.filter((lead) => lead.programaInteres === programa).length;
  };

  const refreshLeads = () => {
    const storedLeads = JSON.parse(localStorage.getItem("leads") || "[]");
    setLeads(storedLeads);
  };

  return (
    <LeadsContext.Provider
      value={{ leads, addLead, getLeadCount, refreshLeads }}
    >
      {children}
    </LeadsContext.Provider>
  );
}
