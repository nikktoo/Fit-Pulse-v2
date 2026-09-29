import {
  Usuario,
  Entrenamiento,
  Ejercicio,
  RegistroComida,
  Logro,
  Meta,
  Recordatorio,
  SesionEntrenamientoHistorial,
  RegistroProgreso,
} from '../types';

export const USUARIO_INICIAL: Usuario = {
  id: 'usr_001',
  nombre: 'Alex Morales',
  email: 'alex.fitpulse@ejemplo.com',
  edad: 26,
  sexo: 'masculino',
  alturaCm: 178,
  pesoKg: 76.5,
  objetivo: 'ganar_musculo',
  nivelActividad: 'moderado',
  fechaRegistro: '2026-01-15T00:00:00.000Z',
};

export const EJERCICIOS_CATALOGO: Ejercicio[] = [
  {
    id: 'ej_01',
    nombre: 'Press de Banca Plano',
    grupoMuscular: 'pecho',
    descripcion: 'Ejercicio compuesto fundamental para desarrollo del pectoral mayor y tríceps.',
    equipoNecesario: 'barra',
  },
  {
    id: 'ej_02',
    nombre: 'Aperturas con Mancuernas',
    grupoMuscular: 'pecho',
    descripcion: 'Aislamiento de la porción esternal del pectoral.',
    equipoNecesario: 'mancuernas',
  },
  {
    id: 'ej_03',
    nombre: 'Sentadilla Trasera con Barra',
    grupoMuscular: 'piernas',
    descripcion: 'El rey de los ejercicios para tren inferior: cuádriceps, glúteos y core.',
    equipoNecesario: 'barra',
  },
  {
    id: 'ej_04',
    nombre: 'Prensa Inclinada de Piernas',
    grupoMuscular: 'piernas',
    descripcion: 'Enfoque en cuádriceps con menor demanda sobre la columna lumbar.',
    equipoNecesario: 'maquina',
  },
  {
    id: 'ej_05',
    nombre: 'Dominadas Pronas',
    grupoMuscular: 'espalda',
    descripcion: 'Tracción vertical para desarrollo de amplitud en dorsal ancho.',
    equipoNecesario: 'peso_corporal',
  },
  {
    id: 'ej_06',
    nombre: 'Remo con Barra',
    grupoMuscular: 'espalda',
    descripcion: 'Tracción horizontal para densidad de espalda media y romboides.',
    equipoNecesario: 'barra',
  },
  {
    id: 'ej_07',
    nombre: 'Press Militar de Hombro',
    grupoMuscular: 'hombros',
    descripcion: 'Empuje vertical para deltoides anterior y lateral.',
    equipoNecesario: 'mancuernas',
  },
  {
    id: 'ej_08',
    nombre: 'Elevaciones Laterales',
    grupoMuscular: 'hombros',
    descripcion: 'Aislamiento puro para la cabeza lateral del hombro.',
    equipoNecesario: 'mancuernas',
  },
  {
    id: 'ej_09',
    nombre: 'Curl de Bíceps con Barra Z',
    grupoMuscular: 'brazos',
    descripcion: 'Flexión de codo con agarre ergonómico.',
    equipoNecesario: 'barra',
  },
  {
    id: 'ej_10',
    nombre: 'Extensiones de Tríceps en Polea',
    grupoMuscular: 'brazos',
    descripcion: 'Aislamiento de tríceps con tensión continua.',
    equipoNecesario: 'polea',
  },
];

