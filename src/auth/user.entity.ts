import { BaseEntity, ObjectIdColumn, Column, Entity, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User extends BaseEntity{

    @ObjectIdColumn()
    _id: string;

    @Column({nullable: true})
    username: string;

    @Column({nullable: true})
    password: string;

    @Column()
    salt: string;

    async validatePassword(password: string): Promise<boolean> {
        const hash = bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}