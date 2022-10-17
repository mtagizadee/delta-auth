import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from 'typeorm'
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Session {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        unique: true
    })
    accessToken: string;

    @Column({ type: 'timestamp' })
    expiresAt: Date;

    @Column({ type: 'varchar' })
    ip: string;

    @ManyToOne(() => User, (user) => user.sessions, { onDelete: "CASCADE" })
    user: User
}