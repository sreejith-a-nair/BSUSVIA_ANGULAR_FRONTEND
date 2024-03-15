import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../core/environment/enviroment';
import { DriverResponse } from '../core/interface/driverResponse';
import { Observable, catchError, throwError } from 'rxjs';
import { BusResponse } from '../core/interface/bus-response';

const BASE_URL= environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class DriverServiceService {
 

 

  constructor(private  http :HttpClient) {} 

  

  getBusByDriverEmail(driverMail: string| null): Observable<BusResponse[]>  {
    const url = `${BASE_URL}user/getBUSByDriverId?driverMail=${driverMail}`;
    console.log("URL:", url);
    return this.http.get<BusResponse[]>(url);
}


getBusRootAndTime(busId: string): Observable<any> {
  return this.http.get<any>(BASE_URL + 'user/getBusRootById?busId=' + busId)
    .pipe(
      catchError(error => {
        console.error('Error fetching bus root and time:', error);
        return throwError(error);
      })
    );
}


getBusRootAndTimes(uuid: any): Observable<any> {
  return this.http.get<any>(`${BASE_URL}user/getBusRootByUuid?uuid=${uuid}`)
    .pipe(
      catchError(error => {
        console.error('Error fetching bus root and time:', error);
        return throwError(error);
      })
    );
}

addStopForRoute(stopsData: { routeId: string | null | undefined; stops: { number: number; selectedDistrict: string; sequenceNumber?: number | undefined; }[]; }): Observable<any> {
  const routeId = stopsData.routeId;
  const stops = stopsData.stops;

  const busStops = stops.map(stop => {
    const busStop = {
      stopName: stop.selectedDistrict, 
      sequenceNumber: stop.sequenceNumber || 0, 
      
    };
    return busStop;
  });

  const requestBody = {
    routeId: routeId,
    stops: busStops
  };

  return this.http.post<any>(BASE_URL + 'bus/addBusStop', requestBody)
    .pipe(
      catchError(error => {
        console.error('Error adding stops for route:', error);
        return throwError(error);
      })
    );
}

addSeatRows(seatRows: any): Observable<any> {
  console.log(seatRows);
 
  return this.http.post<any>(BASE_URL + 'bus/addSeatRows', seatRows);
}

}
