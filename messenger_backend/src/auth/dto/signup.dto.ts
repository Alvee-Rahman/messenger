import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsEmail()
    userEmail: string;

    userImage: string;

    @IsNotEmpty()
    userPhone:string;

    @IsNotEmpty()
    userRole: string;

    @IsNotEmpty()
    userGender: string;

    @IsNotEmpty()
    @IsString()
    password:string;
    
}