import { Routes } from '@angular/router';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { NewChatComponent } from './components/new-chat/new-chat.component';
import { ChatLayoutComponent } from './components/chat-layout/chat-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: ChatLayoutComponent, // ← El contenedor (SIEMPRE VISIBLE)
    children: [
  
      { path: 'chats/:id', component: ChatComponent },
      { path: 'nuevo', component: NewChatComponent },
      { path: '', redirectTo: 'chats/1', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
