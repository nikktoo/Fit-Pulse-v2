import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Header, Card, Button, ProgressBar, StatBadge } from '../../components';
import { COLORS } from '../../constants/theme';
import { useNutritionStore } from '../../store/useNutritionStore';
import { MomentoComida } from '../../types';
import { formatearCalorias } from '../../utils/formatters';

/**
 * Pantalla: Contador de Calorías y Registro de Alimentos
 * Módulo 4: Permite registrar alimentos diarios y controlar calorías y macronutrientes.
 */
export const CaloriesScreen: React.FC = () => {
  const {
    registrosComida,
    metaCalorias,
    metaProteinasG,
    metaCarbosG,
    metaGrasasG,
    agregarComida,
    eliminarComida,
    obtenerTotalesHoy,
  } = useNutritionStore();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [alimento, setAlimento] = useState('');
  const [calorias, setCalorias] = useState('');
  const [proteinas, setProteinas] = useState('');
  const [carbos, setCarbos] = useState('');
  const [grasas, setGrasas] = useState('');
  const [momento, setMomento] = useState<MomentoComida>('almuerzo');

  const totales = obtenerTotalesHoy();
  const progresoCalorico = metaCalorias > 0 ? totales.caloriasTotales / metaCalorias : 0;
  const caloriasRestantes = Math.max(0, metaCalorias - totales.caloriasTotales);

  const handleAgregarAlimento = () => {
    if (!alimento.trim() || !calorias) {
      Alert.alert('Datos requeridos', 'Por favor ingresa al menos el nombre y las calorías del alimento.');
      return;
    }

    agregarComida({
      hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      momento,
      nombreAlimento: alimento.trim(),
      porciones: 1,
      calorias: parseInt(calorias, 10) || 0,
      proteinasG: parseFloat(proteinas) || 0,
      carbohidratosG: parseFloat(carbos) || 0,
      grasasG: parseFloat(grasas) || 0,
    });

    setAlimento('');
    setCalorias('');
    setProteinas('');
    setCarbos('');
    setGrasas('');
    setMostrarFormulario(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <Header
          eyebrow="NUTRICIÓN DIARIA"
          title="Contador de Calorías"
          subtitle="Monitorea tus calorías y balance de macronutrientes de hoy"
        />

        {/* Resumen Principal de Calorías */}
        <Card variant="white">
          <View className="flex-row justify-between items-center mb-3">
            <View>
              <Text
                style={{ color: COLORS.textSecondary, fontSize: 12, fontWeight: '700' }}
                className="uppercase tracking-wider"
              >
                Consumidas
              </Text>
              <Text
                style={{ color: COLORS.text, fontSize: 28, fontWeight: '900' }}
              >
                {formatearCalorias(totales.caloriasTotales)}
              </Text>
            </View>

            <View className="items-end">
              <Text
                style={{ color: COLORS.textSecondary, fontSize: 12, fontWeight: '700' }}
                className="uppercase tracking-wider"
              >
                Restantes
              </Text>
              <Text
                style={{ color: COLORS.primary, fontSize: 28, fontWeight: '900' }}
              >
                {caloriasRestantes}
              </Text>
            </View>
          </View>

          <ProgressBar
            progress={progresoCalorico}
            color={COLORS.primary}
            height={10}
            showLabel
            label={`Meta diaria: ${metaCalorias} kcal`}
          />

          {/* Balance de Macronutrientes */}
          <View className="flex-row justify-between mt-5 pt-4 border-t border-cream-border">
            <StatBadge
              label="PROTEÍNA"
              value={`${totales.proteinasTotales}/${metaProteinasG}`}
              unit="g"
              color={COLORS.primary}
            />
            <StatBadge
              label="CARBOS"
              value={`${totales.carbosTotales}/${metaCarbosG}`}
              unit="g"
              color={COLORS.warning}
              backgroundColor={COLORS.warningLight}
            />
            <StatBadge
              label="GRASAS"
              value={`${totales.grasasTotales}/${metaGrasasG}`}
              unit="g"
              color={COLORS.secondary}
              backgroundColor={COLORS.secondaryLight}
            />
          </View>
        </Card>

        {/* Botón para Añadir Alimento */}
        {!mostrarFormulario ? (
          <Button
            title="+ REGISTRAR ALIMENTO"
            onPress={() => setMostrarFormulario(true)}
            variant="primary"
          />
        ) : (
          <Card variant="cream" className="mb-4">
            <Text
              style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}
              className="mb-3"
            >
              Nuevo Alimento
            </Text>

            <TextInput
              placeholder="Ej. Pechuga de pollo con arroz (g)"
              placeholderTextColor={COLORS.textMuted}
              value={alimento}
              onChangeText={setAlimento}
              style={{
                backgroundColor: COLORS.card,
                borderRadius: 12,
                padding: 12,
                marginBottom: 10,
                color: COLORS.text,
              }}
            />

            <View className="flex-row gap-2 mb-3">
              <TextInput
                placeholder="kcal"
                placeholderTextColor={COLORS.textMuted}
                value={calorias}
                onChangeText={setCalorias}
                keyboardType="numeric"
                style={{
                  flex: 1,
                  backgroundColor: COLORS.card,
                  borderRadius: 12,
                  padding: 12,
                  color: COLORS.text,
                }}
              />
              <TextInput
                placeholder="Prot (g)"
                placeholderTextColor={COLORS.textMuted}
                value={proteinas}
                onChangeText={setProteinas}
                keyboardType="numeric"
                style={{
                  flex: 1,
                  backgroundColor: COLORS.card,
                  borderRadius: 12,
                  padding: 12,
                  color: COLORS.text,
                }}
              />
              <TextInput
                placeholder="Carb (g)"
                placeholderTextColor={COLORS.textMuted}
                value={carbos}
                onChangeText={setCarbos}
                keyboardType="numeric"
                style={{
                  flex: 1,
                  backgroundColor: COLORS.card,
                  borderRadius: 12,
                  padding: 12,
                  color: COLORS.text,
                }}
              />
              <TextInput
                placeholder="Grasa (g)"
                placeholderTextColor={COLORS.textMuted}
                value={grasas}
                onChangeText={setGrasas}
                keyboardType="numeric"
                style={{
                  flex: 1,
                  backgroundColor: COLORS.card,
                  borderRadius: 12,
                  padding: 12,
                  color: COLORS.text,
                }}
              />
            </View>

            <View className="flex-row gap-2">
              <Button
                title="GUARDAR"
                onPress={handleAgregarAlimento}
                variant="primary"
                style={{ flex: 1 }}
              />
              <Button
                title="CANCELAR"
                onPress={() => setMostrarFormulario(false)}
                variant="ghost"
                style={{ flex: 1 }}
              />
            </View>
          </Card>
        )}

        {/* Lista de Registros de Hoy */}
        <View className="mt-4">
          <Text
            style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}
            className="mb-3 uppercase tracking-wider"
          >
            Alimentos Registrados Hoy
          </Text>

          {registrosComida.map((item) => (
            <Card key={item.id} variant="white" className="mb-2">
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-2">
                  <View className="flex-row items-center gap-2 mb-1">
                    <Text
                      style={{ color: COLORS.primary, fontSize: 11, fontWeight: '800' }}
                      className="uppercase tracking-wider"
                    >
                      {item.momento} • {item.hora}
                    </Text>
                  </View>
                  <Text
                    style={{ color: COLORS.text, fontSize: 15, fontWeight: '700' }}
                  >
                    {item.nombreAlimento}
                  </Text>
                  <Text
                    style={{ color: COLORS.textSecondary, fontSize: 12 }}
                    className="mt-1"
                  >
                    P: {item.proteinasG}g | C: {item.carbohidratosG}g | G: {item.grasasG}g
                  </Text>
                </View>

                <View className="items-end">
                  <Text
                    style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}
                  >
                    {item.calorias} kcal
                  </Text>
                  <TouchableOpacity
                    onPress={() => eliminarComida(item.id)}
                    className="mt-1"
                  >
                    <Text style={{ color: COLORS.danger, fontSize: 11, fontWeight: '600' }}>
                      Eliminar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* ============================================================== */}
        {/* TODOs PARA EL EQUIPO (Módulo Contador de Calorías):            */}
        {/* 1. TODO: Integrar escáner de código de barras (OpenFoodFacts API) */}
        {/* 2. TODO: Guardar biblioteca de alimentos frecuentes/favoritos. */}
        {/* 3. TODO: Exportar reporte nutricional semanal en PDF o CSV.    */}
        {/* ============================================================== */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CaloriesScreen;
