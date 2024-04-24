import { Injectable } from '@angular/core';
import { environment } from '../core/environment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoreDetailsResponse } from '../core/interface/more-response';
import { CouponInfo } from '../core/interface/couponRequest.model';

const BASE_URL= environment.BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  


  constructor(private  http :HttpClient) { }

  addCoupon(couponData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'bus/addCoupon', couponData);
  }


  updateCoupon(couponData: any, couponId: any) {
    return this.http.post<any>(`${BASE_URL}bus/editCoupon/${couponId}`, couponData);
  }


  viewMore(userId: string):Observable<MoreDetailsResponse[]> {
    console.log("In service full data ",userId);
 
    return this.http.get<any>(`${BASE_URL}user/getAuthorityMoreDetails?userId=${userId}`);
    
  }

  getAllCoupon():Observable<CouponInfo[]> {
    return this.http.get<any>( BASE_URL + 'bus/getAllCoupon'); 
  }
  showAllCoupons():Observable<CouponInfo[]> {
    return this.http.get<any>( BASE_URL + 'bus/showAllCoupon'); 
  }

  applyCoupon(selectedCoupon: CouponInfo, totalFare: number) {
    const url = `${BASE_URL}bus/applyCoupon`;
    const payload = { selectedCoupon, totalFare };
    return this.http.post<any>(url, payload);

    // return this.http.post<any>(BASE_URL + 'bus/applyCoupon', { selectedCoupon, totalFare });
  }

}
  
 


