import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Button, Eyebrow } from '../../components';
import { COLORS } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';

/**
 * Pantalla de Login Falso (Mock Auth)
 * Permite acceder directamente al flujo individual de FitPulse sin backend externo.
 */
export const LoginScreen: React.FC = () => {
  const router = useRouter();
  const { iniciarSesion } = useAuthStore();
  const [email, setEmail] = useState('alex.fitpulse@ejemplo.com');
  const [password, setPassword] = useState('fitpulse123');
  const [cargando, setCargando] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico.');
      return;
    }

    setCargando(true);
    try {
      await iniciarSesion(email);
      // Redirigir al dashboard principal de tabs
      router.replace('/(tabs)');
    } catch {
      Alert.alert('Error', 'No se pudo iniciar sesión.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <View className="items-center mb-8">
          <Eyebrow text="BIENVENIDO A" />
          <Text
            style={{ color: COLORS.text, fontSize: 36, fontWeight: '900' }}
            className="tracking-tighter text-center"
          >
            Fit<Text style={{ color: COLORS.primary }}>Pulse</Text>
          </Text>
          <Text
            style={{ color: COLORS.textSecondary, fontSize: 14 }}
            className="text-center mt-2"
          >
            Tu compañero todo-en-uno de entrenamiento y bienestar individual.
          </Text>
        </View>

        <Card variant="white">
          <View className="mb-4">
            <Text
              style={{ color: COLORS.textSecondary, fontSize: 12, fontWeight: '700' }}
              className="uppercase tracking-wider mb-2"
            >
              Correo Electrónico
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="ejemplo@correo.com"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                backgroundColor: COLORS.cardMuted,
                borderRadius: 14,
                padding: 14,
                color: COLORS.text,
                borderWidth: 1,
                borderColor: COLORS.border,
              }}
            />
          </View>

          <View className="mb-6">
            <Text
              style={{ color: COLORS.textSecondary, fontSize: 12, fontWeight: '700' }}
              className="uppercase tracking-wider mb-2"
            >
              Contraseña
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={COLORS.textMuted}
              secureTextEntry
              style={{
                backgroundColor: COLORS.cardMuted,
                borderRadius: 14,
                padding: 14,
                color: COLORS.text,
                borderWidth: 1,
                borderColor: COLORS.border,
              }}
            />
          </View>

          <Button
            title="ENTRAR AHORA"
            onPress={handleLogin}
            loading={cargando}
            variant="primary"
          />

          <View className="mt-4 p-3 rounded-2xl bg-amber-50 border border-amber-200">
            <Text style={{ color: '#92400E', fontSize: 12 }} className="text-center">
              ℹ️ Modo Simulado: Puedes ingresar con cualquier dato o usar los valores predeterminados.
            </Text>
          </View>
        </Card>

        {/* ============================================================== */}
        {/* TODOs PARA EL EQUIPO DE DESARROLLO (Fase 4 - Auth Real)        */}
        {/* 1. TODO: Reemplazar el mock por Firebase Auth / Supabase Auth. */}
        {/* 2. TODO: Implementar validación de correo con Zod o Yup.       */}
        {/* 3. TODO: Agregar flujo de 'Recuperar contraseña' y registro.   */}
        {/* 4. TODO: Guardar tokens seguros con Expo SecureStore.          */}
        {/* ============================================================== */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
