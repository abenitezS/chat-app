import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, RouterLink} from '@angular/router';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { Chat } from '../../models/chat.model';

@Component({
  selector: 'app-chat-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChatListComponent],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.css',
})
export class ChatLayoutComponent implements OnInit {
  selectedChatId: number | null = null;
  chats: Chat[] = [];

  showSidebar = false;

  currentChatName = 'Chats'; //  Nombre  para el header

  router = inject(Router);

  ngOnInit(): void {
    this.watchRouteChanges();
  }

  // Detectar cambios en la ruta para mostrar o no lista de chats

  watchRouteChanges(): void {
    this.router.events.subscribe(() => {
      if (window.innerWidth <= 768) {
        this.showSidebar = false;
      }
    });
  }

  // Toggle del sidebar (para móvil)
  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
}
