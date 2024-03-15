import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MoreDetailsResponse } from 'src/app/core/interface/more-response';
import { AdminServiceService } from 'src/app/service/admin-service.service';

@Component({
  selector: 'app-authority-more-details',
  templateUrl: './authority-more-details.component.html',
  styleUrls: ['./authority-more-details.component.css']
})
export class AuthorityMoreDetailsComponent {

  moreDetals: MoreDetailsResponse[] = [];
  private _dialog: any;
 

  searchKeyword !: string ;

  constructor(private adminService: AdminServiceService,
             private route: ActivatedRoute,
             private router : Router,
              private dialog: MatDialog) {
   
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      
      const userId = params['userId']; 
      console.log('User ID for more Details :', userId);
    
      this.adminService.viewMore(userId).subscribe(item=>{
        console.log("User more data list ",item);
        
        
        this.moreDetals = item ;

        this.router.navigateByUrl("/authority/authority-more-details?userId=" + userId);
      });
      
    });
  }
    
  

  HeadingArray = [
    { Head: 'Unique Name', bodyKey: 'uniqueName' },
    { Head: 'Authority Type', bodyKey: 'authorityType' },
    { Head: 'Location', bodyKey: 'location' },
    { Head: 'District', bodyKey: 'district' },
    { Head: 'Pincode', bodyKey: 'pincode' },
    { Head: 'Licence No', bodyKey: 'licenceNo' }
];  


}
