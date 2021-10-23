import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, OneToOne} from "typeorm";
import { Upload } from "./Upload";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Product extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({type:"int"}) //you can link likes to users in a different table later
    likes: number;

    @Column({type:"int"}) 
    dislikes: number;

    @Column({type:"float"})
    price: number;

    @Column({type:"int"})
    sales: number; //think of concurrent writes for example create a queue

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt:Date;


    @OneToOne(()=>User,{cascade:true})
    @JoinColumn()
    owner: User;
    
    @OneToMany(() => Upload, upload => upload.product)
    uploads: Upload[];

    @OneToMany(() => Comment, comment => comment.product)
    comments: Comment[];
    

}
