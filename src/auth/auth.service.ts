import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from 'src/tasks/task.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {


    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {

    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        if(!username){
            throw new UnauthorizedException(`Invalid Credentials`);
        }
    }
}
