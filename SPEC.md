# Especificación Técnica del Proyecto: FitPulse

**Estado:** Aprobado / En desarrollo  
**Versión:** 1.0.0  
**Stack Principal:** Expo SDK 54, Expo Router v4, React Native, TypeScript, NativeWind v4 (Tailwind CSS), Zustand, AsyncStorage  
**Audiencia / Alcance:** Uso estrictamente personal / individual (excluye funciones para gimnasios y entrenadores).

---

## 1. Objetivo y Visión General
**FitPulse** es una aplicación móvil y web "todo-en-uno" orientada a que usuarios individuales mejoren y mantengan su condición física. Ofrece planificación personalizada de entrenamientos, conteo de calorías y agua, calculadora de IMC, seguimiento de medidas con gráficos, recordatorios y gamificación con metas y logros.

### Criterios de Éxito
- La app compila y corre de forma limpia en Expo Go (SDK 54) y en navegador web.
- La navegación por pestañas (`Inicio`, `Entrenamientos`, `Nutrición`, `Progreso`, `Perfil`) y modales (`IMC`, `Detalle de Rutina`, `Registro de Series`, etc.) es fluida mediante Expo Router.
- Los estados de usuario, nutrición, entrenamientos y metas persisten localmente en `AsyncStorage` a través de stores modulares con `Zustand`.
- El sistema de diseño refleja una estética cálida y moderna con base crema (#F3EEE4), tarjetas blancas redondeadas (#FFFFFF), acentos en naranja coral (#FF6F51) y secundarios turquesa (#2BB6A3).
- Las pantallas no funcionales incluyen esqueletos claros y comentarios `TODO` accionables para que un equipo de 5 integrantes pueda trabajar en paralelo sin conflictos.

---

## 2. Mapa de Capacidades (Capability Map)

| Módulo ID | Responsabilidad | Dependencias |
|---|---|---|
| `auth` | Sesión simulada (mock login) y estado de autenticación | Ninguna |
| `profile` | Datos personales (edad, sexo, altura, peso, objetivo) y preferencias | `auth` |
| `bmi` | Cálculo de Índice de Masa Corporal y recomendaciones saludables | `profile` |
| `nutrition` | Contador de calorías diarias y registro de alimentos consumidos | `profile` |
| `water` | Contador de ingesta de agua diaria y meta configurable | `profile` |
| `workouts` | Catálogo y planes personalizados de entrenamiento según objetivo | `profile` |
| `exercise-log` | Bitácora en vivo: series, repeticiones, peso y duración | `workouts` |
| `history` | Historial de sesiones realizadas y resultados | `exercise-log` |
| `calendar` | Vista mensual/semanal de entrenamientos planificados y completados | `workouts`, `history` |
| `progress` | Gráficos de evolución de peso y medidas corporales en el tiempo | `profile`, `history` |
| `reminders` | Configuración y gestión de recordatorios (agua, comidas, rutinas) | `profile` |
| `goals` | Metas personales cuantitativas y catálogo de logros desbloqueables | `profile`, `history`, `nutrition` |

---

## 3. Sistema de Diseño (Design Tokens)

- **Fondo General:** `#F3EEE4` (Crema cálido, limpio y amigable).
- **Tarjetas / Superficies:** `#FFFFFF` (Blanco puro, esquinas redondeadas `rounded-3xl`, sombra suave `shadow-sm`).
- **Color Primario (Acento):** `#FF6F51` (Naranja coral vibrante para botones principales, badges y estados activos).
- **Color Secundario (Éxito / Salud):** `#2BB6A3` (Verde turquesa para indicadores positivos, progreso y rangos saludables en IMC).
- **Color de Advertencia / Destacado:** `#EAA838` (Ámbar cálido para alertas y rachas).
- **Color de Peligro / Límite:** `#E05353` (Rojo suave para sobrepeso o límites excedidos).
- **Texto Primario:** `#221D16` (Casi negro cálido de alto contraste).
- **Texto Secundario:** `#8B8578` (Gris cálido para subtítulos, etiquetas y metadata).
- **Bordes:** `#E7E1D5` (Gris crema suave).
- **Tipografía y Estilo:**
  - **Eyebrow:** Texto pequeño (11-12px), en negrita (`font-bold`), mayúsculas (`uppercase`), color `#FF6F51`, espaciado amplio (`tracking-wider`).
  - **Botones:** Ancho completo (`w-full`), esquinas redondeadas (`rounded-2xl`), texto en mayúsculas, negrita y centrado.

---

## 4. Estructura del Proyecto

```text
fitpulse/
├── app/                          # Rutas Expo Router (delgadas, delegan a src/screens)
│   ├── _layout.tsx               # Root Layout con Stack (Auth, Tabs, Modales)
│   ├── index.tsx                 # Entrada / Redirección según auth
│   ├── (auth)/
│   │   └── login.tsx             # Pantalla de Login falso
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Configuración de los 5 Tabs principales
│   │   ├── index.tsx             # Tab 1: Inicio (Dashboard resumen)
│   │   ├── workouts.tsx          # Tab 2: Entrenamientos
│   │   ├── nutrition.tsx         # Tab 3: Nutrición
│   │   ├── progress.tsx          # Tab 4: Progreso
│   │   └── profile.tsx           # Tab 5: Perfil
│   └── modals/
│       ├── bmi.tsx               # Modal Calculadora IMC
│       ├── workout-detail.tsx    # Modal Detalle de Entrenamiento
│       ├── exercise-log.tsx      # Modal Registro de Ejercicios en vivo
│       ├── water.tsx             # Modal Contador de Agua
│       ├── reminders.tsx         # Modal Recordatorios
│       ├── goals.tsx             # Modal Metas y Logros
│       ├── calendar.tsx          # Modal Calendario
│       └── history.tsx           # Modal Historial
│
├── src/
│   ├── components/               # Componentes UI reutilizables
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Eyebrow.tsx
│   │   │   └── Header.tsx
│   │   └── feedback/
│   │       └── StatBadge.tsx
│   │
│   ├── constants/                # Tokens centralizados
│   │   └── theme.ts              # Paleta de colores, sombras, fuentes
│   │
│   ├── types/                    # Modelos de datos TypeScript
│   │   └── index.ts              # Usuario, Entrenamiento, Ejercicio, etc.
│   │
│   ├── store/                    # Manejadores de estado Zustand + AsyncStorage
│   │   ├── useAuthStore.ts
│   │   ├── useUserStore.ts
│   │   ├── useWorkoutStore.ts
│   │   ├── useNutritionStore.ts
│   │   └── useGoalsStore.ts
│   │
│   ├── utils/                    # Funciones puras (fórmulas, formatos)
│   │   ├── bmi.ts                # Cálculo de IMC y rangos
│   │   ├── calories.ts           # Cálculo de TDEE y macros recomendados
│   │   └── formatters.ts         # Fechas, pesos, tiempo
│   │
│   ├── services/                 # Servicios mock y semillas de datos
│   │   └── mockData.ts           # Rutinas iniciales, catálogo de ejercicios y logros
│   │
│   ├── hooks/                    # Custom hooks de React
│   │   ├── useThemeColors.ts
│   │   └── useDaySummary.ts
│   │
│   └── screens/                  # Una carpeta por cada uno de los 12 módulos funcionales
│       ├── auth/
│       ├── profile/
│       ├── bmi/
│       ├── calories/
│       ├── workouts/
│       ├── exercise-log/
│       ├── progress/
│       ├── reminders/
│       ├── water/
│       ├── goals/
│       ├── calendar/
│       ├── history/
│       └── home/                 # Pantalla principal del tab Inicio
│
├── GUIA-EQUIPO.md                # Guía de implementación por fases para 5 personas
├── SPEC.md                       # Esta especificación
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── babel.config.js
```

---

## 5. Modelos de Datos en TypeScript

1. **`Usuario`**: ID, nombre, email, edad, sexo (`'masculino' | 'femenino' | 'otro'`), altura (cm), peso (kg), objetivo (`'bajar_peso' | 'ganar_musculo' | 'mejorar_resistencia'`), nivel de actividad.
2. **`Entrenamiento`**: ID, título, descripción, nivel (`'principiante' | 'intermedio' | 'avanzado'`), objetivo, duración estimada (min), ejercicios (`EjercicioEntrenamiento[]`), fecha programada.
3. **`Ejercicio`**: ID, nombre, grupoMuscular (`'pecho' | 'espalda' | 'piernas' | 'hombros' | 'brazos' | 'core' | 'cardio'`), descripcion, equipoNecesario.
4. **`RegistroComida`**: ID, fecha (ISO), momentoDia (`'desayuno' | 'almuerzo' | 'cena' | 'snack'`), nombreAlimento, calorias, proteinasG, carbohidratosG, grasasG.
5. **`RegistroAgua`**: ID, fecha (YYYY-MM-DD), cantidadMl, metaMl.
6. **`RegistroProgreso`**: ID, fecha (YYYY-MM-DD), pesoKg, fotosUrl?, medidas: `{ pechoCm?, cinturaCm?, caderaCm?, brazoCm?, musloCm? }`, notas.
7. **`Meta`**: ID, titulo, categoria (`'peso' | 'entrenamiento' | 'nutricion' | 'habito'`), valorObjetivo, valorActual, unidad, fechaLimite, completada.
8. **`Logro`**: ID, titulo, descripcion, icono, desbloqueado, fechaDesbloqueo?, puntos.

---

## 6. Comandos del Proyecto

- `npm install` — Instalar todas las dependencias del proyecto.
- `npm run dev` / `npx expo start` — Iniciar el bundler de Expo.
- `npx expo start --web` — Ejecutar en entorno Web.
- `npx expo start --android` — Ejecutar en emulador/dispositivo Android.
- `npx expo start --ios` — Ejecutar en simulador iOS.
- `npx tsc --noEmit` — Verificación estricta de tipos TypeScript.

---

## 7. Límites y Reglas (Boundaries)

- **Siempre hacer:**
  - Mantener los estilos coherentes con la paleta de tokens (`theme.ts` y clases Tailwind de NativeWind).
  - Usar los modelos tipados de `src/types/index.ts`.
  - Colocar los cálculos puros (IMC, calorías, macros) en `src/utils/` libres de dependencias de UI.
  - Dejar comentarios `TODO` detallados en las pantallas esqueleto para que cualquier miembro del equipo sepa qué implementar.
- **Consultar primero:**
  - Agregar nuevas librerías nativas que requieran compilación custom fuera de Expo Go.
  - Modificar la estructura de navegación de los tabs principales.
- **Nunca hacer:**
  - Implementar lógica multiusuario, perfiles de entrenadores o gestión de gimnasios (fuera de alcance).
  - Mutar el estado de Zustand directamente fuera de los reducers/acciones.
