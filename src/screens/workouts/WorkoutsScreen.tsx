import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Header, Card, Button, StatBadge } from '../../components';
import { COLORS } from '../../constants/theme';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { useUserStore } from '../../store/useUserStore';
import { ObjetivoFitness, Entrenamiento } from '../../types';
import { formatearDuracionMinutos } from '../../utils/formatters';

/**
 * Pantalla: Entrenamientos Personalizados
 * Módulo 5: Catálogo de rutinas adaptadas al objetivo individual del usuario.
 */
export const WorkoutsScreen: React.FC = () => {
  const router = useRouter();
  const { entrenamientos, iniciarSesionEntrenamiento } = useWorkoutStore();
  const { usuario } = useUserStore();

  const [filtroObjetivo, setFiltroObjetivo] = useState<ObjetivoFitness | 'todos'>(usuario.objetivo);

  const rutinasFiltradas =
    filtroObjetivo === 'todos'
      ? entrenamientos
      : entrenamientos.filter((e) => e.objetivo === filtroObjetivo);

  const handleIniciarEntrenamiento = (ent: Entrenamiento) => {
    iniciarSesionEntrenamiento(ent);
    router.push('/modals/exercise-log');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <Header
          eyebrow="RUTINAS & FUERZA"
          title="Tus Entrenamientos"
          subtitle={`Personalizado para tu meta: ${usuario.objetivo.replace('_', ' ')}`}
        />

        {/* Filtros por Objetivo */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <View className="flex-row gap-2">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'ganar_musculo', label: 'Hipertrofia' },
              { id: 'bajar_peso', label: 'Quema Grasa' },
              { id: 'mejorar_resistencia', label: 'Resistencia' },
            ].map((f) => {
              const activo = filtroObjetivo === f.id;
              return (
                <TouchableOpacity
                  key={f.id}
                  onPress={() => setFiltroObjetivo(f.id as any)}
                  style={{
                    backgroundColor: activo ? COLORS.primary : COLORS.card,
                    borderColor: activo ? COLORS.primary : COLORS.border,
                    borderWidth: 1,
                    borderRadius: 999,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                  }}
                >
                  <Text
                    style={{
                      color: activo ? COLORS.textOnPrimary : COLORS.textSecondary,
                      fontWeight: '700',
                      fontSize: 13,
                    }}
                  >
                    {f.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Lista de Rutinas */}
        {rutinasFiltradas.map((entrenamiento) => (
          <Card key={entrenamiento.id} variant="white">
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-1 pr-2">
                <Text
                  style={{ color: COLORS.primary, fontSize: 11, fontWeight: '800' }}
                  className="uppercase tracking-wider"
                >
                  Nivel {entrenamiento.nivel} • {entrenamiento.ejercicios.length} EJERCICIOS
                </Text>
                <Text
                  style={{ color: COLORS.text, fontSize: 18, fontWeight: '800' }}
                  className="mt-0.5"
                >
                  {entrenamiento.titulo}
                </Text>
              </View>

              <StatBadge
                label="DURACIÓN"
                value={formatearDuracionMinutos(entrenamiento.duracionEstimadaMin)}
                color={COLORS.secondary}
                backgroundColor={COLORS.secondaryLight}
              />
            </View>

            <Text
              style={{ color: COLORS.textSecondary, fontSize: 13, lineHeight: 18 }}
              className="mb-4"
            >
              {entrenamiento.descripcion}
            </Text>

            {/* Ejercicios Incluidos */}
            <View className="mb-4 bg-cream-light p-3 rounded-2xl border border-cream-border">
              {entrenamiento.ejercicios.map((item, idx) => (
                <Text
                  key={item.ejercicio.id}
                  style={{ color: COLORS.text, fontSize: 13 }}
                  className="py-1"
                >
                  • <Text className="font-bold">{item.ejercicio.nombre}</Text> ({item.series.length} series)
                </Text>
              ))}
            </View>

            <View className="flex-row gap-2">
              <Button
                title="INICIAR SESIÓN EN VIVO"
                onPress={() => handleIniciarEntrenamiento(entrenamiento)}
                variant="primary"
                style={{ flex: 1 }}
              />
            </View>
          </Card>
        ))}

        {/* Acceso a Historial y Calendario */}
        <View className="flex-row gap-2 mt-2">
          <Card
            variant="cream"
            onPress={() => router.push('/modals/calendar')}
            style={{ flex: 1 }}
          >
            <Text style={{ color: COLORS.primary, fontWeight: '800', fontSize: 12 }} className="uppercase">
              PLANIFICADOR
            </Text>
            <Text style={{ color: COLORS.text, fontWeight: '800', fontSize: 15 }} className="mt-1">
              Calendario Semanal
            </Text>
          </Card>

          <Card
            variant="cream"
            onPress={() => router.push('/modals/history')}
            style={{ flex: 1 }}
          >
            <Text style={{ color: COLORS.secondary, fontWeight: '800', fontSize: 12 }} className="uppercase">
              HISTORIAL
            </Text>
            <Text style={{ color: COLORS.text, fontWeight: '800', fontSize: 15 }} className="mt-1">
              Sesiones Previas
            </Text>
          </Card>
        </View>

        {/* ============================================================== */}
        {/* TODOs PARA EL EQUIPO (Módulo Entrenamientos Personalizados):    */}
        {/* 1. TODO: Permitir al usuario crear y editar sus propias rutinas*/}
        {/* 2. TODO: Generador de rutinas dinámicas por IA/algoritmo según días */}
        {/* 3. TODO: Filtrar por equipamiento disponible (casa / gym)      */}
        {/* ============================================================== */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutsScreen;
