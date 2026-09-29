import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  tokenSimulado: string | null;
  iniciarSesion: (email: string) => Promise<void>;
  cerrarSesion: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: true, // Inicializado en true para que las pantallas sean explorables inmediatamente
      email: 'alex.fitpulse@ejemplo.com',
      tokenSimulado: 'fake-jwt-token-fitpulse-2026',

      iniciarSesion: async (email: string) => {
        // Simulación de delay de autenticación
        await new Promise((resolve) => setTimeout(resolve, 600));
        set({
          isAuthenticated: true,
          email,
          tokenSimulado: `fake-jwt-${Date.now()}`,
        });
      },

      cerrarSesion: () => {
        set({
          isAuthenticated: false,
          email: null,
          tokenSimulado: null,
        });
      },
    }),
    {
      name: 'fitpulse-auth',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
