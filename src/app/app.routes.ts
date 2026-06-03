import { Routes } from '@angular/router';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { NewChatComponent } from './components/new-chat/new-chat.component';

export const routes: Routes = [
  { path: '', redirectTo: '/chats', pathMatch: 'full' },
  { path: 'chats', component: ChatListComponent },
  { path: 'chats/:id', component: ChatWindowComponent },
  { path: 'nuevo', component: NewChatComponent },
  { path: '**', redirectTo: '/chats' }
];