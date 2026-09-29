import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { COLORS } from '../../constants/theme';

interface StatBadgeProps {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const StatBadge: React.FC<StatBadgeProps> = ({
  label,
  value,
  unit,
  color = COLORS.primary,
  backgroundColor = COLORS.primaryLight,
  style,
}) => {
  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius: 16,
          paddingVertical: 10,
          paddingHorizontal: 14,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      className="items-center justify-center rounded-2xl py-2.5 px-3.5"
    >
      <Text
        style={{ color: COLORS.textSecondary }}
        className="text-[11px] font-semibold uppercase tracking-wider mb-0.5"
      >
        {label}
      </Text>
      <View className="flex-row items-baseline">
        <Text
          style={{ color, fontSize: 18, fontWeight: '800' }}
          className="text-lg font-extrabold"
        >
          {value}
        </Text>
        {unit ? (
          <Text
            style={{ color, fontSize: 12, marginLeft: 2, fontWeight: '600' }}
            className="text-xs ml-0.5 font-semibold"
          >
            {unit}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default StatBadge;
