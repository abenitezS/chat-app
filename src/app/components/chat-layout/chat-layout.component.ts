import { Component ,OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../models/chat.model';

@Component({
selector: 'app-chat-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChatListComponent],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.css',
})
export class ChatLayoutComponent implements OnInit {
 ;
  selectedChatId: number | null = null;
  chats: Chat[] = [];
  constructor(
    
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

 
  ngOnInit(): void {
this.selectedChatId = null;
    
  }
 
 
 
  // Detectar cambios en la ruta para actualizar el chat seleccionado
  watchRouteChanges(): void {
    this.activatedRoute.firstChild?.params.subscribe(params => {
      if (params['id']) {
        this.selectedChatId = parseInt(params['id'], 10);
      }
    });
  }
 
  selectChat(chat: Chat): void {
    // Navegar a /chats/:id
    this.router.navigate(['/chats', chat.id]);
  }
 
  navigateToNewChat(): void {
    // Navegar a /nuevo
    this.router.navigate(['/nuevo']);
    this.selectedChatId = null;
  }
}
 