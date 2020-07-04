import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { ITaskService } from './i-tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService implements ITaskService {
    private tasks: Task[];

    constructor() {
        this.tasks = new Array<Task>();
    }
    getAllTasks(): Task[] {
        return this.tasks;
    }

    getAllTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        var tasks = this.getAllTasks();

        if(status) {
            tasks = tasks.filter(t => t.status === status);
        }
        if(search) {
            tasks = tasks.filter(t => 
                t.title.includes(search) ||
                t.description.includes(search)
                );
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        var fount = this.tasks.find(t => t.id === id);
        if(!fount){
            throw new NotFoundException(`Task with ID ${id} Not Found`);
        }

        return fount;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        var task: Task = {
            description,
            status: TaskStatus.OPEN,
            title,
            id: uuidv1()
        }
        this.tasks.push(task);

        return task;

    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(t => t.id !== id);
    }

    updateTask(id: string, status: TaskStatus): Task {
       var task = this.getTaskById(id);
       task.status = status;
       return task;
    }
}
