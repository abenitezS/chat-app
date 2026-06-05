import { Routes } from '@angular/router';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { NewChatComponent } from './components/new-chat/new-chat.component';
import { ChatLayoutComponent } from './components/chat-layout/chat-layout.component';
import { EmptyChatComponent } from './components/empty-chat-component/empty-chat.component';

export const routes: Routes = [
  {
    path: '',
    component: ChatLayoutComponent,
    children: [
      { path: '', redirectTo: 'chats', pathMatch: 'full' },

      // Panel derecho
      { path: 'chats', component: EmptyChatComponent },
      { path: 'chats/:id', component: ChatComponent },
      { path: 'nuevo', component: NewChatComponent }
    ]
  }
];
