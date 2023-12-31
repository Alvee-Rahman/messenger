import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { AuthEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken'
import { UserInfo } from 'os';
@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,//reporsitory declare 
    ){}


    async signUp(SignupDto: SignUpDto): Promise<{ message: string }> {

        try{
    
          console.log('Signup DTO:', SignupDto);
    
        const existingUser = await this.authRepository.findOne({where: { userEmail: SignupDto.userEmail }});
        if (existingUser) {
          throw new UnauthorizedException('Email is already in use');
        }
    
        console.log('Original Password:', SignupDto.password);
    
        const saltRounds = 10;
        
        const hashedPassword = await bcrypt.hash(SignupDto.password, saltRounds);
    
        console.log('Hashed Password:', hashedPassword);
    
        //const pictureBuffer = signupDto.picture? Buffer.from(signupDto.picture, 'base64'): null;
    const newUser = this.authRepository.create({
        ...SignupDto,
        password_hash: hashedPassword
    });
        
        await this.authRepository.save(newUser);
    
        return { message: 'Signup Successful' };
      }catch(error){
        console.error('Error during signup:',error);
        throw new UnauthorizedException('Error during password hashing'); 
      }
    }

    async signIn(signinDto: SigninDto): Promise<{ message: string; token: string }> {
        const user = await this.authRepository.findOne({where:{ userEmail: signinDto.userEmail }});
    
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        const isPasswordValid = await bcrypt.compare(signinDto.pasword, user.password_hash);
    
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid credentials');
        }
    
        const token = jwt.sign({ userId: user.id, email: user.userEmail }, 'your_secret_key', {
          expiresIn: '15h', 
        });
    
        return { message: `Welcome to dashboard, ${user.userName}`, token };
      }

    async getUserInfoByUserName(userName: string): Promise<AuthEntity> {
        const user = await this.authRepository.findOne({ where: { userName } });

        if (!user) {
            throw new NotFoundException(`User with userName '${userName}' not found`);
        }
        const {  ...userInfo } = user;
        return userInfo;
    }


}


