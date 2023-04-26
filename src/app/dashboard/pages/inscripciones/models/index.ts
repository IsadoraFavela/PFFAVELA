export interface Inscripcion {
    id: number;
    estudiante: string;
    nombre_curso: string;
    fecha_inicio: Date;
    fecha_fin: Date;
  }
  
  export interface CrearInscripcionPayload {
    estudiante: string;
    nombre_curso: string;
    fecha_inicio: Date;
    fecha_fin: Date;
  }