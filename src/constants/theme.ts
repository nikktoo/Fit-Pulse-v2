/**
 * Sistema de Diseño y Tokens de FitPulse
 * Paleta cálida basada en tonos crema, blanco puro, naranja coral y verde turquesa.
 */

export const COLORS = {
  // Fondos y superficies
  background: '#F3EEE4',      // Fondo general crema
  card: '#FFFFFF',            // Tarjetas blanco puro
  cardMuted: '#FAF7F2',       // Tarjetas secundarias crema claro
  border: '#E7E1D5',          // Bordes sutiles

  // Colores de acento
  primary: '#FF6F51',         // Naranja coral (botones, badges, activos)
  primaryHover: '#E8583B',    // Coral oscuro (interacciones)
  primaryLight: '#FFEAE5',    // Fondo suave para badges coral

  secondary: '#2BB6A3',       // Verde turquesa (éxito, progreso, rangos sanos)
  secondaryHover: '#249E8E',  // Turquesa oscuro
  secondaryLight: '#E3F8F5',  // Fondo suave para badges de éxito

  // Estados semánticos
  warning: '#EAA838',         // Ámbar para alertas moderadas / rachas
  warningLight: '#FDF4E5',
  danger: '#E05353',          // Rojo suave para límites excedidos
  dangerLight: '#FDECEB',
  info: '#3B82F6',            // Azul informativo
  infoLight: '#EFF6FF',

  // Tipografía
  text: '#221D16',            // Casi negro cálido (títulos y texto principal)
  textSecondary: '#8B8578',   // Gris cálido (subtítulos y metadata)
  textMuted: '#B3ACA1',       // Gris claro para placeholders
  textOnPrimary: '#FFFFFF',   // Texto sobre botones corales
  textOnSecondary: '#FFFFFF', // Texto sobre turquesa

  // Indicador de Eyebrow
  eyebrow: '#FF6F51',
} as const;

export const SHADOWS = {
  soft: {
    shadowColor: '#221D16',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  card: {
    shadowColor: '#221D16',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  button: {
    shadowColor: '#FF6F51',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
} as const;

export default {
  COLORS,
  SHADOWS,
  SPACING,
  RADIUS,
};
