import { ITaskService } from "./i-tasks.service";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./models/task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./models/tasks.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskRepository } from "./task.repository";
import { NotFoundException } from "@nestjs/common";
import { User } from "src/auth/user.entity";


export class TaskService implements ITaskService {

    constructor(
        @InjectRepository(TaskRepository)
        private readonly taskRepository: TaskRepository,
    ) { }

    async getAllTasks(): Promise<Task[]> {
        var result = await this.taskRepository.find({});
        return result;
    }

    async getAllTasksWithFilter(filterDto: GetTasksFilterDto) {
        const { status, search } = filterDto;
        var result = await this.taskRepository.find({
            where: {
                $and: [{ status: status }, { title: search }, { descripton: search }]
            },

        });
        return result;
    }
    async getTaskById(id: string): Promise<Task> {
        var result = await this.taskRepository.findOne(id);
        if(!result)
            throw new NotFoundException(`Task with ID ${id} Not Found`);

        return result;
    }
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }
    async deleteTask(id: string): Promise<void> {
        var result = await this.taskRepository.delete(id);
        if(result.affected === 0)
            throw new NotFoundException(`Task with ID ${id} Not Found`);

        return;
    }
    async updateTask(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }

}