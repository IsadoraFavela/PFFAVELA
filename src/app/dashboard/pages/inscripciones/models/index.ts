export interface Inscripcion {
  id: number;
  estudiante: string;
  nombre_curso: string;
  fecha_inicio: string;
  fecha_fin: string;
}

export interface CrearInscripcionPayload {
  estudiante: string;
  nombre_curso: string;
  fecha_inicio: string;
  fecha_fin: string;
}
