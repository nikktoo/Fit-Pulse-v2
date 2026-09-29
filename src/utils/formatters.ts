/**
 * Utilidades de formateo para fechas, números y unidades de FitPulse
 */

export function formatearFechaCorta(fechaStr: string): string {
  try {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });
  } catch {
    return fechaStr;
  }
}

export function formatearFechaLarga(fechaStr: string): string {
  try {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  } catch {
    return fechaStr;
  }
}

export function formatearCalorias(kcal: number): string {
  return `${kcal.toLocaleString('es-ES')} kcal`;
}

export function formatearMililitros(ml: number): string {
  if (ml >= 1000) {
    const litros = (ml / 1000).toFixed(1);
    return `${litros} L`;
  }
  return `${ml} ml`;
}

export function formatearPeso(kg: number): string {
  return `${kg.toFixed(1)} kg`;
}

export function formatearDuracionMinutos(minutos: number): string {
  if (minutos < 60) {
    return `${minutos} min`;
  }
  const horas = Math.floor(minutos / 60);
  const minsRestantes = minutos % 60;
  return minsRestantes > 0 ? `${horas}h ${minsRestantes}m` : `${horas}h`;
}
