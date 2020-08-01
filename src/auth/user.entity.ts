import { BaseEntity, ObjectIdColumn, Column, Entity, Unique, ManyToOne, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from 'src/tasks/models/tasks.entity';
import { type } from 'os';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {

    @ObjectIdColumn()
    _id: string;

    @Column({ nullable: true })
    username: string;

    @Column({ nullable: true })
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Task, task => task.user, { eager: true })
    tasks: Task[];


    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}