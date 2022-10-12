import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryColumn()
    id: string;

    @Column({
        type: 'varchar',
        unique: true
    })
    email: string;
}
