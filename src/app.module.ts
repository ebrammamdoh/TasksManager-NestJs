import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    TasksModule, AuthModule
  ],
})
export class AppModule {}
