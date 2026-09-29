/**
 * Modelos de Datos en TypeScript para FitPulse
 * Entidades principales y auxiliares para uso individual.
 */

// ==========================================
// 1. USUARIO Y PERFIL
// ==========================================

export type SexoUsuario = 'masculino' | 'femenino' | 'otro';

export type ObjetivoFitness =
  | 'bajar_peso'
  | 'ganar_musculo'
  | 'mejorar_resistencia';

export type NivelActividad =
  | 'sedentario'
  | 'ligero'
  | 'moderado'
  | 'muy_activo'
  | 'atleta';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  edad: number;
  sexo: SexoUsuario;
  alturaCm: number;
  pesoKg: number;
  objetivo: ObjetivoFitness;
  nivelActividad: NivelActividad;
  fotoPerfilUrl?: string;
  fechaRegistro: string; // ISO 8601
}

// ==========================================
// 2. EJERCICIO Y SERIES
// ==========================================

export type GrupoMuscular =
  | 'pecho'
  | 'espalda'
  | 'piernas'
  | 'hombros'
  | 'brazos'
  | 'core'
  | 'cardio';

export type EquipoEjercicio =
  | 'mancuernas'
  | 'barra'
  | 'maquina'
  | 'polea'
  | 'peso_corporal'
  | 'kettlebell'
  | 'ninguno';

export interface Ejercicio {
  id: string;
  nombre: string;
  grupoMuscular: GrupoMuscular;
  descripcion: string;
  equipoNecesario: EquipoEjercicio;
  instrucciones?: string[];
  imagenUrl?: string;
}

export interface SerieEntrenamiento {
  id: string;
  numeroSerie: number;
  repeticionesObjetivo: number;
  repeticionesRealizadas?: number;
  pesoKg: number;
  completada: boolean;
  rir?: number; // Reps In Reserve (0-4)
  descansoSegundos?: number;
}

export interface EjercicioEnEntrenamiento {
  ejercicio: Ejercicio;
  series: SerieEntrenamiento[];
  notas?: string;
}

// ==========================================
// 3. ENTRENAMIENTO Y RUTINAS
// ==========================================

export type NivelDificultad = 'principiante' | 'intermedio' | 'avanzado';

export interface Entrenamiento {
  id: string;
  titulo: string;
  descripcion: string;
  nivel: NivelDificultad;
  objetivo: ObjetivoFitness;
  duracionEstimadaMin: number;
  diasSugeridosSemana: number[]; // 0 = Domingo, 1 = Lunes, etc.
  ejercicios: EjercicioEnEntrenamiento[];
  creadoEn: string;
  activo: boolean;
}

// ==========================================
// 4. HISTORIAL Y SESIÓN EN VIVO
// ==========================================

export interface SesionEntrenamientoHistorial {
  id: string;
  entrenamientoId: string;
  tituloEntrenamiento: string;
  fechaInicio: string; // ISO 8601
  fechaFin: string;    // ISO 8601
  duracionMin: number;
  caloriasQuemadasEstimadas?: number;
  volumenTotalKg: number;
  ejerciciosRealizados: {
    ejercicioId: string;
    nombreEjercicio: string;
    series: {
      serie: number;
      pesoKg: number;
      repeticiones: number;
      alFallo: boolean;
    }[];
  }[];
  comentarios?: string;
}

// ==========================================
// 5. NUTRICIÓN Y CALORÍAS
// ==========================================

export type MomentoComida = 'desayuno' | 'almuerzo' | 'cena' | 'snack';

export interface RegistroComida {
  id: string;
  fecha: string; // YYYY-MM-DD
  hora: string;  // HH:mm
  momento: MomentoComida;
  nombreAlimento: string;
  porciones: number;
  calorias: number;
  proteinasG: number;
  carbohidratosG: number;
  grasasG: number;
}

export interface ResumenNutricionalDiario {
  fecha: string; // YYYY-MM-DD
  metaCalorias: number;
  caloriasConsumidas: number;
  metaProteinasG: number;
  proteinasConsumidasG: number;
  metaCarbosG: number;
  carbosConsumidosG: number;
  metaGrasasG: number;
  grasasConsumidasG: number;
}

// ==========================================
// 6. CONTADOR DE AGUA
// ==========================================

export interface RegistroAgua {
  id: string;
  fecha: string; // YYYY-MM-DD
  cantidadMl: number;
  metaMl: number;
  historialTomas: {
    hora: string;
    mililitros: number;
  }[];
}

// ==========================================
// 7. SEGUIMIENTO DE PROGRESO Y MEDIDAS
// ==========================================

export interface MedidasCorporales {
  pechoCm?: number;
  cinturaCm?: number;
  caderaCm?: number;
  brazoIzquierdoCm?: number;
  brazoDerechoCm?: number;
  musloIzquierdoCm?: number;
  musloDerechoCm?: number;
}

export interface RegistroProgreso {
  id: string;
  fecha: string; // YYYY-MM-DD
  pesoKg: number;
  porcentajeGrasaEstimado?: number;
  medidas?: MedidasCorporales;
  notas?: string;
  fotoUrl?: string;
}

// ==========================================
// 8. METAS Y LOGROS
// ==========================================

export type CategoriaMeta =
  | 'peso'
  | 'entrenamiento'
  | 'nutricion'
  | 'habito';

export interface Meta {
  id: string;
  titulo: string;
  categoria: CategoriaMeta;
  valorInicial: number;
  valorObjetivo: number;
  valorActual: number;
  unidad: string; // 'kg', 'días', 'kcal', 'litros', etc.
  fechaLimite?: string;
  completada: boolean;
  creadaEn: string;
}

export interface Logro {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string; // Nombre del icono de Ionicons / MaterialCommunityIcons
  categoria: CategoriaMeta;
  puntos: number;
  desbloqueado: boolean;
  fechaDesbloqueo?: string;
}

// ==========================================
// 9. RECORDATORIOS Y CALENDARIO
// ==========================================

export type TipoRecordatorio = 'agua' | 'comida' | 'entrenamiento' | 'descanso';

export interface Recordatorio {
  id: string;
  tipo: TipoRecordatorio;
  titulo: string;
  mensaje: string;
  hora: string; // HH:mm
  diasSemana: number[]; // 0 = Domingo a 6 = Sábado
  activo: boolean;
}

export interface EventoCalendario {
  id: string;
  fecha: string; // YYYY-MM-DD
  tipo: 'entrenamiento_planificado' | 'entrenamiento_completado' | 'dia_descanso';
  titulo: string;
  completado: boolean;
  referenciaId?: string; // id de entrenamiento o sesión
}

// ==========================================
// 10. CALCULADORA IMC
// ==========================================

export type CategoriaIMC =
  | 'bajo_peso'
  | 'normal'
  | 'sobrepeso'
  | 'obesidad_1'
  | 'obesidad_2'
  | 'obesidad_3';

export interface ResultadoIMC {
  imc: number;
  categoria: CategoriaIMC;
  etiqueta: string;
  color: string;
  rangoMinNormal: number;
  rangoMaxNormal: number;
  pesoMinSaludableKg: number;
  pesoMaxSaludableKg: number;
  diferenciaPesoKg: number;
  recomendacion: string;
}
