import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { Session } from '../../auth/entities/session.entity';
import { IP } from './IP.entity';

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

    @OneToMany(() => IP, (ip) => ip.user)
    ipAddresses: IP[];
}
