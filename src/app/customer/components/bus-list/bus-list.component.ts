import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css']
})
export class BusListComponent {

  buses: any[] = [];
  originalBuses: any[] = [];
  departurePlace="";
  arrivalPlace="";
  departdate="";
  constructor(private route: ActivatedRoute,private userService: UserServiceService,private router: Router) {}

  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params && params['buses']) {
        this.originalBuses = JSON.parse(params['buses']);
      this.buses = [...this.originalBuses]; 
        // Parse the response data from JSON string
        this.buses = JSON.parse(params['buses']);
        this.departurePlace=JSON.parse(params['buses']);
        console.log("Buses: in bus list component ", this.buses);
        if (this.buses && this.buses.length > 0) {
          this.departurePlace = this.buses[0].sourceLocation;
          this.arrivalPlace = this.buses[0].destinationLocation;
          this.departdate=this.buses[0].departureDate;
        }
      }
    });
  }

  // featue filter
 
  clear(): any {
    this.buses = [...this.originalBuses];
  }

  filterBySeatType(value: string): any {

    if (value) {
      this.buses = this.originalBuses.filter(bus => bus.category === value);
    } else {
      
      this.buses = [...this.originalBuses];
    }

  }

  checkTimeRange(startTime: string, endTime: string) {
   
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    this.userService.getBusesBetweenTimePeriod(startTime,endTime).subscribe(response =>{
      console.log('Response from backend filter time date buses   ) = = = >', response);
      this.buses=response;

    }, error => {
   
      console.error('Error occurred: timedate buses ', error);
    });

  
  }
 
selectSeats(busId: any) {
  console.log("bus id ", busId);
  this.router.navigate(['/booking/view-seats'], { queryParams: { busId: busId } });
}


}


