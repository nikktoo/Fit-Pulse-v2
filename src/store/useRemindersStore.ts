import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recordatorio } from '../types';
import { RECORDATORIOS_INICIALES } from '../services/mockData';

interface RemindersState {
  recordatorios: Recordatorio[];
  toggleRecordatorio: (id: string) => void;
  agregarRecordatorio: (recordatorio: Omit<Recordatorio, 'id'>) => void;
  eliminarRecordatorio: (id: string) => void;
}

export const useRemindersStore = create<RemindersState>()(
  persist(
    (set) => ({
      recordatorios: RECORDATORIOS_INICIALES,

      toggleRecordatorio: (id) => {
        set((state) => ({
          recordatorios: state.recordatorios.map((r) =>
            r.id === id ? { ...r, activo: !r.activo } : r
          ),
        }));
      },

      agregarRecordatorio: (nuevo) => {
        const nuevoRecordatorio: Recordatorio = {
          ...nuevo,
          id: `rec_${Date.now()}`,
        };
        set((state) => ({
          recordatorios: [...state.recordatorios, nuevoRecordatorio],
        }));
      },

      eliminarRecordatorio: (id) => {
        set((state) => ({
          recordatorios: state.recordatorios.filter((r) => r.id !== id),
        }));
      },
    }),
    {
      name: 'fitpulse-reminders',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
