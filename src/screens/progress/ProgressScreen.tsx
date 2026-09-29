import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Header, Card, Button, StatBadge, Eyebrow } from '../../components';
import { COLORS } from '../../constants/theme';
import { useGoalsStore } from '../../store/useGoalsStore';
import { useUserStore } from '../../store/useUserStore';
import { formatearPeso, formatearFechaCorta } from '../../utils/formatters';

/**
 * Pantalla: Seguimiento de Progreso y Medidas
 * Módulo 7: Permite visualizar la evolución del peso y medidas en el tiempo con gráficos/barras.
 */
export const ProgressScreen: React.FC = () => {
  const { progresoHistorico, registrarProgresoFisico } = useGoalsStore();
  const { usuario, actualizarPeso } = useUserStore();

  const [nuevoPeso, setNuevoPeso] = useState('');
  const [cintura, setCintura] = useState('');
  const [pecho, setPecho] = useState('');
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);

  const pesoMin = Math.min(...progresoHistorico.map((p) => p.pesoKg), 70);
  const pesoMax = Math.max(...progresoHistorico.map((p) => p.pesoKg), 80);
  const rango = pesoMax - pesoMin || 1;

  const handleGuardarProgreso = () => {
    const p = parseFloat(nuevoPeso);
    if (isNaN(p) || p <= 0) {
      Alert.alert('Error', 'Ingresa un peso válido en kg.');
      return;
    }

    registrarProgresoFisico({
      fecha: new Date().toISOString().split('T')[0],
      pesoKg: p,
      medidas: {
        cinturaCm: parseFloat(cintura) || undefined,
        pechoCm: parseFloat(pecho) || undefined,
      },
      notas: 'Registro rápido desde móvil',
    });

    actualizarPeso(p);
    setNuevoPeso('');
    setCintura('');
    setPecho('');
    setMostrarModalRegistro(false);
    Alert.alert('Progreso guardado', 'Tu evolución física se ha registrado con éxito.');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <Header
          eyebrow="EVOLUCIÓN CORPORAL"
          title="Tu Progreso"
          subtitle="Seguimiento histórico de peso corporal y medidas antropométricas"
        />

        {/* Resumen de Peso Actual vs Inicial */}
        <Card variant="white">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text
                style={{ color: COLORS.textSecondary, fontSize: 12, fontWeight: '700' }}
                className="uppercase tracking-wider"
              >
                Peso Actual
              </Text>
              <Text
                style={{ color: COLORS.text, fontSize: 32, fontWeight: '900' }}
              >
                {formatearPeso(usuario.pesoKg)}
              </Text>
            </View>

            <View className="items-end">
              <Text
                style={{ color: COLORS.textSecondary, fontSize: 12, fontWeight: '700' }}
                className="uppercase tracking-wider"
              >
                Cambio Total
              </Text>
              <Text
                style={{ color: COLORS.secondary, fontSize: 22, fontWeight: '900' }}
              >
                +2.3 kg
              </Text>
              <Text style={{ color: COLORS.textSecondary, fontSize: 11 }}>
                Masa muscular magra
              </Text>
            </View>
          </View>

          {/* Gráfico Visual de Barras / Evolución Temporal */}
          <Text
            style={{ color: COLORS.textSecondary, fontSize: 12, fontWeight: '700' }}
            className="uppercase tracking-wider mb-2"
          >
            Historial de Peso (Últimos Meses)
          </Text>

          <View
            style={{
              height: 140,
              backgroundColor: COLORS.cardMuted,
              borderRadius: 16,
              padding: 12,
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
            }}
          >
            {progresoHistorico.map((item, idx) => {
              const alturaPorcentaje = Math.max(
                20,
                Math.round(((item.pesoKg - pesoMin) / rango) * 80 + 20)
              );
              return (
                <View key={item.id} className="items-center">
                  <Text
                    style={{ color: COLORS.text, fontSize: 11, fontWeight: '800' }}
                    className="mb-1"
                  >
                    {item.pesoKg}
                  </Text>
                  <View
                    style={{
                      width: 28,
                      height: alturaPorcentaje,
                      backgroundColor: idx === progresoHistorico.length - 1 ? COLORS.primary : COLORS.secondary,
                      borderRadius: 8,
                    }}
                  />
                  <Text
                    style={{ color: COLORS.textSecondary, fontSize: 10, marginTop: 4 }}
                  >
                    {formatearFechaCorta(item.fecha)}
                  </Text>
                </View>
              );
            })}
          </View>
        </Card>

        {/* Registro Rápido de Nuevo Peso y Medidas */}
        {!mostrarModalRegistro ? (
          <Button
            title="+ REGISTRAR NUEVO PESO O MEDIDA"
            onPress={() => setMostrarModalRegistro(true)}
            variant="primary"
          />
        ) : (
          <Card variant="cream" className="mb-4">
            <Text
              style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}
              className="mb-3"
            >
              Nuevo Registro de Progreso
            </Text>

            <View className="flex-row gap-3 mb-3">
              <View className="flex-1">
                <Text style={{ color: COLORS.textSecondary, fontSize: 11, fontWeight: '700', marginBottom: 4 }}>
                  PESO (KG) *
                </Text>
                <TextInput
                  placeholder="Ej. 76.5"
                  placeholderTextColor={COLORS.textMuted}
                  value={nuevoPeso}
                  onChangeText={setNuevoPeso}
                  keyboardType="numeric"
                  style={{
                    backgroundColor: COLORS.card,
                    borderRadius: 12,
                    padding: 12,
                    color: COLORS.text,
                  }}
                />
              </View>
              <View className="flex-1">
                <Text style={{ color: COLORS.textSecondary, fontSize: 11, fontWeight: '700', marginBottom: 4 }}>
                  CINTURA (CM)
                </Text>
                <TextInput
                  placeholder="Ej. 80"
                  placeholderTextColor={COLORS.textMuted}
                  value={cintura}
                  onChangeText={setCintura}
                  keyboardType="numeric"
                  style={{
                    backgroundColor: COLORS.card,
                    borderRadius: 12,
                    padding: 12,
                    color: COLORS.text,
                  }}
                />
              </View>
              <View className="flex-1">
                <Text style={{ color: COLORS.textSecondary, fontSize: 11, fontWeight: '700', marginBottom: 4 }}>
                  PECHO (CM)
                </Text>
                <TextInput
                  placeholder="Ej. 103"
                  placeholderTextColor={COLORS.textMuted}
                  value={pecho}
                  onChangeText={setPecho}
                  keyboardType="numeric"
                  style={{
                    backgroundColor: COLORS.card,
                    borderRadius: 12,
                    padding: 12,
                    color: COLORS.text,
                  }}
                />
              </View>
            </View>

            <View className="flex-row gap-2">
              <Button
                title="GUARDAR"
                onPress={handleGuardarProgreso}
                variant="primary"
                style={{ flex: 1 }}
              />
              <Button
                title="CANCELAR"
                onPress={() => setMostrarModalRegistro(false)}
                variant="ghost"
                style={{ flex: 1 }}
              />
            </View>
          </Card>
        )}

        {/* Tabla Detallada de Medidas Registradas */}
        <View className="mt-4">
          <Text
            style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}
            className="mb-3 uppercase tracking-wider"
          >
            Historial de Medidas Corporales
          </Text>

          {progresoHistorico.map((item) => (
            <Card key={item.id} variant="white" className="mb-2">
              <View className="flex-row justify-between items-center mb-1">
                <Text style={{ color: COLORS.primary, fontWeight: '800', fontSize: 13 }}>
                  {item.fecha}
                </Text>
                <Text style={{ color: COLORS.text, fontWeight: '900', fontSize: 16 }}>
                  {formatearPeso(item.pesoKg)}
                </Text>
              </View>
              {item.medidas ? (
                <View className="flex-row gap-4 mt-1">
                  {item.medidas.pechoCm ? (
                    <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>
                      Pecho: <Text className="font-bold text-dark">{item.medidas.pechoCm} cm</Text>
                    </Text>
                  ) : null}
                  {item.medidas.cinturaCm ? (
                    <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>
                      Cintura: <Text className="font-bold text-dark">{item.medidas.cinturaCm} cm</Text>
                    </Text>
                  ) : null}
                  {item.medidas.brazoDerechoCm ? (
                    <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>
                      Brazo: <Text className="font-bold text-dark">{item.medidas.brazoDerechoCm} cm</Text>
                    </Text>
                  ) : null}
                </View>
              ) : null}
            </Card>
          ))}
        </View>

        {/* ============================================================== */}
        {/* TODOs PARA EL EQUIPO (Módulo Seguimiento de Progreso):         */}
        {/* 1. TODO: Integrar react-native-svg o Victory Native para líneas continuas */}
        {/* 2. TODO: Galería comparativa de fotos de progreso (Antes / Después) */}
        {/* 3. TODO: Exportar gráfico de progreso a imagen para compartir. */}
        {/* ============================================================== */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProgressScreen;
