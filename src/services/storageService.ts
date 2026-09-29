import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Servicio de persistencia local mediante AsyncStorage
 */
export const StorageService = {
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error leyendo clave ${key} de AsyncStorage:`, error);
      return null;
    }
  },

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error guardando clave ${key} en AsyncStorage:`, error);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error eliminando clave ${key} de AsyncStorage:`, error);
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error limpiando AsyncStorage:', error);
    }
  },
};

export default StorageService;
