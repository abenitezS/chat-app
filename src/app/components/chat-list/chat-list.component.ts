import { Component, computed, OnInit,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent {
  searchTerm = signal('');
  
  constructor(public chatService: ChatService, private router: Router) {}

  filteredChats = computed(() => {
    const term = this.searchTerm();
    return this.chatService.searchChats(term);
  });


  

  updateSearch(term: string) {
    this.searchTerm.set(term);
  }
  selectChat(chatId: string) {
    this.chatService.setActiveChatId(chatId);
    this.router.navigate(['/chats', chatId]);
  }

  goToNewChat() {
    this.router.navigate(['/nuevo']);
  }

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