import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export abstract class ITaskService {
    abstract getAllTasks(): Task[];
    abstract getAllTasksWithFilter(filterDto: GetTasksFilterDto): Task[];
    abstract getTaskById(id: string): Task;
    abstract createTask(createTaskDto: CreateTaskDto): Task;
    abstract deleteTask(id: string): void;
    abstract updateTask(id: string, status: TaskStatus): Task;
}