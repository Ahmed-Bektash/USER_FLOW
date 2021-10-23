import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { Product } from "./Product";
// import { User } from "./User";

@Entity()
export class Upload extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    is_premium:boolean

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt:Date;

    //relationships
    // @ManyToOne(() => User, user => user.uploads,{cascade:true})
    // user: User;

    @ManyToOne(() => Product, product => product.uploads,{cascade:true})
    product: Product;
}
