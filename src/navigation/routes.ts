/**
 * Rutas y constantes de navegación de FitPulse para Expo Router
 */

export const ROUTES = {
  // Flujo Auth
  AUTH: {
    LOGIN: '/(auth)/login' as const,
  },

  // Tabs Principales
  TABS: {
    HOME: '/(tabs)' as const,
    WORKOUTS: '/(tabs)/workouts' as const,
    NUTRITION: '/(tabs)/nutrition' as const,
    PROGRESS: '/(tabs)/progress' as const,
    PROFILE: '/(tabs)/profile' as const,
  },

  // Pantallas Modales
  MODALS: {
    BMI: '/modals/bmi' as const,
    EXERCISE_LOG: '/modals/exercise-log' as const,
    WORKOUT_DETAIL: '/modals/workout-detail' as const,
    WATER: '/modals/water' as const,
    REMINDERS: '/modals/reminders' as const,
    GOALS: '/modals/goals' as const,
    CALENDAR: '/modals/calendar' as const,
    HISTORY: '/modals/history' as const,
  },
} as const;

export type AppRoute =
  | typeof ROUTES.AUTH[keyof typeof ROUTES.AUTH]
  | typeof ROUTES.TABS[keyof typeof ROUTES.TABS]
  | typeof ROUTES.MODALS[keyof typeof ROUTES.MODALS];
