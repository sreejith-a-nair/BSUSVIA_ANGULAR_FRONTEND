import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from 'src/app/core/interface/chat-message.model';
import { ChatService } from 'src/app/service/chat.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-chat-manage',
  templateUrl: './chat-manage.component.html',
  styleUrls: ['./chat-manage.component.css']
})
export class ChatManageComponent {

  messageInput:string='';
  userId:string='';
  messageList:any[]=[];
  constructor(private chatService :ChatService,private  route:ActivatedRoute,private jwtService : JwtServiceService,private userService :UserServiceService){

  }
  ngOnInit(): void {
  
    this.route.queryParams.subscribe(params => {
      const busId = params['busId'];
      const authorityEmail = params['authorityEmail'];
      
      console.log('Bus ID: in chat :  ', busId);
      console.log('Authority Email : in chat ', authorityEmail);
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
      authorityMail:this.jwtService.extractEmail(),
      // busId:this.busId,
      }as ChatMessage
      this.chatService.sendMessage("A",chatMessage)
      this.messageInput='';
    }

    sendPrivateMessage(){
      console.log("MEssage : ",this.messageInput);
      const currentTime = new Date();
      const chatMessage={
      message:this.messageInput,
      user:this.userId, 
      messageDate: currentTime,
      authorityMail:this.jwtService.extractEmail(),
      }as ChatMessage
      this.chatService.sendPrivateMessages("A",chatMessage)
      this.messageInput='';
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

  


}
