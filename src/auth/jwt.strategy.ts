import { PassportStrategy } from '@nestjs/passport';
import * as Str from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IJwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as config from 'config';

const serverConfig = config.get('jwt');
@Injectable()
export class JwtStrategy extends PassportStrategy(Str.Strategy) {
    /**
     *
     */
    constructor(
       @InjectRepository(UserRepository) private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: Str.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: serverConfig.secret,

        });
        
    }

    async validate(payload: IJwtPayload): Promise<User>{
        const { username } = payload;
        const user = await this.userRepository.findOne({ username });
        if(!user){
            throw new UnauthorizedException(``);
        }
        return user;
    }
}