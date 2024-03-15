import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-commontable',
  templateUrl: './commontable.component.html',
  styleUrls: ['./commontable.component.css']
})
export class CommontableComponent implements OnInit{


  selectedBus: string | undefined;
  @Input() busManage: any[] = [];
  // @Input() driverBus: any[] = [];

  @Input() HeadingArray:any []=[];
  @Input() GridArray:any[]=[];
  @Output() Delete= new EventEmitter<any>();
  @Output() viewMoreDetails= new EventEmitter<any>();
  @Output() viewMoreBusDetails= new EventEmitter<any>();
  @Output()edit = new EventEmitter<any>();
  @Output()assignBusToOperator = new EventEmitter<any>();
  @Output()viewDriverBus = new EventEmitter<any>();
  @Output()addRoot = new EventEmitter<any>();
  @Output()addSeatRow = new EventEmitter<any>();
  @Output()viewSeatRow = new EventEmitter<any>();
  @Output()viewroot = new EventEmitter<any>();
  @Output()viewStop   = new EventEmitter<any>();
  @Output()addStop   = new EventEmitter<any>();


  constructor(){}
  ngOnInit(): void {
     console.log('ffrom tablel')
    console.log(this.GridArray)
    console.log('Bus Manage array:', this.busManage);
    console.log("Driver bus data in common component",this.GridArray)
   }

   onDelete(uuid : any){
    this.Delete.emit(uuid)

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
  
    
}
