import { Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { NewChatComponent } from './components/new-chat/new-chat.component';
import { ChatLayoutComponent } from './components/chat-layout/chat-layout.component';
import { EmptyChatComponent } from './components/empty-chat/empty-chat.component';
import { chatGuard } from './guard';

export const routes: Routes = [
  {
    path: '',
    component: ChatLayoutComponent,
    children: [
      { path: '', redirectTo: 'chats', pathMatch: 'full' },
      //lista de chats con mensaje derecho vacio en movil solo muestra panel derecho chat vacio
      { path: 'chats', component: EmptyChatComponent },
      //chat activo si el id no existe va a pagina inicio /chats
      { path: 'chats/:id', component: ChatComponent, canActivate: [chatGuard] },
      // chat nuevo
      { path: 'nuevo', component: NewChatComponent },
    ],
  },
];
