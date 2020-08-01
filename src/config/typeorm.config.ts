import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';

const dbConfig = config.get('db');
export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    url: `${dbConfig.host}/${dbConfig.database}`,
    entities:[__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    useNewUrlParser: true,
    logging: true,
}