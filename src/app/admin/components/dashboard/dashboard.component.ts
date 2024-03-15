import { Component, OnInit } from '@angular/core';
import { JwtServiceService } from 'src/app/service/jwt-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor( private service: JwtServiceService ){}
  message: string | undefined;

  ngOnInit(){
    // this.hello();
  }



}
