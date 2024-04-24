import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';

@Component({
  selector: 'app-all-buslist',
  templateUrl: './all-buslist.component.html',
  styleUrls: ['./all-buslist.component.css']
})
export class AllBuslistComponent {
  busList: any[] = [];


  
  constructor(private jwtService: JwtServiceService,
              private authorityService : AuthorityServiceService,
              private router : Router,
              private dialog: MatDialog) {
              this.busList = [];

}


HeadingArray = [
  { Head: 'Bus Name', bodyKey: 'busName' },
  { Head: 'Bus Number', bodyKey: 'busNumber' },
  { Head: 'Bus Type', bodyKey: 'busType' },
  { Head: 'Lower Seats', bodyKey: 'lowerSeat' },
  { Head: 'Available Seats', bodyKey: 'availableSeats' },
  { Head: 'Fare', bodyKey: 'fare' },
  { Head: 'Category', bodyKey: 'category' },
  { Head: 'single', bodyKey: 'doubleSeatCount' },
  { Head: 'Double', bodyKey: 'thirdRowSeatCount' },
  { Head: 'Status', bodyKey: 'status' },
];
                 
  ngOnInit(): void {
  
   this.authorityService.getAllBus().subscribe(busList=>{
                    console.log("User more data list ",busList);              
     this.busList=busList;
        
  });
                  
 }
}
