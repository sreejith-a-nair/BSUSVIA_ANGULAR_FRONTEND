import { Injectable } from '@angular/core';
import { environment } from '../core/environment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoreDetailsResponse } from '../core/interface/more-response';

const BASE_URL= environment.BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  



  constructor(private  http :HttpClient) { }

  viewMore(userId: string):Observable<MoreDetailsResponse[]> {
    console.log("In service full data ",userId);
 
    return this.http.get<any>(`${BASE_URL}user/getAuthorityMoreDetails?userId=${userId}`);
    
  }


}
