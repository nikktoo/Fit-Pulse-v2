import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Header, Card, Button, Eyebrow } from '../../components';
import { COLORS } from '../../constants/theme';
import { useUserStore } from '../../store/useUserStore';
import { calcularIMC } from '../../utils/bmi';

/**
 * Pantalla / Modal: Calculadora de IMC
 * Módulo 3: Permite ingresar peso y altura y clasifica el rango con el sistema de color saludable #2BB6A3.
 */
export const BmiCalculatorScreen: React.FC = () => {
  const router = useRouter();
  const { usuario, actualizarPeso, actualizarAltura } = useUserStore();

  const [peso, setPeso] = useState(String(usuario.pesoKg));
  const [altura, setAltura] = useState(String(usuario.alturaCm));

  const pesoNum = parseFloat(peso) || 0;
  const alturaNum = parseFloat(altura) || 0;
  const resultado = calcularIMC(pesoNum, alturaNum);

  const handleAplicarAlPerfil = () => {
    if (pesoNum > 0 && alturaNum > 0) {
      actualizarPeso(pesoNum);
      actualizarAltura(alturaNum);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <View className="flex-row justify-between items-center mb-2">
          <Eyebrow text="MÉTRICAS DE SALUD" />
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: COLORS.textSecondary, fontWeight: '700', fontSize: 14 }}>
              CERRAR
            </Text>
          </TouchableOpacity>
        </View>

        <Header
          title="Calculadora de IMC"
          subtitle="Evalúa tu Índice de Masa Corporal y conoce tu rango ideal"
        />

        {/* Inputs de cálculo */}
        <Card variant="white">
          <View className="flex-row gap-4 mb-4">
            <View className="flex-1">
              <Text
                style={{ color: COLORS.textSecondary, fontSize: 12, fontWeight: '700' }}
                className="uppercase tracking-wider mb-1.5"
              >
                Peso Actual (kg)
              </Text>
              <TextInput
                value={peso}
                onChangeText={setPeso}
                keyboardType="numeric"
                style={{
                  backgroundColor: COLORS.cardMuted,
                  borderRadius: 14,
                  padding: 14,
                  fontSize: 18,
                  fontWeight: '700',
                  color: COLORS.text,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                }}
              />
            </View>

            <View className="flex-1">
              <Text
                style={{ color: COLORS.textSecondary, fontSize: 12, fontWeight: '700' }}
                className="uppercase tracking-wider mb-1.5"
              >
                Altura (cm)
              </Text>
              <TextInput
                value={altura}
                onChangeText={setAltura}
                keyboardType="numeric"
                style={{
                  backgroundColor: COLORS.cardMuted,
                  borderRadius: 14,
                  padding: 14,
                  fontSize: 18,
                  fontWeight: '700',
                  color: COLORS.text,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                }}
              />
            </View>
          </View>

          <Button
            title="SINCRONIZAR CON MI PERFIL"
            onPress={handleAplicarAlPerfil}
            variant="outline"
          />
        </Card>

        {/* Resultado Principal del IMC */}
        <Card
          variant="white"
          style={{
            alignItems: 'center',
            borderColor: resultado.color,
            borderWidth: 2,
          }}
        >
          <Text
            style={{ color: COLORS.textSecondary, fontSize: 12, fontWeight: '700' }}
            className="uppercase tracking-wider mb-1"
          >
            Tu Índice de Masa Corporal
          </Text>

          <Text
            style={{ color: resultado.color, fontSize: 52, fontWeight: '900' }}
            className="my-1"
          >
            {resultado.imc}
          </Text>

          {/* Badge de Categoría con Verde Turquesa para Normal */}
          <View
            style={{
              backgroundColor: resultado.categoria === 'normal' ? COLORS.secondaryLight : COLORS.primaryLight,
              borderRadius: 999,
              paddingVertical: 6,
              paddingHorizontal: 18,
              marginBottom: 14,
            }}
          >
            <Text
              style={{
                color: resultado.color,
                fontWeight: '800',
                fontSize: 14,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
              }}
            >
              {resultado.etiqueta}
            </Text>
          </View>

          <Text
            style={{ color: COLORS.text, fontSize: 14, textAlign: 'center', lineHeight: 20 }}
            className="px-2 mb-4"
          >
            {resultado.recomendacion}
          </Text>

          {/* Rango de peso saludable para su altura */}
          <View
            style={{
              backgroundColor: COLORS.cardMuted,
              borderRadius: 16,
              padding: 14,
              width: '100%',
            }}
          >
            <Text style={{ color: COLORS.textSecondary, fontSize: 12, textAlign: 'center' }}>
              Para tu estatura ({alturaNum} cm), el rango de peso saludable estándar es entre{' '}
              <Text style={{ color: COLORS.text, fontWeight: '800' }}>
                {resultado.pesoMinSaludableKg} kg
              </Text>{' '}
              y{' '}
              <Text style={{ color: COLORS.text, fontWeight: '800' }}>
                {resultado.pesoMaxSaludableKg} kg
              </Text>
              .
            </Text>
          </View>
        </Card>

        {/* Tabla Guía OMS */}
        <View className="mt-2">
          <Text
            style={{ color: COLORS.text, fontSize: 14, fontWeight: '800' }}
            className="mb-2 uppercase tracking-wider"
          >
            Escala Referencial OMS
          </Text>
          <Card variant="white">
            <View className="flex-row justify-between py-1.5 border-b border-cream-border">
              <Text style={{ color: COLORS.textSecondary }}>Bajo peso</Text>
              <Text style={{ color: COLORS.warning, fontWeight: '700' }}>&lt; 18.5</Text>
            </View>
            <View className="flex-row justify-between py-1.5 border-b border-cream-border">
              <Text style={{ color: COLORS.text, fontWeight: '700' }}>Normal (Saludable)</Text>
              <Text style={{ color: COLORS.secondary, fontWeight: '800' }}>18.5 – 24.9</Text>
            </View>
            <View className="flex-row justify-between py-1.5 border-b border-cream-border">
              <Text style={{ color: COLORS.textSecondary }}>Sobrepeso</Text>
              <Text style={{ color: COLORS.warning, fontWeight: '700' }}>25.0 – 29.9</Text>
            </View>
            <View className="flex-row justify-between py-1.5">
              <Text style={{ color: COLORS.textSecondary }}>Obesidad</Text>
              <Text style={{ color: COLORS.primary, fontWeight: '700' }}>≥ 30.0</Text>
            </View>
          </Card>
        </View>

        {/* ============================================================== */}
        {/* TODOs PARA EL EQUIPO (Módulo IMC):                             */}
        {/* 1. TODO: Agregar medidor visual tipo velocímetro/gauge svg.   */}
        {/* 2. TODO: Considerar % de masa muscular en atletas avanzados.    */}
        {/* 3. TODO: Historial comparativo de evolución del IMC en tiempo. */}
        {/* ============================================================== */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BmiCalculatorScreen;
