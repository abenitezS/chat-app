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
    'avatars/avatar1.jpg',
    'avatars/avatar2.jpg',
    'avatars/avatar3.jpg',
    'avatars/avatar4.jpg',
    'avatars/avatar5.jpg',
    'avatars/avatar6.jpg',
    'avatars/avatar7.jpg',
    'avatars/avatar8.jpg',
    'avatars/avatar9.jpg',
    'avatars/avatar10.jpg'
  ];

  avatarSeleccionado: string;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    private router: Router
  ) {
    this.avatarSeleccionado = this.avatares[0];
    this.formNuevoChat = this.fb.group({
    nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z\s]+$/),
        ],
    ],
      avatar: [this.avatarSeleccionado]
    });

  }

  get f() {
    return this.formNuevoChat.controls;
  }

  get erroresNombre(): string[] {
    const errores = [];
    if (this.f['nombre']?.hasError('required'))
      errores.push('El nombre es obligatorio');
    if (this.f['nombre']?.hasError('minlength'))
      errores.push('El nombre debe tener al menos 3 caracteres');
    if (this.f['nombre']?.hasError('maxlength'))
      errores.push('El nombre no debe tener más de 50 caracteres');
    if (this.f['nombre']?.hasError('pattern'))
      errores.push('El nombre solo puede contener letras y espacios');
    return errores;
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