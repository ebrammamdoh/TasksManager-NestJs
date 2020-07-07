import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
            
    }

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.authService.signIn(authCredentialsDto);
    }
}
