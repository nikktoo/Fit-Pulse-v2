import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Header, Card, Button, ProgressBar, Eyebrow, StatBadge } from '../../components';
import { COLORS } from '../../constants/theme';
import { useNutritionStore } from '../../store/useNutritionStore';
import { formatearMililitros } from '../../utils/formatters';

/**
 * Pantalla / Modal: Contador de Agua
 * Módulo 9: Registro rápido de hidratación diaria con meta configurable.
 */
export const WaterScreen: React.FC = () => {
  const router = useRouter();
  const { aguaMlHoy, metaAguaMl, registrarAgua, reiniciarAgua } = useNutritionStore();

  const progreso = metaAguaMl > 0 ? aguaMlHoy / metaAguaMl : 0;
  const restante = Math.max(0, metaAguaMl - aguaMlHoy);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <View className="flex-row justify-between items-center mb-2">
          <Eyebrow text="HIDRATACIÓN VITAL" />
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: COLORS.textSecondary, fontWeight: '700', fontSize: 13 }}>
              CERRAR
            </Text>
          </TouchableOpacity>
        </View>

        <Header
          title="Contador de Agua"
          subtitle="Registra tus tomas y alcanza tu hidratación óptima recomendada"
        />

        {/* Tarjeta Visual de Hidratación */}
        <Card
          variant="white"
          style={{
            alignItems: 'center',
            borderColor: COLORS.secondary,
            borderWidth: 2,
          }}
        >
          <Text style={{ fontSize: 48 }} className="mb-2">
            💧
          </Text>

          <Text
            style={{ color: COLORS.text, fontSize: 40, fontWeight: '900' }}
          >
            {formatearMililitros(aguaMlHoy)}
          </Text>

          <Text
            style={{ color: COLORS.textSecondary, fontSize: 13, fontWeight: '600' }}
            className="mb-4"
          >
            Meta de hoy: {formatearMililitros(metaAguaMl)}
          </Text>

          <ProgressBar
            progress={progreso}
            color={COLORS.secondary}
            height={12}
            showLabel
            label="Progreso de hidratación"
          />

          <View className="flex-row justify-around w-full mt-5 pt-4 border-t border-cream-border">
            <StatBadge
              label="INGESTA"
              value={formatearMililitros(aguaMlHoy)}
              color={COLORS.secondary}
              backgroundColor={COLORS.secondaryLight}
            />
            <StatBadge
              label="RESTANTE"
              value={formatearMililitros(restante)}
              color={COLORS.primary}
              backgroundColor={COLORS.primaryLight}
            />
          </View>
        </Card>

        {/* Botones de Tomas Rápidas */}
        <Text
          style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}
          className="mb-3 uppercase tracking-wider"
        >
          Añadir Toma Rápida
        </Text>

        <View className="flex-row gap-3 mb-4">
          <Card
            variant="cream"
            onPress={() => registrarAgua(250)}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <Text style={{ fontSize: 24 }}>🥛</Text>
            <Text style={{ color: COLORS.text, fontWeight: '800', fontSize: 16 }} className="mt-1">
              +250 ml
            </Text>
            <Text style={{ color: COLORS.textSecondary, fontSize: 11 }}>1 vaso</Text>
          </Card>

          <Card
            variant="cream"
            onPress={() => registrarAgua(500)}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <Text style={{ fontSize: 24 }}>🍶</Text>
            <Text style={{ color: COLORS.text, fontWeight: '800', fontSize: 16 }} className="mt-1">
              +500 ml
            </Text>
            <Text style={{ color: COLORS.textSecondary, fontSize: 11 }}>1 botella</Text>
          </Card>

          <Card
            variant="cream"
            onPress={() => registrarAgua(750)}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <Text style={{ fontSize: 24 }}>🧃</Text>
            <Text style={{ color: COLORS.text, fontWeight: '800', fontSize: 16 }} className="mt-1">
              +750 ml
            </Text>
            <Text style={{ color: COLORS.textSecondary, fontSize: 11 }}>Botella grande</Text>
          </Card>
        </View>

        <Button
          title="REINICIAR CONTADOR DEL DÍA"
          onPress={reiniciarAgua}
          variant="ghost"
        />

        {/* ============================================================== */}
        {/* TODOs PARA EL EQUIPO (Módulo Contador de Agua):                */}
        {/* 1. TODO: Animación ondulada de llenado de agua (Wave SVG).    */}
        {/* 2. TODO: Registro horario detallado de cada vaso ingerido.    */}
        {/* 3. TODO: Ajuste automático de meta según clima y sudoración.  */}
        {/* ============================================================== */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WaterScreen;
