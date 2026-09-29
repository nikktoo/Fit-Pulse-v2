import { ResultadoIMC } from '../types';
import { COLORS } from '../constants/theme';

/**
 * Calcula el Índice de Masa Corporal (IMC) y entrega un reporte detallado
 * @param pesoKg Peso del usuario en kilogramos
 * @param alturaCm Altura del usuario en centímetros
 */
export function calcularIMC(pesoKg: number, alturaCm: number): ResultadoIMC {
  if (alturaCm <= 0 || pesoKg <= 0) {
    return {
      imc: 0,
      categoria: 'normal',
      etiqueta: 'No disponible',
      color: COLORS.textSecondary,
      rangoMinNormal: 18.5,
      rangoMaxNormal: 24.9,
      pesoMinSaludableKg: 0,
      pesoMaxSaludableKg: 0,
      diferenciaPesoKg: 0,
      recomendacion: 'Por favor ingresa valores válidos de peso y altura.',
    };
  }

  const alturaMetros = alturaCm / 100;
  const imcRaw = pesoKg / (alturaMetros * alturaMetros);
  const imc = Math.round(imcRaw * 10) / 10;

  const pesoMinSaludableKg = Math.round(18.5 * alturaMetros * alturaMetros * 10) / 10;
  const pesoMaxSaludableKg = Math.round(24.9 * alturaMetros * alturaMetros * 10) / 10;

  let categoria: ResultadoIMC['categoria'] = 'normal';
  let etiqueta = 'Normal';
  let color: string = COLORS.secondary; // Verde turquesa para normal
  let recomendacion = '¡Excelente! Te encuentras en un rango de peso saludable.';
  let diferenciaPesoKg = 0;

  if (imc < 18.5) {
    categoria = 'bajo_peso';
    etiqueta = 'Bajo peso';
    color = COLORS.warning;
    diferenciaPesoKg = Math.round((pesoMinSaludableKg - pesoKg) * 10) / 10;
    recomendacion = `Estás por debajo del rango saludable. Te sugerimos subir aproximadamente ${diferenciaPesoKg} kg con un superávit controlado.`;
  } else if (imc >= 18.5 && imc <= 24.9) {
    categoria = 'normal';
    etiqueta = 'Saludable';
    color = COLORS.secondary;
    diferenciaPesoKg = 0;
    recomendacion = 'Tu peso corporal está en equilibrio ideal. Mantén tus hábitos de entrenamiento y nutrición.';
  } else if (imc >= 25 && imc <= 29.9) {
    categoria = 'sobrepeso';
    etiqueta = 'Sobrepeso';
    color = COLORS.warning;
    diferenciaPesoKg = Math.round((pesoKg - pesoMaxSaludableKg) * 10) / 10;
    recomendacion = `Te encuentras levemente por encima del rango. Una reducción gradual de ${diferenciaPesoKg} kg mejorará tu salud cardiovascular.`;
  } else if (imc >= 30 && imc <= 34.9) {
    categoria = 'obesidad_1';
    etiqueta = 'Obesidad Grado I';
    color = COLORS.primary;
    diferenciaPesoKg = Math.round((pesoKg - pesoMaxSaludableKg) * 10) / 10;
    recomendacion = `Se recomienda consultar con un profesional para iniciar un plan de pérdida de grasa sostenible de ${diferenciaPesoKg} kg.`;
  } else if (imc >= 35 && imc <= 39.9) {
    categoria = 'obesidad_2';
    etiqueta = 'Obesidad Grado II';
    color = COLORS.danger;
    diferenciaPesoKg = Math.round((pesoKg - pesoMaxSaludableKg) * 10) / 10;
    recomendacion = 'Riesgo elevado. Prioriza actividad aeróbica moderada y orientación médica especializada.';
  } else {
    categoria = 'obesidad_3';
    etiqueta = 'Obesidad Grado III';
    color = COLORS.danger;
    diferenciaPesoKg = Math.round((pesoKg - pesoMaxSaludableKg) * 10) / 10;
    recomendacion = 'Riesgo severo para la salud. Recomendamos acompañamiento médico y nutricional multidisciplinario.';
  }

  return {
    imc,
    categoria,
    etiqueta,
    color,
    rangoMinNormal: 18.5,
    rangoMaxNormal: 24.9,
    pesoMinSaludableKg,
    pesoMaxSaludableKg,
    diferenciaPesoKg,
    recomendacion,
  };
}
