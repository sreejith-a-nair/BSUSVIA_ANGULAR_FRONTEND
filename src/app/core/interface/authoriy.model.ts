
export interface Authority {
    uuid: string; 
    firstName: string;
    lastName: string;
    email: string;
    contact:string;
    role: string;
    gender: string;
    isBlock ?: boolean;

  } 
  
  export interface AuthorityModel{
    list: Authority[],
    authorityObj: Authority,
    errormessage: string
}
  