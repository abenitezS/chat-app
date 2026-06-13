import { Component, OnInit, ViewChild, ElementRef, OnDestroy ,AfterViewChecked} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../models/chat.model';
import { FormatoFechaPipe } from '../../pipes/formato-fecha.pipe';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormatoFechaPipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnDestroy ,AfterViewChecked{
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  chatActual: Chat | null = null;
  formMensaje: FormGroup;
  showListOnMobile = false;
  private destroy$ = new Subject<void>();
 private needsScroll = false;
 private lastMessageCount = 0;
  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,

    private fb: FormBuilder,
   
  ) {
    this.formMensaje = this.fb.group({
      mensaje: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  // Detectar cambios en la ruta para cargar el chat correspondiente
  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const chatId = params.get('id');

      if (chatId) {
        this.chatActual = this.chatService.getChatById(chatId) ?? null;
        this.needsScroll = true;
        this.chatService.setActiveChatId(chatId);
        this.showListOnMobile = false;

        setTimeout(() => this.scrollToBottom(), 300);
      }
    });
  }
  //para limpiar 
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



ngAfterViewChecked(): void {

  if (!this.chatActual) return;

  const currentCount = this.chatActual.mensajes.length;

  if (currentCount !== this.lastMessageCount) {

    this.lastMessageCount = currentCount;

    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
  }
}
  // Método para enviar un nuevo mensaje
  enviarMensaje() {
    if (!this.formMensaje.valid || !this.chatActual) return;

    const mensaje = this.formMensaje.get('mensaje')?.value;
    this.chatService.enviarMensaje(this.chatActual.id, mensaje);
    this.formMensaje.reset();
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
  }
//scrollear hacia abajo cuando se mensajea 
  private scrollToBottom(): void {
    if (!this.messagesContainer) return;

    const element = this.messagesContainer.nativeElement;

    element.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth',
    });
  }
}
