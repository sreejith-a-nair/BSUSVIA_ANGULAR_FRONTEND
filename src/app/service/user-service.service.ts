import { Injectable } from '@angular/core';
import { environment } from '../core/environment/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtServiceService } from './jwt-service.service';
import { BusResponse } from '../core/interface/bus-response';
import { SearchRequest } from '../core/interface/searchRequest';
import { formatDate } from '@angular/common';


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
    
    return this.httpClient.get(url);
    
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

  // searchBus(departurePlace: SearchRequest, arrivalPlace: SearchRequest, departureDate: SearchRequest): Observable<any> {
  //   const searchParams = new HttpParams()
  //   .set('departurePlace', departurePlace.departurePlace)
  //   .set('arrivalPlace', arrivalPlace.arrivalPlace)
  //   .set('departureDate', departureDate.departureDate.toISOString()); 

  // const url  =`${BASE_URL}bus/searchBus`;
  
  // return this.httpClient.get<any>(url, { params: searchParams });
  // }
  // searchBus(searchData:SearchRequest): Observable<any> {
    
  // const url  =`${BASE_URL}bus/searchBus`;
  // console.log("search service url :   ",url+searchData);
  
  // return this.httpClient.get<any>(url+{ params: searchData });
  // }

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
     
}
function jwt_decode(arg0: string): any {
  throw new Error('Function not implemented.');
}

