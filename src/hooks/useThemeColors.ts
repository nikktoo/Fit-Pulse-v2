import { COLORS, SHADOWS, SPACING, RADIUS } from '../constants/theme';

/**
 * Hook para acceder a los tokens de diseño de FitPulse
 */
export function useThemeColors() {
  return {
    colors: COLORS,
    shadows: SHADOWS,
    spacing: SPACING,
    radius: RADIUS,
  };
}

export default useThemeColors;
