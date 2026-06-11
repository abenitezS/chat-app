import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
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

hasChatSelected = false;
  showSidebar = false;   
  hasNewChat = false;           // ← NUEVO: Controla si sidebar está visible
  currentChatName = 'Chats';        // ← NUEVO: Nombre del chat para el header

router =  inject(Router);
    

  ngOnInit(): void {
    
    this.watchRouteChanges();
    this.closeSidebarOnResize();
    
  }

  // Detectar cambios en la ruta para actualizar el chat seleccionado

watchRouteChanges(): void {
  this.router.events.subscribe(() => {

    const url = this.router.url;

    if (url.startsWith('/chats/') && window.innerWidth <= 768) {
      this.hasChatSelected = true;
      this.showSidebar = false;
    } else {
      this.hasChatSelected = false;
    }
    
    if (url.startsWith('/nuevo') && window.innerWidth <= 768) {
      this.hasNewChat = true;
      this.showSidebar = false;
    } else {
      this.hasNewChat = false;}


  });
}

 // Toggle del sidebar (para móvil)
toggleSidebar(): void {
  this.showSidebar = !this.showSidebar;
}

// Cerrar sidebar
closeSidebar(): void {
  this.showSidebar = false;
  
}

// Cerrar sidebar automáticamente si redimensionan a pantalla grande
private closeSidebarOnResize(): void {
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      this.showSidebar = false;
    }
  });
}
}
 