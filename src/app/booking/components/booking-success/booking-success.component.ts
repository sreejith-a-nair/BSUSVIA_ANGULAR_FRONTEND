import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { BookingServiceService } from 'src/app/service/booking-service.service';
import { NotificationServiceService } from 'src/app/service/notification-service.service';
import { enviroment } from 'src/environment/environment';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.css']
})
export class BookingSuccessComponent {
  bookingId: string | undefined;
  authorityEmail:string|undefined;
  pdfSrc: SafeResourceUrl | undefined;

  message: any = null;

  constructor(private route: ActivatedRoute,private bookingService:BookingServiceService,private sanitizer: DomSanitizer,private notificationService: NotificationServiceService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.bookingId = params['bookingId'];
      this.authorityEmail = params['authorityMail'];

      console.log("booking id  :  ",this.bookingId);
      console.log("Authority Email: in success ++++++++++++++++++++++++++", this.authorityEmail);
      this.findBookingById(this.bookingId);
      this.requstPermission();
      this.listenForMessages();
    }); 
    // this.sendNotification();
  }
  findBookingById(bookingId: string | undefined) {
   this.bookingService.findBookingById(bookingId).subscribe(re=>{
    console.log("Booking data success ",re);
    
   });
  }

  ngAfterViewInit(): void {
   
    this.triggerNotification();
  }

  triggerNotification(): void {
    console.log("Work trigger");
    

    if (!this.notificationSent) {
      this.sendNotification();
    }
    
  }
  private notificationSent = false;

  sendNotification(): void {
   
    const deviceToken = "dctIpo8wbT8yg7YTxwAlm6:APA91bEQ2z37jiB6lSUn0r8gEgxo8unMsMhIPh7U5-dVw6tTBC-spnP9jh2pY6LrXfzbpxIp75vp15ByzydLkqIERcJzY0D7HILhHat_LqS2pAMEUBbTgYpxBKL5p2-LgZdMDe3o2NWF"; // Replace with the recipient's device token
    const title = "Booking successful";
    const bodi = "Congrats booking successfully completed with busvia";
    const topic='Booking details';
    const url="booking/bcustomer/home";
    const authorityEMail=this.authorityEmail;
    const icon = "https://i.ibb.co/8bpP4S1/error-page-new.jpg";
    this.notificationService.sendNotification(deviceToken, title, bodi, topic,url,authorityEMail)
      .subscribe(
        response => {
          console.log('Notification sent successfully:', response);
          this.notificationSent = true;
         
        },
        error => {
          console.error('Error sending notification:', error);
          // Handle error if needed
        }
      );
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

  listenForMessages() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
    })
  }

  hiddenHandler() {
    this.message = null
  }


  downloadBookingPdf() {

    
    this.bookingService.bookingInvoicePdf(this.bookingId).subscribe(
      (response: ArrayBuffer) => {
        this.pdfSrc = response;
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'BookingInvoice.pdf';
        link.click();

        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      },
      error => {
        console.error('Error downloading PDF:', error);
      }
    );
  }

}
