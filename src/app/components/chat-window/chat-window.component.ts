import { Component, OnInit, ViewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../models/chat.model';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent implements OnInit {
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

  enviarMensaje() {
    if (!this.formMensaje.valid || !this.chatActual) return;

    const mensaje = this.formMensaje.get('mensaje')?.value;
    this.chatService.enviarMensaje(this.chatActual.id, mensaje);
    this.formMensaje.reset();
    this.scrollToBottom();
  }

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

  volverAlista() {
    this.router.navigate(['/chats']);
  }

  getFormatoTiempo(fecha: Date): string {
    const ahora = new Date();
    const horaFecha = new Date(fecha);
    const diferencia = ahora.getTime() - horaFecha.getTime();
    const minutos = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));

    if (minutos < 1) return 'Ahora';
    if (minutos < 60) return `${minutos}m`;
    if (horas < 24) return `${horas}h`;
    
    return horaFecha.toLocaleDateString('es-ES');
  }
}