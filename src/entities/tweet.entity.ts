import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, TableForeignKey } from "typeorm";
import { User } from "./user.entity";

@Entity('tweets')
export class Tweet {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.tweets, { onDelete: 'CASCADE' })
    user: User;

    @Column({ length: 280})
    content: string;

    @CreateDateColumn()
    createdAt: Date;
}