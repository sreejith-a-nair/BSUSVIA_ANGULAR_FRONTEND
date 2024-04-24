import { Component } from '@angular/core';



import{getMessaging,getToken} from 'firebase/messaging'
import { enviroment } from 'src/environment/environment';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {


 

  ngOnInit(): void {
    console.log("HAI HI HQAI HAI HAI HAI ");
    
  this.requstPermission();
  }

  requstPermission(){
    console.log("request permission work");
    const messaging =getMessaging();
    console.log("MEssaging ",messaging);
    
    getToken(messaging,{vapidKey:enviroment.firebase.vpaidkey}).then(
      (currentToken)=>{
        if(currentToken){
          console.log("Yeah we get token");
          console.log(currentToken);
          
          
        }else{
          console.log("Sorry no  token is   available");
          
        }

      },err=>{
        console.log("Sorry no  token is   available");
        
      }
    )
  }

}
