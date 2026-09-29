import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario, ObjetivoFitness } from '../types';
import { USUARIO_INICIAL } from '../services/mockData';

interface UserState {
  usuario: Usuario;
  actualizarPerfil: (datos: Partial<Usuario>) => void;
  cambiarObjetivo: (nuevoObjetivo: ObjetivoFitness) => void;
  actualizarPeso: (nuevoPesoKg: number) => void;
  actualizarAltura: (nuevaAlturaCm: number) => void;
  restablecerValoresPorDefecto: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      usuario: USUARIO_INICIAL,

      actualizarPerfil: (datos) =>
        set((state) => ({
          usuario: { ...state.usuario, ...datos },
        })),

      cambiarObjetivo: (nuevoObjetivo) =>
        set((state) => ({
          usuario: { ...state.usuario, objetivo: nuevoObjetivo },
        })),

      actualizarPeso: (nuevoPesoKg) =>
        set((state) => ({
          usuario: { ...state.usuario, pesoKg: nuevoPesoKg },
        })),

      actualizarAltura: (nuevaAlturaCm) =>
        set((state) => ({
          usuario: { ...state.usuario, alturaCm: nuevaAlturaCm },
        })),

      restablecerValoresPorDefecto: () =>
        set({
          usuario: USUARIO_INICIAL,
        }),
    }),
    {
      name: 'fitpulse-user',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
