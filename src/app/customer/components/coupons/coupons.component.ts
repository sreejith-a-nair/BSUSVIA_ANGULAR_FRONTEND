import { Component } from '@angular/core';
import { CouponInfo } from 'src/app/core/interface/couponRequest.model';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { BookingServiceService } from 'src/app/service/booking-service.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent {


  couponInfo : CouponInfo[] = [];

  constructor(private adminService : AdminServiceService) { }

  ngOnInit(): void {
    // Initialization logic, such as fetching coupons from a service
   this. adminService. getAllCoupon().subscribe(res=>{
    console.log("COUPON LIST ", res);
    this.couponInfo=res;
  },
    err=>{
      console.log("errror");
   
  
    })
  }

  getBackgroundColor(index: number) {
    // const colors = ['#4B9CD3', '#D46A6A', '#60B347']; // Add more colors as needed
    // return colors[index % colors.length];
  }
  getGradientBackground(index: number): any {
  
    const gradients = [
  
      // 'linear-gradient(132deg, #70ef4d 0%, #16A085 50%, #1e8247 100%)', 
      'linear-gradient(132deg, #1cfc9c 0%, #09a372 24%, #009d4f 49%, #00863f 75%, #015b3c 100%)',
      'linear-gradient(147deg, #e98045 0%, #e9431f 24%, #db1919 66%, #ab0909 100%)',
      'linear-gradient(160deg, #1589cc 0%, #2b57e7 33%, #311cdd 66%, #200bc8 100%)',
     
      // Adjusted gradient
      // Add more gradients as needed
    ];
      return gradients[index % gradients.length];;
    
    }

}
