import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RegistroComida } from '../types';
import { REGISTROS_COMIDA_HOY } from '../services/mockData';

interface NutritionState {
  registrosComida: RegistroComida[];
  metaCalorias: number;
  metaProteinasG: number;
  metaCarbosG: number;
  metaGrasasG: number;

  // Estado del agua
  aguaMlHoy: number;
  metaAguaMl: number;

  // Acciones
  agregarComida: (comida: Omit<RegistroComida, 'id' | 'fecha'>) => void;
  eliminarComida: (id: string) => void;
  actualizarMetasNutricion: (metas: {
    calorias?: number;
    proteinasG?: number;
    carbosG?: number;
    grasasG?: number;
  }) => void;

  registrarAgua: (mililitros: number) => void;
  actualizarMetaAgua: (nuevaMetaMl: number) => void;
  reiniciarAgua: () => void;

  // Selectores derivados
  obtenerTotalesHoy: () => {
    caloriasTotales: number;
    proteinasTotales: number;
    carbosTotales: number;
    grasasTotales: number;
  };
}

export const useNutritionStore = create<NutritionState>()(
  persist(
    (set, get) => ({
      registrosComida: REGISTROS_COMIDA_HOY,
      metaCalorias: 2450,
      metaProteinasG: 160,
      metaCarbosG: 280,
      metaGrasasG: 65,

      aguaMlHoy: 1750,
      metaAguaMl: 2600,

      agregarComida: (nueva) => {
        const fechaHoy = new Date().toISOString().split('T')[0];
        const nuevoRegistro: RegistroComida = {
          ...nueva,
          id: `com_${Date.now()}`,
          fecha: fechaHoy,
        };
        set((state) => ({
          registrosComida: [nuevoRegistro, ...state.registrosComida],
        }));
      },

      eliminarComida: (id: string) => {
        set((state) => ({
          registrosComida: state.registrosComida.filter((c) => c.id !== id),
        }));
      },

      actualizarMetasNutricion: (metas) => {
        set((state) => ({
          metaCalorias: metas.calorias ?? state.metaCalorias,
          metaProteinasG: metas.proteinasG ?? state.metaProteinasG,
          metaCarbosG: metas.carbosG ?? state.metaCarbosG,
          metaGrasasG: metas.grasasG ?? state.metaGrasasG,
        }));
      },

      registrarAgua: (ml: number) => {
        set((state) => ({
          aguaMlHoy: Math.max(0, state.aguaMlHoy + ml),
        }));
      },

      actualizarMetaAgua: (nuevaMetaMl: number) => {
        set({ metaAguaMl: nuevaMetaMl });
      },

      reiniciarAgua: () => {
        set({ aguaMlHoy: 0 });
      },

      obtenerTotalesHoy: () => {
        const hoy = new Date().toISOString().split('T')[0];
        const comidasHoy = get().registrosComida.filter(
          (c) => c.fecha === hoy || c.fecha === '2026-09-27'
        );

        return comidasHoy.reduce(
          (acc, comida) => ({
            caloriasTotales: acc.caloriasTotales + comida.calorias,
            proteinasTotales: acc.proteinasTotales + comida.proteinasG,
            carbosTotales: acc.carbosTotales + comida.carbohidratosG,
            grasasTotales: acc.grasasTotales + comida.grasasG,
          }),
          {
            caloriasTotales: 0,
            proteinasTotales: 0,
            carbosTotales: 0,
            grasasTotales: 0,
          }
        );
      },
    }),
    {
      name: 'fitpulse-nutrition',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
