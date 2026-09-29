import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Entrenamiento,
  Ejercicio,
  SesionEntrenamientoHistorial,
  ObjetivoFitness,
} from '../types';
import {
  ENTRENAMIENTOS_INICIALES,
  EJERCICIOS_CATALOGO,
  HISTORIAL_INICIAL,
} from '../services/mockData';

interface WorkoutState {
  entrenamientos: Entrenamiento[];
  catalogoEjercicios: Ejercicio[];
  historial: SesionEntrenamientoHistorial[];
  sesionActiva: {
    entrenamientoId: string;
    titulo: string;
    fechaInicio: string;
    duracionSegundos: number;
    seriesCompletadas: Record<string, boolean>; // serieId -> boolean
  } | null;

  // Acciones
  obtenerEntrenamientosPorObjetivo: (objetivo: ObjetivoFitness) => Entrenamiento[];
  iniciarSesionEntrenamiento: (entrenamiento: Entrenamiento) => void;
  marcarSerieCompletada: (serieId: string, completada: boolean) => void;
  finalizarSesion: (comentarios?: string) => void;
  cancelarSesion: () => void;
  agregarEntrenamiento: (nuevo: Entrenamiento) => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      entrenamientos: ENTRENAMIENTOS_INICIALES,
      catalogoEjercicios: EJERCICIOS_CATALOGO,
      historial: HISTORIAL_INICIAL,
      sesionActiva: null,

      obtenerEntrenamientosPorObjetivo: (objetivo: ObjetivoFitness) => {
        return get().entrenamientos.filter((ent) => ent.objetivo === objetivo);
      },

      iniciarSesionEntrenamiento: (entrenamiento: Entrenamiento) => {
        set({
          sesionActiva: {
            entrenamientoId: entrenamiento.id,
            titulo: entrenamiento.titulo,
            fechaInicio: new Date().toISOString(),
            duracionSegundos: 0,
            seriesCompletadas: {},
          },
        });
      },

      marcarSerieCompletada: (serieId: string, completada: boolean) => {
        const sesion = get().sesionActiva;
        if (!sesion) return;

        set({
          sesionActiva: {
            ...sesion,
            seriesCompletadas: {
              ...sesion.seriesCompletadas,
              [serieId]: completada,
            },
          },
        });
      },

      finalizarSesion: (comentarios?: string) => {
        const sesion = get().sesionActiva;
        if (!sesion) return;

        const entrenamiento = get().entrenamientos.find(
          (e) => e.id === sesion.entrenamientoId
        );

        const nuevaSesionHistorial: SesionEntrenamientoHistorial = {
          id: `ses_${Date.now()}`,
          entrenamientoId: sesion.entrenamientoId,
          tituloEntrenamiento: sesion.titulo,
          fechaInicio: sesion.fechaInicio,
          fechaFin: new Date().toISOString(),
          duracionMin: Math.max(1, Math.round(sesion.duracionSegundos / 60) || 45),
          volumenTotalKg: 3500, // estimado para el mock
          caloriasQuemadasEstimadas: 320,
          ejerciciosRealizados:
            entrenamiento?.ejercicios.map((item) => ({
              ejercicioId: item.ejercicio.id,
              nombreEjercicio: item.ejercicio.nombre,
              series: item.series.map((s) => ({
                serie: s.numeroSerie,
                pesoKg: s.pesoKg,
                repeticiones: s.repeticionesObjetivo,
                alFallo: false,
              })),
            })) || [],
          comentarios,
        };

        set((state) => ({
          historial: [nuevaSesionHistorial, ...state.historial],
          sesionActiva: null,
        }));
      },

      cancelarSesion: () => {
        set({ sesionActiva: null });
      },

      agregarEntrenamiento: (nuevo: Entrenamiento) => {
        set((state) => ({
          entrenamientos: [...state.entrenamientos, nuevo],
        }));
      },
    }),
    {
      name: 'fitpulse-workouts',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
