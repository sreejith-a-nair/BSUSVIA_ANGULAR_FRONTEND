import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import * as jwt_decode from 'jwt-decode';
import { User } from '../user.model';
import { RegisterRequest } from '../core/interface/register-request';
import { RegisterResponse } from '../core/interface/register-response';
import { LoginRequest } from '../core/interface/login-request';
import { LoginResponse } from '../core/interface/login-response';
import { environment } from '../core/environment/enviroment';
import { MoreDetailsRequest } from '../core/interface/more-request';
import { MoreDetailsResponse } from '../core/interface/more-response';
import { Authority } from '../core/interface/authoriy.model';


// const BASE_URL=["http://localhost:8989/"];

 const BASE_URL= environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {
    
   

  loginForm: any;

  constructor(private  http :HttpClient) {} 


 
   register(signRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(BASE_URL + 'user/signup', signRequest);
  }

  moreDetails(moreRequest: MoreDetailsRequest): Observable<MoreDetailsResponse> {
    console.log("In service full data ",moreRequest);
    
    return this.http.post<MoreDetailsResponse>(BASE_URL + 'user/more-details', moreRequest);
  }


  login(loginRequest:LoginRequest):Observable<LoginResponse>{

    return this.http.post<LoginResponse>(BASE_URL+'auth/login', loginRequest)
  }


  logout():void{

    localStorage.removeItem('jwt');
    this.http.post(BASE_URL + 'logout',{});
  }


  getAllAuthority(role : string):Observable<Authority[]> {
    const url = `${BASE_URL}user/getAllAuthority?role=${role}`;
      return this.http.get<Authority[]>(url);
     }



  getAllUsers(): Observable<User[]>{
        return this.http.get<User[]>(BASE_URL + 'user/getAll');
 
    }

  getExistingAuthorityEmails(role : string): Observable<Authority[]> {
      const url = `${BASE_URL}user/getAllAuthorityByRole?role=${role}`;
      return this.http.get<Authority[]>(url);
    }
    

  extractRole(): string | null {

    const jwtTok = localStorage.getItem('jwt');
    
 
    if (jwtTok) {
      try {
        const decodedToken: any = jwt_decode.jwtDecode(jwtTok as string);
       
        const role = decodedToken.role;
        return role;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    } else {
     
      return null;
    }
  }

  extractEmail(): string | null {
    const jwtToken = localStorage.getItem('jwt');
  
    console.log("extractEmail   ...", jwtToken);
  
    if (jwtToken) {
      try {
        const decodedToken: any = jwt_decode.jwtDecode(jwtToken as string);
        console.log("Decoded    ...", decodedToken.email);
        const email = decodedToken.userName;
        return email;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    } else {
      console.log('Token not found in localStorage');
      return null;
    }
  }


  deleteUser(userId: string): Observable<any> {
    return this.http.delete(BASE_URL + 'user/delete/' + userId);
  }
  deleteAuthority(authorityId: string): Observable<any> {
    return this.http.delete(BASE_URL + 'user/delete/' + authorityId);
  }


  blockUser(userId: number): Observable<any> {
    return this.http.delete(BASE_URL + 'user/blockUser');
  }

  unBlockUser(userId: number): Observable<any> {
    return this.http.delete(BASE_URL + 'user/unBlockUser/'+userId);
  }
  

  // hello():Observable<any>{
  //   return this.http.get(BASE_URL+"user/hello")
  // }


  observable = new Observable ((data)=>{
    data.next("data");
  })


}


function Of(arg0: null): Observable<any> {
  throw new Error('Function not implemented.');
}

 
