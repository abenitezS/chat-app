import { Component, OnInit, ViewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../models/chat.model'; 
import { FormatoFechaPipe } from '../../pipes/formato-fecha.pipe';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormatoFechaPipe],
  templateUrl: './chat.component.html', 
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  
  chatActual: Chat | null = null;
  formMensaje: FormGroup;
  showListOnMobile = false;

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formMensaje = this.fb.group({
      mensaje: ['', [Validators.required, Validators.minLength(1)]]
    });

    // Effect para scrollear cuando hay nuevos mensajes
    effect(() => {
      if (this.chatActual?.mensajes) {
        setTimeout(() => this.scrollToBottom(), 100);
      }
    });
  }
// Detectar cambios en la ruta para cargar el chat correspondiente
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const chatId = params.get('id');
      if (chatId) {
        this.chatActual = this.chatService.getChatById(chatId) ?? null;
        this.chatService.setActiveChatId(chatId);
        this.showListOnMobile = false;
      }
    });
  }
// Método para enviar un nuevo mensaje
  enviarMensaje() {
    if (!this.formMensaje.valid || !this.chatActual) return;

    const mensaje = this.formMensaje.get('mensaje')?.value;
    this.chatService.enviarMensaje(this.chatActual.id, mensaje);
    this.formMensaje.reset();
    this.scrollToBottom();
  }
// Método para scrollear al último mensaje
  private scrollToBottom() {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = 
          this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling:', err);
    }
  }


  
  
}