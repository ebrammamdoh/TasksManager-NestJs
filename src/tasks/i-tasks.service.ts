import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './models/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export abstract class ITaskService {
    abstract getAllTasks();
    abstract getAllTasksWithFilter(filterDto: GetTasksFilterDto);
    abstract getTaskById(id: string);
    abstract createTask(createTaskDto: CreateTaskDto, user: User);
    abstract deleteTask(id: string): void;
    abstract updateTask(id: string, status: TaskStatus);
}