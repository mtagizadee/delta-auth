import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { Session } from '../../auth/entities/session.entity';

@Entity()
export class User {

    @PrimaryColumn()
    id: string;

    @Column({
        type: 'varchar',
        unique: true
    })
    email: string;

    @OneToMany(() => Session, (session) => session.user)
    sessions: Session[];
}
