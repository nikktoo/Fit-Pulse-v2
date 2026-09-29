import React from 'react';
import { View, ViewStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { COLORS, RADIUS, SHADOWS } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'white' | 'cream' | 'accent';
  className?: string;
}

/**
 * Tarjeta base del sistema de diseño FitPulse
 * - Blanco puro (#FFFFFF) con esquinas muy redondeadas
 * - Sombra suave cálida
 * - Soporta pulsación táctil opcional
 */
export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'white',
  className = '',
}) => {
  let backgroundColor: string = COLORS.card;
  let borderColor: string = COLORS.border;

  if (variant === 'cream') {
    backgroundColor = COLORS.cardMuted;
  } else if (variant === 'accent') {
    backgroundColor = COLORS.primaryLight;
    borderColor = COLORS.primary;
  }

  const baseStyle: ViewStyle = {
    backgroundColor,
    borderRadius: RADIUS.xxl,
    padding: 18,
    borderWidth: 1,
    borderColor,
    ...SHADOWS.card,
  };

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={onPress}
        style={[baseStyle, style]}
        className={`rounded-3xl p-5 mb-4 ${className}`}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[baseStyle, style]}
      className={`rounded-3xl p-5 mb-4 ${className}`}
    >
      {children}
    </View>
  );
};

export default Card;
