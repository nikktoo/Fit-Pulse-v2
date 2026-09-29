import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Header, Card, Button, Eyebrow } from '../../components';
import { COLORS } from '../../constants/theme';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { formatearDuracionMinutos } from '../../utils/formatters';

/**
 * Pantalla / Modal: Registro de Ejercicios en Vivo
 * Módulo 6: Permite anotar series, repeticiones, peso y duración de la sesión en tiempo real.
 */
export const ExerciseLogScreen: React.FC = () => {
  const router = useRouter();
  const {
    sesionActiva,
    entrenamientos,
    marcarSerieCompletada,
    finalizarSesion,
    cancelarSesion,
  } = useWorkoutStore();

  const [segundos, setSegundos] = useState(0);
  const [comentarios, setComentarios] = useState('');

  // Temporizador de sesión
  useEffect(() => {
    const timer = setInterval(() => {
      setSegundos((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const entrenamientoActual = entrenamientos.find(
    (e) => e.id === sesionActiva?.entrenamientoId
  ) || entrenamientos[0];

  const formatearTiempoReloj = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleFinalizar = () => {
    Alert.alert('Finalizar Sesión', '¿Deseas guardar este entrenamiento en tu historial?', [
      { text: 'Seguir entrenando', style: 'cancel' },
      {
        text: 'Guardar y Finalizar',
        style: 'default',
        onPress: () => {
          finalizarSesion(comentarios);
          router.back();
        },
      },
    ]);
  };

  const handleCancelar = () => {
    Alert.alert('Cancelar', '¿Deseas salir sin guardar la sesión?', [
      { text: 'Continuar', style: 'cancel' },
      {
        text: 'Descartar',
        style: 'destructive',
        onPress: () => {
          cancelarSesion();
          router.back();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <View className="flex-row justify-between items-center mb-2">
          <Eyebrow text="SESIÓN EN VIVO" />
          <TouchableOpacity onPress={handleCancelar}>
            <Text style={{ color: COLORS.danger, fontWeight: '700', fontSize: 13 }}>
              CANCELAR
            </Text>
          </TouchableOpacity>
        </View>

        <Header
          title={entrenamientoActual.titulo}
          subtitle="Registra cada serie levantada para medir tu sobrecarga progresiva"
          rightAction={
            <View
              style={{
                backgroundColor: COLORS.primaryLight,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: COLORS.primary,
              }}
            >
              <Text style={{ color: COLORS.primary, fontWeight: '900', fontSize: 15 }}>
                ⏱ {formatearTiempoReloj(segundos)}
              </Text>
            </View>
          }
        />

        {/* Lista de Ejercicios y Tabla de Series */}
        {entrenamientoActual.ejercicios.map((item, idx) => (
          <Card key={item.ejercicio.id} variant="white">
            <View className="flex-row justify-between items-center mb-3">
              <Text
                style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}
                className="flex-1 pr-2"
              >
                {idx + 1}. {item.ejercicio.nombre}
              </Text>
              <Text
                style={{ color: COLORS.secondary, fontSize: 12, fontWeight: '700' }}
                className="uppercase"
              >
                {item.ejercicio.grupoMuscular}
              </Text>
            </View>

            {/* Cabecera de la tabla de series */}
            <View className="flex-row py-1.5 border-b border-cream-border mb-2">
              <Text style={{ color: COLORS.textSecondary, width: 45, fontWeight: '700', fontSize: 11 }}>
                SERIE
              </Text>
              <Text style={{ color: COLORS.textSecondary, flex: 1, fontWeight: '700', fontSize: 11, textAlign: 'center' }}>
                PESO (KG)
              </Text>
              <Text style={{ color: COLORS.textSecondary, flex: 1, fontWeight: '700', fontSize: 11, textAlign: 'center' }}>
                REPS
              </Text>
              <Text style={{ color: COLORS.textSecondary, width: 55, fontWeight: '700', fontSize: 11, textAlign: 'right' }}>
                CHECK
              </Text>
            </View>

            {/* Filas de series */}
            {item.series.map((serie) => {
              const completada = !!sesionActiva?.seriesCompletadas[serie.id];
              return (
                <View
                  key={serie.id}
                  style={{
                    backgroundColor: completada ? COLORS.secondaryLight : 'transparent',
                    borderRadius: 10,
                    paddingVertical: 6,
                    paddingHorizontal: 4,
                  }}
                  className="flex-row items-center justify-between mb-1"
                >
                  <Text style={{ color: COLORS.text, width: 45, fontWeight: '700', fontSize: 13 }}>
                    #{serie.numeroSerie}
                  </Text>
                  <Text style={{ color: COLORS.text, flex: 1, fontWeight: '800', fontSize: 14, textAlign: 'center' }}>
                    {serie.pesoKg} kg
                  </Text>
                  <Text style={{ color: COLORS.text, flex: 1, fontWeight: '800', fontSize: 14, textAlign: 'center' }}>
                    {serie.repeticionesObjetivo}
                  </Text>
                  <TouchableOpacity
                    onPress={() => marcarSerieCompletada(serie.id, !completada)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: completada ? COLORS.secondary : COLORS.cardMuted,
                      borderWidth: 1.5,
                      borderColor: completada ? COLORS.secondary : COLORS.border,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ color: completada ? '#FFFFFF' : COLORS.textMuted, fontWeight: '900' }}>
                      ✓
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </Card>
        ))}

        {/* Notas u observaciones de la sesión */}
        <Card variant="white">
          <Text
            style={{ color: COLORS.textSecondary, fontSize: 12, fontWeight: '700' }}
            className="uppercase tracking-wider mb-2"
          >
            Notas de la Sesión
          </Text>
          <TextInput
            placeholder="Sensaciones, peso corporal, récords personales..."
            placeholderTextColor={COLORS.textMuted}
            value={comentarios}
            onChangeText={setComentarios}
            multiline
            numberOfLines={3}
            style={{
              backgroundColor: COLORS.cardMuted,
              borderRadius: 12,
              padding: 12,
              color: COLORS.text,
              textAlignVertical: 'top',
            }}
          />
        </Card>

        <Button
          title="FINALIZAR ENTRENAMIENTO"
          onPress={handleFinalizar}
          variant="secondary"
        />

        {/* ============================================================== */}
        {/* TODOs PARA EL EQUIPO (Módulo Registro de Ejercicios):          */}
        {/* 1. TODO: Temporizador de descanso automático entre series.    */}
        {/* 2. TODO: Botón para agregar/quitar series dinámicamente.      */}
        {/* 3. TODO: Registro de RIR (Repeticiones en Reserva) por serie.  */}
        {/* 4. TODO: Cálculo de 1RM estimado por serie levantada.         */}
        {/* ============================================================== */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExerciseLogScreen;
