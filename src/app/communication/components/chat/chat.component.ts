import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatMessage } from 'src/app/core/interface/chat-message.model';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { ChatService } from 'src/app/service/chat.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { TosterService } from 'src/app/service/toster.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  authorityData:any;
  authorityEmailId:string='';
  recipientId:string=''

  disabled = true;
  // newmessage: string;
  username: string ='';

  busId:string='';
  authorityEmail:string='';
  messageInput:string='';
  userId:string='';
  messageList:any[]=[];
  constructor(private chatService :ChatService,private  route:ActivatedRoute,private jwtService : JwtServiceService,private userService :UserServiceService,private toster:TosterService){

  }
  ngOnInit(): void {
  
    this.route.queryParams.subscribe(params => {
      this .busId = params['busId'];
      this. authorityEmail = params['authorityEmail'];
      this.findAuthorityByEmail(this.authorityEmail);
      
      console.log('Bus ID: in chat :  ', this.busId);
      console.log('Authority Email : in chat ', this.authorityEmail);
    });

   const userEmail  =this.jwtService.extractEmail()
   this.userService.getUseByEmail(userEmail).subscribe(res=>{
   console.log("USer data :  ", res);
   this.userId=res.uuid;
   })

    // this.userId=this.route.snapshot.params["userId"];
   this.chatService.joinRoom("A")
   this.lisenerMessage()
   this.hai()
  }
 
    hai() {
    this.chatService.hello().subscribe(re=>{
      console.log("successss   * * *  ");
      
    },err=>{
      console.log("errro occured ! ! !");
      
    })
    }
    
    sendMessage(){
      console.log("MEssage : ",this.messageInput);
      const currentTime = new Date();
      const chatMessage={
      message:this.messageInput,
      user:this.userId, 
      messageDate: currentTime,
      authorityMail:this.authorityEmail,
      busId:this.busId,

      
      }as ChatMessage
      console.log("chatMessage.authorityMail  : ",chatMessage.authorityMail);
      console.log("authorityEmailId  : ",this.authorityEmailId);
      
      if(chatMessage.authorityMail===this.authorityEmailId){
        console.log("true");
        
        this.chatService.sendMessage("A",chatMessage)
        this.messageInput='';
      }else {
       this.toster.warning("Only chat with support ! ")
        console.error("You can only chat with your corresponding authority.");
      }
     
    }

    sendPrivateMessage(){
      console.log("MEssage : ",this.messageInput);
      const currentTime = new Date();
      const chatMessage={
      message:this.messageInput,
      user:this.userId, 
      messageDate: currentTime,
      authorityMail:this.authorityEmail,
      busId:this.busId,

      
      }as ChatMessage
      console.log("chatMessage.authorityMail  : ",chatMessage.authorityMail);
      console.log("authorityEmailId  : ",this.authorityEmailId);
      
      if(chatMessage.authorityMail===this.authorityEmailId){
        console.log("true");
        
        this.chatService.sendPrivateMessages("A",chatMessage)
        this.messageInput='';
      }else {
       this.toster.warning("Only chat with support ! ")
        console.error("You can only chat with your corresponding authority.");
      }
     
    }

    lisenerMessage(){
      this.chatService.getMessageSubject().subscribe((message:any)=>{
        console.log("Listener msg  : ", message);
        
        this.messageList= message.map((item:any)=>({
          ...item,
          message_side:item.user===this.userId?'sender':'receiver'
        }));
      })
  }

  findAuthorityByEmail(authorityEmail: string) {
    this.userService.getUseByEmail(authorityEmail).subscribe(res=>{
          console.log("Authority data "  ,res);
          this.authorityData=res;
          this.authorityEmailId=res.email;
          this.recipientId=res.uuid;
          
    },err=>{
      console.log("Errro ");
      

    })
  }

  sendMessages() {
    const chatMessage={
      message:this.messageInput,
      user:this.userId, 
      // messageDate: currentTime,
      authorityMail:this.authorityEmail,
      busId:this.busId,

      
      }as ChatMessage
      console.log("chatMessage.authorityMail  : ",chatMessage.authorityMail);
      console.log("authorityEmailId  : ",this.authorityEmailId);

    // if (trimmedMessage !== '') {
        this.chatService.sendPrivateMessage(this.username + ': '+ chatMessage );
    }
    
  }


