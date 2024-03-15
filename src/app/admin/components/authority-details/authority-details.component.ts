import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Authority } from 'src/app/core/interface/authoriy.model';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { loadAuthority, loadUser } from 'src/app/state/user.action';
import { getauthoritylist, getuserlist } from 'src/app/state/user.selector';


@Component({
  selector: 'app-authority-details',
  templateUrl: './authority-details.component.html',
  styleUrls: ['./authority-details.component.css']
})
export class AuthorityDetailsComponent {


  authority: any[] = [];
  private _dialog: any;
  filteredUsers !: Authority[] ;

  searchKeyword !: string ;

    constructor(private jwtService: JwtServiceService,
                private store:Store,private route: ActivatedRoute,
                private router : Router,
                private dialog: MatDialog) {
      this.authority = [];
      this.filteredUsers = this.filteredUsers;
    }

  HeadingArray=[{Head : 'Firstname',bodyKey : 'firstName'},
  {Head : 'LastName',bodyKey : 'lastName'},
  {Head : 'Email',bodyKey : 'email'},
  {Head : 'Contact',bodyKey : 'contact'},
  {Head : 'Role',bodyKey : 'role'},
  {Head : 'Delete',bodyKey : 'delete'},
  // {Head : 'Restrict',bodyKey : 'restrict'},
  {Head : 'MoreDetails',bodyKey : 'moreDetails'},

                  ];


  ngOnInit() {

    this.store.dispatch(loadAuthority({ role: 'Authority'}));

    
    this.store.select(getauthoritylist).subscribe(item=>{
      this.authority = item as any[];
      console.log(this.authority);
    });
  }

  onDeleteAuthority(userId: string|any) {
    debugger;
    console.log("USER ID  >>>   ", userId);
    
    this.jwtService.deleteUser(userId).subscribe(
      () => {
        console.log("user deleted successfully");
        location.reload();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
  viewMoreAuthority(event : Event) {
      
    console.log("USER ID IS >>> *****",event);
    this.router.navigate(['/admin/authority-more-details'], { queryParams: { userId: event } });

    }

}

