# 🎓 Dashboard de Gestión de Prospectos

Una aplicación web moderna y elegante para la gestión de programas académicos y captación de prospectos, desarrollada con React, TypeScript y TailwindCSS.

<img width="1920" height="1440" alt="image" src="https://github.com/user-attachments/assets/ee2b0b88-97f0-415f-bfe7-61fedcc4ac04" />



## 🌟 Características Principales

- **📋 Gestión de Programas**: Visualización y filtrado de programas académicos
- **🎯 Captación de Prospectos**: Formulario de inscripción integrado
- **🌗 Tema Claro/Oscuro**: Interfaz adaptable con toggle de tema
- **📱 Diseño Responsivo**: Optimizado para todos los dispositivos
- **✨ Animaciones Fluidas**: Experiencia de usuario moderna con Framer Motion
- **🔍 Búsqueda y Filtrado**: Búsqueda en tiempo real y filtros por categoría
- **🎨 UI Moderna**: Componentes con Radix UI y TailwindCSS

## 🛠️ Stack Tecnológico

### Frontend

- **React 19.2.5** - Biblioteca principal de UI
- **TypeScript** - Tipado estático y desarrollo robusto
- **Vite 8.0.10** - Herramienta de compilación rápida
- **TailwindCSS 4.2.4** - Framework de CSS utility-first
- **Framer Motion 12.38.0** - Animaciones y transiciones

### UI Components

- **Radix UI** - Componentes accesibles y personalizables
  - Dialog, Dropdown Menu, Label, Select, Switch, Toast
- **Lucide React** - Iconos modernos y consistentes
- **Sonner** - Sistema de notificaciones toast

## 📋 Requisitos Previos

- **Node.js** (v18 o superior)
- **pnpm** (recomendado) o npm/yarn

## 🚀 Instalación y Ejecución

### 1. Clonar el Repositorio

```bash
git clone https://github.com/RANDRESS23/dashboard-gestion-prospectos.git
cd dashboard-gestion-prospectos
```

### 2. Instalar Dependencias

```bash
# Usando pnpm (recomendado)
pnpm install

# O usando npm
npm install

# O usando yarn
yarn install
```

### 3. Variables de Entorno

El proyecto utiliza una API Mock para el desarrollo. La URL está configurada en:

```typescript
// src/services/api.ts
const API_URL = "https://69ee25d89163f839f8928c6d.mockapi.io/api/programas";
```

### 4. Ejecutar en Modo Desarrollo

```bash
# Iniciar servidor de desarrollo
pnpm dev

# O con npm
npm run dev
```

La aplicación estará disponible en `https://dashboard-gestion-prospectos.vercel.app/`

### 5. Construcción para Producción

```bash
# Construir para producción
pnpm build

# Previsualizar la build de producción
pnpm preview
```

## 📁 Estructura del Proyecto

```
dashboard-gestion-prospectos/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/        # Componentes React
│   │   ├── ui/           # Componentes UI base
│   │   ├── Aurora.tsx    # Componente de fondo animado
│   │   ├── FilterControls.tsx
│   │   ├── LeadsModal.tsx
│   │   ├── LeadForm.tsx
│   │   ├── ProgramCard.tsx
│   │   ├── Particles.tsx
│   │   └── ThemeToggle.tsx
│   ├── contexts/          # Contextos de React
│   │   ├── ThemeContext.tsx
│   │   └── LeadsContext.tsx
│   ├── hooks/             # Hooks personalizados
│   │   ├── useLeads.ts
│   │   └── useProgramas.ts
│   ├── services/          # Servicios de API
│   │   └── api.ts
│   ├── types/             # Definiciones TypeScript
│   │   └── index.ts
│   │   └── leads.ts
│   ├── lib/               # Utilidades
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Punto de entrada
├── package.json
├── vite.config.ts        # Configuración de Vite
├── tsconfig.json         # Configuración TypeScript
└── tailwind.config.js    # Configuración TailwindCSS
```

## 🔧 Configuración

### API Endpoints

La aplicación se conecta a los siguientes endpoints:

- **GET /programas** - Obtener todos los programas
- **GET /programas/:id** - Obtener un programa específico

### Tipos de Datos

#### Programa

```typescript
interface Programa {
  id: string;
  programa: string;
  categoria: string;
  modalidad: string;
  duracion: string;
  descripcion: string;
  fechaInicio: string;
}
```

#### Lead (Prospecto)

```typescript
interface Lead {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  programaInteres: string;
  fechaRegistro: string;
}
```

## 🎨 Características de UI/UX

### Componentes Principales

- **ProgramCard**: Tarjetas interactivas para mostrar programas
- **LeadForm**: Formulario modal de inscripción
- **FilterControls**: Controles de búsqueda y filtrado
- **ThemeToggle**: Switch para cambiar entre temas claro/oscuro

### Animaciones y Efectos

- **Aurora Background**: Fondo animado con efectos de aurora boreal
- **Transiciones suaves**: Animaciones de entrada/salida con Framer Motion
- **Micro-interacciones**: Estados hover y feedback visual
- **Notificaciones Toast**: Sistema de alertas no intrusivo

### Diseño Responsivo

- **Mobile-first**: Diseño optimizado para móviles
- **Breakpoints adaptativos**: Tablets, desktop y pantallas grandes
- **Navegación táctil**: Optimizado para interacción táctil

## 🔍 Funcionalidades

### Gestión de Programas

- Listado completo de programas académicos
- Filtrado por categoría
- Búsqueda en tiempo real
- Vista detallada de cada programa

### Captación de Prospectos

- Formulario de inscripción con validación
- Selección de programa de interés
- Almacenamiento local de leads
- Confirmación visual de registro

### Personalización

- Toggle de tema claro/oscuro
- Preferencias guardadas localmente
- Interfaz adaptativa al tema del sistema

## 🧪 Desarrollo

### Scripts Disponibles

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm preview      # Previsualizar build
pnpm lint         # Ejecutar ESLint
```

**Desarrollado con ❤️ usando React, TypeScript y TailwindCSS**
