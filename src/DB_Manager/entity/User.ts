import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { Product } from "./Product";
import { Comment } from "./Comment";
import { UserRole } from "../../types";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({unique:true})
    phone_number: string;

    @Column({unique:true})
    email:string;
    
    @Column({default:false})
    is_prenium_account: boolean;
    
    @Column({nullable:false})
    password:string;

    @Column({
        nullable:false,
        type: "enum",
        enum: UserRole,
        })
    type:UserRole;

    @Column({nullable:true})
    reset_password_token: string;

    @Column({nullable:true})
    reset_password_expire_time: string;

    @CreateDateColumn()
    createdAt: Date;
 
    @UpdateDateColumn()
    updatedAt:Date;

    //relationships
    // @OneToMany(() => Upload, upload => upload.user) 
    // uploads: Upload[];
    
    @ManyToMany(() => User)
    @JoinTable()
    relation: User[];
  
    @ManyToMany(() => Product)
    @JoinTable()
    liked_products: Product[];

    @OneToMany(() => Comment, comment => comment.author) 
    comments: Comment[];

    

}
