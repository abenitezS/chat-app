import { inject, Pipe } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { ChatService } from './services/chat.service';

export const chatGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const chatService = inject(ChatService);

  const id = route.paramMap.get('id');

  const chat = chatService.getChatById(id);

  if (chat) {
    return true;
  } else {
    router.navigate(['/chats']);
    return false;
  }
};
