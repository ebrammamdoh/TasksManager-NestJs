import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from './task.model';
import { Entity, Column, ObjectIdColumn, BaseEntity, Unique } from 'typeorm';

@Entity()
@Unique(['title'])
export class Task extends BaseEntity {

    @ObjectIdColumn()
    _id?: string;

    @Column()
    //@Prop({ required: true, type: String })
    title: string;

    @Column()
    //@Prop({ required: true, type: String })
    descripton: string

    @Column()
    //@Prop({ default: TaskStatus.OPEN, type: Number, enum: [TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN] })
    status: TaskStatus
}