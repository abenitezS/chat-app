import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { Chat } from '../../models/chat.model';
import {EmptyChatComponent} from '../empty-chat-component/empty-chat.component';

@Component({
selector: 'app-chat-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChatListComponent, EmptyChatComponent],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.css',
})
export class ChatLayoutComponent implements OnInit {
  selectedChatId: number | null = null;
  chats: Chat[] = [];


  showSidebar = false;              // ← NUEVO: Controla si sidebar está visible
  currentChatName = 'Chats';        // ← NUEVO: Nombre del chat para el header

  constructor(
    
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

 
  ngOnInit(): void {
    
    this.watchRouteChanges();
    this.closeSidebarOnResize();
    
  }
 

 
  // Detectar cambios en la ruta para actualizar el chat seleccionado
  watchRouteChanges(): void {
  this.activatedRoute.firstChild?.params.subscribe(params => {
    if (params['id']) {
      this.selectedChatId = parseInt(params['id'], 10);
      
      // ← NUEVO: Actualizar nombre del chat
      const chat = this.chats.find(c => c.id === this.selectedChatId?.toString());
      if (chat) {
        this.currentChatName = chat.nombre;
      }
      
      // ← NUEVO: Cerrar sidebar automáticamente en móvil
      this.closeSidebar();
    } else {
      this.selectedChatId = null;
      this.router.navigate(['/empty']); // Navegar a vista vacía si no hay chat seleccionado
      this.currentChatName = 'Chats';
    }
  });

  }
 
  selectChat(chat: Chat): void {
    // Navegar a /chats/:id
    // this.selectedChatId = parseInt(chat.id, 10);
    // this.router.navigate(['/chats', chat.id]);
    window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      this.showSidebar = false;
    }});
  }
 
  navigateToNewChat(): void {
    // Navegar a /nuevo
    this.router.navigate(['/nuevo']);
    this.selectedChatId = null;
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
 