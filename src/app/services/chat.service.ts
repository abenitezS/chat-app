import { Injectable, signal } from '@angular/core';
import { Chat, Mensaje } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chats = signal<Chat[]>([
    {
      id: '1',
      nombre: 'Vincent Porter',
      avatar: 'https://i.pravatar.cc/150?img=1',
      estado: 'online',
      ultimoMensaje: 'Hola, ¿cómo estás?',
      ultimaActividad: new Date(Date.now() - 5 * 60000),
      mensajes: [
        { id: '1', contenido: 'Hola, ¿cómo estás?', remitente: 'app', timestamp: new Date(Date.now() - 10 * 60000) },
        { id: '2', contenido: 'Bien, ¿y tú?', remitente: 'usuario', timestamp: new Date(Date.now() - 9 * 60000) }
      ]
    },
    {
      id: '2',
      nombre: 'Aiden Chavez',
      avatar: 'https://i.pravatar.cc/150?img=2',
      estado: 'offline',
      ultimoMensaje: 'Nos vemos luego',
      ultimaActividad: new Date(Date.now() - 2 * 60 * 60000),
      mensajes: [
        { id: '1', contenido: '¿Vamos al café?', remitente: 'usuario', timestamp: new Date(Date.now() - 3 * 60 * 60000) },
        { id: '2', contenido: 'Claro, a las 3pm', remitente: 'app', timestamp: new Date(Date.now() - 2 * 60 * 60000) }
      ]
    },
    {
      id: '3',
      nombre: 'Mike Thomas',
      avatar: 'https://i.pravatar.cc/150?img=3',
      estado: 'online',
      ultimoMensaje: 'Gracias por tu ayuda',
      ultimaActividad: new Date(Date.now() - 30 * 60000),
      mensajes: [
        { id: '1', contenido: 'Necesito ayuda con el proyecto', remitente: 'usuario', timestamp: new Date(Date.now() - 1 * 60 * 60000) },
        { id: '2', contenido: 'Claro, ¿en qué puedo ayudarte?', remitente: 'app', timestamp: new Date(Date.now() - 50 * 60000) }
      ]
    },
    {
      id: '4',
      nombre: 'Christian Kelly',
      avatar: 'https://i.pravatar.cc/150?img=4',
      estado: 'visto hace poco',
      ultimoMensaje: 'Perfecto, nos vemos',
      ultimaActividad: new Date(Date.now() - 4 * 60 * 60000),
      mensajes: []
    },
    {
      id: '5',
      nombre: 'Monica Ward',
      avatar: 'https://i.pravatar.cc/150?img=5',
      estado: 'online',
      ultimoMensaje: 'Excelente idea',
      ultimaActividad: new Date(Date.now() - 15 * 60000),
      mensajes: [
        { id: '1', contenido: '¿Qué te parece la propuesta?', remitente: 'usuario', timestamp: new Date(Date.now() - 20 * 60000) },
        { id: '2', contenido: 'Excelente idea, me encanta', remitente: 'app', timestamp: new Date(Date.now() - 15 * 60000) }
      ]
    },
    {
      id: '6',
      nombre: 'Dean Henry',
      avatar: 'https://i.pravatar.cc/150?img=6',
      estado: 'offline',
      ultimoMensaje: 'Última vez visto hace 2h',
      ultimaActividad: new Date(Date.now() - 2 * 60 * 60000),
      mensajes: []
    }
  ]);

  // Signal para el chat activo
  private activeChatId = signal<string | null>(null);

  getChats() {
    return this.chats;
  }

  getChatById(id: string) {
    return this.chats().find(chat => chat.id === id);
  }

  getActiveChatId() {
    return this.activeChatId;
  }

  setActiveChatId(id: string) {
    this.activeChatId.set(id);
  }

  agregarChat(nombre: string, avatar: string) {
    const newChat: Chat = {
      id: Date.now().toString(),
      nombre,
      avatar,
      estado: 'online',
      ultimaActividad: new Date(),
      mensajes: []
    };
    
    this.chats.update(chats => [...chats, newChat]);
    return newChat.id;
  }

  enviarMensaje(chatId: string, contenido: string) {
    const chat = this.getChatById(chatId);
    if (!chat) return;

    // Agregar mensaje del usuario
    const userMessage: Mensaje = {
      id: Date.now().toString(),
      contenido,
      remitente: 'usuario',
      timestamp: new Date()
    };

    chat.mensajes.push(userMessage);
    chat.ultimoMensaje = contenido;
    chat.ultimaActividad = new Date();

    // Actualizar el signal para que reactive renderice
    this.chats.update(chats => [...chats]);

    // Simular respuesta automática después de 1-2 segundos
    setTimeout(() => {
      const respuestas = [
        '¡Qué buena idea! 💡',
        'Totalmente de acuerdo contigo',
        'Me encanta tu propuesta',
        'Perfecto, así es',
        'Excelente punto de vista',
        'Gracias por tu mensaje',
        '¿Podemos charlar al respecto?',
        'Eso suena genial'
      ];
      
      const respuestaAleatoria = respuestas[Math.floor(Math.random() * respuestas.length)];
      
      const appMessage: Mensaje = {
        id: (Date.now() + 1).toString(),
        contenido: respuestaAleatoria,
        remitente: 'app',
        timestamp: new Date()
      };

      chat.mensajes.push(appMessage);
      chat.ultimoMensaje = respuestaAleatoria;
      chat.ultimaActividad = new Date();

      this.chats.update(chats => [...chats]);
    }, 1000 + Math.random() * 1000);
  }

  buscarChats(termino: string) {
    const chatsFiltered = this.chats().filter(chat =>
      chat.nombre.toLowerCase().includes(termino.toLowerCase())
    );
    return chatsFiltered;
  }
  searchChats(searchTerm: string): Chat[] {
    if (!searchTerm) return this.chats();
    return this.chats().filter(chat =>
      chat.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
