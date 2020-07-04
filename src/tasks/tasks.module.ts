import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ITaskService } from './i-tasks.service';

@Module({
  controllers: [TasksController],
  providers: [
    { provide: ITaskService, useClass: TasksService},
    
  ]
})
export class TasksModule {}
