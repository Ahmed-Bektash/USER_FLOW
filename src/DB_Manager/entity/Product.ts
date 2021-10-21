import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { Upload } from "./Upload";

@Entity()
export class Product extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @OneToMany(() => Upload, upload => upload.product) //add cascade
    uploads: Upload[];
    

}
