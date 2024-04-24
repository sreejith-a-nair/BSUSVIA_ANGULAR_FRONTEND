import { Component } from '@angular/core';

@Component({
  selector: 'app-ticket-error',
  templateUrl: './ticket-error.component.html',
  styleUrls: ['./ticket-error.component.css']
})
export class TicketErrorComponent {

  errorMessage:any;
  ngOnInit() {

    this.errorMessage="No ticket booked "
  }
  
}
