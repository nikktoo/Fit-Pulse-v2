import { Usuario, ObjetivoFitness, NivelActividad } from '../types';

/**
 * Factores de actividad física para fórmula TDEE
 */
const FACTORES_ACTIVIDAD: Record<NivelActividad, number> = {
  sedentario: 1.2,
  ligero: 1.375,
  moderado: 1.55,
  muy_activo: 1.725,
  atleta: 1.9,
};

/**
 * Calcula la Tasa Metabólica Basal (BMR) usando la fórmula Mifflin-St Jeor
 */
export function calcularBMR(
  pesoKg: number,
  alturaCm: number,
  edad: number,
  sexo: Usuario['sexo']
): number {
  if (sexo === 'femenino') {
    return 10 * pesoKg + 6.25 * alturaCm - 5 * edad - 161;
  }
  // Masculino u otro (promedio base masculino)
  return 10 * pesoKg + 6.25 * alturaCm - 5 * edad + 5;
}

/**
 * Calcula las calorías diarias objetivo y la distribución de macronutrientes
 */
export function calcularMetasNutricionales(usuario: Usuario): {
  calorias: number;
  proteinasG: number;
  carbohidratosG: number;
  grasasG: number;
  metaAguaMl: number;
} {
  const bmr = calcularBMR(usuario.pesoKg, usuario.alturaCm, usuario.edad, usuario.sexo);
  const factor = FACTORES_ACTIVIDAD[usuario.nivelActividad] || 1.4;
  const tdee = bmr * factor;

  let caloriasObjetivo = tdee;

  // Ajuste según objetivo
  switch (usuario.objetivo) {
    case 'bajar_peso':
      caloriasObjetivo = tdee - 450; // Déficit calórico moderado
      break;
    case 'ganar_musculo':
      caloriasObjetivo = tdee + 350; // Superávit calórico controlado
      break;
    case 'mejorar_resistencia':
      caloriasObjetivo = tdee;       // Mantenimiento
      break;
  }

  caloriasObjetivo = Math.round(caloriasObjetivo);

  // Proteína: 2g por kg para hipertrofia, 1.8g para pérdida de grasa
  const factorProteina = usuario.objetivo === 'ganar_musculo' ? 2.0 : 1.8;
  const proteinasG = Math.round(usuario.pesoKg * factorProteina);
  const caloriasProteina = proteinasG * 4;

  // Grasas: ~25% del total calórico (9 kcal/g)
  const caloriasGrasas = caloriasObjetivo * 0.25;
  const grasasG = Math.round(caloriasGrasas / 9);

  // Carbohidratos: el resto calórico (4 kcal/g)
  const caloriasCarbos = Math.max(0, caloriasObjetivo - (caloriasProteina + caloriasGrasas));
  const carbohidratosG = Math.round(caloriasCarbos / 4);

  // Meta de agua base: 35 ml por kg de peso corporal
  const metaAguaMl = Math.round(usuario.pesoKg * 35);

  return {
    calorias: caloriasObjetivo,
    proteinasG,
    carbohidratosG,
    grasasG,
    metaAguaMl,
  };
}
