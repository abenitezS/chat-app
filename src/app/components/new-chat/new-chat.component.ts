import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-new-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-chat.component.html',
  styleUrl: './new-chat.component.css'
})
export class NewChatComponent {
  formNuevoChat: FormGroup;
  loading = false;

  avatares = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=2',
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=4',
    'https://i.pravatar.cc/150?img=5',
    'https://i.pravatar.cc/150?img=6',
    'https://i.pravatar.cc/150?img=7',
    'https://i.pravatar.cc/150?img=8',
    'https://i.pravatar.cc/150?img=9',
    'https://i.pravatar.cc/150?img=10'
  ];

  avatarSeleccionado: string;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    private router: Router
  ) {
    this.avatarSeleccionado = this.avatares[0];
    this.formNuevoChat = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      avatar: [this.avatarSeleccionado]
    });
  }

  seleccionarAvatar(avatar: string) {
    this.avatarSeleccionado = avatar;
    this.formNuevoChat.get('avatar')?.setValue(avatar);
  }

  crearChat() {
    if (!this.formNuevoChat.valid) return;

    this.loading = true;
    const { nombre, avatar } = this.formNuevoChat.value;

    // Simular delay
    setTimeout(() => {
      const nuevoId = this.chatService.agregarChat(nombre, avatar);
      this.router.navigate(['/chats', nuevoId]);
      this.loading = false;
    }, 500);
  }

  cancelar() {
    this.router.navigate(['/chats']);
  }

  get nombreControl() {
    return this.formNuevoChat.get('nombre');
  }
}