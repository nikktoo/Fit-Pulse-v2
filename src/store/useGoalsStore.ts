import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meta, Logro, RegistroProgreso } from '../types';
import {
  METAS_INICIALES,
  LOGROS_INICIALES,
  PROGRESO_INICIAL,
} from '../services/mockData';

interface GoalsState {
  metas: Meta[];
  logros: Logro[];
  progresoHistorico: RegistroProgreso[];

  // Acciones
  agregarMeta: (meta: Omit<Meta, 'id' | 'creadaEn' | 'completada'>) => void;
  actualizarProgresoMeta: (id: string, nuevoValor: number) => void;
  alternarMetaCompletada: (id: string) => void;
  eliminarMeta: (id: string) => void;

  desbloquearLogro: (id: string) => void;
  registrarProgresoFisico: (progreso: Omit<RegistroProgreso, 'id'>) => void;
}

export const useGoalsStore = create<GoalsState>()(
  persist(
    (set) => ({
      metas: METAS_INICIALES,
      logros: LOGROS_INICIALES,
      progresoHistorico: PROGRESO_INICIAL,

      agregarMeta: (nueva) => {
        const nuevaMeta: Meta = {
          ...nueva,
          id: `meta_${Date.now()}`,
          creadaEn: new Date().toISOString().split('T')[0],
          completada: false,
        };
        set((state) => ({
          metas: [nuevaMeta, ...state.metas],
        }));
      },

      actualizarProgresoMeta: (id, nuevoValor) => {
        set((state) => ({
          metas: state.metas.map((m) =>
            m.id === id
              ? {
                  ...m,
                  valorActual: nuevoValor,
                  completada: nuevoValor >= m.valorObjetivo,
                }
              : m
          ),
        }));
      },

      alternarMetaCompletada: (id) => {
        set((state) => ({
          metas: state.metas.map((m) =>
            m.id === id ? { ...m, completada: !m.completada } : m
          ),
        }));
      },

      eliminarMeta: (id) => {
        set((state) => ({
          metas: state.metas.filter((m) => m.id !== id),
        }));
      },

      desbloquearLogro: (id) => {
        set((state) => ({
          logros: state.logros.map((l) =>
            l.id === id
              ? {
                  ...l,
                  desbloqueado: true,
                  fechaDesbloqueo: new Date().toISOString().split('T')[0],
                }
              : l
          ),
        }));
      },

      registrarProgresoFisico: (nuevo) => {
        const nuevoRegistro: RegistroProgreso = {
          ...nuevo,
          id: `prog_${Date.now()}`,
        };
        set((state) => ({
          progresoHistorico: [...state.progresoHistorico, nuevoRegistro],
        }));
      },
    }),
    {
      name: 'fitpulse-goals',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
