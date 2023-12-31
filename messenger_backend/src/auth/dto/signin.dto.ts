import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SigninDto{

    
    @IsEmail()
    userEmail: string;

    @IsNotEmpty()
    pasword:string;

    activeStatus?: string;

    
}