import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../core/environment/enviroment';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { ChatMessage } from '../core/interface/chat-message.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtServiceService } from './jwt-service.service';
import { AuthorityServiceService } from './authority-service.service';

const BASE_URL= environment.BASE_URL;
const USER_CHAT_URL = environment.USER_CHAT_URL;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient : any;
  private isConnected: boolean = false;
  private messageSubject:BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  constructor(private  http :HttpClient,private jwtService :JwtServiceService,private authorityService:AuthorityServiceService) {  
    this.initConnectionSocket();
    // this.jwtService.getAuthorityByEmail('authority@example.com').subscribe(data => {
    //   this.authorityEmail = data.email;
    // });
  }
 



    initConnectionSocket(){
      // const url = `${BASE_URL}communication/chat`;
      // const url = `//localhost:8989/chat-socket`;
      // const socket = new SockJS('http://localhost:8989/chat-socket')
      // const socket = new SockJS(`${BASE_URL}chat-socket`);
      // const socket= new SockJS(url);
      const socket = new SockJS(USER_CHAT_URL + 'chat-socket');
      this.stompClient=Stomp.over(socket)
    }

    joinRoom(roomId: string) {
      if (!this.isConnected) {
        console.log("connected websocket ");
        
        this.stompClient.connect({
          headers: this.jwtService.createAuthorizationHeader()
        }, () => {
          this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {
            const messageContent = JSON.parse(message.body);
            const currentMsg = this.messageSubject.getValue();
            currentMsg.push(messageContent);
            console.log("message content is ",currentMsg);
            
            this.messageSubject.next(currentMsg);
          });
// new 
          this.stompClient.subscribe(`/user/topic/privateChat${roomId}`, (message: any) => {
            const messageContent = JSON.parse(message.body);
            const currentMsg = this.messageSubject.getValue();
            currentMsg.push(messageContent);
            console.log("message content is ",currentMsg);
            
            this.messageSubject.next(currentMsg);
          });



          this.isConnected = true;
        }, (error: any) => {
          console.error('WebSocket connection failed: ' + error);
        });
      } else {
        console.log('Already connected to WebSocket');
      }
    }

      sendMessage(roomId: string, chatMessage: ChatMessage) {
        console.log("roomID  : " , roomId);
        console.log("ChatMessage  : " , chatMessage);
        console.log("MessageDate  : " , chatMessage.messageDate);
        console.log("authorityMail  : " , chatMessage.authorityMail);
        console.log("busId  : " , chatMessage.busId);
        
        
        if (this.stompClient && this.stompClient.connected) {
          // this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
          this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
        } else {
          console.error('WebSocket connection is not established');
          this.initConnectionSocket();
        
        }
    }

    sendPrivateMessages(roomId: string, chatMessage: ChatMessage) {
      
      console.log("roomID  : " , roomId);
      console.log("ChatMessage  : " , chatMessage);
      console.log("MessageDate  : " , chatMessage.messageDate);
      console.log("authorityMail  : " , chatMessage.authorityMail);
      console.log("busId  : " , chatMessage.busId);
      
      if (this.stompClient && this.stompClient.connected) {
        // this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
        this.stompClient.send(`/app/privateChat/${roomId}`, {}, JSON.stringify(chatMessage));
      } else {
        console.error('WebSocket connection is not established');
        this.initConnectionSocket();
      
      }
  }

  // joinRoom(roomId: string) {
  //   if (!this.isConnected) {
  //     console.log("connected websocket ");
      
  //     this.stompClient.connect({
  //       headers: this.jwtService.createAuthorizationHeader()
  //     }, () => {
  //       this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {
  //         console.log("message content is ",message.body);
  //         this.showChat(message.body);
  //       });
  //       this.isConnected = true;
  //     }, (error: any) => {
  //       console.error('WebSocket connection failed: ' + error);
  //     });
  //   } else {
  //     console.log('Already connected to WebSocket');
  //   }
  // }


  // showChat(message : any) {
  //     const currentMsg = this.messageSubject.getValue();
  //         currentMsg.push(message);
  //         this.messageSubject.next(message);
  // }

  // sendMessage(roomId: string, chatMessage: ChatMessage) {
  //   console.log("roomID  : " , roomId);
  //   console.log("ChatMessage  : " , chatMessage);
    
  //   if (this.stompClient && this.stompClient.connected) {
  //     this.stompClient.send(`/app/chat/${roomId}`, {}, chatMessage);
  //   } else {
  //     console.error('WebSocket connection is not established');
  //     this.initConnectionSocket();
    
  //   }
  // }

  getMessageSubject(){
    return this.messageSubject.asObservable();
  }

  hello(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}communication/hello`);
  }

  

  sendPrivateMessage(newmessage: any) {
    this.stompClient.send(
      '/ws/app/sendToAll',
      {},
      // JSON.stringify(messageToSend)
      newmessage
    );
    console.log(newmessage);
    // this.greetingsSubject.next(newmessage);
    newmessage = "";
  }

}
