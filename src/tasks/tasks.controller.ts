import { Controller, Get, Body, Post, Query, Param, Delete, Put, Patch, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { Task, TaskStatus } from './models/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { ITaskService } from './i-tasks.service';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pipes';

@Controller('api/tasks')
export class TasksController {

    constructor(private taskService: ITaskService) {

    }

    @Get('')
    getTasksFilter(@Query(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST})) filterDto: GetTasksFilterDto): Promise<Task[]> {
        if(Object.keys(filterDto).length){
            return this.taskService.getAllTasksWithFilter(filterDto)
        }
        return this.taskService.getAllTasks()
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {

        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.deleteTask(id);
    }

    @Put('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Promise<Task> {
       return this.taskService.updateTask(id, status);
    }
}
