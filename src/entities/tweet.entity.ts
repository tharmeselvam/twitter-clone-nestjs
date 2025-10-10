import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Like } from "./like.entity";

@Entity('tweets')
export class Tweet {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.tweets, { onDelete: 'CASCADE' })
    user: User;

    @Column({ length: 280 })
    content: string;

    @OneToMany(() => Like, (like) => like.tweet)
    likes: Like[];

    @ManyToOne(() => Tweet, (tweet) => tweet.replies, { nullable: true, onDelete: 'CASCADE' })
    parentTweet: Tweet;

    @OneToMany(() => Tweet, (tweet) => tweet.parentTweet)
    replies: Tweet[];

    @CreateDateColumn()
    createdAt: Date;
}