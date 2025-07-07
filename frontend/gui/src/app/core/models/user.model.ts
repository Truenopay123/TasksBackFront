export interface Usuario {
  username: string;
  password: string;
}

export interface RespuestaAutenticacion {
  intData?: {
    token: string;
  };
  // Agrega otros campos de respuesta potenciales según sea necesario
}
