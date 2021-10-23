import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";


@Entity()
export class Comment extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;

    @CreateDateColumn()
    createdAt: Date;
 
    @UpdateDateColumn()
    updatedAt:Date;
    
    
    @ManyToOne(() => User, user => user.comments,{cascade:true})
    author: User;


    @ManyToOne(() => Product, product => product.comments,{cascade:true})
    product: Product;

    @Column({ nullable: true })
    reply_to_id?: string;

    @ManyToOne(() => Comment, comment => comment.id)
    @JoinColumn({ name: "reply_to_id" })
    reply_to?: Comment;

    

    

}
