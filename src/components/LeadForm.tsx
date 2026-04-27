import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Programa, FormData } from "@/types";
import type { Lead } from "@/types/leads";
import Particles from "./Particles";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { useLeads } from "@/hooks/useLeads";

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  programa: Programa | null;
  programas: Programa[];
}

interface FormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  programaInteres?: string;
}

export function LeadForm({
  isOpen,
  onClose,
  programa,
  programas,
}: LeadFormProps) {
  const { addLead } = useLeads();
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    programaInteres: programa?.programa || "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Verificar duplicados de email en el mismo programa
  const isEmailDuplicate = useMemo(() => {
    if (!formData.email || !formData.programaInteres) return false;
    const existingLeads = JSON.parse(localStorage.getItem("leads") || "[]");
    return existingLeads.some(
      (lead: { email: string; programaInteres: string }) =>
        lead.email.toLowerCase() === formData.email.toLowerCase() &&
        lead.programaInteres === formData.programaInteres,
    );
  }, [formData.email, formData.programaInteres]);

  const validateEmail = (email: string): boolean => {
    // Solo permitir emails @javeriana.edu.co
    const javerianaRegex = /^[^\s@]+@javeriana\.edu\.co$/;
    return javerianaRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!validateEmail(formData.email)) {
      newErrors.email =
        "El email no es válido. Preferiblemente use @javeriana.edu.co";
    } else {
      // Validar que el email no esté duplicado en el mismo programa
      if (isEmailDuplicate) {
        newErrors.email = "Este email ya está registrado en este programa";
      }
    }

    if (formData.telefono && formData.telefono.length < 7) {
      newErrors.telefono = "El teléfono debe tener al menos 7 dígitos";
    }

    if (!formData.programaInteres) {
      newErrors.programaInteres = "Debe seleccionar un programa";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const normalizeData = (
    data: FormData,
  ): Omit<Lead, "id" | "fechaRegistro"> => {
    return {
      nombre: data.nombre
        .trim()
        .replace(/\s+/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      email: data.email.trim().toLowerCase(),
      telefono: data.telefono
        ? data.telefono.trim().replace(/\s+/g, "")
        : undefined,
      programaInteres: data.programaInteres.trim(),
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Mostrar toast si hay error de duplicado
      if (errors.email && errors.email.includes("ya está registrado")) {
        toast.error("Error de duplicación", {
          description:
            "Este email ya está inscrito en este programa. Usa otro email o contacta soporte.",
        });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const normalizedData = normalizeData(formData);
      const lead = {
        id: Date.now().toString(),
        ...normalizedData,
        fechaRegistro: new Date().toISOString(),
      };

      // Guardar usando el contexto
      addLead(lead);

      // Mostrar toast de éxito
      toast.success("¡Inscripción registrada!", {
        description: `Hemos registrado tu inscripción para ${lead.programaInteres}`,
      });

      // Lanzar confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"],
      });

      setIsSuccess(true);

      // Reset form después de éxito
      setTimeout(() => {
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          programaInteres: "",
        });
        setIsSuccess(false);
        onClose();
      }, 4000);
    } catch (error) {
      console.error("Error al enviar formulario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-sm border-0 shadow-2xl dark:bg-gray-800/95 dark:border-gray-700">
        <div
          style={{ width: "100%", height: "500px", position: "fixed" }}
          className="hidden md:block -z-10"
        >
          <Particles
            particleColors={["#ffffff"]}
            particleCount={200}
            particleSpread={10}
            speed={0.5}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles
            disableRotation
            pixelRatio={5}
          />
        </div>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {programa
              ? `Inscribirse en ${programa.programa}`
              : "Formulario de Inscripción"}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Complete el formulario para recibir información sobre el programa
            académico.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="nombre"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Nombre completo *
                  </Label>
                  <Input
                    id="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={(e) =>
                      handleInputChange("nombre", e.target.value)
                    }
                    className={`border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white bg-white ${errors.nombre ? "border-red-500" : ""}`}
                    placeholder="Juan Pérez"
                  />
                  {errors.nombre && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-600 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.nombre}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email institucional *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white bg-white ${errors.email ? "border-red-500" : ""}`}
                    placeholder="nombre@javeriana.edu.co"
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-600 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="telefono"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Teléfono (opcional)
                  </Label>
                  <Input
                    id="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) =>
                      handleInputChange("telefono", e.target.value)
                    }
                    className={`border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white bg-white ${errors.telefono ? "border-red-500" : ""}`}
                    placeholder="3001234567"
                  />
                  {errors.telefono && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-600 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.telefono}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="programa"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4" />
                    Programa de interés *
                  </Label>
                  <Select
                    value={formData.programaInteres}
                    onValueChange={(value) =>
                      handleInputChange("programaInteres", value)
                    }
                  >
                    <SelectTrigger
                      className={`border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white cursor-pointer bg-white ${errors.programaInteres ? "border-red-500" : ""}`}
                    >
                      <SelectValue
                        placeholder="Seleccione un programa"
                        className="dark:text-gray-300"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                      {programas.map((prog) => (
                        <SelectItem
                          key={prog.id}
                          value={prog.programa}
                          className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        >
                          {prog.programa}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.programaInteres && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-600 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.programaInteres}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 cursor-pointer bg-white dark:bg-gray-800"
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar inscripción"}
                </Button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-green-900/30">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                ¡Inscripción exitosa!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Hemos recibido tu información. Pronto nos pondremos en contacto
                contigo.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 text-left dark:bg-blue-900/30">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Datos normalizados:</strong>
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                  {normalizeData(formData).nombre}
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  {normalizeData(formData).email.toLowerCase()}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
