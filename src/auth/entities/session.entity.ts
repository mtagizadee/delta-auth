import { PrimaryGeneratedColumn, Entity, Column, OneToOne, JoinColumn } from 'typeorm'
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

    @Column({
        type: 'varchar',
        unique: true
    })
    ip: string;

    @OneToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn()
    user: User
}