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
import { useUserStore } from '../../store/useUserStore';
import { useNutritionStore } from '../../store/useNutritionStore';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { calcularIMC } from '../../utils/bmi';
import { formatearCalorias, formatearMililitros } from '../../utils/formatters';

/**
 * Pantalla Principal: Dashboard / Inicio (Tab 1)
 * Integra el resumen del día: Calorías, Agua, IMC, Entrenamientos y Hábitos.
 */
export const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { usuario } = useUserStore();
  const {
    metaCalorias,
    aguaMlHoy,
    metaAguaMl,
    obtenerTotalesHoy,
    registrarAgua,
  } = useNutritionStore();
  const { entrenamientos } = useWorkoutStore();

  const totales = obtenerTotalesHoy();
  const imcReport = calcularIMC(usuario.pesoKg, usuario.alturaCm);
  const rutinaHoy = entrenamientos[0];

  const progresoCalorico = metaCalorias > 0 ? totales.caloriasTotales / metaCalorias : 0;
  const progresoAgua = metaAguaMl > 0 ? aguaMlHoy / metaAguaMl : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        {/* Cabecera con Eyebrow HOY */}
        <Header
          eyebrow="HOY"
          title={`Hola, ${usuario.nombre.split(' ')[0]}`}
          subtitle="Aquí está el resumen de tu acondicionamiento físico de hoy"
          rightAction={
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/profile')}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: COLORS.primaryLight,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1.5,
                borderColor: COLORS.primary,
              }}
            >
              <Text style={{ color: COLORS.primary, fontWeight: '800', fontSize: 16 }}>
                {usuario.nombre.charAt(0)}
              </Text>
            </TouchableOpacity>
          }
        />

        {/* Tarjeta de Rutina Programada para Hoy */}
        <Card variant="white">
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-1 pr-2">
              <Text
                style={{ color: COLORS.primary, fontSize: 11, fontWeight: '800' }}
                className="uppercase tracking-wider"
              >
                ENTRENAMIENTO RECOMENDADO
              </Text>
              <Text
                style={{ color: COLORS.text, fontSize: 18, fontWeight: '800' }}
                className="mt-0.5"
              >
                {rutinaHoy?.titulo || 'Día de descanso'}
              </Text>
            </View>
            <StatBadge
              label="DURACIÓN"
              value={`${rutinaHoy?.duracionEstimadaMin || 45}m`}
              color={COLORS.primary}
            />
          </View>

          <Text
            style={{ color: COLORS.textSecondary, fontSize: 13 }}
            className="mb-4"
          >
            {rutinaHoy?.descripcion}
          </Text>

          <Button
            title="COMENZAR ENTRENAMIENTO"
            onPress={() => router.push('/modals/exercise-log')}
            variant="primary"
          />
        </Card>

        {/* Resumen Nutricional & Calorías */}
        <Card
          variant="white"
          onPress={() => router.push('/(tabs)/nutrition')}
        >
          <View className="flex-row justify-between items-center mb-2">
            <View>
              <Text
                style={{ color: COLORS.primary, fontSize: 11, fontWeight: '800' }}
                className="uppercase tracking-wider"
              >
                NUTRICIÓN & ENERGÍA
              </Text>
              <Text style={{ color: COLORS.text, fontSize: 18, fontWeight: '800' }}>
                {formatearCalorias(totales.caloriasTotales)}{' '}
                <Text style={{ color: COLORS.textSecondary, fontSize: 13, fontWeight: '500' }}>
                  / {metaCalorias} kcal
                </Text>
              </Text>
            </View>
            <Text style={{ color: COLORS.primary, fontWeight: '800', fontSize: 18 }}>→</Text>
          </View>

          <ProgressBar
            progress={progresoCalorico}
            color={COLORS.primary}
            height={8}
            style={{ marginVertical: 8 }}
          />

          <View className="flex-row justify-between pt-2 border-t border-cream-border">
            <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>
              Proteína: <Text className="font-bold text-dark">{totales.proteinasTotales}g</Text>
            </Text>
            <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>
              Carbos: <Text className="font-bold text-dark">{totales.carbosTotales}g</Text>
            </Text>
            <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>
              Grasas: <Text className="font-bold text-dark">{totales.grasasTotales}g</Text>
            </Text>
          </View>
        </Card>

        {/* Fila Dividida: Hidratación y Calculadora IMC */}
        <View className="flex-row gap-3">
          {/* Card Agua */}
          <Card
            variant="white"
            onPress={() => router.push('/modals/water')}
            style={{ flex: 1 }}
          >
            <Text style={{ color: COLORS.secondary, fontSize: 11, fontWeight: '800' }} className="uppercase">
              AGUA HOY
            </Text>
            <Text style={{ color: COLORS.text, fontSize: 18, fontWeight: '900', marginTop: 2 }}>
              {formatearMililitros(aguaMlHoy)}
            </Text>
            <ProgressBar
              progress={progresoAgua}
              color={COLORS.secondary}
              height={6}
              style={{ marginVertical: 6 }}
            />
            <TouchableOpacity
              onPress={() => registrarAgua(250)}
              style={{
                backgroundColor: COLORS.secondaryLight,
                paddingVertical: 6,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 4,
              }}
            >
              <Text style={{ color: COLORS.secondary, fontWeight: '800', fontSize: 11 }}>
                +250 ML
              </Text>
            </TouchableOpacity>
          </Card>

          {/* Card IMC */}
          <Card
            variant="white"
            onPress={() => router.push('/modals/bmi')}
            style={{ flex: 1 }}
          >
            <Text style={{ color: COLORS.primary, fontSize: 11, fontWeight: '800' }} className="uppercase">
              ESTADO IMC
            </Text>
            <Text style={{ color: imcReport.color, fontSize: 24, fontWeight: '900', marginTop: 2 }}>
              {imcReport.imc}
            </Text>
            <View
              style={{
                backgroundColor: imcReport.categoria === 'normal' ? COLORS.secondaryLight : COLORS.primaryLight,
                borderRadius: 8,
                paddingVertical: 2,
                paddingHorizontal: 6,
                alignSelf: 'flex-start',
                marginTop: 4,
              }}
            >
              <Text style={{ color: imcReport.color, fontWeight: '800', fontSize: 10 }}>
                {imcReport.etiqueta}
              </Text>
            </View>
            <Text style={{ color: COLORS.textSecondary, fontSize: 10, marginTop: 8 }}>
              Toca para ver análisis
            </Text>
          </Card>
        </View>

        {/* Accesos Rápidos Modales */}
        <View className="mt-2">
          <Text
            style={{ color: COLORS.text, fontSize: 14, fontWeight: '800' }}
            className="mb-2 uppercase tracking-wider"
          >
            Accesos Directos
          </Text>

          <View className="flex-row gap-2">
            <Card
              variant="cream"
              onPress={() => router.push('/modals/goals')}
              style={{ flex: 1, alignItems: 'center', paddingVertical: 14 }}
            >
              <Text style={{ fontSize: 20 }}>🎯</Text>
              <Text style={{ color: COLORS.text, fontWeight: '700', fontSize: 12, marginTop: 4 }}>
                Metas & Logros
              </Text>
            </Card>

            <Card
              variant="cream"
              onPress={() => router.push('/modals/reminders')}
              style={{ flex: 1, alignItems: 'center', paddingVertical: 14 }}
            >
              <Text style={{ fontSize: 20 }}>⏰</Text>
              <Text style={{ color: COLORS.text, fontWeight: '700', fontSize: 12, marginTop: 4 }}>
                Recordatorios
              </Text>
            </Card>

            <Card
              variant="cream"
              onPress={() => router.push('/modals/calendar')}
              style={{ flex: 1, alignItems: 'center', paddingVertical: 14 }}
            >
              <Text style={{ fontSize: 20 }}>📅</Text>
              <Text style={{ color: COLORS.text, fontWeight: '700', fontSize: 12, marginTop: 4 }}>
                Calendario
              </Text>
            </Card>
          </View>
        </View>

        {/* ============================================================== */}
        {/* TODOs PARA EL EQUIPO (Dashboard Inicio):                       */}
        {/* 1. TODO: Racha de días activos consecutiva (Streak Widget).    */}
        {/* 2. TODO: Frases motivacionales aleatorias diarias.             */}
        {/* 3. TODO: Integración con Apple Health / Google Fit para pasos. */}
        {/* ============================================================== */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
