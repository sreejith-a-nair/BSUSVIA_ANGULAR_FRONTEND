import { Injectable } from '@angular/core';
import { environment } from '../core/environment/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtServiceService } from './jwt-service.service';
import { BusResponse } from '../core/interface/bus-response';
import { SearchRequest } from '../core/interface/searchRequest';
import { formatDate } from '@angular/common';
import { UserMoreDetailRequest } from '../core/interface/userMoreDetail.model';
import { UpdateWalletRequest } from '../core/interface/walletReq.model';
import { UpdateWalletAfterBookingRequest } from '../core/interface/updteWalletRequestAfterbooking.model';


const BASE_URL= environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
 
  
 


  constructor(private httpClient:HttpClient,private jwtService : JwtServiceService) { }

    forgotPasswordForm(data: any) {
      return this.httpClient.post<any>(BASE_URL+"auth/forgotPassword",data)
    }

  changePassword(data: any){
    return this.httpClient.post<any>(BASE_URL+"auth/changePassword",data)
  }

  changePasswordUser(data: any){
    return this.httpClient.post<any>(BASE_URL+"auth/changePasswordUser",data)

  }

  getUserProfile(): Observable<any> {
    const emailId: string = this.getEmail();
    console.log("EMAIL ID :: ",emailId);
 
    const url = `${BASE_URL}user/profile/${emailId}`;
    
    return this.httpClient.get<any>(url);
    
  }

  
  getEmail(): string {
    const email: string | null = this.jwtService.extractEmail();
    return email ? email : '';
  }

  getMapHtml(): Observable<string> {
    console.log("Service works for map");
    const url = `${BASE_URL}showMap`;
    return this.httpClient.get<string>(url);
  }



    searchBus(searchData: SearchRequest): Observable<any> {
      const url = `${BASE_URL}bus/searchBus`;
      return this.httpClient.post<any>(url, searchData);
    }
    
    
    filterByfeature(value: string): Observable<any> {
      const url = `${BASE_URL}bus/filterBusByFeature`;
      return this.httpClient.post<any>(url, { category: value });
    }

    getBusesBetweenTimePeriod(startTime: string, endTime: string): Observable<any> {
      return this.httpClient.get(`${BASE_URL}bus/findBusesByTimeRange?startTime=${startTime}&endTime=${endTime}`);
    }

    addMoreUserDetails(formData: UserMoreDetailRequest): Observable<any> {
      console.log("service : ",formData);
      
      return this.httpClient.post<any>(`${BASE_URL}user/add-more-details`, formData);
    }


    blockBus(userId: any): Observable<any> {
      console.log("Block service");
      // return this.httpClient.post<any>(`${BASE_URL}user/unblockUser`, { userId });
      const url =`${BASE_URL}bus/blockBus/${userId}`;
      console.log(url);
      
      return this.httpClient.post<any>(url, {});

    }

    unblockBus(userId: any): Observable<any> {
      console.log("unBlock service");
      // return this.httpClient.post<any>(`${BASE_URL}user/unblockUser`, { userId });
      const url =`${BASE_URL}bus/unblockBus/${userId}`;
      console.log(url);
      
      return this.httpClient.post<any>(url, {});

    }




   
    blockUser(userId: any): Observable<any> {
      console.log("Block service");
      // return this.httpClient.post<any>(`${BASE_URL}user/unblockUser`, { userId });
      const url =`${BASE_URL}user/blockUser/${userId}`;
      console.log(url);
      
      return this.httpClient.post<any>(url, {});

    }
  
    unblockUser(userId: any): Observable<any> {
      console.log("unBlock service");
      // return this.httpClient.post<any>(`${BASE_URL}user/unblockUser`, { userId });
      const url =`${BASE_URL}user/unblockUser/${userId}`;
      console.log(url);
      
      return this.httpClient.post<any>(url, {});

    }

    blockCoupon(couponId: any): Observable<any>  {
      const url =`${BASE_URL}bus/blockCoupon/${couponId}`;
      console.log(url);
      
      return this.httpClient.post<any>(url, {});
    }
  

    unBlockCoupon(couponId: any): Observable<any>  {
      const url =`${BASE_URL}bus/unBlockCoupon/${couponId}`;
      console.log(url);
      
      return this.httpClient.post<any>(url, {});
    }


      getUseByEmail(userMail: string | null) {
      console.log("nav bar user fgiond in service ",userMail);
      
      const url = `${BASE_URL}user/getUserByMail?userMail=${userMail}`;
      console.log("URL:", url);
      return this.httpClient.get<any>(url);
    }

    // updateWallet(totalFare: number, email: any,bookingId:any) {
      
    // }
    updateWalletAndRetrieve(request: UpdateWalletRequest): Observable<any> {
      console.log("service wallet  ",request);
      
      return this.httpClient.post<any>(`${BASE_URL}user/updateWalletAndRetrieve`, request);
    }

    updateWalletAfterBooking(request: UpdateWalletRequest): Observable<any> {
      console.log("service wallet  updateWalletAfterBooking  * * * ",request);
      
      return this.httpClient.post<any>(`${BASE_URL}user/updateWalletAfterBooking`, request);
    }


    getWallet(email: string): Observable<any> {
      return this.httpClient.get<any>(`${BASE_URL}user/getWallet?email=${email}`);
    }
     
}
function jwt_decode(arg0: string): any {
  throw new Error('Function not implemented.');
}

