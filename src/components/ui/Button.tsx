import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { COLORS, RADIUS, SHADOWS } from '../../constants/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

/**
 * Botón principal del sistema de diseño FitPulse
 * - Ancho completo por defecto
 * - Esquinas muy redondeadas
 * - Texto en mayúsculas y negrita
 * - Colores coral (#FF6F51) o turquesa (#2BB6A3)
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
  textStyle,
  icon,
  ...rest
}) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';

  // Determinación de color de fondo según variante
  let backgroundColor: string = COLORS.primary;
  let textColor: string = COLORS.textOnPrimary;
  let borderColor: string = 'transparent';
  let borderWidth = 0;

  if (isPrimary) {
    backgroundColor = disabled ? COLORS.textMuted : COLORS.primary;
    textColor = COLORS.textOnPrimary;
  } else if (isSecondary) {
    backgroundColor = disabled ? COLORS.textMuted : COLORS.secondary;
    textColor = COLORS.textOnSecondary;
  } else if (isOutline) {
    backgroundColor = 'transparent';
    borderColor = disabled ? COLORS.textMuted : COLORS.primary;
    borderWidth = 1.5;
    textColor = disabled ? COLORS.textMuted : COLORS.primary;
  } else if (isGhost) {
    backgroundColor = 'transparent';
    textColor = disabled ? COLORS.textMuted : COLORS.text;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        {
          backgroundColor,
          borderColor,
          borderWidth,
          borderRadius: RADIUS.xl,
          paddingVertical: 16,
          paddingHorizontal: 24,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: fullWidth ? '100%' : undefined,
        },
        isPrimary && !disabled ? SHADOWS.button : undefined,
        style,
      ]}
      className={`${fullWidth ? 'w-full' : ''} flex-row items-center justify-center`}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {icon ? <>{icon}</> : null}
          <Text
            style={[
              {
                color: textColor,
                fontSize: 15,
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: 0.8,
              },
              textStyle,
            ]}
            className="font-bold text-center uppercase tracking-wider"
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
