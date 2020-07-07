import { Repository, EntityRepository } from "typeorm";
import { Task } from "./models/tasks.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./models/task.model";
import { BadRequestException, ConflictException } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        var exist = await this.findOne({title});
        if(exist){
            throw new ConflictException(`The title "${title}" is already exist`);
        }

        const newTask = new Task();
        newTask.status = TaskStatus.OPEN;
        newTask.title = title;
        newTask.descripton = description;
        await newTask.save();

        return newTask;
    }
}