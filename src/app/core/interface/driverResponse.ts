export interface DriverResponse {
    uuid: string; 
    firstName: string;
    lastName: string;
    email: string;
    contact:string;
    role: string;
    isBlock ?: boolean;
    busId:string;
  }
  export interface DriverModel{
    list: DriverResponse[],
    userObj: DriverResponse,
    errormessage: string
  }