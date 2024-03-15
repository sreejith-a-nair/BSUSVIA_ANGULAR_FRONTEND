import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BusResponse } from 'src/app/core/interface/bus-response';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { User } from 'src/app/user.model';
import { BusSelectionDialogComponentComponent } from '../bus-selection-dialog-component/bus-selection-dialog-component.component';

@Component({
  selector: 'app-driver-manage',
  templateUrl: './driver-manage.component.html',
  styleUrls: ['./driver-manage.component.css']
})
export class DriverManageComponent {


  driverDetails: User[] = [];
  private _dialog: any;
  busManage: BusResponse[] = [];
 

  searchKeyword !: string ;

  constructor(private authorityService: AuthorityServiceService,
              private jwtservice:JwtServiceService,
              private route: ActivatedRoute,
              private router : Router,
              private dialog: MatDialog
              ) {
   
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
   
      const email:string|null=this.jwtservice.extractEmail();
      console.log("get  authority mail ",email);
      
      this.authorityService.getAllDriverByAuthorityMail(email).subscribe(item=>{
        console.log("get all bus by mail ",item);
        this.driverDetails = item  as any;
        console.log("get buses ",item);
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

 

  HeadingArray = [
    { Head: 'Name', bodyKey: 'firstName' },
    { Head: 'Email', bodyKey: 'email' },
    { Head: 'Gende ', bodyKey: 'gender' },
    { Head: 'Contact', bodyKey: 'contact' },
    { Head: 'Role ', bodyKey: 'role' },
    { Head: 'Delete', bodyKey: 'delete' },
    { Head : 'AssignBus',bodyKey : 'addBusToOperator'},
    { Head: 'View Bus', bodyKey: 'viewDriverBuses' },
];


AssignBusToOperator(uuid : string) {
  const email: string | null = this.jwtservice.extractEmail();

  console.log("Authority email Id = ", email);

  this.authorityService.getAllBusByMails(email).subscribe(
    (buslist: any[]) => {
      this.busManage = buslist;
      console.log("Authority buses" ,this.busManage);
      
      this.openBusSelectionDialog(uuid);
    },
    (error) => {
      console.error('Error fetching buses:', error);
    }
  );
}

openBusSelectionDialog(uuid:string) {
  
  console.log("Drive uuid for assign bus : " ,uuid);
  
  const dialogRef = this.dialog.open(BusSelectionDialogComponentComponent, {
    width: '500px',
    data: {
      authorityId: uuid,
      busManage: this.busManage
    }
  });


  dialogRef.afterClosed().subscribe(result => {
    if (result) {

    }
  });
}


viewDriverBuses(busId: string) {
  console.log("DriveR bUS UUID : " ,busId);

   this.authorityService.findDriverBusById(busId).subscribe(
    (buslist) => {
      console.log("DRIVER BUSES", buslist);
      this.router.navigate(['/authority/driver-bus'], { queryParams: { busList: JSON.stringify(buslist) } });
    },
    (error) => {
      console.error('Error fetching buses:', error);
    }
  );
  }

}
