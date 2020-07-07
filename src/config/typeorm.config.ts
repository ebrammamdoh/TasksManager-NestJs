import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: 'mongodb',
    url: 'mongodb://localhost/nest',
    entities:[__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    useNewUrlParser: true,
    logging: true,
}