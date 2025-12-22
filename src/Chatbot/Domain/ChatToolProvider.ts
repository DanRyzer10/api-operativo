import { User } from "../../User/Domain/User";

export interface ChatToolProvide {
    getUserInfo(email:string):Promise<User|null>;
    sendeMessageAlert(phone:string,message:string):Promise<void>;
}