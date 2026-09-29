import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Header, Card, Button, Eyebrow } from '../../components';
import { COLORS } from '../../constants/theme';
import { useWorkoutStore } from '../../store/useWorkoutStore';

/**
 * Pantalla / Modal: Calendario de Entrenamientos
 * Módulo 11: Organización y planificación temporal de las rutinas semanales.
 */
export const CalendarScreen: React.FC = () => {
  const router = useRouter();
  const { entrenamientos, historial } = useWorkoutStore();

  const diasSemana = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];
  const [diaSeleccionado, setDiaSeleccionado] = useState(0); // 0 = Lunes

  const diasMapeados = [
    { dia: 'LUN', fecha: '21', completado: true, rutina: 'Torso Fuerza' },
    { dia: 'MAR', fecha: '22', completado: true, rutina: 'Pierna & Core' },
    { dia: 'MIÉ', fecha: '23', completado: false, descanso: true },
    { dia: 'JUE', fecha: '24', completado: true, rutina: 'Torso Hipertrofia' },
    { dia: 'VIE', fecha: '25', completado: true, rutina: 'Pierna Completa' },
    { dia: 'SÁB', fecha: '26', completado: false, rutina: 'Cardio HIIT' },
    { dia: 'DOM', fecha: '27', completado: false, hoy: true, rutina: 'Torso Fuerza' },
  ];

  const infoDia = diasMapeados[diaSeleccionado];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <View className="flex-row justify-between items-center mb-2">
          <Eyebrow text="PLANIFICACIÓN SEMANAL" />
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: COLORS.textSecondary, fontWeight: '700', fontSize: 13 }}>
              CERRAR
            </Text>
          </TouchableOpacity>
        </View>

        <Header
          title="Calendario de Entrenamientos"
          subtitle="Distribución semanal de días de carga y descanso"
        />

        {/* Tira Semanal de Días */}
        <Card variant="white" className="mb-4">
          <View className="flex-row justify-between">
            {diasMapeados.map((item, idx) => {
              const seleccionado = diaSeleccionado === idx;
              return (
                <TouchableOpacity
                  key={item.dia}
                  onPress={() => setDiaSeleccionado(idx)}
                  style={{
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 8,
                    borderRadius: 14,
                    backgroundColor: seleccionado
                      ? COLORS.primary
                      : item.hoy
                      ? COLORS.primaryLight
                      : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      color: seleccionado
                        ? '#FFFFFF'
                        : item.hoy
                        ? COLORS.primary
                        : COLORS.textSecondary,
                      fontSize: 10,
                      fontWeight: '800',
                    }}
                  >
                    {item.dia}
                  </Text>
                  <Text
                    style={{
                      color: seleccionado
                        ? '#FFFFFF'
                        : item.hoy
                        ? COLORS.primary
                        : COLORS.text,
                      fontSize: 16,
                      fontWeight: '800',
                      marginTop: 2,
                    }}
                  >
                    {item.fecha}
                  </Text>

                  {/* Punto indicador */}
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      marginTop: 4,
                      backgroundColor: item.completado
                        ? COLORS.secondary
                        : item.descanso
                        ? COLORS.textMuted
                        : COLORS.primary,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        {/* Detalle del Día Seleccionado */}
        <Card variant="white">
          <View className="flex-row justify-between items-center mb-3">
            <Text
              style={{ color: COLORS.primary, fontSize: 12, fontWeight: '800' }}
              className="uppercase tracking-wider"
            >
              {infoDia.dia}, {infoDia.fecha} DE SEPTIEMBRE
            </Text>

            <View
              style={{
                backgroundColor: infoDia.completado
                  ? COLORS.secondaryLight
                  : infoDia.descanso
                  ? COLORS.cardMuted
                  : COLORS.primaryLight,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: infoDia.completado
                    ? COLORS.secondary
                    : infoDia.descanso
                    ? COLORS.textSecondary
                    : COLORS.primary,
                  fontWeight: '800',
                  fontSize: 11,
                }}
              >
                {infoDia.completado
                  ? 'COMPLETADO ✓'
                  : infoDia.descanso
                  ? 'DESCANSO 🛌'
                  : 'PROGRAMADO ⏱'}
              </Text>
            </View>
          </View>

          <Text style={{ color: COLORS.text, fontSize: 20, fontWeight: '800' }}>
            {infoDia.rutina || 'Día de Recuperación y Descanso'}
          </Text>

          <Text style={{ color: COLORS.textSecondary, fontSize: 13 }} className="mt-2 mb-4">
            {infoDia.descanso
              ? 'El descanso muscular es fundamental para la síntesis proteica y la regeneración del sistema nervioso central.'
              : 'Sesión planificada según tu objetivo de hipertrofia. Recuerda calentar articulaciones antes de iniciar.'}
          </Text>

          {!infoDia.descanso && !infoDia.completado ? (
            <Button
              title="INICIAR ESTE ENTRENAMIENTO"
              onPress={() => router.push('/modals/exercise-log')}
              variant="primary"
            />
          ) : null}
        </Card>

        {/* ============================================================== */}
        {/* TODOs PARA EL EQUIPO (Módulo Calendario):                      */}
        {/* 1. TODO: Conectar con react-native-calendars para vista mensual */}
        {/* 2. TODO: Sincronizar sesiones con calendario nativo del teléfono */}
        {/* 3. TODO: Marcar rachas consecutivas (streaks de consistencia). */}
        {/* ============================================================== */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;
