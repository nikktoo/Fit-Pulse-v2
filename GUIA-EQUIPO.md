# Guía del Equipo: FitPulse

Bienvenido al desarrollo de **FitPulse**, la app de fitness y bienestar individual todo-en-uno desarrollada con **Expo Go (SDK 54) + TypeScript + Expo Router + NativeWind v4 + Zustand + AsyncStorage**.

Esta guía define el mapa de arquitectura, los roles y asignación de responsabilidades para un **equipo de 5 desarrolladores**, las convenciones de código y el plan de implementación paso a paso por fases.

---

## 1. Puesta en Marcha en tu Computador

1. **Requisitos:** Node.js (v20+ o v22+ recomendado), npm o pnpm.
2. **Instalación:**
   ```bash
   npm install
   ```
3. **Ejecución en desarrollo:**
   - Para abrir el menú de Expo con QR (para escanear con la app Expo Go en tu celular):
     ```bash
     npm start
     # o bien
     npx expo start
     ```
   - Para probar en el navegador web:
     ```bash
     npm run web
     # o presiona 'w' en la terminal de expo
     ```
   - Para Android emulador:
     ```bash
     npm run android
     ```
4. **Verificación antes de enviar cambios (Pull Request):**
   ```bash
   npm run typecheck
   ```
   *Regla de oro: Ningún PR se mergea si `npm run typecheck` falla.*

---

## 2. El Mapa: Dónde se toca cada cosa

| ¿Qué quieres hacer o modificar? | Capa / Zona | Ubicación |
|---|---|---|
| Modificar rutas o la barra inferior de navegación | Navegación Expo Router | `app/(tabs)/_layout.tsx`, `app/_layout.tsx` |
| Cambiar o ampliar los botones, tarjetas o barras de progreso | Kit UI Reutilizable | `src/components/ui/` (`Button`, `Card`, `ProgressBar`, `Eyebrow`) |
| Cambiar colores, sombras o tokens visuales | Tokens de Diseño | `src/constants/theme.ts` y `tailwind.config.js` |
| Modificar modelos de datos o agregar campos a Usuario, Rutinas, etc. | Tipos TypeScript | `src/types/index.ts` |
| Modificar el estado global o agregar acciones (Zustand + AsyncStorage) | Stores de Estado | `src/store/` (`useUserStore`, `useWorkoutStore`, `useNutritionStore`, etc.) |
| Agregar o ajustar fórmulas matemáticas (IMC, BMR, TDEE, Macros) | Utilidades Puras | `src/utils/` (`bmi.ts`, `calories.ts`, `formatters.ts`) |
| Trabajar en la pantalla de un módulo específico | Pantallas Modulares | `src/screens/<modulo>/` (ej. `src/screens/workouts/`, `src/screens/calories/`) |


---

## 4. Plan de Implementación Paso a Paso (Fases)

### Fase 1: Esqueleto, Tipos y Navegación (COMPLETADA ✓)
- [x] Configuración de Expo SDK 54, TypeScript, NativeWind v4, Zustand y AsyncStorage.
- [x] Creación de todos los modelos de datos tipados en `src/types/index.ts`.
- [x] Configuración de los 5 Tabs principales y las pantallas modales con Expo Router.
- [x] Componentes base: `Button`, `Card`, `ProgressBar`, `Eyebrow`, `Header`, `StatBadge`.
- [x] Creación de las 12 carpetas de pantallas en `src/screens/` con esqueletos visuales interactivos y comentarios `TODO` para cada integrante.

---

### Fase 2: Lógica de Negocio y Funcionalidades Núcleo (Siguiente Sprint)

#### 👤 Tareas para Desarrollador 1 (Core / Auth / Perfil / IMC)
- [ ] **Módulo 2 (Perfil):** Conectar selector de nivel de actividad física con el recálculo automático de necesidades calóricas en `src/utils/calories.ts`.
- [ ] **Módulo 2 (Perfil):** Agregar soporte para selección o cambio de avatar/foto con `expo-image-picker`.
- [ ] **Módulo 3 (Calculadora IMC):** Implementar representación visual gráfica tipo velocímetro/gauge para ubicar el puntero del IMC entre las categorías.
- [ ] **Módulo 1 (Auth Falso):** Proteger el flujo de sesión y preparar la interfaz para futura autenticación persistente con `expo-secure-store`.

