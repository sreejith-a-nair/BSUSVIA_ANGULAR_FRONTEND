import { Gender } from "../../authentication/components/enum/enum";
export interface RegisterResponse {
    uuid:string,
    firstName:string;
    lastName:string;
    email:string;
    contact: string;
    password:string;
    role:string;
    gender: Gender;
   
}
