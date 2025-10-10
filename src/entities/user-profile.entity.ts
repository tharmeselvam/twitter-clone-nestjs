import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('user_profiles')
export class UserProfile {
    @PrimaryColumn()
    userId: number

    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ length: 150, nullable: true })
    bio: string;
}