#### 🥗 Tareas para Desarrollador 2 (Nutrición / Agua / Recordatorios)
- [ ] **Módulo 4 (Contador Calorías):** Añadir buscador de alimentos predefinidos con valores nutricionales rápidos (pollo, arroz, avena, huevo, manzana).
- [ ] **Módulo 4 (Contador Calorías):** Validar que las calorías totales sumen coherentemente a partir de macros: `(P * 4) + (C * 4) + (G * 9)`.
- [ ] **Módulo 9 (Contador de Agua):** Implementar animación visual de nivel de agua al pulsar los botones de `+250 ml` y `+500 ml`.
- [ ] **Módulo 8 (Recordatorios):** Conectar los switches con `expo-notifications` para programar alertas locales diarias a la hora especificada.

#### 🏋️‍♂️ Tareas para Desarrollador 3 (Entrenamientos / Registro en Vivo)
- [ ] **Módulo 5 (Entrenamientos):** Permitir al usuario crear nuevas rutinas personalizadas y añadir ejercicios desde el catálogo de `src/services/mockData.ts`.
- [ ] **Módulo 6 (Registro en Vivo):** Implementar cronómetro flotante de descanso automático (ej. 90 segundos con aviso sonoro/vibración) tras marcar una serie como completada.
- [ ] **Módulo 6 (Registro en Vivo):** Permitir añadir o eliminar series en tiempo real dentro del ejercicio.
- [ ] **Módulo 6 (Registro en Vivo):** Añadir campo opcional de RIR (Repeticiones en Reserva de 0 a 4) para medir intensidad.

#### 📈 Tareas para Desarrollador 4 (Progreso / Calendario / Historial)
- [ ] **Módulo 7 (Progreso):** Conectar biblioteca de gráficos (SVG o barras adaptables) para graficar peso y medidas a lo largo de los meses.
- [ ] **Módulo 11 (Calendario):** Permitir navegar entre semanas anteriores y siguientes, mostrando qué días se entrenó y qué días fueron de descanso.
- [ ] **Módulo 12 (Historial):** Añadir buscador por fecha o por nombre de rutina y vista detallada de la sesión previa con pesos utilizados para facilitar la sobrecarga progresiva.

#### 🏆 Tareas para Desarrollador 5 (Gamificación / Dashboard / UI Kit)
- [ ] **Módulo 10 (Metas y Logros):** Implementar lógica para comprobar automáticamente el cumplimiento de metas cuando se registra un nuevo peso o entrenamiento.
- [ ] **Módulo 10 (Metas y Logros):** Agregar animación de felicitación (estilo modal o confeti) cuando se desbloquea un logro.
- [ ] **Dashboard (Inicio):** Crear tarjeta de "Racha Actual" (días consecutivos cumpliendo metas).
- [ ] **Revisión de Estilos:** Asegurar coherencia en toda la app: tema crema (`#F3EEE4`), tarjetas blancas redondeadas con sombra suave, botones corales (`#FF6F51`) y badges turquesa (`#2BB6A3`).

---

### Fase 3: Pruebas, Refinamiento y Demo Final
- [ ] Pruebas cruzadas en dispositivos Android, iOS y Web.
- [ ] Limpieza de datos con botón "Restablecer a valores iniciales" en Perfil para demos.
- [ ] Verificación de accesibilidad (contrastes de texto, tamaños de toque mínimos de 44x44px).
- [ ] Documentación final y grabación de video demo del flujo completo.

---

## 5. Reglas de Convivencia y Buenas Prácticas

1. **No toques pantallas ajenas sin avisar:** Cada desarrollador es dueño de su carpeta en `src/screens/<modulo>/`. Si necesitas compartir un componente, colócalo en `src/components/`.
2. **Cálculos matemáticos siempre en `src/utils/`:** Ninguna pantalla debe contener fórmulas complejas de nutrición o IMC cableadas en el JSX. Deben ser funciones puras exportadas y testeadas en `src/utils/`.
3. **Los datos mutan a través del Store:** Nunca modifiques variables de estado directamente. Invoca siempre las acciones definidas en `src/store/`.
4. **Respeto estricto del alcance:** FitPulse es de **uso individual**. No agregues endpoints ni tablas para perfiles de gimnasios, asignación de alumnos ni cuentas de entrenador.
