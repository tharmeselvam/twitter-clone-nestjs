import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";
import { Tweet } from "./tweet.entity";

@Entity('likes')
@Unique(['tweet', 'user'])
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Tweet, (tweet) => tweet.likes, { onDelete: 'CASCADE' })
    tweet: Tweet;

    @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}