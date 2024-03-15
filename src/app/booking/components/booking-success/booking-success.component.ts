import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BookingServiceService } from 'src/app/service/booking-service.service';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.css']
})
export class BookingSuccessComponent {


  bookingId: string | undefined;
  // pdfSrc: string | ArrayBuffer | Uint8Array | undefined;
  pdfSrc: SafeResourceUrl | undefined;

  constructor(private route: ActivatedRoute,private bookingService:BookingServiceService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.bookingId = params['bookingId'];
      console.log("booking id  :  ",this.bookingId);
      
    }); 
  }

  // downloadBookingPdf() {
  //   this.bookingService.bookingInvoicePdf(this.bookingId).subscribe(
      
      
  //     (response: ArrayBuffer) => {
  //       console.log("RESPONSE PDF  ",response);
  //       // Convert ArrayBuffer to a blob
  //       const blob = new Blob([response], { type: 'application/pdf' });
  //       console.log("RESPONSE PDF  ",blob);
  //       // Create a URL for the blob
  //       const url = window.URL.createObjectURL(blob);
  //       console.log("RESPONSE PDF  ",url);
  //       // Sanitize the URL
  //       const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  //       console.log("RESPONSE PDF  ",safeUrl);
  //       // Assign the sanitized URL to pdfSrc
  //       this.pdfSrc = safeUrl;
  //     },
  //     error => {
  //       console.error('Error downloading PDF:', error);
  //     }
  //   );
  // }
  

  downloadBookingPdf() {
    // temporary
    // const bookingIds = “dc25b6a5d8124fceb23bd7ae3f3d8d6”;
    
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
