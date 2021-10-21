import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class Address extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column({nullable:true})
    city:string;

    
    @Column({nullable:false})
    area:string;

    
    @Column({nullable:true})
    street:string;

    @Column({nullable:true})
    building:string;

    @Column({nullable:true})
    flat:string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt:Date;

    //relationships
    @OneToOne(() => User)
    @JoinColumn()
    profile: User;
 

}
