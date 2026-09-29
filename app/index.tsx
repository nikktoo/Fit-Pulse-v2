import { Redirect } from 'expo-router';
import { useAuthStore } from '../src/store/useAuthStore';

export default function Index() {
  const { isAuthenticated } = useAuthStore();

  // Si está autenticado redirige a los tabs principales, de lo contrario a login
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(tabs)" />;
}
