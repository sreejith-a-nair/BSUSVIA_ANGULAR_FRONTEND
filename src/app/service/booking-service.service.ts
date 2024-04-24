import { Injectable } from '@angular/core';
import { environment } from '../core/environment/enviroment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusResponse } from '../core/interface/bus-response';
import { BookingRequest } from '../core/interface/bookingRequest.mode';
import { TransactionDetails } from '../core/interface/transaction.model';
import { BookingResponse } from '../core/interface/bookingResponse.model';
import { BookingAllResponse } from '../core/interface/bookingAllRes.mode';
import { Rating } from '../core/interface/ratingResponse.moel';

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
    
    return this.http.post<BookingResponse>(`${BASE_URL}booking/bookBus?userMail=${userMail}`, bookingDetails);
  }
  bookNowWallet(bookingDetails:BookingRequest,busId:string,userMail:string|null):Observable<BookingResponse> {
    console.log("BOOKING WITH WALLET  : ",bookingDetails);
    
    return this.http.post<BookingResponse>(`${BASE_URL}booking/bookBusWithWallet?userMail=${userMail}`, bookingDetails);
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

    const url = `${BASE_URL}booking/bookingInvoice?bookingId=${bookingId}`;

    return this.http.get(url, {
      responseType: 'arraybuffer',
      headers: headers
    });
  }

  // sendTicketToEmail(bookingId: string): Observable<any> {
  //   const url = `${BASE_URL}booking/sendTicket`;
  //   const params = new HttpParams().set('bookingId', bookingId);
  //   return this.http.post<any>(url, {}, { params });
  // }
  sendTicketToEmail(bookingId: string): Observable<any> {
    const url = `${BASE_URL}booking/sendTicket?bookingId=${bookingId}`;
    return this.http.post<any>(url, {});
  }
  
  
  updatedSeatAfterBooking(busId: string): Observable<number[]> {
    const url = `${BASE_URL}booking/updatedSeatAfterBooking?busId=${busId}`;
    return this.http.get<number[]>(url);
  }

  updateSeatsAfterBlockSeat(busId: string): Observable<number[]> {
    const url = `${BASE_URL}booking/updateSeatsAfterBlockSeat?busId=${busId}`;
    return this.http.get<number[]>(url);
  }

    
  getAllBooking() :Observable<BusResponse[]> {
    return this.http.get<any>(BASE_URL + 'booking/getAllBooking');
   }

  findBookingByEmail(userMail: string | null): Observable<BookingAllResponse[]> {
    const url = `${BASE_URL}booking/getBookingByUserMail?userMail=${userMail}`;
    return this.http.get<BookingAllResponse[]>(url);
  }

  cancelBookingthis(bookingId: string): Observable<any> {
    return this.http.delete(BASE_URL + 'booking/cancelBooking/' + bookingId);
    // return this.http.delete(`${BASE_URL}booking/cancelBooking/${bookingId}`, { params: { canceledSeatCount: canceledSeatCount.toString() } });
  }

  findBookingById(bookingId: string | undefined) {
    const url = `${BASE_URL}booking/getBookingById?bookingId=${bookingId}`;
    return this.http.get<any>(url);
  }


  updateAvailableSeatAfterCancel(busId: string, canceledSeatCount: number){

    console.log("service : updateAvailableSeatAfterCancel : busId", busId, "canceledSeatCount", canceledSeatCount);
    const params = new HttpParams()
      .set('busId', busId)
      .set('canceledSeatCount', canceledSeatCount.toString());
    return this.http.post<BookingResponse>(`${BASE_URL}bus/updateAvailableSeatAfterCancel`, null, { params });

  }


  updateAvailableSeatAfterBooking(busId: string, bookedSeatCount: number) {
    console.log("service : updateAvailableSeatAfterBooking : busId", busId, "bookedSeatCount", bookedSeatCount);
  
    const params = new HttpParams()
      .set('busId', busId)
      .set('bookedSeatCount', bookedSeatCount.toString());
  
    return this.http.post<BookingResponse>(`${BASE_URL}bus/updateAvailableSeatAfterBooking`, null, { params });
  }


  blockSeat(busId: string, userMail: string | null,bookingDetails:any): Observable<any> {
    console.log("Bus id:", busId);
    return this.http.post<any>(`${BASE_URL}booking/blockSeat?userMail=${userMail}`, bookingDetails);
    
  }

  getBookingByBusId(busId: string): Observable<BookingAllResponse[]> {
    const url = `${BASE_URL}booking/getBookingByBusId?busId=${busId}`;
    return this.http.get<BookingAllResponse[]>(url);
  }
  
  addRating(ratingValue: number,bookingId:string,busId:string): Observable<any> {
    console.log("RAting value ",ratingValue);
    console.log("bookigId value ",bookingId);
    console.log("busId value ",busId);
    const url = `${BASE_URL}bus/addRating?ratingValue=${ratingValue}&bookingId=${bookingId}&busId=${busId}`;
    return this.http.post<any>(url,{});
  }
 
 

  getBusRating(busId: string): Observable<Rating> {
    console.log("bus id for rating: ", busId);
    return this.http.get<Rating>(`${BASE_URL}getRating?busId=${busId}`);
  }
   
  getCouponList() {
   
  }
  

}


