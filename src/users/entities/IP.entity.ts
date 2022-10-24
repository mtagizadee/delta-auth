import { PrimaryColumn, Column, Entity, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class IP {
    @PrimaryColumn()
    id: string;

    @Column({
        type: 'varchar',
        unique: true
    })
    ip: string;

    @ManyToOne(() => User, (user) => user.ipAddresses, { onDelete: "CASCADE" })
    user: User;
}