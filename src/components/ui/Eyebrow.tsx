import React from 'react';
import { Text, TextStyle } from 'react-native';
import { COLORS } from '../../constants/theme';

interface EyebrowProps {
  text: string;
  style?: TextStyle;
  color?: string;
}

/**
 * Etiqueta pequeña en mayúsculas naranja coral previa al título de cada pantalla
 * Ej: "HOY", "SALUD", "ENTRENAMIENTO", "NUTRICIÓN"
 */
export const Eyebrow: React.FC<EyebrowProps> = ({
  text,
  style,
  color = COLORS.primary,
}) => {
  return (
    <Text
      className="text-xs font-bold uppercase tracking-widest mb-1"
      style={[{ color }, style]}
    >
      {text}
    </Text>
  );
};

export default Eyebrow;
