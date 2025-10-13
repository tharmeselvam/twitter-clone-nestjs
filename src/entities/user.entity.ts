import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tweet } from "./tweet.entity";
import { Like } from "./like.entity";
import { UserProfile } from "./user-profile.entity";
import { Follow } from "./follow.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true, length: 30 })
    username: string

    @Column()
    password: string

    @OneToMany(() => Tweet, (tweet) => tweet.user)
    tweets: Tweet[];

    @OneToMany(() => Like, (like) => (like.user))
    likes: Like[];

    @OneToMany(() => Follow, (follow) => follow.follower)
    following: Follow[];

    @OneToMany(() => Follow, (follow) => follow.following)
    follower: Follow[];

    @OneToOne(() => UserProfile, (profile) => profile.user)
    profile: UserProfile

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
