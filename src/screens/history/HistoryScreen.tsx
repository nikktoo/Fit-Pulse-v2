import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Header, Card, Button, Eyebrow, StatBadge } from '../../components';
import { COLORS } from '../../constants/theme';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { formatearFechaLarga, formatearDuracionMinutos } from '../../utils/formatters';

/**
 * Pantalla / Modal: Historial de Entrenamientos y Resultados
 * Módulo 12: Bitácora retrospectiva con volumen total, ejercicios y marcas anteriores.
 */
export const HistoryScreen: React.FC = () => {
  const router = useRouter();
  const { historial } = useWorkoutStore();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <View className="flex-row justify-between items-center mb-2">
          <Eyebrow text="SESIONES PASADAS" />
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: COLORS.textSecondary, fontWeight: '700', fontSize: 13 }}>
              CERRAR
            </Text>
          </TouchableOpacity>
        </View>

        <Header
          title="Historial de Sesiones"
          subtitle="Consulta los pesos y resultados obtenidos en tus entrenamientos previos"
        />

        {historial.length === 0 ? (
          <Card variant="white" style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Text style={{ fontSize: 40 }} className="mb-2">
              📋
            </Text>
            <Text style={{ color: COLORS.text, fontWeight: '800', fontSize: 16 }}>
              Aún no tienes sesiones registradas
            </Text>
            <Text style={{ color: COLORS.textSecondary, fontSize: 13, textAlign: 'center', marginTop: 4 }}>
              Completa tu primer entrenamiento para visualizar el registro aquí.
            </Text>
          </Card>
        ) : (
          historial.map((sesion) => (
            <Card key={sesion.id} variant="white" className="mb-4">
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1 pr-2">
                  <Text style={{ color: COLORS.primary, fontSize: 11, fontWeight: '800' }} className="uppercase">
                    {formatearFechaLarga(sesion.fechaInicio)}
                  </Text>
                  <Text style={{ color: COLORS.text, fontSize: 18, fontWeight: '800' }} className="mt-0.5">
                    {sesion.tituloEntrenamiento}
                  </Text>
                </View>

                <StatBadge
                  label="DURACIÓN"
                  value={formatearDuracionMinutos(sesion.duracionMin)}
                  color={COLORS.secondary}
                  backgroundColor={COLORS.secondaryLight}
                />
              </View>

              <View className="flex-row justify-between my-3 py-2 bg-cream-light rounded-xl px-3 border border-cream-border">
                <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>
                  Volumen total: <Text className="font-bold text-dark">{sesion.volumenTotalKg} kg</Text>
                </Text>
                {sesion.caloriasQuemadasEstimadas ? (
                  <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>
                    Calorías: <Text className="font-bold text-primary">{sesion.caloriasQuemadasEstimadas} kcal</Text>
                  </Text>
                ) : null}
              </View>

              {/* Lista de ejercicios registrados */}
              <View className="mt-1">
                {sesion.ejerciciosRealizados.map((ej) => (
                  <View key={ej.ejercicioId} className="mb-2">
                    <Text style={{ color: COLORS.text, fontWeight: '700', fontSize: 13 }}>
                      • {ej.nombreEjercicio}
                    </Text>
                    <Text style={{ color: COLORS.textSecondary, fontSize: 12, paddingLeft: 12 }}>
                      {ej.series.map((s) => `${s.pesoKg}kg x ${s.repeticiones}`).join(' | ')}
                    </Text>
                  </View>
                ))}
              </View>

              {sesion.comentarios ? (
                <View className="mt-2 pt-2 border-t border-cream-border">
                  <Text style={{ color: COLORS.textSecondary, fontSize: 12, fontStyle: 'italic' }}>
                    "{sesion.comentarios}"
                  </Text>
                </View>
              ) : null}
            </Card>
          ))
        )}

        {/* ============================================================== */}
        {/* TODOs PARA EL EQUIPO (Módulo Historial):                       */}
        {/* 1. TODO: Comparativa lado a lado con la sesión de la semana anterior */}
        {/* 2. TODO: Detección automática de nuevos PRs (Personal Records) */}
        {/* 3. TODO: Filtro por ejercicio específico para ver sobrecarga progresiva */}
        {/* ============================================================== */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryScreen;
