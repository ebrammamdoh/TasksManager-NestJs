import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";



export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatus = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN
    ];
    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is in invalid status`);
        }
        return value;
    }

    private isStatusValid(status: any){
        var indx = this.allowedStatus.indexOf(status);
        return (indx !== -1);
    }
}