import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { COLORS, RADIUS } from '../../constants/theme';

interface ProgressBarProps {
  progress: number; // 0 a 1 (o 0 a 100 con prop isPercent)
  color?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
  style?: ViewStyle;
}

/**
 * Barra de progreso horizontal para calorías, agua, macros y metas
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = COLORS.primary,
  height = 8,
  showLabel = false,
  label,
  style,
}) => {
  // Normalizar a valor entre 0 y 1
  const normalized = Math.min(Math.max(progress, 0), 1);
  const porcentajeDisplay = Math.round(normalized * 100);

  return (
    <View style={[{ width: '100%' }, style]}>
      {showLabel ? (
        <View className="flex-row justify-between items-center mb-1.5">
          {label ? (
            <Text
              style={{ color: COLORS.textSecondary }}
              className="text-xs font-medium"
            >
              {label}
            </Text>
          ) : null}
          <Text
            style={{ color: COLORS.text }}
            className="text-xs font-bold"
          >
            {porcentajeDisplay}%
          </Text>
        </View>
      ) : null}

      <View
        style={{
          width: '100%',
          height,
          backgroundColor: '#EAE4D7',
          borderRadius: RADIUS.full,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${porcentajeDisplay}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: RADIUS.full,
          }}
        />
      </View>
    </View>
  );
};

export default ProgressBar;
