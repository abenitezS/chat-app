import { Component, computed,inject,OnInit,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { FormatoFechaPipe} from '../../pipes/formato-fecha.pipe';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FormatoFechaPipe],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent implements OnInit{
 
  private route = inject(ActivatedRoute);
  ultimaRuta: string = '';

 ngOnInit() {
    // Tomamos la URL activa y la separamos por '/'
    const url = this.route.snapshot.url.map(segment => segment.path);
    // Extraemos el último elemento
    this.ultimaRuta = url[url.length - 1]; 
  }


  // Signal para el término de búsqueda
  searchTerm = signal('');

 // Inyectar ChatService para acceder a los chats y Router para navegación
 chatService = inject(ChatService);
 router = inject(Router);


 
// Computed para filtrar chats según el término de búsqueda

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
  };

  goToChats(){
    this.router.navigate(['/empty']);
  };

// Método para obtener la clase CSS del estado del contacto  //podria ser un PIPE!!
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