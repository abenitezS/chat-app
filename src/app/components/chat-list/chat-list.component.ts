import { Component, computed,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent {
 

  // Signal para el término de búsqueda
  searchTerm = signal('');



 //
  constructor(public chatService: ChatService, private router: Router) {}

// Computed para filtrar chats según el término de búsqueda
serachTerm = signal('');
  filteredChats = computed(() => {
    const term = this.searchTerm();
    return this.chatService.searchChats(term);
  });


  // Método para actualizar el término de búsqueda

  updateSearch(term: string) {
    this.searchTerm.set(term);
  }
// Método para manejar el click en un chat

  selectChat(chatId: string) {
    this.chatService.setActiveChatId(chatId);
    this.router.navigate(['/chats', chatId]);
    //this.selectChat.emit(chat)
  }
// Método para navegar a la creación de un nuevo chat
  goToNewChat() {
    this.router.navigate(['/nuevo']);
  }
// Método para obtener la clase CSS del estado del contacto
  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'online':
        return 'estado-online';
      case 'offline':
        return 'estado-offline';
      case 'visto hace poco':
        return 'estado-visto';
      default:
        return '';
    }
  }

  formatearTiempo(fecha: Date): string {
    const ahora = new Date();
    const diferencia = ahora.getTime() - new Date(fecha).getTime();
    const minutos = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    if (minutos < 1) return 'Ahora';
    if (minutos < 60) return `hace ${minutos}m`;
    if (horas < 24) return `hace ${horas}h`;
    if (dias < 7) return `hace ${dias}d`;
    
    return new Date(fecha).toLocaleDateString('es-ES');
  }
}