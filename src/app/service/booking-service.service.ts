import { Injectable } from '@angular/core';
import { environment } from '../core/environment/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusResponse } from '../core/interface/bus-response';
import { BookingRequest } from '../core/interface/bookingRequest.mode';
import { TransactionDetails } from '../core/interface/transaction.model';
import { BookingResponse } from '../core/interface/bookingResponse.model';
import { BookingAllResponse } from '../core/interface/bookingAllRes.mode';

const BASE_URL= environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {
 

  constructor(private  http :HttpClient) {}

  getBusById(busId: any): Observable<any> {
    console.log("uuid ",busId);
    
    return this.http.get<any>(BASE_URL + 'bus/findBusById', { params: { busId: busId } });
  }
  getBusRouteById(busId: any): Observable<any> {
    console.log("uuid for get route ",busId);
    
    return this.http.get<any>(BASE_URL + 'bus/findBusRouteByBusId', { params: { busId: busId } });
  }

  bookNow(bookingDetails:BookingRequest,busId:string,userMail:string|null):Observable<BookingResponse> {
    console.log("BookingRequest in service  : ",bookingDetails);
    console.log("Bus id  : ",busId);
    
    // return this.http.post<BookingResponse>(`${BASE_URL}booking/bookBus`, bookingDetails);
    return this.http.post<BookingResponse>(`${BASE_URL}booking/bookBus?userMail=${userMail}`, bookingDetails);
   
  }
  transaction(cash:any):Observable<any> {
 
    
    return this.http.post<any>(`${BASE_URL}booking/transaction`, cash);
   
  }
  bookingInvoicePdf(bookingId: string | undefined): Observable<ArrayBuffer> {
    console.log("booking id  in service  :  ",bookingId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      'Accept': 'application/pdf'
    });

    // Replace 'YOUR_BACKEND_ENDPOINT' with the actual endpoint to fetch the PDF
    const url = `${BASE_URL}booking/bookingInvoice?bookingId=${bookingId}`;

    return this.http.get(url, {
      responseType: 'arraybuffer',
      headers: headers
    });
  }

  updatedSeatAfterBooking(busId: string): Observable<number[]> {
    const url = `${BASE_URL}booking/updatedSeatAfterBooking?busId=${busId}`;
    return this.http.get<number[]>(url);
  }
  

    
  getAllBooking() :Observable<BusResponse[]> {
    return this.http.get<any>(BASE_URL + 'booking/getAllBooking');}
  
 
  //   findBookingByEmail(userMail: string | null): Observable<any>  {
  //     const url = `${BASE_URL}booking/getBookingByUserMail?userMail=${userMail}`;
  //      return this.http.get<any>(url);
  //  }
  findBookingByEmail(userMail: string | null): Observable<BookingAllResponse[]> {
    const url = `${BASE_URL}booking/getBookingByUserMail?userMail=${userMail}`;
    return this.http.get<BookingAllResponse[]>(url);
  }

  cancelBookingthis(bookingId: string): Observable<any> {
    return this.http.delete(BASE_URL + 'booking/cancelBooking/' + bookingId);
  }
}


