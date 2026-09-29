# FitPulse 

> Aplicación de fitness y bienestar individual todo-en-uno desarrollada con **Expo Go (SDK 54), Expo Router, TypeScript, NativeWind v4, Zustand y AsyncStorage**.

---

## 🎨 Sistema de Diseño
- **Fondo:** Crema cálido `#F3EEE4`.
- **Tarjetas:** Blanco puro `#FFFFFF`, esquinas muy redondeadas (`rounded-3xl`), sombra suave.
- **Color Principal:** Naranja coral `#FF6F51` (botones principales, badges, estados activos).
- **Color Secundario:** Verde turquesa `#2BB6A3` (indicadores positivos, estado "Normal" en IMC, barras de progreso).
- **Texto Principal:** Casi negro cálido `#221D16`.
- **Texto Secundario:** Gris cálido `#8B8578`.
- **Eyebrows:** Etiquetas pequeñas en mayúsculas naranja coral antes de cada título.

---

## 📱 Módulos Funcionales Implementados (Uso Individual)
1. **Acceso Simulado (Mock Auth):** Login falso con persistencia local.
2. **Perfil de Usuario:** Edad, sexo, altura, peso y selección de objetivo (*Bajar Peso*, *Ganar Músculo*, *Mejorar Resistencia*).
3. **Calculadora de IMC:** Cálculo según estándares OMS, rango saludable y feedback con color turquesa.
4. **Contador de Calorías:** Registro de alimentos diarios con balance de macronutrientes (Proteínas, Carbos, Grasas).
5. **Entrenamientos Personalizados:** Catálogo de rutinas adaptadas por objetivo con nivel y ejercicios.
6. **Registro de Ejercicios en Vivo:** Anotador de series, repeticiones levantadas, peso y cronómetro de sesión.
7. **Seguimiento de Progreso:** Gráfico histórico de peso corporal y medidas antropométricas.
8. **Recordatorios:** Gestión de alarmas de hidratación, comidas y horas de entrenamiento.
9. **Contador de Agua:** Botones rápidos (+250 ml, +500 ml, +750 ml) y barra de progreso de hidratación diaria.
10. **Metas y Logros:** Gamificación con metas cuantificables e insignias desbloqueables.
11. **Calendario de Entrenamientos:** Planificador semanal de días de entrenamiento y días de descanso.
12. **Historial de Sesiones:** Bitácora retrospectiva con volumen total, ejercicios y marcas anteriores.

---

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor Expo
npx expo start

# 3. Abrir en la web
npm run web

# 4. Chequeo de tipos TypeScript
npm run typecheck
```

---

## 👥 Guía para el Equipo
Consulta [SPEC.md](SPEC.md) para revisar la especificación técnica completa del proyecto.
