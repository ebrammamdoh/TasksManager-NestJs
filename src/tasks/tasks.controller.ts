import { Controller, Get, Body, Post, Query, Param, Delete, Put, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { ITaskService } from './i-tasks.service';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pipes';

@Controller('api/tasks')
export class TasksController {

    /**
     *
     */
    constructor(private taskService: ITaskService) {

    }

    @Get('')
    getTasksFilter(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length){
            return this.taskService.getAllTasksWithFilter(filterDto)
        }
        return this.taskService.getAllTasks()
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string) {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {

        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        this.deleteTask(id);
    }

    @Put('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Task {
       return this.taskService.updateTask(id, status);
    }
}
