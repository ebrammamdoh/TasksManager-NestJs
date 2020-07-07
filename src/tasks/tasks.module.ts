import { Module, NestMiddleware, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { ITaskService } from './i-tasks.service';
import { logger } from 'src/logger.middleware';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository])],
  controllers: [TasksController],
  providers: [
    { provide: ITaskService, useClass: TaskService },

  ]
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(TasksController);
  }
}
