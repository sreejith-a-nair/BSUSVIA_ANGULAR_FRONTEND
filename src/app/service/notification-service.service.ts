import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../core/environment/enviroment';

const BASE_URL= environment.BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {



  private fcmUrl = 'https://fcm.googleapis.com/fcm/send';
  private serverKey = 'AAAAAk0b7Pg:APA91bGqT9bPZB1P60NlozB6vRzn0oyn50PBZYWHIt58CoHQ1aha9zhvm6L6PXDP-zIYXX3S_0UvzIrbZK66f8VJxUt1E4Ms4zg87TL1JtWSB7oVZ-8NkGXeafNdNhvHCk7CTxLTOrbi';

  constructor(private http: HttpClient) {}

  sendNotification(deviceToken: string, title: string, message: string, topic: string,url:string,email:any): Observable<any> {
    console.log("service work");
    
    const payload = {
      title: title,
      message: message,
      topic: topic,
      token: deviceToken,
      url:url,
      email:email
    }
    console.log("payload",payload);

    return this.http.post<any>(`${BASE_URL}send-notification`, payload);
  }

  receiveMessage(){

  }

}
