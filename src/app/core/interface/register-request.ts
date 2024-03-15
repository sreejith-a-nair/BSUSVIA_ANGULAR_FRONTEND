import { Role } from "src/app/authentication/components/enum/role.enum";
import { Gender } from "../../authentication/components/enum/enum";

export interface RegisterRequest {

    firstName:string;
    lastName:string;
    email:string;
    contact: string;
    password:string;
    confirmPassword:string;
    gender: Gender;
    role: Role;
    authorityEmail:string;
   
}
