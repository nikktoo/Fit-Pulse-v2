import { useNutritionStore } from '../store/useNutritionStore';
import { useUserStore } from '../store/useUserStore';
import { useWorkoutStore } from '../store/useWorkoutStore';
import { calcularIMC } from '../utils/bmi';

/**
 * Custom hook que consolida el resumen del día actual
 */
export function useDaySummary() {
  const { usuario } = useUserStore();
  const {
    metaCalorias,
    aguaMlHoy,
    metaAguaMl,
    obtenerTotalesHoy,
  } = useNutritionStore();
  const { entrenamientos, historial } = useWorkoutStore();

  const totales = obtenerTotalesHoy();
  const imcReport = calcularIMC(usuario.pesoKg, usuario.alturaCm);
  const rutinaRecomendada = entrenamientos[0];

  return {
    usuario,
    totales,
    metaCalorias,
    caloriasRestantes: Math.max(0, metaCalorias - totales.caloriasTotales),
    aguaMlHoy,
    metaAguaMl,
    imcReport,
    rutinaRecomendada,
    sesionesHistorial: historial,
  };
}

export default useDaySummary;
