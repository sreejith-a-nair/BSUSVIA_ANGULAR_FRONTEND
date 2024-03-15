import { Component } from '@angular/core';
import { JwtServiceService } from './service/jwt-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'atles-agngular';

  constructor(private authService: JwtServiceService) {}


 
}
