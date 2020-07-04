import { IsNotEmpty, IsBoolean, IsDate} from 'class-validator'


export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}

