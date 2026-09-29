import React, { createContext, useContext, useMemo } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useUserStore } from '../store/useUserStore';
import { useNutritionStore } from '../store/useNutritionStore';
import { useWorkoutStore } from '../store/useWorkoutStore';
import { COLORS } from '../constants/theme';

interface AppContextValue {
  theme: typeof COLORS;
  isReady: boolean;
}

const AppContext = createContext<AppContextValue>({
  theme: COLORS,
  isReady: true,
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useMemo(
    () => ({
      theme: COLORS,
      isReady: true,
    }),
    []
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
