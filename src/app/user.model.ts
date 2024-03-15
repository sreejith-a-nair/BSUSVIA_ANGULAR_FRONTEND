
  export interface User {
    uuid: string; 
    firstName: string;
    lastName: string;
    email: string;
    contact:string;
    role: string;
    isBlock ?: boolean;
  }

  export interface UserModel{
    list: User[],
    userObj: User,
    errormessage: string
  }
