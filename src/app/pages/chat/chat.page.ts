import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable, of } from 'rxjs'; // Usamos `of` para inicializar mensajes
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';

@Component({
selector: 'app-chat',
templateUrl: './chat.page.html',
styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent | undefined = undefined; // Inicialización a undefined
  messages: Observable<any[]> = of([]); // Inicialización con un array vacío
  newMsg = '';

  constructor(private chatService: ChatService, private router: Router) { }

ngOnInit() {
    this.messages = this.chatService.getChatMessages();
}

  sendMessage() {
    if (this.newMsg.trim() !== '') {
      this.chatService.addChatMessage(this.newMsg).then(() => {
        this.newMsg = '';
        if (this.content) {
          this.content.scrollToBottom(300);
        }
      });
    }
  }

  signOut() {
    this.chatService.signOut().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }
}