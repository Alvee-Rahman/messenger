import { Body, Controller, Get, NotFoundException, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  //signup api  
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  //signin API
  @Post('signin')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() signinDto: SigninDto): Promise<{message: string; token: string}> {
    return this.authService.signIn(signinDto);
  }

  @Get('userName')
    async getUserInfo(@Param('userName') userName: string) {
        try {
            const userInfo = await this.authService.getUserInfoByUserName(userName);
            return userInfo;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(`User with userName '${userName}' not found`);
            } else {
                throw error;
            }
        }
    }




    
}
