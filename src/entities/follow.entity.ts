import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";

@Entity('follows')
@Unique(['follower', 'following'])
export class Follow {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.following)
    follower: User;

    @ManyToOne(() => User, (user) => user.follower)
    following: User;

    @CreateDateColumn()
    createdAt: Date;
}