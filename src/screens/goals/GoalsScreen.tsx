import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Header, Card, Button, ProgressBar, Eyebrow, StatBadge } from '../../components';
import { COLORS } from '../../constants/theme';
import { useGoalsStore } from '../../store/useGoalsStore';

/**
 * Pantalla / Modal: Metas Personales y Logros Desbloqueables
 * Módulo 10: Gamificación y motivación a través de hitos alcanzados.
 */
export const GoalsScreen: React.FC = () => {
  const router = useRouter();
  const { metas, logros, alternarMetaCompletada, desbloquearLogro } = useGoalsStore();
  const [tabSeleccionado, setTabSeleccionado] = useState<'metas' | 'logros'>('metas');

  const puntosTotales = logros
    .filter((l) => l.desbloqueado)
    .reduce((sum, l) => sum + l.puntos, 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <View className="flex-row justify-between items-center mb-2">
          <Eyebrow text="MOTIVACIÓN & RECOMPENSAS" />
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: COLORS.textSecondary, fontWeight: '700', fontSize: 13 }}>
              CERRAR
            </Text>
          </TouchableOpacity>
        </View>

        <Header
          title="Metas y Logros"
          subtitle="Monitorea tus retos personales y desbloquea insignias de superación"
          rightAction={
            <StatBadge
              label="PUNTOS"
              value={puntosTotales}
              color={COLORS.warning}
              backgroundColor={COLORS.warningLight}
            />
          }
        />

        {/* Selector de pestaña Metas vs Logros */}
        <View className="flex-row gap-2 mb-4">
          <TouchableOpacity
            onPress={() => setTabSeleccionado('metas')}
            style={{
              flex: 1,
              paddingVertical: 12,
              borderRadius: 16,
              alignItems: 'center',
              backgroundColor: tabSeleccionado === 'metas' ? COLORS.primary : COLORS.card,
              borderWidth: 1,
              borderColor: tabSeleccionado === 'metas' ? COLORS.primary : COLORS.border,
            }}
          >
            <Text
              style={{
                color: tabSeleccionado === 'metas' ? '#FFFFFF' : COLORS.text,
                fontWeight: '800',
                fontSize: 13,
                textTransform: 'uppercase',
              }}
            >
              Metas Personales ({metas.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTabSeleccionado('logros')}
            style={{
              flex: 1,
              paddingVertical: 12,
              borderRadius: 16,
              alignItems: 'center',
              backgroundColor: tabSeleccionado === 'logros' ? COLORS.primary : COLORS.card,
              borderWidth: 1,
              borderColor: tabSeleccionado === 'logros' ? COLORS.primary : COLORS.border,
            }}
          >
            <Text
              style={{
                color: tabSeleccionado === 'logros' ? '#FFFFFF' : COLORS.text,
                fontWeight: '800',
                fontSize: 13,
                textTransform: 'uppercase',
              }}
            >
              Logros ({logros.filter((l) => l.desbloqueado).length}/{logros.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sección: Metas */}
        {tabSeleccionado === 'metas' ? (
          <View>
            {metas.map((meta) => {
              const progreso = meta.valorObjetivo > 0 ? meta.valorActual / meta.valorObjetivo : 0;
              return (
                <Card key={meta.id} variant="white">
                  <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1 pr-2">
                      <Text
                        style={{ color: COLORS.primary, fontSize: 11, fontWeight: '800' }}
                        className="uppercase"
                      >
                        {meta.categoria}
                      </Text>
                      <Text
                        style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}
                        className="mt-0.5"
                      >
                        {meta.titulo}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => alternarMetaCompletada(meta.id)}
                      style={{
                        paddingVertical: 4,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        backgroundColor: meta.completada ? COLORS.secondaryLight : COLORS.cardMuted,
                      }}
                    >
                      <Text
                        style={{
                          color: meta.completada ? COLORS.secondary : COLORS.textSecondary,
                          fontWeight: '800',
                          fontSize: 11,
                        }}
                      >
                        {meta.completada ? 'COMPLETADA ✓' : 'EN CURSO'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <ProgressBar
                    progress={progreso}
                    color={meta.completada ? COLORS.secondary : COLORS.primary}
                    height={8}
                    showLabel
                    label={`Progreso: ${meta.valorActual} / ${meta.valorObjetivo} ${meta.unidad}`}
                  />
                </Card>
              );
            })}

            <Button
              title="+ CREAR NUEVA META"
              onPress={() => Alert.alert('Nueva Meta', 'Formulario listo para conectar en Fase 3.')}
              variant="outline"
              style={{ marginTop: 8 }}
            />
          </View>
        ) : (
          /* Sección: Logros e Insignias */
          <View>
            {logros.map((logro) => (
              <Card
                key={logro.id}
                variant="white"
                style={{
                  opacity: logro.desbloqueado ? 1 : 0.6,
                  borderColor: logro.desbloqueado ? COLORS.secondary : COLORS.border,
                }}
              >
                <View className="flex-row items-center">
                  <View
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 26,
                      backgroundColor: logro.desbloqueado ? COLORS.secondaryLight : COLORS.cardMuted,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 14,
                    }}
                  >
                    <Text style={{ fontSize: 24 }}>
                      {logro.desbloqueado ? '🏆' : '🔒'}
                    </Text>
                  </View>

                  <View className="flex-1">
                    <View className="flex-row justify-between items-center">
                      <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}>
                        {logro.titulo}
                      </Text>
                      <Text style={{ color: COLORS.warning, fontWeight: '800', fontSize: 12 }}>
                        +{logro.puntos} PTS
                      </Text>
                    </View>
                    <Text style={{ color: COLORS.textSecondary, fontSize: 12 }} className="mt-1">
                      {logro.descripcion}
                    </Text>
                    {logro.desbloqueado ? (
                      <Text style={{ color: COLORS.secondary, fontSize: 11, fontWeight: '700' }} className="mt-1">
                        Desbloqueado el {logro.fechaDesbloqueo}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}

        {/* ============================================================== */}
        {/* TODOs PARA EL EQUIPO (Módulo Metas y Logros):                  */}
        {/* 1. TODO: Animación Confetti al desbloquear un logro nuevo.     */}
        {/* 2. TODO: Evaluar automáticamente metas cumplidas con triggers.  */}
        {/* 3. TODO: Subir de nivel de usuario según puntos acumulados.   */}
        {/* ============================================================== */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GoalsScreen;
