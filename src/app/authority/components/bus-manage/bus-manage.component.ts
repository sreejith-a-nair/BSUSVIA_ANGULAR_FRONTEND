import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BusResponse } from 'src/app/core/interface/bus-response';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { AddBusComponent } from '../add-bus/add-bus.component';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { BusRequest } from 'src/app/core/interface/busadd-request';
import { BusEditRequest } from 'src/app/core/interface/busEditRequest';
import { EditBusComponent } from '../edit-bus/edit-bus.component';

@Component({
  selector: 'app-bus-manage',
  templateUrl: './bus-manage.component.html',
  styleUrls: ['./bus-manage.component.css']
})
export class BusManageComponent {

  busManage: BusResponse[] = [];
  // bus:BusResponse|undefined;
  private _dialog: any;
 

  searchKeyword !: string ;

  constructor(private authorityService: AuthorityServiceService,
              private jwtservice:JwtServiceService,
              private route: ActivatedRoute,
              private router : Router,
              private dialog: MatDialog) {
   
  }

  HeadingArray = [
    { Head: 'Bus Name', bodyKey: 'busName' },
    { Head: 'Bus Number', bodyKey: 'busNumber' },
    { Head: 'Bus Type', bodyKey: 'busType' },
    { Head: 'Total Seats', bodyKey: 'totalSeats' },
    { Head: 'Available Seats', bodyKey: 'availableSeats' },
    { Head: 'Doubl seat', bodyKey: 'doubleSeatCount' },
    { Head: 'Triple Seat', bodyKey: 'thirdRowSeatCount' },
    { Head: 'Fare', bodyKey: 'fare' },
    { Head: 'Category', bodyKey: 'category' },
    { Head: 'Edit', bodyKey: 'edit' },
    { Head: 'Delete', bodyKey: 'delete' },
    { Head : 'MoreDetails',bodyKey : 'busmoreDetails'},
];


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
   
      const email:string|null=this.jwtservice.extractEmail();
      console.log("get  authority mail ",email);
      
      this.authorityService.getAllBusByMail(email).subscribe(item=>{
        console.log("get all bus by mail ",item);
        this.busManage = item ;
      });
      
    });
  }
    
  deleteBusData(busId: string|any) {
    console.log("Bus ID   ", busId);
    
    this.authorityService.deleteBusById(busId).subscribe(
      () => {
        console.log("user deleted successfully");
        location.reload();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
    }

  editBus(busId:string) {
    console.log("Edit event  ",busId);

   const busdata = this.busManage.filter(each => each.uuid === busId );
   console.log("exsisting data ",busId);

    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="650px";
    dialogConfig.data = { busData: busdata[0] };
    console.log("BUS Data for edit ",busdata);
    
    this.dialog.open(EditBusComponent,dialogConfig)
    }


  
viewMoreBus(busId : Event) {

  console.log("Bus  ID IS >>> ",busId);
  this.router.navigate(['/operator/view-root'], { queryParams: { busId: busId } });

  }

  addBus(){ 
      const dialogConfig= new MatDialogConfig();
      dialogConfig.width="650px";
      this.dialog.open(AddBusComponent,dialogConfig)
      this.router.navigate(['/authority/add-bus']);
    }
    getAllBus(){

    }

}


