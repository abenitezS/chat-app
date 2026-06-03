
export interface Mensaje {
  id: string;
  contenido: string;
  remitente: 'usuario' | 'app';
  timestamp: Date;
}
 
export interface Chat {
  id: string;
  nombre: string;
  avatar: string;
  estado: 'online' | 'offline' | 'visto hace poco';
  ultimoMensaje?: string;
  ultimaActividad: Date;
  mensajes: Mensaje[];
}
 