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
import { Header, Card, Button, StatBadge } from '../../components';
import { COLORS } from '../../constants/theme';
import { useUserStore } from '../../store/useUserStore';
import { useAuthStore } from '../../store/useAuthStore';
import { ObjetivoFitness, SexoUsuario } from '../../types';
import { calcularIMC } from '../../utils/bmi';
import { useRouter } from 'expo-router';

/**
 * Pantalla de Perfil de Usuario
 * Permite gestionar datos bioscópicos y el objetivo principal de acondicionamiento.
 */
export const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const { usuario, actualizarPerfil, cambiarObjetivo } = useUserStore();
  const { cerrarSesion } = useAuthStore();

  const [editando, setEditando] = useState(false);
  const [edad, setEdad] = useState(String(usuario.edad));
  const [peso, setPeso] = useState(String(usuario.pesoKg));
  const [altura, setAltura] = useState(String(usuario.alturaCm));

  const imcReport = calcularIMC(usuario.pesoKg, usuario.alturaCm);

  const objetivosDisponibles: { key: ObjetivoFitness; titulo: string; desc: string }[] = [
    {
      key: 'bajar_peso',
      titulo: 'Bajar de Peso',
      desc: 'Déficit calórico y mayor volumen cardiovascular',
    },
    {
      key: 'ganar_musculo',
      titulo: 'Ganar Músculo',
      desc: 'Hipertrofia progresiva y superávit de proteínas',
    },
    {
      key: 'mejorar_resistencia',
      titulo: 'Mejorar Resistencia',
      desc: 'Acondicionamiento físico general y capacidad aeróbica',
    },
  ];

  const handleGuardarDatos = () => {
    const edadNum = parseInt(edad, 10);
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (isNaN(edadNum) || isNaN(pesoNum) || isNaN(alturaNum)) {
      Alert.alert('Datos inválidos', 'Por favor verifica que la edad, peso y altura sean números.');
      return;
    }

    actualizarPerfil({
      edad: edadNum,
      pesoKg: pesoNum,
      alturaCm: alturaNum,
    });
    setEditando(false);
    Alert.alert('Éxito', 'Tus datos biométricos han sido actualizados.');
  };

  const handleCerrarSesion = () => {
    Alert.alert('Cerrar Sesión', '¿Deseas salir a la pantalla de acceso?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar Sesión',
        style: 'destructive',
        onPress: () => {
          cerrarSesion();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <Header
          eyebrow="CUENTA Y DATOS"
          title="Tu Perfil"
          subtitle="Ajusta tus parámetros corporales y objetivos físicos"
        />

        {/* Tarjeta de Resumen de Usuario */}
        <Card variant="white">
          <View className="flex-row items-center mb-4">
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: COLORS.primaryLight,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}
            >
              <Text style={{ color: COLORS.primary, fontSize: 24, fontWeight: '800' }}>
                {usuario.nombre.charAt(0)}
              </Text>
            </View>
            <View className="flex-1">
              <Text style={{ color: COLORS.text, fontSize: 18, fontWeight: '800' }}>
                {usuario.nombre}
              </Text>
              <Text style={{ color: COLORS.textSecondary, fontSize: 13 }}>
                {usuario.email}
              </Text>
              <Text
                style={{ color: COLORS.secondary, fontSize: 12, fontWeight: '700' }}
                className="mt-0.5 uppercase tracking-wider"
              >
                Uso Individual • Nivel {usuario.nivelActividad}
              </Text>
            </View>
          </View>

          {/* Estadísticas biométricas */}
          <View className="flex-row justify-between mb-4">
            <StatBadge label="EDAD" value={usuario.edad} unit="años" />
            <StatBadge label="PESO" value={usuario.pesoKg} unit="kg" />
            <StatBadge label="ALTURA" value={usuario.alturaCm} unit="cm" />
            <StatBadge
              label="IMC"
              value={imcReport.imc}
              color={imcReport.color}
              backgroundColor={COLORS.cardMuted}
            />
          </View>

          {editando ? (
            <View className="pt-2 border-t border-cream-border">
              <View className="flex-row gap-2 mb-3">
                <View className="flex-1">
                  <Text style={{ color: COLORS.textSecondary, fontSize: 11, fontWeight: '700' }}>
                    EDAD
                  </Text>
                  <TextInput
                    value={edad}
                    onChangeText={setEdad}
                    keyboardType="numeric"
                    style={{
                      backgroundColor: COLORS.cardMuted,
                      borderRadius: 12,
                      padding: 10,
                      marginTop: 4,
                      color: COLORS.text,
                    }}
                  />
                </View>
                <View className="flex-1">
                  <Text style={{ color: COLORS.textSecondary, fontSize: 11, fontWeight: '700' }}>
                    PESO (KG)
                  </Text>
                  <TextInput
                    value={peso}
                    onChangeText={setPeso}
                    keyboardType="numeric"
                    style={{
                      backgroundColor: COLORS.cardMuted,
                      borderRadius: 12,
                      padding: 10,
                      marginTop: 4,
                      color: COLORS.text,
                    }}
                  />
                </View>
                <View className="flex-1">
                  <Text style={{ color: COLORS.textSecondary, fontSize: 11, fontWeight: '700' }}>
                    ALTURA (CM)
                  </Text>
                  <TextInput
                    value={altura}
                    onChangeText={setAltura}
                    keyboardType="numeric"
                    style={{
                      backgroundColor: COLORS.cardMuted,
                      borderRadius: 12,
                      padding: 10,
                      marginTop: 4,
                      color: COLORS.text,
                    }}
                  />
                </View>
              </View>
              <View className="flex-row gap-2">
                <Button
                  title="GUARDAR"
                  onPress={handleGuardarDatos}
                  variant="primary"
                  style={{ flex: 1 }}
                />
                <Button
                  title="CANCELAR"
                  onPress={() => setEditando(false)}
                  variant="ghost"
                  style={{ flex: 1 }}
                />
              </View>
            </View>
          ) : (
            <Button
              title="EDITAR MEDIDAS"
              onPress={() => setEditando(true)}
              variant="outline"
            />
          )}
        </Card>

        {/* Selección de Objetivo Fitness */}
        <View className="mt-2 mb-4">
          <Text
            style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}
            className="mb-3 uppercase tracking-wider"
          >
            Objetivo Principal
          </Text>

          {objetivosDisponibles.map((item) => {
            const activo = usuario.objetivo === item.key;
            return (
              <Card
                key={item.key}
                onPress={() => cambiarObjetivo(item.key)}
                style={{
                  borderColor: activo ? COLORS.primary : COLORS.border,
                  borderWidth: activo ? 2 : 1,
                  backgroundColor: activo ? COLORS.primaryLight : COLORS.card,
                }}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 pr-2">
                    <Text
                      style={{
                        color: activo ? COLORS.primary : COLORS.text,
                        fontSize: 16,
                        fontWeight: '800',
                      }}
                    >
                      {item.titulo}
                    </Text>
                    <Text
                      style={{ color: COLORS.textSecondary, fontSize: 13 }}
                      className="mt-0.5"
                    >
                      {item.desc}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      borderWidth: 2,
                      borderColor: activo ? COLORS.primary : COLORS.border,
                      backgroundColor: activo ? COLORS.primary : 'transparent',
                    }}
                  />
                </View>
              </Card>
            );
          })}
        </View>

        {/* Acceso Rápido a Calculadora IMC */}
        <Card
          variant="cream"
          onPress={() => router.push('/modals/bmi')}
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text style={{ color: COLORS.text, fontWeight: '800', fontSize: 15 }}>
                Calculadora & Análisis de IMC
              </Text>
              <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>
                Revisa recomendaciones detalladas de peso saludable
              </Text>
            </View>
            <Text style={{ color: COLORS.primary, fontWeight: '800', fontSize: 18 }}>→</Text>
          </View>
        </Card>

        <View className="mt-4">
          <Button
            title="CERRAR SESIÓN"
            onPress={handleCerrarSesion}
            variant="ghost"
          />
        </View>

        {/* ============================================================== */}
        {/* TODOs PARA EL EQUIPO (Fase 2 - Perfil y Personalización)        */}
        {/* 1. TODO: Permitir subir y recortar foto de perfil con Expo ImagePicker */}
        {/* 2. TODO: Sincronizar recálculo automático de TDEE al cambiar peso */}
        {/* 3. TODO: Agregar selector de frecuencia de entrenamiento semanal */}
        {/* ============================================================== */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
