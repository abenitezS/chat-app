import { Component, computed, inject,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { FormatoFechaPipe } from '../../pipes/formato-fecha.pipe';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FormatoFechaPipe, RouterLink],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent {
  // Signal para el término de búsqueda
  searchTerm = signal('');

  // Inyectar ChatService para acceder a los chats
  chatService = inject(ChatService);

  // Computed para filtrar chats según el término de búsqueda
  filteredChats = computed(() => {
    const term = this.searchTerm();
    return this.chatService.searchChats(term);
  });

  // Método para actualizar el término de búsqueda
  updateSearch(term: string) {
    this.searchTerm.set(term);
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
}
