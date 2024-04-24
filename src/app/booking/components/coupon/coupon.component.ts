import { Component } from '@angular/core';
import { CouponInfo } from 'src/app/core/interface/couponRequest.model';
import { AddCouponComponent } from '../add-coupon/add-coupon.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { TosterService } from 'src/app/service/toster.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { EditCouponComponent } from '../edit-coupon/edit-coupon.component';
import { JwtHeader } from 'jwt-decode';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent {


  constructor(private formBuilder: FormBuilder,
    private dialog:MatDialog,
    private adminservice:AdminServiceService,
    private router : Router, 
    private tostersrevice : TosterService,
    private snackBar: MatSnackBar,
    private userService : UserServiceService) { }


  couponInfo : CouponInfo[] = [];

  ngOnInit(): void {

      this.adminservice.getAllCoupon().subscribe(item=>{
        console.log("get all bus by mail ",item);
        this.couponInfo = item ;
      });

  }

  HeadingArray = [
    { Head: 'Coupon Name', bodyKey: 'couponName' },
    { Head: 'Code', bodyKey: 'couponCode' },
    { Head: 'Expiry Date', bodyKey: 'expiryDate' },
    { Head: 'Count', bodyKey: 'count' },
    { Head: 'Max Price', bodyKey: 'maxPrice' },
    { Head: 'Min Fare', bodyKey: 'minFare' },
    { Head: 'Off Percent', bodyKey: 'offPercent' },
    { Head: 'Edit', bodyKey: 'edit' },
    { Head: 'Delete', bodyKey: 'delete' },
    {Head : 'Restrict',bodyKey : 'couponRestrict'},
  ];

    addCoupon() {
      const dialogRef = this.dialog.open(AddCouponComponent, {
          width: '650px',

      });
  
      dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          
      });
  }


      onRestrictCoupon(event: any) {
        
        const { uuid, enabled } = event;
        console.log("UUID : coupon ", uuid);
        console.log("coupon  :  ", enabled);
        if(enabled){
          console.log("if");
        
        this.userService.blockCoupon(uuid).subscribe(
          () => {
            console.log("coupon blocked successfully");
            this.updateCoupon();
           
          },
          error => {
            console.error("Error blocking user:", error);
            this.updateCoupon();
            
          }
        );
    
  
        }else{
  
          console.log("else");
        
          this.userService.unBlockCoupon(uuid).subscribe(
            () => {
              console.log("User unblocked successfully");
              this.updateCoupon();
              
            },
            error => {
              console.error("Error unblocking user:", error);
              this.updateCoupon();
              
            }
          );
  
        }

      }
    
      editCoupon(couponId: string) {
        console.log("Edit event  ", couponId);
      
        const couponData = this.couponInfo.filter(each => each.uuid === couponId);
        console.log("existing data ", couponData);
    
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = "650px";
        dialogConfig.data = { couponData: couponData[0] };
    
        const dialogRef: MatDialogRef<EditCouponComponent> = this.dialog.open(EditCouponComponent, dialogConfig);
    
        dialogRef.afterClosed().subscribe(result => {
          location.reload(); 
        });
      }
      
      updateCoupon() {
      
          this.adminservice.getAllCoupon().subscribe(item => {
            this.couponInfo = item;
          });
        }
      
      deleteCouponData(busId: string|any) {
        console.log(" deleteCouponData work  ");
      }


}