export const ENTRENAMIENTOS_INICIALES: Entrenamiento[] = [
  {
    id: 'ent_01',
    titulo: 'Torso Fuerza & Hipertrofia',
    descripcion: 'Enfoque en empujes y tracciones pesadas para tren superior.',
    nivel: 'intermedio',
    objetivo: 'ganar_musculo',
    duracionEstimadaMin: 60,
    diasSugeridosSemana: [1, 4], // Lunes y Jueves
    activo: true,
    creadoEn: '2026-02-01',
    ejercicios: [
      {
        ejercicio: EJERCICIOS_CATALOGO[0], // Press de Banca
        series: [
          { id: 's1', numeroSerie: 1, repeticionesObjetivo: 8, pesoKg: 70, completada: false, rir: 2, descansoSegundos: 120 },
          { id: 's2', numeroSerie: 2, repeticionesObjetivo: 8, pesoKg: 70, completada: false, rir: 2, descansoSegundos: 120 },
          { id: 's3', numeroSerie: 3, repeticionesObjetivo: 8, pesoKg: 70, completada: false, rir: 1, descansoSegundos: 120 },
        ],
      },
      {
        ejercicio: EJERCICIOS_CATALOGO[5], // Remo con Barra
        series: [
          { id: 's4', numeroSerie: 1, repeticionesObjetivo: 10, pesoKg: 60, completada: false, rir: 2, descansoSegundos: 90 },
          { id: 's5', numeroSerie: 2, repeticionesObjetivo: 10, pesoKg: 60, completada: false, rir: 2, descansoSegundos: 90 },
          { id: 's6', numeroSerie: 3, repeticionesObjetivo: 10, pesoKg: 60, completada: false, rir: 1, descansoSegundos: 90 },
        ],
      },
      {
        ejercicio: EJERCICIOS_CATALOGO[6], // Press Militar
        series: [
          { id: 's7', numeroSerie: 1, repeticionesObjetivo: 10, pesoKg: 18, completada: false, rir: 2, descansoSegundos: 90 },
          { id: 's8', numeroSerie: 2, repeticionesObjetivo: 10, pesoKg: 18, completada: false, rir: 1, descansoSegundos: 90 },
        ],
      },
    ],
  },
  {
    id: 'ent_02',
    titulo: 'Pierna & Core Completo',
    descripcion: 'Desarrollo integral de cuádriceps, femorales y zona media.',
    nivel: 'intermedio',
    objetivo: 'ganar_musculo',
    duracionEstimadaMin: 55,
    diasSugeridosSemana: [2, 5], // Martes y Viernes
    activo: true,
    creadoEn: '2026-02-01',
    ejercicios: [
      {
        ejercicio: EJERCICIOS_CATALOGO[2], // Sentadilla
        series: [
          { id: 's9', numeroSerie: 1, repeticionesObjetivo: 6, pesoKg: 90, completada: false, rir: 2, descansoSegundos: 150 },
          { id: 's10', numeroSerie: 2, repeticionesObjetivo: 6, pesoKg: 90, completada: false, rir: 2, descansoSegundos: 150 },
          { id: 's11', numeroSerie: 3, repeticionesObjetivo: 6, pesoKg: 90, completada: false, rir: 1, descansoSegundos: 150 },
        ],
      },
      {
        ejercicio: EJERCICIOS_CATALOGO[3], // Prensa
        series: [
          { id: 's12', numeroSerie: 1, repeticionesObjetivo: 12, pesoKg: 140, completada: false, rir: 2, descansoSegundos: 90 },
          { id: 's13', numeroSerie: 2, repeticionesObjetivo: 12, pesoKg: 140, completada: false, rir: 1, descansoSegundos: 90 },
        ],
      },
    ],
  },
  {
    id: 'ent_03',
    titulo: 'Quema & Resistencia Funcional',
    descripcion: 'Circuito de alta intensidad para optimizar condición y quema calórica.',
    nivel: 'principiante',
    objetivo: 'bajar_peso',
    duracionEstimadaMin: 40,
    diasSugeridosSemana: [3, 6], // Miércoles y Sábados
    activo: true,
    creadoEn: '2026-02-05',
    ejercicios: [
      {
        ejercicio: EJERCICIOS_CATALOGO[4], // Dominadas
        series: [
          { id: 's14', numeroSerie: 1, repeticionesObjetivo: 8, pesoKg: 0, completada: false, descansoSegundos: 60 },
          { id: 's15', numeroSerie: 2, repeticionesObjetivo: 8, pesoKg: 0, completada: false, descansoSegundos: 60 },
        ],
      },
    ],
  },
];

export const REGISTROS_COMIDA_HOY: RegistroComida[] = [
  {
    id: 'com_01',
    fecha: '2026-09-27',
    hora: '08:30',
    momento: 'desayuno',
    nombreAlimento: 'Huevos revueltos (3) con tostadas integrales y palta',
    porciones: 1,
    calorias: 480,
    proteinasG: 28,
    carbohidratosG: 34,
    grasasG: 22,
  },
  {
    id: 'com_02',
    fecha: '2026-09-27',
    hora: '13:30',
    momento: 'almuerzo',
    nombreAlimento: 'Pechuga de pollo a la plancha con arroz blanco y ensalada',
    porciones: 1,
    calorias: 620,
    proteinasG: 52,
    carbohidratosG: 68,
    grasasG: 12,
  },
  {
    id: 'com_03',
    fecha: '2026-09-27',
    hora: '17:00',
    momento: 'snack',
    nombreAlimento: 'Batido de proteína whey con avena y banana',
    porciones: 1,
    calorias: 340,
    proteinasG: 30,
    carbohidratosG: 42,
    grasasG: 4,
  },
];

export const LOGROS_INICIALES: Logro[] = [
  {
    id: 'log_01',
    titulo: 'Primer Paso',
    descripcion: 'Completa tu primer entrenamiento en FitPulse.',
    icono: 'fitness',
    categoria: 'entrenamiento',
    puntos: 50,
    desbloqueado: true,
    fechaDesbloqueo: '2026-02-02',
  },
  {
    id: 'log_02',
    titulo: 'Hidratación Óptima',
    descripcion: 'Alcanza tu meta de agua durante 5 días seguidos.',
    icono: 'water',
    categoria: 'habito',
    puntos: 100,
    desbloqueado: true,
    fechaDesbloqueo: '2026-02-10',
  },
  {
    id: 'log_03',
    titulo: 'Club de los 100 kg',
    descripcion: 'Registra un levantamiento de 100 kg o más en Sentadilla o Press.',
    icono: 'trophy',
    categoria: 'entrenamiento',
    puntos: 150,
    desbloqueado: false,
  },
  {
    id: 'log_04',
    titulo: 'Constancia de Acero',
    descripcion: 'Entrena 4 semanas seguidas sin saltarte ningún día programado.',
    icono: 'flame',
    categoria: 'entrenamiento',
    puntos: 200,
    desbloqueado: false,
  },
  {
    id: 'log_05',
    titulo: 'Nutrición al Punto',
    descripcion: 'Cumple tus macros diarios dentro de un margen del 5%.',
    icono: 'restaurant',
    categoria: 'nutricion',
    puntos: 120,
    desbloqueado: false,
  },
];

