import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn} from "typeorm";
import { User } from "./User";

@Entity()
export class Card extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    holder: string;

    @Column()
    type: string;

    @Column({type:"integer"})
    number:number

    @Column()
    expiration_date:Date

    @Column()
    ccv:number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt:Date;

    //relationships
    @OneToOne(()=>User,{cascade:true})
    @JoinColumn()
    user: User;
    

}
