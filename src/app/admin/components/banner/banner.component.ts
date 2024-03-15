import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { loadBus } from 'src/app/state/user.action';
import { getuserlist } from 'src/app/state/user.selector';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

 

  constructor(private jwtService: JwtServiceService, private store:Store,private dialog: MatDialog) {

    
  }
  // ngOnInit() {
  //   this.store.dispatch(loadBus());
  //   this.store.select(getuserlist).subscribe(item=>{
  //     this.users = item;
  //     console.log(this.users);
  //   });
  // }

}
