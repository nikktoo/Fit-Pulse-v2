import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Header, Card, Button, Eyebrow } from '../../components';
import { COLORS } from '../../constants/theme';
import { useRemindersStore } from '../../store/useRemindersStore';
import { TipoRecordatorio } from '../../types';

/**
 * Pantalla / Modal: Recordatorios y Hábitos
 * Módulo 8: Configuración de alarmas y notificaciones para agua, comidas y entrenamientos.
 */
export const RemindersScreen: React.FC = () => {
  const router = useRouter();
  const { recordatorios, toggleRecordatorio, eliminarRecordatorio } = useRemindersStore();

  const getIconoPorTipo = (tipo: TipoRecordatorio) => {
    switch (tipo) {
      case 'agua':
        return '💧';
      case 'comida':
        return '🥗';
      case 'entrenamiento':
        return '🏋️‍♂️';
      case 'descanso':
        return '😴';
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <View className="flex-row justify-between items-center mb-2">
          <Eyebrow text="HÁBITOS SALUDABLES" />
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: COLORS.textSecondary, fontWeight: '700', fontSize: 13 }}>
              VOLVER
            </Text>
          </TouchableOpacity>
        </View>

        <Header
          title="Tus Recordatorios"
          subtitle="Mantén la constancia diaria con alertas sincronizadas"
        />

        {/* Lista de Recordatorios */}
        {recordatorios.map((rec) => (
          <Card key={rec.id} variant="white" className="mb-3">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center flex-1 pr-2">
                <Text style={{ fontSize: 28, marginRight: 12 }}>
                  {getIconoPorTipo(rec.tipo)}
                </Text>
                <View className="flex-1">
                  <Text style={{ color: COLORS.primary, fontSize: 11, fontWeight: '800' }} className="uppercase">
                    {rec.tipo} • {rec.hora}
                  </Text>
                  <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}>
                    {rec.titulo}
                  </Text>
                  <Text style={{ color: COLORS.textSecondary, fontSize: 12 }} className="mt-0.5">
                    {rec.mensaje}
                  </Text>
                </View>
              </View>

              <Switch
                value={rec.activo}
                onValueChange={() => toggleRecordatorio(rec.id)}
                trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
                thumbColor={rec.activo ? COLORS.primary : '#FFFFFF'}
              />
            </View>
          </Card>
        ))}

        <Button
          title="+ NUEVO RECORDATORIO"
          onPress={() => Alert.alert('Nuevo Recordatorio', 'Funcionalidad lista para conectar con expo-notifications.')}
          variant="primary"
          style={{ marginTop: 8 }}
        />

        {/* ============================================================== */}
        {/* TODOs PARA EL EQUIPO (Módulo Recordatorios):                   */}
        {/* 1. TODO: Conectar con expo-notifications para notificaciones locales */}
        {/* 2. TODO: Solicitar permisos de notificación en iOS y Android.  */}
        {/* 3. TODO: Selector de horas con DateTimePicker nativo.          */}
        {/* ============================================================== */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RemindersScreen;
