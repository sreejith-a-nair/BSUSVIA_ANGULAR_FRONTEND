import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-commontable',
  templateUrl: './commontable.component.html',
  styleUrls: ['./commontable.component.css']
})
export class CommontableComponent implements OnInit{



  selectedBus: string | undefined;
  @Input() busManage: any[] = [];
  @Input() walletInfo:any[]=[];
  // @Input() driverBus: any[] = [];

  @Input() HeadingArray:any []=[];
  @Input() GridArray:any[]=[];
  @Output() Delete= new EventEmitter<any>();
  @Output() Restriuct= new EventEmitter<any>();
  @Output() Restrict= new EventEmitter<any>();
  @Output() RestrictCoupon= new EventEmitter<any>();
  @Output() viewMoreDetails= new EventEmitter<any>();
  @Output() viewMoreBusDetails= new EventEmitter<any>();
  @Output()edit = new EventEmitter<any>();
  @Output()assignBusToOperator = new EventEmitter<any>();
  @Output()viewDriverBus = new EventEmitter<any>();
  @Output()addRoot = new EventEmitter<any>();
  @Output()editRoot = new EventEmitter<any>();
  @Output()addSeatRow = new EventEmitter<any>();
  @Output()viewSeatRow = new EventEmitter<any>();
  @Output()viewroot = new EventEmitter<any>();
  @Output()viewStop   = new EventEmitter<any>();
  @Output()addStop   = new EventEmitter<any>();


  constructor(private userService : UserServiceService,private router: Router){}
  ngOnInit(): void {
     console.log('ffrom tablel')
    console.log(this.GridArray)
    console.log('Bus Manage array:', this.busManage);
    console.log('walletInfo array:', this.walletInfo);
    console.log("Driver bus data in common component",this.GridArray)
   }

   onDelete(uuid : any){
    this.Delete.emit(uuid)

   }
   restrictUser(uuid : any,active:any){
    this.Restriuct.emit({ uuid, active })

   }

   restrictBus(uuid: any,active: any) {
    this.Restrict.emit({ uuid, active })
    }
    
    restrictCoupon(uuid: any,enabled: any) {
      this.RestrictCoupon.emit({ uuid, enabled })
      }

   viewMore(athorityId: any) {
    this.viewMoreDetails.emit(athorityId)
    }

    viewMoreBusData(busId : any){
      this.viewMoreBusDetails.emit(busId);
    }

    editBus(uuid : any){
      this.edit.emit(uuid);
    }
    addBusToOperator(uuid:any ){
    this.assignBusToOperator.emit(uuid);
    }

    viewDriverBuses(busId: any) {
      this.viewDriverBus.emit(busId);
  }

//  route
  addRootandTime(uuid: string) {
    this.addRoot.emit(uuid); 
  }

   editRootTime(uuid: string){
  this.editRoot.emit(uuid);
  }
 
  
  viewRoot(uuid: string) {
      this.viewroot.emit(uuid);
  }

  // stop
viewStops(uuid: string) {
    this.viewStop.emit(uuid);
}
addStops(uuid: string) {
  this.addStop.emit(uuid);
}
viewSeatRows(uuid:string){
  this.viewSeatRow.emit(uuid);
}

addSeatRows(uuid:string){
  this.addSeatRow.emit(uuid);
}
  

toggleRestriction(userId:any,active:any) {

  console.log("user id when restrict ",userId);
  console.log("block status  ",active);
  if(active){
    console.log("if");
    
    this.userService.blockUser(userId).subscribe(
      () => {
        console.log("User blocked successfully");
        this.reloadCurrentRoute();
      },
      error => {
        console.error("Error blocking user:", error);
        this.reloadCurrentRoute();
      }
    );

  }else{
    console.log("else");
    
    this.userService.unblockUser(userId).subscribe(
      () => {
        console.log("User unblocked successfully");
        this.reloadCurrentRoute();
      },
      error => {
        console.error("Error unblocking user:", error);
        this.reloadCurrentRoute();
      }
    );
  }

  
}
    
reloadCurrentRoute() {
  console.log("relod");
  
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/customer/user-list', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
  });
}
}
