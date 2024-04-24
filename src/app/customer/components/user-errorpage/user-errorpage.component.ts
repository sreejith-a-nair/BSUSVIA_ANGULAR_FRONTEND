import { Component } from '@angular/core';

@Component({
  selector: 'app-user-errorpage',
  templateUrl: './user-errorpage.component.html',
  styleUrls: ['./user-errorpage.component.css']
})
export class UserErrorpageComponent {

  errorMessage:any;
  ngOnInit() {

    this.errorMessage="bus  not found "
  }
  

}
