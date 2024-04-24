import { Component, OnInit } from '@angular/core';
import { JwtServiceService } from './service/jwt-service.service';

import{getMessaging,getToken,onMessage} from 'firebase/messaging'
import { enviroment } from 'src/environment/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  title = 'atles-agngular';
  message: any = null;

  constructor(private authService: JwtServiceService) {}
 

  ngOnInit(): void {
    console.log("HAI HI HQAI HAI HAI HAI ");
    
  // this.requstPermission();
  // this.listenForMessages();
  }

  // requstPermission(){
  //   console.log("request permission work");
  //   const messaging =getMessaging();
  //   console.log("MEssaging ",messaging);
    
  //   getToken(messaging,{vapidKey:enviroment.firebase.vpaidkey}).then(
  //     (currentToken)=>{
  //       if(currentToken){
  //         console.log("Yeah we get token");
  //         console.log(currentToken);
          
          
  //       }else{
  //         console.log("Sorry no  token is   available");
          
  //       }

  //     },err=>{
  //       console.log("Sorry no  token is   available");
        
  //     }
  //   )
  // }

  // listenForMessages() {
  //   const messaging = getMessaging();
  //   onMessage(messaging, (payload) => {
  //     console.log('Message received. ', payload);
  //     this.message = payload;
  //   })
  // }

  // hiddenHandler() {
  //   this.message = null
  // }
 
}
