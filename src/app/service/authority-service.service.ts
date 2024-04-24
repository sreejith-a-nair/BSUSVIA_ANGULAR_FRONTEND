import { Injectable } from '@angular/core';
import { environment } from '../core/environment/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { BusResponse } from '../core/interface/bus-response';
import { BusRequest } from '../core/interface/busadd-request';
import { RouteTimeDataRequest } from '../core/interface/route-time-request';
import { RouteTimeDataResponse } from '../core/interface/route-and-time-response';
import { User } from '../user.model';
import { DriverResponse } from '../core/interface/driverResponse';
import { DatePipe } from '@angular/common';
import { WalletResponse } from '../core/interface/walletResponse.model';


const BASE_URL= environment.BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class AuthorityServiceService {
 
 
 
  
       
  constructor(private  http :HttpClient) { }

  getAllBus():Observable<BusResponse[]> {
    return this.http.get<any>(BASE_URL + 'bus/getAllBus');
  }

  getAllBooking():Observable<any[]> {
    console.log("service caled ");
    
    return this.http.get<any>(BASE_URL + 'booking/getAllBooking');
  }
  getAllBookingByMail():Observable<any[]> {
    console.log("service caled ");
    
    return this.http.get<any>(BASE_URL + 'booking/getAllBooking');
  }

  getAllNotificationByEmail(email: string | null) :Observable<any[]>{
    return this.http.get<any>(BASE_URL + 'booking/getAllNotificationByEmail');
  }

// bus service bus entity
  getAllBusByMail(email: string | null): Observable<any> {
      const url = `${BASE_URL}bus/getAllBusByEmail`;
      console.log("service layer ",url);
      return this.http.get<BusResponse[]>(url, { params: { email } } as any);
  }

// user walet history 
getUserWalletHistory(email: string | null): Observable<any> {
  const url = `${BASE_URL}user/getUserWalletHistory`;
  console.log("service layer wallet history * * *  ",url);
  return this.http.get<WalletResponse[]>(url, { params: { email } } as any);
}


// end


// usert service bus entity
getAllBusByMails(email: string | null): Observable<any> {
  const url = `${BASE_URL}user/getAllBusByEmail`;
  console.log("service layer for get bus from user service * * *",url);
  
  return this.http.get<BusResponse[]>(url, { params: { email } } as any);
}


  getAllDriverByAuthorityMail(mail: string | null):Observable<DriverResponse[]> {
    const url = `${BASE_URL}user/getAllDriverByAuthorityMail/${mail}`;
    console.log(url);
    
    return this.http.get<DriverResponse[]>(url);
  }
  
  storeBusInDriver(authorityId: string | undefined, selectedBusId: string): Observable<string>{
    const data = {
      authorityId: authorityId,
      selectedBusId: selectedBusId
    };
    return this.http.post<string>(BASE_URL + 'user/addBusToDriver' , data);
  }
  

  deleteBusById(busId: string): Observable<any> {
    return this.http.delete(BASE_URL + 'bus/deleteBus/' + busId);
  }


  addBus(busData: BusRequest): Observable<BusResponse> {
    return this.http.post<BusResponse>(BASE_URL + 'bus/add', busData);
  }

   
  updateBus(busData: BusResponse,busId : string) {
    console.log("edit submit service ",busId);
    
    return this.http.post<BusResponse>(`${BASE_URL}bus/edit-bus/${busId}`, busData);
  }

  updateRoute(routeData: any, routeId: any) {
    return this.http.post<BusResponse>(`${BASE_URL}bus/edit-root/${routeId}`, routeData);
  }
 

  updateUser(userData: any, userId: any) {
    console.log("service : ", userId, "data ",userData);
    
    return this.http.post<BusResponse>(`${BASE_URL}user/updateUser/${userId}`, userData);
  }
  
 


  editBusGet(busId : String):Observable<BusResponse>{
    return this.http.get<BusResponse>(BASE_URL + 'bus/editBus'+ busId);
  }

  editBusPost(busData:BusRequest): Observable<BusResponse>{
    return this.http.post<BusResponse>(BASE_URL + 'bus/editBus',busData);
  }

  addRouteAndTime(routeTimeData: RouteTimeDataRequest) {
  
    return this.http.post<RouteTimeDataResponse>(BASE_URL + 'user/addBusRootAndTime',routeTimeData);
  }
  
  findDriverBusById(busId: string): Observable<BusResponse> {
    return this.http.get<BusResponse>(BASE_URL + 'user/findDriverBusById', { params: { busId: busId } });
  }
  
  addRouteAndTimeByDriver(routeTimeData: RouteTimeDataRequest, busId: any) {
    console.log("ServiceWorker" ,busId);
    const requestBody = { ...routeTimeData, busId };
    console.log("Service request body" ,requestBody);
    
    return this.http.post<any>(`${BASE_URL}user/addBusRootAndTime/${busId}`, requestBody);
  }
  // addRouteAndTimeByDriver(routeTimeData: RouteTimeDataRequest, busId: any): Observable<any> {
  //   const date = this.datePipe.transform(new Date(), 'yyyy-MM-dd') ?? ''; 
  //   const datetime = new Date().toISOString();
    
  //   const params = new HttpParams()
  //     .set('date', date)
  //     .set('datetime', datetime);
    
  //   console.log("ServiceWorker", busId);
  //   const requestBody = { ...routeTimeData, busId };
  //   console.log("Service request body", requestBody);

  //   return this.http.post<any>(`${BASE_URL}user/addBusRootAndTime/${busId}`, requestBody, { params });
  // }
 
}