export const METAS_INICIALES: Meta[] = [
  {
    id: 'meta_01',
    titulo: 'Alcanzar 78 kg de masa magra',
    categoria: 'peso',
    valorInicial: 75.0,
    valorActual: 76.5,
    valorObjetivo: 78.0,
    unidad: 'kg',
    fechaLimite: '2026-12-31',
    completada: false,
    creadaEn: '2026-01-20',
  },
  {
    id: 'meta_02',
    titulo: 'Completar 16 entrenamientos al mes',
    categoria: 'entrenamiento',
    valorInicial: 0,
    valorActual: 13,
    valorObjetivo: 16,
    unidad: 'sesiones',
    fechaLimite: '2026-09-30',
    completada: false,
    creadaEn: '2026-09-01',
  },
  {
    id: 'meta_03',
    titulo: 'Ingesta de 2.5L de agua diarios',
    categoria: 'habito',
    valorInicial: 1.5,
    valorActual: 2.5,
    valorObjetivo: 2.5,
    unidad: 'L',
    completada: true,
    creadaEn: '2026-09-01',
  },
];

export const RECORDATORIOS_INICIALES: Recordatorio[] = [
  {
    id: 'rec_01',
    tipo: 'entrenamiento',
    titulo: 'Hora de entrenar',
    mensaje: 'Prepárate para la sesión de Torso de hoy.',
    hora: '18:30',
    diasSemana: [1, 2, 4, 5],
    activo: true,
  },
  {
    id: 'rec_02',
    tipo: 'agua',
    titulo: 'Recarga tu botella',
    mensaje: 'Mantén tu hidratación para optimizar tu rendimiento muscular.',
    hora: '11:00',
    diasSemana: [0, 1, 2, 3, 4, 5, 6],
    activo: true,
  },
  {
    id: 'rec_03',
    tipo: 'comida',
    titulo: 'Hora del almuerzo',
    mensaje: 'No olvides registrar tus proteínas y macros en FitPulse.',
    hora: '13:00',
    diasSemana: [1, 2, 3, 4, 5],
    activo: true,
  },
];

export const HISTORIAL_INICIAL: SesionEntrenamientoHistorial[] = [
  {
    id: 'ses_01',
    entrenamientoId: 'ent_01',
    tituloEntrenamiento: 'Torso Fuerza & Hipertrofia',
    fechaInicio: '2026-09-25T18:30:00.000Z',
    fechaFin: '2026-09-25T19:35:00.000Z',
    duracionMin: 65,
    volumenTotalKg: 4280,
    caloriasQuemadasEstimadas: 390,
    ejerciciosRealizados: [
      {
        ejercicioId: 'ej_01',
        nombreEjercicio: 'Press de Banca Plano',
        series: [
          { serie: 1, pesoKg: 70, repeticiones: 8, alFallo: false },
          { serie: 2, pesoKg: 70, repeticiones: 8, alFallo: false },
          { serie: 3, pesoKg: 72.5, repeticiones: 7, alFallo: true },
        ],
      },
      {
        ejercicioId: 'ej_06',
        nombreEjercicio: 'Remo con Barra',
        series: [
          { serie: 1, pesoKg: 60, repeticiones: 10, alFallo: false },
          { serie: 2, pesoKg: 60, repeticiones: 10, alFallo: false },
        ],
      },
    ],
    comentarios: 'Excelente congestión en pectoral, nuevo récord en última serie de banca.',
  },
];

export const PROGRESO_INICIAL: RegistroProgreso[] = [
  {
    id: 'prog_01',
    fecha: '2026-07-01',
    pesoKg: 74.2,
    medidas: { pechoCm: 99, cinturaCm: 81, brazoDerechoCm: 35.5 },
  },
  {
    id: 'prog_02',
    fecha: '2026-08-01',
    pesoKg: 75.1,
    medidas: { pechoCm: 100.5, cinturaCm: 80.5, brazoDerechoCm: 36.0 },
  },
  {
    id: 'prog_03',
    fecha: '2026-09-01',
    pesoKg: 76.0,
    medidas: { pechoCm: 102, cinturaCm: 80.0, brazoDerechoCm: 36.8 },
  },
  {
    id: 'prog_04',
    fecha: '2026-09-27',
    pesoKg: 76.5,
    medidas: { pechoCm: 103, cinturaCm: 80.0, brazoDerechoCm: 37.2 },
    notas: 'Buen progreso en volumen limpio sin aumento de cintura.',
  },
];
