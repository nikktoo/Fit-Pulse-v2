import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { Eyebrow } from './Eyebrow';
import { COLORS } from '../../constants/theme';

interface HeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Cabecera estándar de pantalla con Eyebrow naranja, título principal y subtítulo
 */
export const Header: React.FC<HeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  rightAction,
  style,
}) => {
  return (
    <View style={[{ marginBottom: 20 }, style]} className="mb-5">
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-3">
          {eyebrow ? <Eyebrow text={eyebrow} /> : null}
          <Text
            style={{ color: COLORS.text }}
            className="text-2xl font-black tracking-tight"
          >
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={{ color: COLORS.textSecondary }}
              className="text-sm mt-1"
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
        {rightAction ? <View className="pt-1">{rightAction}</View> : null}
      </View>
    </View>
  );
};

export default Header;
